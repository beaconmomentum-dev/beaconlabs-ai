/**
 * PM2 Ecosystem Config — Beacon Labs (beaconmomentum.com)
 *
 * Reads environment variables from .env file on the server.
 * The .env file is NOT committed to git — it must exist at the deploy path.
 *
 * Usage:
 *   pm2 start ecosystem.config.cjs
 *   pm2 reload ecosystem.config.cjs --update-env
 */
const fs = require('fs');
const path = require('path');

// Parse .env file manually (no dotenv dependency required)
function loadEnv(envPath) {
  const env = {};
  try {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx === -1) return;
      const key = trimmed.slice(0, eqIdx).trim();
      const value = trimmed.slice(eqIdx + 1).trim();
      env[key] = value;
    });
  } catch (_) {
    // .env file not found — will fall back to process.env
  }
  return env;
}

const envFile = path.join(__dirname, '.env');
const envVars = loadEnv(envFile);

module.exports = {
  apps: [{
    name: 'beaconlabs',
    script: 'dist/index.js',
    cwd: '/var/www/beaconlabs-ai',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: envVars.PORT || '3000',
      // Stripe
      STRIPE_SECRET_KEY: envVars.STRIPE_SECRET_KEY || '',
      STRIPE_WEBHOOK_SECRET: envVars.STRIPE_WEBHOOK_SECRET || '',
      // Meta Pixel & CAPI
      META_PIXEL_ID: envVars.META_PIXEL_ID || '2728401540849226',
      META_CAPI_ACCESS_TOKEN: envVars.META_CAPI_ACCESS_TOKEN || '',
      // GoHighLevel
      GHL_API_KEY: envVars.GHL_API_KEY || '',
      GHL_LOCATION_ID: envVars.GHL_LOCATION_ID || 'Z4OoFmxrotxASibl2PKv',
      // SendGrid
      SENDGRID_API_KEY: envVars.SENDGRID_API_KEY || '',
    },
    error_file: '/root/.pm2/logs/beaconlabs-error.log',
    out_file: '/root/.pm2/logs/beaconlabs-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    max_memory_restart: '512M',
    restart_delay: 3000,
    watch: false,
  }]
};
