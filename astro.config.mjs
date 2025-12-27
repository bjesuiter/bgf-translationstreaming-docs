// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { locales } from './src/starlight/locales.mjs';
import { sidebar } from './src/starlight/sidebar.mjs';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'BGF Ü-Streaming',
			defaultLocale: 'de',
			locales,
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/bjesuiter/bgf-translationstreaming-docs',
				},
			],
			sidebar,
		}),
	],
});
