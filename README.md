# Jivitesh's Portfolio - AI Engineer & Data Scientist

A modern, professional portfolio website showcasing AI/ML projects, case studies, and technical expertise.

---

## 🚀 Quick Start

**Read the complete guide:** [`GUIDE.md`](GUIDE.md)

### **In 15 Minutes:**

1. **Setup Gmail** - Add credentials to `.env`
2. **Install deps** - `pip install -r requirements.txt`
3. **Run app** - `python app.py`
4. **Test** - Open http://localhost:5000

---

## 📊 Status

**Progress:** 100% Complete ████████████████████

| Component | Status |
|-----------|--------|
| Projects Page | ✅ Complete |
| Case Studies | ✅ Complete |
| Insights/Blog | ✅ Complete |
| Flask Backend | ✅ Working |
| PWA Support | ✅ Complete |
| HTML Structure | ✅ Fixed |
| Production Ready | ✅ Ready |

---

## 📁 Project Structure

```
portfolio/
├── index.html          ✅ Complete
├── projects.html       ✅ Complete
├── case-studies.html   ✅ Complete
├── insights.html       ✅ Complete
├── app.py             ✅ Flask backend (production-ready)
├── script.js          ✅ JavaScript
├── styles.css         ✅ Styling
├── manifest.json      ✅ PWA manifest
├── sw.js              ✅ Service worker
├── _headers           ✅ Cloudflare security headers
├── _redirects         ✅ Cloudflare redirects
├── GUIDE.md           📖 Complete documentation
└── README.md          📄 This file
```

---

## ✨ Features

- ✅ **Modern Design** - Glassmorphism, gradients, animations
- ✅ **Responsive** - Works on all devices
- ✅ **Contact Form** - Email notifications via Flask
- ✅ **Projects** - Interactive showcase with filtering
- ✅ **Case Studies** - Detailed project analysis
- ✅ **Blog** - Insights and articles
- ✅ **PWA** - Offline capable
- ✅ **SEO Optimized** - Meta tags, semantic HTML
- ✅ **Accessible** - ARIA labels, keyboard navigation
- ✅ **Production Ready** - No debug code, optimized

---

## 🛠️ Tech Stack

**Frontend:** HTML5, CSS3, JavaScript, Tailwind CSS  
**Backend:** Python, Flask  
**Email:** SMTP (Gmail)  
**Fonts:** Inter, Space Grotesk  
**Deployment:** Cloudflare Pages

---

## 🚀 Deployment to Cloudflare Pages

### Option 1: Git Integration (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Cloudflare Pages:**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to Pages → Create a project
   - Connect your GitHub repository
   - Configure build settings:
     - **Build command:** (leave empty for static site)
     - **Build output directory:** `/`
     - **Root directory:** `/`

3. **Environment Variables:**
   - Add your Gmail credentials in Cloudflare Pages settings:
     - `GMAIL_USER`
     - `GMAIL_APP_PASSWORD`
     - `SECRET_KEY`
     - `FLASK_ENV=production`

4. **Deploy:**
   - Cloudflare will automatically deploy on every push

### Option 2: Direct Upload

1. **Install Wrangler CLI:**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare:**
   ```bash
   wrangler login
   ```

3. **Deploy:**
   ```bash
   wrangler pages publish . --project-name=jivitesh-portfolio
   ```

### Backend Deployment (Flask API)

For the Flask backend (`app.py`), you'll need to deploy it separately:

**Option A: Cloudflare Workers (Recommended)**
- Use Cloudflare Workers with Python support
- Deploy the Flask app as a Worker

**Option B: External Hosting**
- Deploy Flask to Heroku, Railway, or Render
- Update frontend API calls to point to the backend URL

---

## 📖 Documentation

**Everything you need is in:** [`GUIDE.md`](GUIDE.md)

Includes:
- ✅ Complete setup instructions
- ✅ Gmail configuration guide
- ✅ Troubleshooting tips
- ✅ Feature list
- ✅ Project structure

---

## 📧 Contact

- **Email:** jiviteshgd28@gmail.com
- **GitHub:** https://github.com/jivi001
- **LinkedIn:** https://linkedin.com/in/jivi001

---

## 📄 License

Personal portfolio project © 2025 Jivitesh

---

**Status:** 🟢 100% Complete - Production Ready!  
**Deployment:** Ready for Cloudflare Pages  
**Documentation:** [`GUIDE.md`](GUIDE.md) ← **Start here!**

