# 🚀 Complete Cloudflare Deployment Guide

Step-by-step guide to deploy your portfolio to Cloudflare Pages + Workers.

---

## Prerequisites

✅ Cloudflare account (free tier)  
✅ GitHub account  
✅ Node.js installed (v18+)  
✅ Resend account (free tier - 3,000 emails/month)

---

## Part 1: Deploy Cloudflare Worker (Backend API)

### Step 1: Install Dependencies

```bash
cd worker
npm install
```

### Step 2: Create KV Namespace

```bash
# Create KV namespace for storing messages
npx wrangler kv:namespace create MESSAGES

# Copy the output ID and update wrangler.toml
# Example output: id = "abc123def456"
```

Update `worker/wrangler.toml`:
```toml
[[kv_namespaces]]
binding = "MESSAGES"
id = "YOUR_KV_ID_HERE"  # Paste the ID from above
```

### Step 3: Get Resend API Key

1. Go to [resend.com](https://resend.com)
2. Sign up (free tier: 3,000 emails/month)
3. Go to API Keys → Create API Key
4. Copy the key

### Step 4: Set Worker Secrets

```bash
cd worker

# Set Resend API key
npx wrangler secret put RESEND_API_KEY
# Paste your Resend API key when prompted

# Set notification email
npx wrangler secret put NOTIFICATION_EMAIL
# Enter: jiviteshgd28@gmail.com
```

### Step 5: Test Locally

```bash
# Run Worker locally
npm run dev

# Test in another terminal
curl http://localhost:8787/api/health
```

### Step 6: Deploy Worker

```bash
npm run deploy
```

**Output:** Your Worker URL will be displayed:
```
https://portfolio-api.YOUR-SUBDOMAIN.workers.dev
```

**COPY THIS URL** - you'll need it for the frontend!

---

## Part 2: Update Frontend

### Step 1: Update API URL in script.js

Open `script.js` and update line 8:

```javascript
API_BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:8787'
    : 'https://portfolio-api.YOUR-SUBDOMAIN.workers.dev', // ← UPDATE THIS
```

Replace `YOUR-SUBDOMAIN` with your actual Worker subdomain.

### Step 2: Commit Changes

```bash
git add .
git commit -m "Update API URL for Worker deployment"
git push
```

---

## Part 3: Deploy to Cloudflare Pages (Frontend)

### Step 1: Connect GitHub to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Click **Pages** in sidebar
3. Click **Create a project**
4. Click **Connect to Git**
5. Select your GitHub repository: `portfolio`
6. Click **Begin setup**

### Step 2: Configure Build Settings

**Framework preset:** None

**Build configuration:**
- Build command: *(leave empty)*
- Build output directory: `/`
- Root directory: `/`

### Step 3: Deploy

Click **Save and Deploy**

Cloudflare will:
- Deploy your site to global CDN
- Provide a URL: `https://YOUR-PROJECT.pages.dev`
- Auto-deploy on every git push

---

## Part 4: Test Everything

### Test Worker API

```bash
# Health check
curl https://portfolio-api.YOUR-SUBDOMAIN.workers.dev/api/health

# Projects
curl https://portfolio-api.YOUR-SUBDOMAIN.workers.dev/api/projects

# Skills
curl https://portfolio-api.YOUR-SUBDOMAIN.workers.dev/api/skills
```

### Test Frontend

1. Visit `https://YOUR-PROJECT.pages.dev`
2. Navigate to all pages
3. Test contact form:
   - Fill out form
   - Submit
   - Check your email for notification
   - Check sender's email for confirmation

---

## Part 5: Custom Domain (Optional)

### Add Custom Domain to Pages

1. Go to your Pages project
2. Click **Custom domains**
3. Click **Set up a custom domain**
4. Enter your domain (e.g., `jivitesh.com`)
5. Follow DNS configuration instructions

### Add Custom Domain to Worker

1. Go to Workers & Pages
2. Click your Worker
3. Click **Triggers** → **Custom Domains**
4. Add subdomain (e.g., `api.jivitesh.com`)

### Update script.js

```javascript
API_BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:8787'
    : 'https://api.jivitesh.com', // Your custom domain
```

---

## Troubleshooting

### Worker Issues

**Problem:** Worker deployment fails

**Solution:**
```bash
# Check wrangler version
npx wrangler --version

# Update wrangler
npm install -g wrangler@latest

# Try deploying again
npm run deploy
```

---

**Problem:** Email not sending

**Solution:**
1. Check Resend API key is set: `npx wrangler secret list`
2. Verify Resend account is active
3. Check Worker logs: `npm run tail`

---

**Problem:** CORS errors

**Solution:**
- Verify Worker URL in `script.js` is correct
- Check Worker logs for errors
- Ensure CORS headers are in Worker code (they are!)

---

### Pages Issues

**Problem:** Contact form not working

**Solution:**
1. Verify Worker URL in `script.js` is correct
2. Test Worker directly with curl
3. Check browser console for errors
4. Verify Worker is deployed and running

---

**Problem:** Images not loading

**Solution:**
- Ensure all image paths are relative (`/logo.jpg`)
- Check that images are committed to git
- Clear browser cache

---

## Monitoring & Logs

### Worker Logs

```bash
cd worker
npm run tail
```

This shows real-time logs from your Worker.

### Cloudflare Analytics

1. Go to Pages project → Analytics
2. View:
   - Page views
   - Bandwidth
   - Requests
   - Performance metrics

### Resend Dashboard

1. Go to [resend.com/emails](https://resend.com/emails)
2. View sent emails
3. Check delivery status
4. Monitor usage

---

## Cost Breakdown

| Service | Free Tier | Your Usage | Cost |
|---------|-----------|------------|------|
| Cloudflare Pages | 500 builds/month | ~10/month | $0 |
| Cloudflare Workers | 100k requests/day | ~500/day | $0 |
| Cloudflare KV | 100k reads/day | ~50/day | $0 |
| Resend | 3,000 emails/month | ~20/month | $0 |
| **Total** | | | **$0** |

---

## Automatic Deployments

Every `git push` to main triggers:
1. Cloudflare Pages rebuild (~30 seconds)
2. Global CDN cache update
3. Automatic deployment

Worker updates:
```bash
cd worker
npm run deploy
```

---

## Next Steps

### Enhance Email Templates

Edit `worker/src/index.ts`:
- Update email HTML templates
- Add your branding
- Customize messages

### Add More API Endpoints

Add new endpoints in `worker/src/index.ts`:
```typescript
if (path === '/api/new-endpoint' && request.method === 'GET') {
  // Your logic here
}
```

### Monitor Performance

- Check Cloudflare Analytics weekly
- Monitor email delivery rates
- Review Worker logs for errors

---

## Support

- **Cloudflare Docs:** https://developers.cloudflare.com/
- **Wrangler Docs:** https://developers.cloudflare.com/workers/wrangler/
- **Resend Docs:** https://resend.com/docs

---

**Status:** 🟢 Ready to deploy!

**Estimated deployment time:** 15-20 minutes
