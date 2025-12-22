# Cloudflare Worker API

Backend API for the portfolio, deployed as a Cloudflare Worker.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create KV namespace:**
   ```bash
   npx wrangler kv:namespace create MESSAGES
   ```
   Copy the ID and update `wrangler.toml`

3. **Set secrets:**
   ```bash
   # Resend API key (get from resend.com)
   npx wrangler secret put RESEND_API_KEY
   
   # Your notification email
   npx wrangler secret put NOTIFICATION_EMAIL
   ```

4. **Test locally:**
   ```bash
   npm run dev
   ```

5. **Deploy:**
   ```bash
   npm run deploy
   ```

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/contact` - Submit contact form
- `GET /api/projects` - Get projects list
- `GET /api/skills` - Get skills data
- `GET /api/messages` - Get all messages (from KV)

## Email Setup

This Worker uses [Resend](https://resend.com) for sending emails:

1. Sign up at resend.com (free tier: 3,000 emails/month)
2. Get your API key
3. Add it as a secret: `npx wrangler secret put RESEND_API_KEY`

## Environment Variables

Set via Wrangler secrets:
- `RESEND_API_KEY` - Resend API key
- `NOTIFICATION_EMAIL` - Your email for notifications

## Development

```bash
# Run locally
npm run dev

# Deploy to production
npm run deploy

# View logs
npm run tail
```

## Architecture

- **Runtime:** Cloudflare Workers (V8 isolates)
- **Storage:** Cloudflare KV (key-value store)
- **Email:** Resend API
- **Language:** TypeScript
