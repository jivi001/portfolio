# Quick Deployment Commands

## 1. Set Resend API Key

```bash
cd worker
npx wrangler secret put RESEND_API_KEY
```

When prompted, paste: `re_8fh7QMdw_Jssiq4fpqUY7LAPruxawt6wV`

## 2. Set Notification Email

```bash
npx wrangler secret put NOTIFICATION_EMAIL
```

When prompted, enter: `jiviteshgd28@gmail.com`

## 3. Create KV Namespace

```bash
npx wrangler kv:namespace create MESSAGES
```

Copy the ID from output and update `wrangler.toml`:
```toml
[[kv_namespaces]]
binding = "MESSAGES"
id = "PASTE_ID_HERE"  # Replace with actual ID
```

## 4. Deploy Worker

```bash
npm run deploy
```

Copy the Worker URL from output (e.g., `https://portfolio-api.abc123.workers.dev`)

## 5. Update Frontend

Edit `script.js` line 8:
```javascript
: 'https://portfolio-api.YOUR-SUBDOMAIN.workers.dev', // Paste your Worker URL here
```

## 6. Commit and Push

```bash
cd ..
git add .
git commit -m "Add Worker deployment"
git push
```

## 7. Deploy to Cloudflare Pages

1. Go to https://dash.cloudflare.com/
2. Pages → Create project → Connect Git
3. Select repository
4. Build settings: Leave empty, output `/`
5. Deploy!

---

**Your Resend API Key:** `re_8fh7QMdw_Jssiq4fpqUY7LAPruxawt6wV`

**Your Email:** `jiviteshgd28@gmail.com`
