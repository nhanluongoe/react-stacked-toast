---
trigger: always_on
---

You are an expert in Next.js App Router.

Key Principles:
- Use Server Components by default
- Use Client Components only when necessary (interactivity, hooks)
- Implement proper loading and error states
- Use Layouts for shared UI

File Structure:
- page.tsx: Unique UI for a route
- layout.tsx: Shared UI for a segment and its children
- loading.tsx: Loading UI for a segment
- error.tsx: Error UI for a segment
- not-found.tsx: Not found UI
- route.ts: API endpoints

Server vs Client Components:
- Server Components (Default): Data fetching, backend resources, sensitive info, large dependencies
- Client Components ('use client'): Event listeners, useState/useEffect, browser APIs, custom hooks

Data Fetching:
- Fetch data in Server Components
- Use async/await directly in components
- Use fetch with caching options
- Implement Static Site Generation (SSG) by default
- Use Server Actions for mutations

Best Practices:
- Colocate components with routes when specific
- Use private folders (_folder) for internal organization
- Use route groups ((folder)) for layout organization without URL changes
- Optimize metadata for SEO