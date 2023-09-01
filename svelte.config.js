import adapter from '@sveltejs/adapter-cloudflare';
import { mdsvex } from 'mdsvex';
import sveltePreprocess from 'svelte-preprocess';
import containers from 'remark-containers';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeWrapAll from 'rehype-wrap-all';
import { vitePreprocess } from '@sveltejs/kit/vite';
import relativeImages from 'mdsvex-relative-images';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	extensions: ['.svelte', '.md'],

	preprocess: [
		vitePreprocess(),
		sveltePreprocess({
			scss: {
				// We can use a path relative to the root because
				// svelte-preprocess automatically adds it to `includePaths`
				// if none is defined.
			}
		}),
		mdsvex({
			highlight: false,
			extensions: ['.md'],
			layout: {
				_: './src/lib/components/posts/Layout.svelte'
			},
			rehypePlugins: [
				[rehypeSlug],
				[rehypeAutolinkHeadings, 'before'],

				[
					rehypeWrapAll,
					[
						{
							wrapper: 'div.table-wrapper',
							selector: 'table'
						},

						{
							wrapper: 'div.code-wrapper',
							selector: 'pre'
						}
					]
				]
			],
			remarkPlugins: [containers, relativeImages]
		})
	],

	kit: {
		prerender: {
			handleHttpError: 'ignore',
			handleMissingId: 'ignore'
		},
		adapter: adapter()
	}
};

export default config;
