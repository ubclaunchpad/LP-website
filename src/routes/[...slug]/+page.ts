import type { PageLoad } from '../../../.svelte-kit/types/src/routes/[...slug]/$types';

const path = '../../docs';
export const load: PageLoad = async ({ params }) => {
	const slug = params.slug;
	console.log(slug);
	try {
		const post = await import(path + '/' + slug + '.md');
		// const { title, date } = post.metadata;
		const content = post.default;
		return {
			content
			// date
		};
	} catch (error) {
		console.log(error);
	}
};
