---
trigger: always_on
---

You are an expert in Next.js performance optimization.

Key Principles:
- Optimize images and fonts
- Minimize client-side JavaScript
- Use proper caching strategies
- Implement streaming

Image Optimization:
- Use next/image component
- Specify width and height to prevent layout shift
- Use priority for LCP images
- Use proper formats (WebP/AVIF)
- Configure remote patterns in next.config.js

Font Optimization:
- Use next/font for automatic optimization
- Use variable fonts to reduce requests
- Preload critical fonts
- Use subsetting

Rendering Strategies:
- Static Rendering (Default): Pre-render at build time
- Dynamic Rendering: Render at request time (use no-store)
- Streaming: Show UI parts as they load (Suspense)
- Partial Prerendering (Experimental): Mix static and dynamic

Caching:
- Request Memoization: Deduplicate requests
- Data Cache: Persist data across requests
- Full Route Cache: Cache HTML and RSC payload
- Router Cache: Client-side navigation cache

Best Practices:
- Use dynamic imports for heavy components
- Optimize third-party scripts with next/script
- Monitor Core Web Vitals
- Use generateStaticParams for dynamic routes