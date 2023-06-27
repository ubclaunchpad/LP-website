import adapter from '@sveltejs/adapter-auto';
import { mdsvex } from 'mdsvex';
import sveltePreprocess from 'svelte-preprocess';
import containers from 'remark-containers';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeWrapAll from 'rehype-wrap-all';
import rehypeHighlightCodeBlock from '@mapbox/rehype-highlight-code-block';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	extensions: ['.svelte', '.md'],

	preprocess: [
		sveltePreprocess({
			scss: {
				// We can use a path relative to the root because
				// svelte-preprocess automatically adds it to `includePaths`
				// if none is defined.
			}
		}),
		mdsvex({
			extensions: ['.md'],
			rehypePlugins: [
				[rehypeSlug],
				[rehypeAutolinkHeadings, 'before'],
				[
					rehypeWrapAll,
					{
						wrapper: 'div.table-wrapper',
						selector: 'table'
					}
				],
				rehypeHighlightCodeBlock
			],
			remarkPlugins: [containers]
		})
	],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;
