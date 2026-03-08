import http from 'node:http';
import https from 'node:https';
import { createHash } from 'node:crypto';

// ---- Configuration (loaded from environment variables on the server) ----
// Set these in /etc/systemd/system/beaconlabs-form.service or a .env file
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL || '';
const GHL_API_KEY      = process.env.GHL_API_KEY || '';
const GHL_LOCATION_ID  = process.env.GHL_LOCATION_ID || 'Z4OoFmxrotxASibl2PKv';
const GHL_BASE         = 'https://services.leadconnectorhq.com';

// ---- Meta Conversions API (CAPI) ----
const META_PIXEL_ID        = process.env.META_PIXEL_ID || '2728401540849226';
const META_CAPI_TOKEN      = process.env.META_CAPI_ACCESS_TOKEN || '';
const META_CAPI_API_VERSION = 'v19.0';



function hashPII(value) {
  if (!value) return undefined;
  return createHash('sha256').update(String(value).trim().toLowerCase()).digest('hex');
}

async function sendCAPILead({ email, firstName, lastName, ip, userAgent, eventId }) {
  if (!META_CAPI_TOKEN) {
    console.warn('[CAPI] META_CAPI_ACCESS_TOKEN not set — skipping server-side Lead event');
    return;
  }
  const userData = {
    ...(email     && { em: [hashPII(email)] }),
    ...(firstName && { fn: [hashPII(firstName)] }),
    ...(lastName  && { ln: [hashPII(lastName)] }),
    ...(ip        && { client_ip_address: ip }),
    ...(userAgent && { client_user_agent: userAgent }),
  };
  const payload = {
    data: [{
      event_name: 'Lead',
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId || `bl-lead-${Date.now()}`,
      event_source_url: 'https://beaconlabs.ai/signal-check',
      action_source: 'website',
      user_data: userData,
    }],
  };
  const body = JSON.stringify(payload);
  return new Promise((resolve) => {
    const options = {
      hostname: 'graph.facebook.com',
      path: `/${META_CAPI_API_VERSION}/${META_PIXEL_ID}/events?access_token=${META_CAPI_TOKEN}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) {
            console.error('[CAPI] Lead event error:', parsed.error.message);
          } else {
            console.log(`[CAPI] Lead event sent — events_received: ${parsed.events_received}`);
          }
        } catch (e) {
          console.error('[CAPI] Parse error:', e.message);
        }
        resolve();
      });
    });
    req.on('error', (err) => {
      console.error('[CAPI] Request error:', err.message);
      resolve();
    });
    req.write(body);
    req.end();
  });
}

const PORT             = 3005;

// Pipeline / stage IDs (Beacon Labs AI Services pipeline)
const PIPELINE_AI_SERVICES       = 'bvtePhtYnqw1EsmeQUrL';
const STAGE_AI_NEW_INQUIRY        = '202a08e1-7f3a-42c9-879f-12704030768d';
// Signal Check funnel stages (added 2026-03-07 for Coffy clone funnel)
// NOTE: These stage IDs must be updated after adding stages in GHL UI
const STAGE_SIGNAL_CHECK_REQUESTED = process.env.GHL_STAGE_SIGNAL_CHECK_REQUESTED || STAGE_AI_NEW_INQUIRY;
const STAGE_SIGNAL_CHECK_COMPLETED = process.env.GHL_STAGE_SIGNAL_CHECK_COMPLETED || STAGE_AI_NEW_INQUIRY;
const STAGE_BLUEPRINT_INTEREST     = process.env.GHL_STAGE_BLUEPRINT_INTEREST     || STAGE_AI_NEW_INQUIRY;

// GHL custom field IDs (created 2026-03-07)
const CF_SIGNAL_CHECK_SCORE = 'aMSKA5IOIiESi6PvpbNZ';
const CF_SIGNAL_CHECK_DATE  = 'lRxetkN4EvDEdHwySnEl';
const CF_REEL_COMMENT_KW    = 'f9dS4bpz5E0BevIcc3TM';

const ALLOWED_ORIGINS = [
  'https://beaconlabs.ai',
  'https://www.beaconlabs.ai',
  'https://beaconlabsai.com',
  'https://www.beaconlabsai.com',
  'http://localhost:3000',
];

// ---- Helpers ----
function postJSON(url, data, headers = {}) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(data);
    const parsed = new URL(url);
    const options = {
      hostname: parsed.hostname,
      port: parsed.port || 443,
      path: parsed.pathname + parsed.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        ...headers,
      },
    };
    const req = https.request(options, (res) => {
      let responseBody = '';
      res.on('data', (chunk) => (responseBody += chunk));
      res.on('end', () => resolve({ status: res.statusCode, body: responseBody }));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function ghlHeaders() {
  return {
    Authorization: `Bearer ${GHL_API_KEY}`,
    Version: '2021-07-28',
  };
}

function getCorsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

// ---- Slack message formatter ----
function formatSlackMessage(data) {
  return {
    blocks: [
      {
        type: 'header',
        text: { type: 'plain_text', text: '🚀 New Beacon Labs Lead', emoji: true },
      },
      { type: 'divider' },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*Name:*\n${data.firstName} ${data.lastName}` },
          { type: 'mrkdwn', text: `*Email:*\n${data.email}` },
        ],
      },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*Company:*\n${data.company || 'Not provided'}` },
          { type: 'mrkdwn', text: `*Service:*\n${data.service || 'Not specified'}` },
        ],
      },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*Budget:*\n${data.budget || 'Not specified'}` },
          { type: 'mrkdwn', text: `*Source:*\nBeacon Labs Website` },
        ],
      },
      {
        type: 'section',
        text: { type: 'mrkdwn', text: `*Message:*\n${data.message || 'No message provided'}` },
      },
      { type: 'divider' },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `Submitted at ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET`,
          },
        ],
      },
    ],
  };
}

// ---- GHL: upsert contact ----
async function ghlUpsertContact(data) {
  // Build custom fields array with proper GHL field keys
  const customFields = [
    { key: 'contact.contactai_services_interest', field_value: data.service || '' },
    { key: 'contact.contactlead_source_detail',   field_value: 'Beacon Labs Website' },
    { key: 'contact.contactpain_point',           field_value: data.message || '' },
  ];
  if (data.budget) {
    customFields.push({ key: 'contact.contactmonthly_revenue_range', field_value: data.budget });
  }
  if (data.company) {
    customFields.push({ key: 'contact.contactbusiness_type', field_value: data.company });
  }

  const contactPayload = {
    firstName:    data.firstName,
    lastName:     data.lastName,
    email:        data.email,
    companyName:  data.company || '',
    locationId:   GHL_LOCATION_ID,
    source:       'Beacon Labs Website',
    tags: [
      'website-lead',
      'beacon-labs',
      'beacon-labs-inquiry',
      'new-lead',
      'organic-lead',
      ...(data.service ? [data.service.toLowerCase().replace(/\s+/g, '-')] : []),
    ],
    customFields,
  };

  // Try to find existing contact by email first
  const searchResult = await new Promise((resolve, reject) => {
    const parsed = new URL(`${GHL_BASE}/contacts/?locationId=${GHL_LOCATION_ID}&query=${encodeURIComponent(data.email)}&limit=1`);
    const options = {
      hostname: parsed.hostname,
      port: 443,
      path: parsed.pathname + parsed.search,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...ghlHeaders(),
      },
    };
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => resolve({ status: res.statusCode, body }));
    });
    req.on('error', reject);
    req.end();
  });

  let existingId = null;
  try {
    const parsed = JSON.parse(searchResult.body);
    if (parsed.contacts?.length > 0) existingId = parsed.contacts[0].id;
  } catch {}

  let contactId = null;
  if (existingId) {
    // Update existing contact
    const updateResult = await new Promise((resolve, reject) => {
      const body = JSON.stringify({ locationId: GHL_LOCATION_ID, ...contactPayload });
      const options = {
        hostname: 'services.leadconnectorhq.com',
        port: 443,
        path: `/contacts/${existingId}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
          ...ghlHeaders(),
        },
      };
      const req = https.request(options, (res) => {
        let responseBody = '';
        res.on('data', (chunk) => (responseBody += chunk));
        res.on('end', () => resolve({ status: res.statusCode, body: responseBody }));
      });
      req.on('error', reject);
      req.write(body);
      req.end();
    });
    contactId = existingId;
    console.log(`[GHL] Updated existing contact ${existingId} (${updateResult.status})`);
  } else {
    // Create new contact
    const createResult = await postJSON(`${GHL_BASE}/contacts/`, contactPayload, ghlHeaders());
    try {
      const parsed = JSON.parse(createResult.body);
      contactId = parsed.contact?.id || null;
    } catch {}
    console.log(`[GHL] Created contact ${contactId} (status ${createResult.status})`);
  }

  return contactId;
}

// ---- GHL: create opportunity in AI Services pipeline ----
async function ghlCreateOpportunity(contactId, data) {
  const oppPayload = {
    pipelineId:   PIPELINE_AI_SERVICES,
    locationId:   GHL_LOCATION_ID,
    name:         `${data.firstName} ${data.lastName} — ${data.service || 'AI Services Inquiry'}`,
    pipelineStageId: STAGE_AI_NEW_INQUIRY,
    status:       'open',
    contactId,
    monetaryValue: 0,
    source:       'Beacon Labs Website',
  };

  const result = await postJSON(`${GHL_BASE}/opportunities/`, oppPayload, ghlHeaders());
  let oppId = null;
  try {
    const parsed = JSON.parse(result.body);
    oppId = parsed.opportunity?.id || null;
  } catch {}
  console.log(`[GHL] Created opportunity ${oppId} in AI_NEW_INQUIRY stage (status ${result.status})`);
  return oppId;
}

// ---- Request handler ----
const server = http.createServer(async (req, res) => {
  const origin = req.headers.origin || '';
  const corsHeaders = getCorsHeaders(origin);

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, corsHeaders);
    res.end();
    return;
  }

  // Health check
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', service: 'beaconlabs-form-handler' }));
    return;
  }
  // Manus persistent state endpoint
  if (req.method === 'GET' && req.url === '/state') {
    import('fs').then(({ readFileSync }) => {
      try {
        const content = readFileSync('/opt/beacon-state.md', 'utf8');
        res.writeHead(200, { ...corsHeaders, 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(content);
      } catch (e) {
        res.writeHead(404);
        res.end('State file not found');
      }
    });
    return;
  }

  // ---- /api/signal-check endpoint ----
  if (req.method === 'POST' && req.url === '/api/signal-check') {
    let body = '';
    for await (const chunk of req) body += chunk;
    let data;
    try {
      data = JSON.parse(body);
    } catch {
      res.writeHead(400, { ...corsHeaders, 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid JSON' }));
      return;
    }

    if (!data.firstName || !data.lastName || !data.email || !data.businessName) {
      res.writeHead(400, { ...corsHeaders, 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing required fields: firstName, lastName, email, businessName' }));
      return;
    }

    console.log(`[${new Date().toISOString()}] Signal Check: ${data.firstName} ${data.lastName} <${data.email}> — ${data.businessName}`);

    // Build GHL contact with Signal Check tags and custom fields
    const signalTags = [
      'signal-check-requested',
      'coffy-clone-funnel',
      'beacon-labs',
      ...(data.reelKeyword === 'SIGNAL' ? ['signal-reel-commenter'] : []),
      ...(data.reelKeyword === 'BLUEPRINT' ? ['blueprint-reel-commenter'] : []),
    ];

    const signalCustomFields = [
      { id: CF_SIGNAL_CHECK_DATE, field_value: new Date().toISOString().split('T')[0] },
      ...(data.reelKeyword ? [{ id: CF_REEL_COMMENT_KW, field_value: data.reelKeyword }] : []),
    ];

    let contactId = null;
    let oppId = null;
    let ghlStatus = 'failed';
    try {
      // Upsert contact
      const searchResult = await new Promise((resolve, reject) => {
        const parsed = new URL(`${GHL_BASE}/contacts/?locationId=${GHL_LOCATION_ID}&query=${encodeURIComponent(data.email)}&limit=1`);
        const options = {
          hostname: parsed.hostname, port: 443,
          path: parsed.pathname + parsed.search, method: 'GET',
          headers: { 'Content-Type': 'application/json', ...ghlHeaders() },
        };
        const req2 = https.request(options, (res2) => {
          let b = ''; res2.on('data', c => b += c); res2.on('end', () => resolve({ status: res2.statusCode, body: b }));
        });
        req2.on('error', reject); req2.end();
      });

      let existingId = null;
      try { const p = JSON.parse(searchResult.body); if (p.contacts?.length > 0) existingId = p.contacts[0].id; } catch {}

      const contactPayload = {
        firstName: data.firstName, lastName: data.lastName, email: data.email,
        companyName: data.businessName || '', locationId: GHL_LOCATION_ID,
        source: 'Signal Check Form', tags: signalTags, customFields: signalCustomFields,
      };

      if (existingId) {
        await new Promise((resolve, reject) => {
          const b = JSON.stringify({ locationId: GHL_LOCATION_ID, ...contactPayload });
          const options = {
            hostname: 'services.leadconnectorhq.com', port: 443,
            path: `/contacts/${existingId}`, method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(b), ...ghlHeaders() },
          };
          const req2 = https.request(options, (res2) => { let rb = ''; res2.on('data', c => rb += c); res2.on('end', () => resolve({ status: res2.statusCode, body: rb })); });
          req2.on('error', reject); req2.write(b); req2.end();
        });
        contactId = existingId;
        console.log(`[GHL] Updated signal-check contact ${existingId}`);
      } else {
        const createResult = await postJSON(`${GHL_BASE}/contacts/`, contactPayload, ghlHeaders());
        try { const p = JSON.parse(createResult.body); contactId = p.contact?.id || null; } catch {}
        console.log(`[GHL] Created signal-check contact ${contactId} (${createResult.status})`);
      }

      // Create opportunity in Signal Check Requested stage
      if (contactId) {
        const oppPayload = {
          pipelineId: PIPELINE_AI_SERVICES, locationId: GHL_LOCATION_ID,
          name: `${data.firstName} ${data.lastName} — Signal Check (${data.businessName})`,
          pipelineStageId: STAGE_SIGNAL_CHECK_REQUESTED,
          status: 'open', contactId, monetaryValue: 0, source: 'Signal Check Form',
        };
        const oppResult = await postJSON(`${GHL_BASE}/opportunities/`, oppPayload, ghlHeaders());
        try { const p = JSON.parse(oppResult.body); oppId = p.opportunity?.id || null; } catch {}
        console.log(`[GHL] Created signal-check opportunity ${oppId} (${oppResult.status})`);
        ghlStatus = 'created';
      }
    } catch (err) {
      console.error(`[GHL] Signal check error: ${err.message}`);
    }

    // Fire Meta CAPI Lead event
    let capiStatus = 'skipped';
    try {
      await sendCAPILead({
        email: data.email, firstName: data.firstName, lastName: data.lastName,
        ip: req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress,
        userAgent: req.headers['user-agent'],
        eventId: data.capiEventId || `bl-signal-${Date.now()}`,
      });
      capiStatus = 'sent';
    } catch (capiErr) {
      console.error(`[CAPI] Signal check error: ${capiErr.message}`);
    }

    // Slack notification
    try {
      await postJSON(SLACK_WEBHOOK_URL, {
        blocks: [
          { type: 'header', text: { type: 'plain_text', text: '📡 New Signal Check Submission', emoji: true } },
          { type: 'section', fields: [
            { type: 'mrkdwn', text: `*Name:*\n${data.firstName} ${data.lastName}` },
            { type: 'mrkdwn', text: `*Email:*\n${data.email}` },
          ]},
          { type: 'section', fields: [
            { type: 'mrkdwn', text: `*Business:*\n${data.businessName}` },
            { type: 'mrkdwn', text: `*Source:*\n${data.reelKeyword ? `Reel (${data.reelKeyword})` : 'Direct'}` },
          ]},
          { type: 'context', elements: [{ type: 'mrkdwn', text: `GHL: ${ghlStatus} | CAPI: ${capiStatus} | ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET` }] },
        ]
      });
    } catch {}

    res.writeHead(200, { ...corsHeaders, 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: true, ghl: ghlStatus, capi: capiStatus,
      ...(contactId && { contactId }), ...(oppId && { opportunityId: oppId }),
    }));
    return;
  }

  // ---- /api/signal-check-complete endpoint (called after report is generated/delivered) ----
  if (req.method === 'POST' && req.url === '/api/signal-check-complete') {
    let body = '';
    for await (const chunk of req) body += chunk;
    let data;
    try { data = JSON.parse(body); } catch {
      res.writeHead(400, { ...corsHeaders, 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid JSON' })); return;
    }

    if (!data.contactId || data.score === undefined) {
      res.writeHead(400, { ...corsHeaders, 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing contactId or score' })); return;
    }

    try {
      // Update contact: add signal-check-completed tag, set score custom field
      const updatePayload = {
        locationId: GHL_LOCATION_ID,
        tags: ['signal-check-completed'],
        customFields: [
          { id: CF_SIGNAL_CHECK_SCORE, field_value: String(data.score) },
        ],
      };
      await new Promise((resolve, reject) => {
        const b = JSON.stringify(updatePayload);
        const options = {
          hostname: 'services.leadconnectorhq.com', port: 443,
          path: `/contacts/${data.contactId}`, method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(b), ...ghlHeaders() },
        };
        const req2 = https.request(options, (res2) => { let rb = ''; res2.on('data', c => rb += c); res2.on('end', () => resolve(rb)); });
        req2.on('error', reject); req2.write(b); req2.end();
      });
      console.log(`[GHL] Signal check completed for contact ${data.contactId}, score: ${data.score}`);
      res.writeHead(200, { ...corsHeaders, 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true }));
    } catch (err) {
      console.error(`[GHL] signal-check-complete error: ${err.message}`);
      res.writeHead(500, { ...corsHeaders, 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'GHL update failed' }));
    }
    return;
  }

  // Only accept POST to /api/contact
  if (req.method !== 'POST' || req.url !== '/api/contact') {
    res.writeHead(404, { ...corsHeaders, 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
    return;
  }

  // Parse body
  let body = '';
  for await (const chunk of req) body += chunk;
  let data;
  try {
    data = JSON.parse(body);
  } catch {
    res.writeHead(400, { ...corsHeaders, 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Invalid JSON' }));
    return;
  }

  // Validate required fields
  if (!data.firstName || !data.lastName || !data.email) {
    res.writeHead(400, { ...corsHeaders, 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Missing required fields: firstName, lastName, email' }));
    return;
  }

  console.log(`[${new Date().toISOString()}] New lead: ${data.firstName} ${data.lastName} <${data.email}>`);

  // Fire Slack notification first (non-blocking)
  const slackPromise = postJSON(SLACK_WEBHOOK_URL, formatSlackMessage(data));

  // GHL: upsert contact then create opportunity
  let contactId = null;
  let oppId = null;
  let ghlStatus = 'failed';
  try {
    contactId = await ghlUpsertContact(data);
    if (contactId) {
      oppId = await ghlCreateOpportunity(contactId, data);
      ghlStatus = 'created';
    }
  } catch (ghlErr) {
    console.error(`[GHL] Error: ${ghlErr.message}`);
  }

  // Wait for Slack
  let slackStatus = 'failed';
  try {
    await slackPromise;
    slackStatus = 'sent';
  } catch (slackErr) {
    console.error(`[Slack] Error: ${slackErr.message}`);
  }


  // Meta CAPI: fire server-side Lead event (non-blocking, parallel with response)
  let capiStatus = 'skipped';
  try {
    await sendCAPILead({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      ip: req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress,
      userAgent: req.headers['user-agent'],
      eventId: data.capiEventId || `bl-lead-${Date.now()}`,
    });
    capiStatus = 'sent';
  } catch (capiErr) {
    console.error(`[CAPI] Error: ${capiErr.message}`);
  }

  const response = {
    success: true,
    slack: slackStatus,
    ghl: ghlStatus,
    capi: capiStatus,
    ...(contactId && { contactId }),
    ...(oppId && { opportunityId: oppId }),
  };

  console.log(`[${new Date().toISOString()}] Result: Slack=${slackStatus}, GHL=${ghlStatus}, contact=${contactId}, opp=${oppId}`);

  res.writeHead(200, { ...corsHeaders, 'Content-Type': 'application/json' });
  res.end(JSON.stringify(response));
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[${new Date().toISOString()}] Beacon Labs form handler running on port ${PORT}`);
});
