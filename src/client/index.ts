import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server/index'; // **type-only** import
import { a } from '../lib/a';

// dummy shared code
console.log({ a });

// Pass AppRouter as generic here. 👇 This lets the `trpc` object know what
// procedures are available on the server and their input/output types.
const trpc = createTRPCClient<AppRouter>({
	links: [
		httpBatchLink({
			url: 'http://localhost:3000',
		}),
	],
});

export const getUser = async () => {
	// Inferred types
	const user = await trpc.userById.query('1');

	if (user) {
		// @ts-expect-error -- the compiler knows 'missingProp' does not exist
		// on 'user'
		console.log(user.missingProp);
	}

	return user;
};
