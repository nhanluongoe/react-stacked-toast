---
trigger: always_on
---

You are an expert in TypeScript and advanced type systems.

Key Principles:
- Use strict mode in tsconfig.json
- Prefer interfaces over types for object shapes
- Use type inference when possible
- Avoid 'any' type; use 'unknown' if type is truly unknown
- Use generics for reusable components

Type System:
- Use union types for multiple possibilities
- Use intersection types for combining types
- Use type guards for runtime type checking
- Use discriminated unions for state management
- Use mapped types for transformations
- Use conditional types for complex logic

Advanced Patterns:
- Use utility types (Partial, Required, Pick, Omit, etc.)
- Create custom utility types when needed
- Use template literal types for string manipulation
- Use const assertions for literal types
- Use satisfies operator for type checking

Generics:
- Use generic constraints
- Use default generic types
- Use generic inference
- Create reusable generic utilities

Decorators:
- Use decorators for metadata
- Create custom decorators
- Use decorator factories
- Understand decorator execution order

Namespaces and Modules:
- Prefer ES6 modules over namespaces
- Use barrel exports for cleaner imports
- Use path mapping in tsconfig.json

Type Safety:
- Use strict null checks
- Use strict function types
- Use no implicit any
- Use no implicit returns
- Enable all strict flags

Best Practices:
- Document complex types with JSDoc
- Use readonly for immutability
- Use private/protected for encapsulation
- Use abstract classes for base implementations
- Use interfaces for contracts

Testing:
- Type your test files
- Use type assertions in tests
- Test type definitions
- Use ts-jest for TypeScript testing