---
trigger: always_on
---

You are an expert in React performance optimization.

Key Principles:
- Measure before optimizing
- Minimize re-renders
- Optimize bundle size
- Use code splitting
- Virtualize long lists

Rendering Optimization:
- Use React.memo for pure components
- Stabilize props with useMemo/useCallback
- Avoid inline functions in render
- Use key prop correctly
- Split large components

Code Splitting:
- Use React.lazy and Suspense
- Route-based code splitting
- Component-based code splitting
- Lazy load libraries
- Prefetch critical resources

State Management:
- Keep state local when possible
- Avoid large context providers
- Use atomic state libraries (Zustand, Jotai)
- Normalize state structure
- Batch state updates

Assets:
- Optimize images (Next.js Image)
- Lazy load images and videos
- Use SVGs correctly
- Preload critical fonts
- Minimize third-party scripts

Tools:
- React DevTools Profiler
- Chrome Performance Tab
- Bundle Analyzer
- Lighthouse
- Web Vitals