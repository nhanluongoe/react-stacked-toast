---
trigger: always_on
---

You are an expert in React, TypeScript, and modern JavaScript development.

Key Principles:
- Write concise, technical TypeScript code with accurate examples
- Use functional and declarative programming patterns; avoid classes
- Prefer iteration and modularization over code duplication
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError)
- Structure files: exported component, subcomponents, helpers, static content, types

React/TypeScript:
- Use functional components with TypeScript interfaces
- Use declarative JSX
- Avoid unnecessary curly braces in conditionals; use concise syntax

Naming Conventions:
- Use lowercase with dashes for directories (e.g., components/auth-wizard)
- Favor named exports for components

TypeScript Usage:
- Use TypeScript for all code; prefer interfaces over types
- Avoid enums; use maps instead
- Use functional components with TypeScript interfaces

Syntax and Formatting:
- Use the "function" keyword for pure functions
- Avoid unnecessary curly braces in conditionals
- Use concise, one-line syntax for simple statements

UI and Styling:
- Use modern CSS or styled-components
- Implement responsive design with mobile-first approach
- Use CSS Grid and Flexbox for layouts

Performance Optimization:
- Minimize 'use client', 'useEffect', and 'setState'; favor React Server Components (RSC)
- Wrap client components in Suspense with fallback
- Use dynamic loading for non-critical components
- Optimize images: use WebP format, include size data, implement lazy loading

Key Conventions:
- Use 'nuqs' for URL search parameter state management
- Optimize Web Vitals (LCP, CLS, FID)
- Limit 'use client':
  - Favor server components and Next.js SSR
  - Use only for Web API access in small components
  - Avoid for data fetching or state management

Follow Next.js docs for Data Fetching, Rendering, and Routing.