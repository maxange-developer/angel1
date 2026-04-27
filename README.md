# 🚀 Massimiliano Angelone - Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-Latest-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

> Modern, responsive portfolio website showcasing my journey as a Full Stack Developer, built with cutting-edge web technologies and optimized for performance.

**🌐 Live Site**: [massimilianoangelone.com](https://massimilianoangelone.com)

---

## ✨ Features

### 🎨 Design & UX

- **3D Interactive Background** - Immersive Three.js particle system with mouse interaction
- **Glassmorphism UI** - Modern glass effect components with backdrop blur
- **Neon Aesthetics** - Custom neon color palette with smooth transitions
- **Responsive Design** - Fully optimized for mobile, tablet, and desktop
- **Custom Breakpoints** - Advanced height and width-based responsive logic
- **Smooth Animations** - Framer Motion-like transitions and micro-interactions

### 🌍 Multi-language Support

- **3 Languages**: Italian (IT), English (EN), Spanish (ES)
- **Dynamic Translation** - Context-based language switching
- **SEO Optimized** - Hreflang tags and language-specific meta tags

### 📱 Pages & Sections

#### **Home**

- Hero section with dynamic typewriter effect
- Professional photo showcase
- Call-to-action buttons (Services, Story)
- Social media integration

#### **Timeline**

- Interactive professional journey
- Work experiences with company logos
- Travel experiences with photo galleries
- Horizontal carousel (desktop) / Vertical scroll (mobile)
- Custom 3-slide mode for tablet devices
- Modal lightbox for detailed views

#### **Blog**

- Featured article: "La Mia Storia" (My Story)
- Multi-chapter storytelling format
- Responsive image galleries
- Category and date metadata

#### **Services**

- Full Stack Development
- Mobile Development (iOS/Android)
- AI Chatbot Development
- Feature lists with icons
- Contact modal with close functionality

### ⚡ Performance Optimizations

- **Static Site Generation (SSG)** - Pre-rendered pages for instant loading
- **Image Optimization** - Next.js Image component with AVIF/WebP formats
- **Aggressive Preloading** - Timeline images prefetched for smooth transitions
- **Code Splitting** - Dynamic imports for Three.js and heavy components
- **Compression** - Gzip/Brotli enabled in production
- **Bundle Size**: 92-106kB First Load JS, 1.96-12kB per page

### 🔍 SEO & Analytics Ready

- **Comprehensive Meta Tags** - Title, description, keywords for each page
- **OpenGraph & Twitter Cards** - Optimized for social media sharing
- **JSON-LD Schema** - Person and Website structured data
- **Sitemap.xml** - Complete sitemap with hreflang alternates
- **Robots.txt** - Search engine crawling configuration
- **Geo-targeting** - Italy and Tenerife location tags
- **Mobile-friendly** - Google Mobile-First indexing compliant

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js 14.2](https://nextjs.org/) (React 18)
- **Language**: [TypeScript 5.0](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **3D Graphics**: [Three.js](https://threejs.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Build & Deploy

- **Package Manager**: npm
- **Hosting**: [Vercel](https://vercel.com) (Recommended)
- **Domain**: [Namecheap](https://www.namecheap.com)
- **CDN**: Vercel Edge Network

### Development Tools

- **ESLint**: Code quality and consistency
- **PostCSS**: CSS processing
- **Autoprefixer**: Cross-browser compatibility

---

## 📦 Installation & Setup

### Prerequisites

- **Node.js**: 18.x or higher
- **npm**: 9.x or higher

### Quick Start

```bash
# Clone the repository
git clone https://github.com/maxange-developer/angel1.git
cd angel1

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
# Development mode with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

---

## 🎯 Project Structure

```
angel1/
├── public/                   # Static assets
│   ├── images/              # Images (logo, photos, timeline)
│   ├── robots.txt           # Search engine crawling rules
│   └── sitemap.xml          # SEO sitemap
├── src/
│   ├── components/          # React components
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Layout.tsx
│   │   ├── SEO.tsx          # SEO meta tags component
│   │   ├── ThreeBackground.tsx
│   │   └── Typewriter.tsx
│   ├── contexts/            # React contexts
│   │   └── LanguageContext.tsx
│   ├── data/                # JSON data files
│   │   ├── blog-posts.json
│   │   ├── blog-translations.json
│   │   ├── la-mia-storia.json
│   │   ├── seo.json         # SEO metadata (IT/EN/ES)
│   │   ├── services.json
│   │   ├── timeline.json
│   │   ├── timeline-translations.json
│   │   └── translations.json
│   ├── hooks/               # Custom React hooks
│   │   └── useTranslation.ts
│   ├── pages/               # Next.js pages
│   │   ├── blog/
│   │   │   ├── [slug].tsx   # Dynamic blog article
│   │   │   └── index.tsx    # Blog listing
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   ├── index.tsx        # Home page
│   │   ├── services.tsx
│   │   └── timeline.tsx
│   └── styles/
│       └── globals.css      # Global styles + Tailwind
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind + custom breakpoints
├── tsconfig.json            # TypeScript configuration
└── package.json
```

---

## 🎨 Custom Tailwind Breakpoints

This project uses advanced responsive breakpoints for precise control:

```javascript
// Height-based
'max-h-820': '(max-height: 820px)',     // Home/blog scroll mode
'max-h-948': '(max-height: 948px)',     // Timeline vertical mode

// Width + Height combinations
'tablet-range': '(min-width: 1024px) and (max-width: 1280px)',
'tablet-compact': '(max-width: 1278px) and (max-height: 948px)',
'blog-vertical': '(max-width: 1024px) and (min-height: 948px) and (max-height: 1440px)',
'timeline-vertical': '((max-width: 1023px)) or ((min-width: 1024px) and (max-width: 1280px) and (max-height: 1440px))'
```

---

## 🌐 SEO Configuration

SEO metadata is managed in `src/data/seo.json` with support for 3 languages:

```json
{
  "it": {
    "home": {
      "title": "Massimiliano Angelone | Full Stack Developer | Italia & Tenerife",
      "description": "...",
      "keywords": "full stack developer, React, Next.js, ...",
      "og:title": "...",
      "og:description": "..."
    }
  }
}
```

Each page has dedicated SEO meta tags, OpenGraph images, and structured data.

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Custom Domain Setup

1. Add domain in Vercel Dashboard → Settings → Domains
2. Configure DNS records on your domain registrar:
   ```
   A     @    76.76.21.21
   CNAME www  cname.vercel-dns.com
   ```
3. Wait for SSL certificate (automatic, ~5-30 minutes)

For detailed instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 📊 Performance Metrics

### Lighthouse Scores (Target)

- ⚡ Performance: **90+**
- ♿ Accessibility: **95+**
- ✅ Best Practices: **95+**
- 🔍 SEO: **100**

### Bundle Analysis

```
Route                   Size       First Load JS
/                       1.96 kB    98.7 kB
/blog                   7.55 kB    104 kB
/blog/[slug]            2.21 kB    99 kB
/services               2.14 kB    98.9 kB
/timeline               9.51 kB    106 kB
```

---

## 🎯 Key Features Implementation

### Image Preloading Strategy

Timeline images are aggressively prefetched on page load:

```typescript
useEffect(() => {
  const timer = setTimeout(() => {
    events.forEach((event) => {
      event.images?.forEach((imageUrl) => {
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.as = "image";
        link.href = imageUrl;
        document.head.appendChild(link);
      });
    });
  }, 1000);
  return () => clearTimeout(timer);
}, [events]);
```

### Dynamic Language Switching

```typescript
const { currentLang, setCurrentLang } = useLanguage();
const { t } = useTranslation();

// Usage
<h1>{t("navbar.home")}</h1>;
```

### Responsive Timeline Logic

- **Desktop (>1280px)**: Horizontal carousel with 5 cards
- **Tablet (1024-1280px)**: 3-card carousel
- **Mobile (<1024px)**: Vertical scrollable timeline
- **Low height devices**: Automatic vertical mode

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Massimiliano Angelone**

- Portfolio: [massimilianoangelone.com](https://massimilianoangelone.com)
- LinkedIn: [massimiliano-angelone](https://www.linkedin.com/in/massimiliano-angelone)
- Instagram: [@massi_angelone](https://www.instagram.com/massi_angelone/)
- Email: [contact@massimilianoangelone.com](mailto:contact@massimilianoangelone.com)

---

## 🙏 Acknowledgments

- **Three.js** - For the amazing 3D graphics library
- **Next.js Team** - For the incredible React framework
- **Vercel** - For seamless deployment and hosting
- **Tailwind CSS** - For the utility-first CSS framework

---

## 📈 Future Enhancements

- [ ] Blog CMS integration (Contentful/Sanity)
- [ ] Dark/Light theme toggle
- [ ] Contact form with email integration
- [ ] Project showcase section
- [ ] Testimonials from clients
- [ ] Analytics dashboard (Google Analytics/Plausible)
- [ ] Newsletter subscription
- [ ] PWA support

---

<div align="center">

**⭐ If you like this project, give it a star! ⭐**

Made with ❤️ and ☕ by [Massimiliano Angelone](https://massimilianoangelone.com)

</div>
