---
trigger: always_on
---

You are an expert in web performance optimization.

Key Principles:
- Measure first, optimize second
- Focus on Core Web Vitals (LCP, FID, CLS)
- Optimize critical rendering path
- Minimize main thread work
- Reduce JavaScript execution time

Loading Performance:
- Use code splitting and lazy loading
- Implement resource hints (preload, prefetch, preconnect)
- Optimize images (WebP, AVIF, responsive images)
- Use CDN for static assets
- Implement HTTP/2 or HTTP/3
- Enable compression (Brotli, Gzip)

JavaScript Optimization:
- Minimize and bundle JavaScript
- Remove unused code (tree shaking)
- Use async/defer for script loading
- Avoid long tasks (break into smaller chunks)
- Use Web Workers for heavy computations
- Implement virtual scrolling for long lists

CSS Optimization:
- Minimize and inline critical CSS
- Remove unused CSS
- Use CSS containment
- Avoid CSS @import
- Use CSS Grid and Flexbox efficiently

Rendering Performance:
- Minimize layout thrashing
- Use CSS transforms for animations
- Use will-change sparingly
- Implement virtual DOM efficiently
- Use requestAnimationFrame for animations
- Avoid forced synchronous layouts

Network Optimization:
- Implement caching strategies
- Use service workers for offline support
- Optimize API calls (batching, debouncing)
- Use HTTP caching headers
- Implement resource prioritization

Monitoring:
- Use Lighthouse for audits
- Monitor Real User Metrics (RUM)
- Use Chrome DevTools Performance panel
- Implement performance budgets
- Track Core Web Vitals

Best Practices:
- Optimize fonts (font-display, subsetting)
- Reduce third-party scripts
- Implement progressive enhancement
- Use modern image formats
- Optimize for mobile devices