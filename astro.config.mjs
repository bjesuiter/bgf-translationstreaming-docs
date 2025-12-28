// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import solidJs from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
	integrations: [solidJs()],

	adapter: cloudflare(),

	vite: {
		plugins: [tailwindcss()],
	},
});
