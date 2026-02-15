# Jivitesh - Cybersecurity & AI Engineer Portfolio

A modern, production-ready portfolio website showcasing cybersecurity and AI/ML engineering projects, certifications, and expertise.

## 🚀 Live Demo

**Production URL:** [https://jivi001.vercel.app/](https://jivi001.vercel.app/)

## 🛠️ Tech Stack

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS 4
- **Routing:** Wouter
- **SEO:** React Helmet Async
- **PWA:** Vite PWA Plugin
- **Deployment:** Vercel

## 📦 Features

- ✅ **Cybersecurity-Focused Design** - Dark theme with cyan/blue gradients
- ✅ **Real Project Showcase** - 6 production projects from GitHub
- ✅ **Certifications Page** - NPTEL & Google certifications with filtering
- ✅ **Direct Email Contact** - Mailto integration for easy communication
- ✅ **SEO Optimized** - Meta tags, Open Graph, Twitter Cards
- ✅ **PWA Ready** - Offline support and installable
- ✅ **Performance Optimized** - Code splitting, lazy loading, caching
- ✅ **Responsive Design** - Mobile, tablet, and desktop friendly

## 🏗️ Project Structure

```
portfolio/
├── public/
│   ├── certificates/          # Certificate PDFs
│   └── legacy_static/assets/  # Logo and images
├── src/
│   ├── components/
│   │   ├── features/          # Feature components
│   │   ├── layout/            # Layout components (Navbar, Footer)
│   │   └── ui/                # Reusable UI components
│   ├── data/
│   │   ├── certifications.js  # Certification data
│   │   └── projects.js        # Project data
│   ├── pages/                 # Page components
│   ├── index.css              # Global styles
│   └── main.jsx               # App entry point
├── index.html                 # HTML template
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind configuration
└── vercel.json                # Vercel deployment config
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Configuration

### Environment Variables

No environment variables required for basic deployment.

### Deployment

**Vercel (Recommended):**

1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

**Manual Build:**

```bash
npm run build
# Deploy the `dist` folder to your hosting provider
```

## 🎨 Customization

### Update Personal Information

1. **Certifications:** Edit `src/data/certifications.js`
2. **Projects:** Edit `src/data/projects.js`
3. **Contact Info:** Update email in `src/pages/Contact.jsx`
4. **Social Links:** Update in `src/pages/Contact.jsx` and `src/components/layout/Footer.jsx`

### Update Branding

1. **Colors:** Modify `src/index.css` and `tailwind.config.js`
2. **Fonts:** Change in `index.html`, `src/index.css`, and `tailwind.config.js`
3. **Logo:** Replace `public/legacy_static/assets/logo.jpg`

## 📊 Performance

- **Lighthouse Score:** 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3s
- **Bundle Size:** Optimized with code splitting

## 🔒 Security

- Content Security Policy headers
- XSS Protection
- Frame Options configured
- HTTPS enforced on Vercel

## 📧 Contact

- **Email:** jiviteshgd28@gmail.com
- **LinkedIn:** [linkedin.com/in/jivi001](https://www.linkedin.com/in/jivi001/)
- **GitHub:** [github.com/jivi001](https://github.com/jivi001)

## 📄 License

This project is open source and available for personal use.

---

**Built with ❤️ by Jivitesh**
