# BCAQI - Global AI & Quantum Ecosystem Website

[![Lighthouse Score](https://img.shields.io/badge/Lighthouse-95+-green)](https://developers.google.com/web/tools/lighthouse)
[![Made with Love](https://img.shields.io/badge/Made%20with-%E2%9D%A4-red)](https://bcaqi.com)

> India's premier AI & Quantum community connecting 20,000+ innovators globally

## 🚀 Quick Start

### Deploy to GitHub Pages

1. **Fork/Clone this repository**
   ```bash
   git clone https://github.com/yourusername/bcaqi-website.git
   cd bcaqi-website
   ```

2. **Add your event photos**
   - Place 6 event photos in the root directory
   - Name them: `event1.jpg`, `event2.jpg`, ..., `event6.jpg`
   - Recommended size: 1200x900px (4:3 ratio)
   - Optimize images: Use [TinyPNG](https://tinypng.com) or [Squoosh](https://squoosh.app)

3. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit - BCAQI website"
   git push origin main
   ```

4. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to "Pages" section
   - Select source: `main` branch, `/ (root)` folder
   - Click Save
   - Your site will be live at: `https://yourusername.github.io/bcaqi-website`

5. **Custom Domain (Optional)**
   - Add CNAME file with your domain: `bcaqi.com`
   - Configure DNS settings:
     ```
     Type: A
     Name: @
     Value: 185.199.108.153

     Type: CNAME
     Name: www
     Value: yourusername.github.io
     ```

## 📁 File Structure

```
bcaqi-website/
├── index.html          # Main HTML file
├── style.css           # Styles (Google/Apple inspired)
├── script.js           # JavaScript (optimized)
├── manifest.json       # PWA configuration
├── sw.js              # Service Worker
├── sitemap.xml        # SEO sitemap
├── robots.txt         # Search engine instructions
├── logo.jpeg          # BCAQI logo
├── event1.jpg         # Event photo 1
├── event2.jpg         # Event photo 2
├── event3.jpg         # Event photo 3
├── event4.jpg         # Event photo 4
├── event5.jpg         # Event photo 5
├── event6.jpg         # Event photo 6
└── README.md          # This file
```

## ✨ Features

- ✅ **Lighthouse Score 95+** - Optimized performance
- ✅ **Mobile-First Design** - Perfect on all devices
- ✅ **PWA Support** - Install as app, offline support
- ✅ **SEO Optimized** - Meta tags, structured data, sitemap
- ✅ **Fast Loading** - < 1s First Contentful Paint
- ✅ **Smooth Animations** - AOS, custom transitions
- ✅ **Accessible** - ARIA labels, keyboard navigation
- ✅ **Analytics Ready** - Google Analytics integration
- ✅ **Modern Design** - Google Material + Apple minimalism

## 🎨 Customization

### Update Content

1. **Metrics** (Line 70-85 in index.html):
   ```html
   <div class="stat-number" data-target="20000">0</div>
   ```

2. **Event Date** (Line 95 in index.html):
   ```html
   <div class="event-title">7th February 2026 • Bengaluru</div>
   ```

3. **Colors** (style.css, line 10-20):
   ```css
   --primary: #0a0a0a;
   --accent: #2563eb;
   ```

### Add Analytics

Add before `</head>` in index.html:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔧 Optimization Tips

### Image Optimization
```bash
# Install ImageMagick (macOS)
brew install imagemagick

# Optimize all JPGs
mogrify -strip -quality 85 -resize 1200x900 *.jpg
```

### Test Performance
- [Google Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)

### Check SEO
- [Google Search Console](https://search.google.com/search-console)
- Submit sitemap: `https://bcaqi.com/sitemap.xml`

## 📱 Progressive Web App

Users can install BCAQI website as an app:
- **Desktop**: Look for install icon in address bar
- **Mobile**: "Add to Home Screen" option

## 🌐 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers

## 📊 Performance Metrics (Target)

- First Contentful Paint: < 1s
- Time to Interactive: < 3s
- Total Page Size: < 500KB
- Lighthouse Score: 95+

## 🤝 Contributing

We welcome contributions! Areas to improve:
- Add more animations
- Implement dark mode toggle
- Add event calendar integration
- Create blog section
- Add member directory

## 📞 Support

- **Email**: bcaqihub@gmail.com
- **WhatsApp**: [Join Community](https://chat.whatsapp.com/C9m3hwP7FFh1oPTKfgLr4R)
- **YouTube**: [@BCAQI](https://www.youtube.com/@BCAQI)

## 📄 License

© 2026 BCAQI. All rights reserved.

---

**Built with ❤️ in India 🇮🇳 for the World 🌍**
