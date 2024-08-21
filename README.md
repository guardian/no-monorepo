# No monorepo

A demo multi-build TypeScript project that's not a monorepo/workspace and does not use TS [project
references](https://www.typescriptlang.org/docs/handbook/project-references.html).

It contains a client and server, both of which depend on shared internal library code, and use [`tRPC`](https://trpc.io/) to share types.

It creates two bundles:

1. `dist/server.js` - a standalone Node server
2. `dist/client.js` - a client library with types that depends on `@trpc/client`

The entire project is publishable as an NPM package, with only the client library available to import:

```ts
import { getUser } from 'no-monorepo/client';

// this would not work
import type { AppRouter } from 'no-monorepo/server';
```
