import type { PageLoad } from '../../../.svelte-kit/types/src/routes/(app)/$types';

const path = '/src/docs';
export const load: PageLoad = async () => {
	try {
		console.log('s');
		const name = 'index';
		const post = await import(`../../docs/${name}.md`);
		console.log(post);
		// const { title, date } = post.metadata;
		const content = post.default;
		return {
			content
		};
	} catch (e) {
		console.log(e);
	}
};

export const prerender = true;
