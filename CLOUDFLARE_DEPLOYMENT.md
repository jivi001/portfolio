# 🚀 Cloudflare Pages Deployment Guide

Quick reference guide for deploying your portfolio to Cloudflare Pages.

---

## Prerequisites

- ✅ GitHub account
- ✅ Cloudflare account (free tier works)
- ✅ Gmail credentials configured in `.env`

---

## Deployment Steps

### 1. Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Portfolio ready for Cloudflare deployment"

# Add remote repository
git remote add origin https://github.com/yourusername/portfolio.git

# Push to GitHub
git push -u origin main
```

### 2. Connect to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Click **Pages** in the sidebar
3. Click **Create a project**
4. Click **Connect to Git**
5. Select your GitHub repository
6. Click **Begin setup**

### 3. Configure Build Settings

**Framework preset:** None (Static HTML)

**Build settings:**
- Build command: *(leave empty)*
- Build output directory: `/`
- Root directory: `/`

### 4. Add Environment Variables

Click **Environment variables** and add:

```
GMAIL_USER = your_email@gmail.com
GMAIL_APP_PASSWORD = your_16_char_app_password
SECRET_KEY = your_secret_key_here
FLASK_ENV = production
```

### 5. Deploy

Click **Save and Deploy**

Cloudflare will:
- Build your site
- Deploy to global CDN
- Provide a `*.pages.dev` URL
- Auto-deploy on every git push

---

## Custom Domain (Optional)

1. Go to your project in Cloudflare Pages
2. Click **Custom domains**
3. Click **Set up a custom domain**
4. Enter your domain name
5. Follow DNS configuration instructions

---

## Backend Deployment

The Flask backend (`app.py`) needs separate deployment:

### Option A: Cloudflare Workers (Recommended)

Coming soon - Cloudflare Workers Python support

### Option B: Railway.app (Free Tier)

1. Go to [Railway.app](https://railway.app/)
2. Click **New Project** → **Deploy from GitHub**
3. Select your repository
4. Railway auto-detects Flask
5. Add environment variables
6. Deploy!

### Option C: Render.com (Free Tier)

1. Go to [Render.com](https://render.com/)
2. Click **New** → **Web Service**
3. Connect GitHub repository
4. Configure:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `python app.py`
5. Add environment variables
6. Deploy!

---

## Post-Deployment

### Update API Endpoint

If you deployed backend separately, update the API endpoint in `script.js`:

```javascript
// Change from localhost to your backend URL
const API_URL = 'https://your-backend.railway.app';
```

### Test Deployment

1. Visit your `*.pages.dev` URL
2. Test all pages (Home, Projects, Case Studies, Insights)
3. Test contact form
4. Check PWA installation
5. Verify mobile responsiveness

---

## Troubleshooting

### Issue: Contact form not working

**Solution:** Ensure backend is deployed and API_URL is updated in `script.js`

### Issue: Images not loading

**Solution:** Check that all image paths are relative (starting with `/`)

### Issue: Service worker errors

**Solution:** Clear browser cache and reload

---

## Monitoring

### Cloudflare Analytics

- Go to your project → Analytics
- View page views, bandwidth, and performance

### Backend Monitoring

- Railway/Render provide built-in logs and metrics
- Monitor API response times and errors

---

## Automatic Deployments

Every `git push` to main branch triggers:
1. Cloudflare Pages rebuild
2. Global CDN update
3. Automatic cache invalidation

**Deployment time:** ~30 seconds

---

## Support

- **Cloudflare Docs:** https://developers.cloudflare.com/pages/
- **Railway Docs:** https://docs.railway.app/
- **Render Docs:** https://render.com/docs/

---

**Status:** 🟢 Ready to deploy!
