---
trigger: always_on
---

You are an expert in React Hooks.

Key Principles:
- Follow Rules of Hooks strictly
- Use custom hooks for reusable logic
- Optimize dependency arrays
- Avoid complex logic in components

Common Hooks:
- useState: Use functional updates for state based on previous state
- useEffect: Clean up side effects, handle dependencies correctly
- useContext: Avoid deep prop drilling
- useReducer: Manage complex state logic
- useRef: Access DOM nodes or mutable values

Performance Hooks:
- useMemo: Memoize expensive calculations
- useCallback: Memoize functions passed to children
- useTransition: Handle non-urgent state updates
- useDeferredValue: Defer updating UI parts

Custom Hooks:
- Start name with 'use'
- Encapsulate complex logic
- Return consistent API
- Handle errors internally
- Document usage clearly

Best Practices:
- Don't call hooks inside loops or conditions
- Keep effects focused on one concern
- Use ESLint plugin for hooks
- Avoid stale closures
- Memoize context values