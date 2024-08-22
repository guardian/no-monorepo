import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server/index'; // **type-only** import
import type { User } from '../@types/User';
import { a } from '../lib/a';

// dummy shared code
console.log({ a });

// Pass AppRouter as generic here. 👇 This lets the `trpc` object know what
// procedures are available on the server and their input/output types.
const trpc = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: 'http://localhost:3000',
		}),
	],
});

export const getUser = async () => {
	const user = await trpc.userById.query('1');

	if (user) {
		// @ts-expect-error -- the compiler knows 'missingProp' does not exist
		// on 'user'
		console.log(user.missingProp);
	}

	return user;
};

export const createUser = async (name: User['name']) => {
	const newUser = await trpc.userCreate.mutate({ name });

	// @ts-expect-error -- the compiler knows 'missingProp' does not exist
	// on 'createdUser'
	console.log(newUser.missingProp);

	return newUser;
};
