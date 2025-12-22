# Cloudflare Pages Deployment - Correct Settings

## The Issue
Cloudflare Pages detected Node.js and tried to run `npm install`, but this is a **static HTML site** with no `package.json` in the root.

## The Fix (2 minutes)

### Option 1: Configure Pages Settings (Recommended)

1. Go to **Cloudflare Dashboard** → **Pages** → **Your Project**
2. Click **Settings** → **Builds & deployments**
3. Set these **exact** values:

| Setting | Value |
|---------|-------|
| Framework preset | `None` |
| Build command | *(leave EMPTY)* |
| Build output directory | `/` |
| Root directory | `/` |

4. Click **Save**
5. Go to **Deployments** → **Retry deployment**

**Result:** Cloudflare serves static files directly, no build step.

---

### Option 2: Add Dummy package.json (Quick Fix)

If you can't access dashboard settings, add this file to root:

**`package.json`**
```json
{
  "name": "portfolio",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "echo 'Static site - no build needed'"
  }
}
```

Then set:
- Build command: `npm run build`
- Build output: `/`

---

## Worker Deployment (Separate)

The Worker is in `/worker` directory and deploys separately:

```bash
cd worker
npm run deploy
```

This gives you: `https://portfolio-api.*.workers.dev`

---

## Final Architecture

```
Cloudflare Pages (Frontend)
├── index.html
├── projects.html
├── styles.css
└── script.js
    ↓ calls API
Cloudflare Worker (Backend)
└── https://portfolio-api.*.workers.dev
```

---

## Next Steps

1. Fix Pages settings (Option 1 above)
2. Deploy Worker: `cd worker && npm run deploy`
3. Update `script.js` with Worker URL
4. Push to GitHub
5. Pages auto-redeploys ✅

---

**Status:** Ready to deploy correctly
