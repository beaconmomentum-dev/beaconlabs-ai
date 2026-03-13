/**
 * Meta Conversions API (CAPI) Helper — Beacon Labs
 *
 * Sends server-side Purchase events to Meta for improved attribution accuracy.
 * Events are deduplicated against browser-side fbq() calls using a shared
 * event_id (Stripe payment intent ID).
 *
 * Uses native fetch — no facebook-nodejs-business-sdk dependency required.
 * Docs: https://developers.facebook.com/docs/marketing-api/conversions-api
 */
import crypto from "crypto";

const PIXEL_ID = process.env.META_PIXEL_ID || "2728401540849226";
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN || "";
const CAPI_ENDPOINT = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events`;

/**
 * Hash a string using SHA-256 (required by Meta for PII normalization).
 * Meta requires lowercase + trim before hashing.
 */
function hashValue(value: string | undefined | null): string | undefined {
  if (!value) return undefined;
  return crypto.createHash("sha256").update(value.toLowerCase().trim()).digest("hex");
}

export interface PurchaseEventParams {
  /** Stripe payment intent ID — used as event_id for browser/server deduplication */
  eventId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  /** Purchase value in dollars (e.g. 997) */
  value: number;
  currency?: string;
  /** Product name or ID */
  contentName?: string;
  /** Client IP address from request headers */
  ipAddress?: string;
  /** User-Agent from request headers */
  userAgent?: string;
  /** Source URL of the purchase page */
  eventSourceUrl?: string;
}

/**
 * Send a server-side Purchase event to Meta CAPI.
 * Call from confirm-order endpoint after Stripe payment verification.
 */
export async function sendPurchaseEvent(params: PurchaseEventParams): Promise<void> {
  if (!ACCESS_TOKEN) {
    console.warn("[CAPI] META_CAPI_ACCESS_TOKEN not set — skipping server-side event.");
    return;
  }

  const eventTime = Math.floor(Date.now() / 1000);

  const userData: Record<string, unknown> = {
    em: [hashValue(params.email)],
  };
  if (params.firstName) userData.fn = [hashValue(params.firstName)];
  if (params.lastName) userData.ln = [hashValue(params.lastName)];
  if (params.ipAddress) userData.client_ip_address = params.ipAddress;
  if (params.userAgent) userData.client_user_agent = params.userAgent;

  const payload = {
    data: [
      {
        event_name: "Purchase",
        event_time: eventTime,
        event_id: params.eventId,
        event_source_url: params.eventSourceUrl || "https://beaconmomentum.com/growth-blueprint",
        action_source: "website",
        user_data: userData,
        custom_data: {
          value: params.value,
          currency: params.currency || "USD",
          content_name: params.contentName || "AI Growth Blueprint",
          content_type: "product",
          num_items: 1,
        },
      },
    ],
    // test_event_code: "TEST12345", // Uncomment during testing in Events Manager
  };

  try {
    const response = await fetch(`${CAPI_ENDPOINT}?access_token=${ACCESS_TOKEN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = (await response.json()) as Record<string, unknown>;

    if (!response.ok) {
      console.error("[CAPI] API error:", JSON.stringify(result));
      return;
    }

    console.log(
      `[CAPI] Purchase event sent. event_id=${params.eventId}, value=${params.value}, events_received=${result.events_received ?? "?"}`
    );
  } catch (err) {
    // Non-fatal — CAPI failure should never block order confirmation
    console.error("[CAPI] Failed to send Purchase event:", (err as Error).message || err);
  }
}
