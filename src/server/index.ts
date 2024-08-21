import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { z } from 'zod';
import { publicProcedure, router } from './trpc';
import { a } from '../lib/a';
import type { User } from '../@types/User';

// dummy shared code
console.log({ a });

// dummy data
const __users: User[] = [{ id: '1337', name: 'alex' }];

const appRouter = router({
	userList: publicProcedure.query(async () => {
		const users: User[] = await Promise.resolve(__users);
		return users;
	}),
	userById: publicProcedure.input(z.string()).query(async (opts) => {
		const { input } = opts;
		console.log({ input });

		const user = await Promise.resolve(__users[0]);
		return user;
	}),
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
	router: appRouter,
});

server.listen(3000);
