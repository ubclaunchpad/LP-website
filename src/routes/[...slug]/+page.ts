import type { PageLoad } from '../../../.svelte-kit/types/src/routes/[...slug]/$types';

const path = '../../docs';
export const load: PageLoad = async ({ params }) => {
	let slug = params.slug;
	if (slug.indexOf('.md') !== -1) {
		slug = slug.replace('.md', '');
	}
	try {
		const post = await import(path + '/' + slug + '.md');
		// const { title, date } = post.metadata;
		const content = post.default;
		return {
			content
		};
	} catch (error) {
		console.log(error);
	}
};
