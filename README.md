# No monorepo

A demo multi-build TypeScript project that's not a monorepo/workspace and does not use TS [project
references](https://www.typescriptlang.org/docs/handbook/project-references.html).

It contains a client and server, both of which depend on shared internal library code, and use [`tRPC`](https://trpc.io/) to share types.

It creates two bundles:

1. `dist/server.js` - a standalone Node server
2. `dist/client.js` - a client library with types that depends on `@trpc/client`

You could then deploy `dist/server.js` to a lambda, for example.  

The project is also publishable as an NPM package, which would provide `dist/client.js` for consumers to import:

```ts
import { createUser, getUser } from 'no-monorepo/client';

// this would not work
import type { AppRouter } from 'no-monorepo/server';
```
