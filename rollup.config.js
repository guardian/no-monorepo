// @ts-check

import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { dts } from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import { nodeExternals } from 'rollup-plugin-node-externals';

/** @type {import("rollup").RollupOptions["plugins"]}   */
const defaultPlugins = [
	nodeResolve({
		extensions: ['.js', '.cjs', '.mjs', '.jsx', '.ts', '.tsx', '.json'],
	}),
	commonjs(),
	esbuild(),
];

export default [
	{
		// creates the client JS, does not bundle deps
		input: { client: 'src/client/index.ts' },
		output: {
			dir: 'dist',
		},
		plugins: [...defaultPlugins, nodeExternals()],
	},
	{
		// creates the client d.ts, does not bundle deps
		input: { client: 'src/client/index.ts' },
		output: {
			dir: 'dist',
		},
		plugins: [...defaultPlugins, nodeExternals(), dts()],
	},
	{
		// creates the standalone server JS, including deps
		input: { server: 'src/server/index.ts' },
		output: {
			dir: 'dist',
		},
		plugins: [...defaultPlugins],
	},
];
