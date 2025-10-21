# 🚀 Vercel Deployment Guide

This guide will help you deploy your portfolio with the contact form backend to Vercel.

## 📋 Prerequisites

- GitHub repository: [https://github.com/jivi001/portfolio](https://github.com/jivi001/portfolio)
- Vercel account connected to your GitHub
- Gmail account with App Password

## 🔧 Setup Steps

### 1. Configure Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your portfolio project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

```
EMAIL_ADDRESS = your-email@gmail.com
EMAIL_PASSWORD = your-16-character-app-password
RECIPIENT_EMAIL = your-email@gmail.com
```

### 2. Get Gmail App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**
3. Go to **App Passwords**
4. Generate password for "Mail" → "Other (Custom name)"
5. Use the 16-character password as `EMAIL_PASSWORD`

### 3. Deploy to Vercel

1. Push your changes to GitHub:
   ```bash
   git add .
   git commit -m "Add contact form backend for Vercel"
   git push origin main
   ```

2. Vercel will automatically deploy your changes

## 📁 Project Structure

```
portfolio/
├── api/
│   └── contact.py          # Serverless function for contact form
├── assets/                 # Images and files
├── index.html             # Main portfolio page
├── script.js              # Frontend JavaScript
├── styles.css             # Styling
├── vercel.json            # Vercel configuration
└── requirements.txt       # Python dependencies
```

## ✅ What's Included

- ✅ **Contact Form Backend** - Serverless function on Vercel
- ✅ **Gmail Integration** - Sends emails via SMTP
- ✅ **Form Validation** - Client and server-side validation
- ✅ **CORS Support** - Works with your frontend
- ✅ **Error Handling** - Comprehensive error management
- ✅ **Production Ready** - Optimized for Vercel deployment

## 🔗 API Endpoint

Your contact form will send data to:
```
https://jivitesh-portfolio.vercel.app/api/contact
```

## 🧪 Testing

1. Visit your live portfolio: [https://jivitesh-portfolio.vercel.app/](https://jivitesh-portfolio.vercel.app/)
2. Fill out the contact form
3. Check your Gmail inbox for the message

## 🛠️ Troubleshooting

**Contact form not working:**
- Check Vercel environment variables are set correctly
- Verify Gmail App Password is correct
- Check Vercel function logs in dashboard

**CORS errors:**
- The API includes proper CORS headers
- Make sure you're using the full Vercel URL

## 📧 How It Works

1. User fills contact form on your portfolio
2. JavaScript sends data to Vercel serverless function
3. Function validates data and sends email via Gmail SMTP
4. User gets success/error feedback

Your portfolio is now fully functional with a working contact form! 🎉
