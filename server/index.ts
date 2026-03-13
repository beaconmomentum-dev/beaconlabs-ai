import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import Stripe from "stripe";
import { sendPurchaseEvent } from "./meta-capi.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GHL_PIT = process.env.GHL_API_KEY || "";
const GHL_LOCATION_ID = "Z4OoFmxrotxASibl2PKv"; // Beacon AI Labs
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";

const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2025-02-24.acacia" });

// Price ID for the $997 AI Growth Blueprint
const BLUEPRINT_PRICE_ID = "price_1T9IMlE69P40ey9pyk61nYwC";

async function createGHLContact(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  businessName?: string;
  industry?: string;
  website?: string;
  monthlyAdSpend?: string;
  primaryGoal?: string;
  tags?: string[];
  source?: string;
}) {
  const payload: Record<string, unknown> = {
    locationId: GHL_LOCATION_ID,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    tags: data.tags || ["signal-check-request", "audit-form"],
    source: data.source || "beaconlabs.ai/audit",
  };

  if (data.phone) payload.phone = data.phone;
  if (data.businessName) payload.companyName = data.businessName;
  if (data.website) payload.website = data.website;

  // Add custom fields as notes
  const notes: string[] = [];
  if (data.industry) notes.push(`Industry: ${data.industry}`);
  if (data.monthlyAdSpend) notes.push(`Monthly Ad Spend: ${data.monthlyAdSpend}`);
  if (data.primaryGoal) notes.push(`Primary Goal: ${data.primaryGoal}`);

  const res = await fetch("https://services.leadconnectorhq.com/contacts/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GHL_PIT}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json() as Record<string, unknown>;

  if (!res.ok) {
    throw new Error(`GHL API error: ${res.status} - ${JSON.stringify(json)}`);
  }

  // If there are notes, add them to the contact
  if (notes.length > 0 && json.contact) {
    const contact = json.contact as Record<string, unknown>;
    const contactId = contact.id as string;
    await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GHL_PIT}`,
        Version: "2021-07-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: contactId,
        body: notes.join("\n"),
      }),
    });
  }

  return json;
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  // ─────────────────────────────────────────────────────────────
  // Audit / Signal Check form submission endpoint
  // ─────────────────────────────────────────────────────────────
  app.post("/api/audit", async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        phone,
        businessName,
        industry,
        website,
        monthlyAdSpend,
        primaryGoal,
      } = req.body;

      if (!firstName || !lastName || !email) {
        res.status(400).json({ error: "firstName, lastName, and email are required" });
        return;
      }

      const result = await createGHLContact({
        firstName,
        lastName,
        email,
        phone,
        businessName,
        industry,
        website,
        monthlyAdSpend,
        primaryGoal,
      });

      res.json({ success: true, contactId: (result.contact as Record<string, unknown>)?.id });
    } catch (err) {
      console.error("Audit form error:", err);
      res.status(500).json({ error: "Failed to submit request. Please try again." });
    }
  });

  // ─────────────────────────────────────────────────────────────
  // Blueprint checkout — Step 1: Create PaymentIntent
  // Called when user clicks "Pay Now" — returns a client_secret
  // for Stripe Elements to confirm the payment on the frontend.
  // ─────────────────────────────────────────────────────────────
  app.post("/api/blueprint/create-payment-intent", async (req, res) => {
    try {
      const { firstName, lastName, email, businessName } = req.body;

      if (!firstName || !lastName || !email) {
        res.status(400).json({ error: "Name and email are required." });
        return;
      }

      // Look up or create a Stripe customer so receipts are tied to the email
      const existingCustomers = await stripe.customers.list({ email, limit: 1 });
      let customer: Stripe.Customer;
      if (existingCustomers.data.length > 0) {
        customer = existingCustomers.data[0];
      } else {
        customer = await stripe.customers.create({
          name: `${firstName} ${lastName}`,
          email,
          metadata: { businessName: businessName || "", source: "beaconlabs.ai/growth-blueprint" },
        });
      }

      // Create the PaymentIntent for $997
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 99700, // $997.00 in cents
        currency: "usd",
        customer: customer.id,
        receipt_email: email,
        description: "Beacon Labs — AI Growth Blueprint",
        metadata: {
          firstName,
          lastName,
          email,
          businessName: businessName || "",
          product: "AI Growth Blueprint",
          priceId: BLUEPRINT_PRICE_ID,
        },
        automatic_payment_methods: { enabled: true },
      });

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
      console.error("PaymentIntent creation error:", err);
      res.status(500).json({ error: "Unable to initialise payment. Please try again." });
    }
  });

  // ─────────────────────────────────────────────────────────────
  // Blueprint checkout — Step 2: Confirm order after payment
  // Called after Stripe confirms the payment on the frontend.
  // Creates the GHL contact/opportunity and returns confirmation.
  // ─────────────────────────────────────────────────────────────
  app.post("/api/blueprint/confirm-order", async (req, res) => {
    try {
      const { paymentIntentId, firstName, lastName, email, businessName } = req.body;

      if (!paymentIntentId || !email) {
        res.status(400).json({ error: "paymentIntentId and email are required." });
        return;
      }

      // Verify the payment actually succeeded with Stripe
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      if (paymentIntent.status !== "succeeded") {
        res.status(402).json({ error: `Payment not completed. Status: ${paymentIntent.status}` });
        return;
      }

      // Create GHL contact tagged as Blueprint purchaser
      let ghlContactId: string | null = null;
      try {
        const ghlResult = await createGHLContact({
          firstName,
          lastName,
          email,
          businessName,
          tags: ["blueprint-purchaser", "growth-blueprint", "paid-client"],
          source: "beaconlabs.ai/growth-blueprint",
        });
        const contact = (ghlResult as Record<string, unknown>).contact as Record<string, unknown>;
        ghlContactId = contact?.id as string | null;
      } catch (ghlErr) {
        // Non-fatal — log but don't fail the order confirmation
        console.error("GHL contact creation failed (non-fatal):", ghlErr);
      }

      // Fire server-side Meta CAPI Purchase event for improved attribution.
      // event_id matches the browser-side fbq('track', 'Purchase') call for deduplication.
      try {
        await sendPurchaseEvent({
          eventId: paymentIntent.id,
          email,
          firstName: firstName || "",
          lastName: lastName || "",
          value: paymentIntent.amount / 100, // Convert cents to dollars
          currency: paymentIntent.currency?.toUpperCase() || "USD",
          contentName: "AI Growth Blueprint",
          ipAddress:
            (req.headers["x-forwarded-for"] as string | undefined)?.split(",")[0].trim() ||
            req.socket.remoteAddress ||
            undefined,
          userAgent: req.headers["user-agent"] || undefined,
          eventSourceUrl: "https://beaconmomentum.com/growth-blueprint",
        });
      } catch (capiErr) {
        // Non-fatal — log but don't fail the order confirmation
        console.error("CAPI event failed (non-fatal):", capiErr);
      }

      res.json({
        success: true,
        orderId: paymentIntent.id,
        amount: paymentIntent.amount,
        email,
        ghlContactId,
      });
    } catch (err) {
      console.error("Order confirmation error:", err);
      res.status(500).json({ error: "Order confirmation failed. Please contact support." });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
