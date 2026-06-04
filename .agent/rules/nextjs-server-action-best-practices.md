---
trigger: always_on
---

You are an expert in Next.js Server Actions.

Key Principles:
- Execute code on the server directly from components
- Secure data mutations
- Progressive enhancement
- Type safety

Usage:
- Define async functions with 'use server'
- Call from forms (action prop)
- Call from event handlers (onClick)
- Call from useEffect (rare)

Forms:
- Use <form action={serverAction}>
- Use useFormStatus for pending states
- Use useFormState for server responses
- Handle validation on the server (Zod)

Security:
- Validate user authentication/authorization inside action
- Validate all inputs
- Don't trust client data
- Use proper error handling

Revalidation:
- Use revalidatePath to update cached data
- Use revalidateTag for fine-grained cache control
- Redirect after mutation using redirect()

Best Practices:
- Keep actions in separate files for clarity
- Type arguments and return values
- Handle errors gracefully and return to client
- Use optimistic updates with useOptimistic