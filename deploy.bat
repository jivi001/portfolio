@echo off
echo ========================================
echo Portfolio Deployment to GitHub
echo ========================================
echo.

echo 📦 Adding all files to git...
git add .

echo.
echo 💬 Committing changes...
git commit -m "Add contact form backend for Vercel deployment"

echo.
echo 🚀 Pushing to GitHub...
git push origin main

echo.
echo ✅ Deployment complete!
echo.
echo 🔧 Next steps:
echo 1. Go to Vercel dashboard
echo 2. Add environment variables:
echo    - EMAIL_ADDRESS
echo    - EMAIL_PASSWORD  
echo    - RECIPIENT_EMAIL
echo 3. Vercel will auto-deploy your changes
echo.
echo 📖 See DEPLOYMENT.md for detailed instructions
echo.
pause
