import type { PageLoad } from '../../../../.svelte-kit/types/src/routes/(app)/[...slug]/$types';
import { error } from '@sveltejs/kit'

export const load: PageLoad = async ({ params }) => {
	let slug = params.slug;
	if (slug.indexOf('.md') !== -1) {
		slug = slug.replace('.md', '');
	}

	try {
		const fileSlug = slug.split('/');

		let post;
		if (fileSlug.length === 1) {
			post = await import(`../../../docs/${fileSlug[0]}.md`);
		} else {
			post = await import(`../../../docs/${fileSlug[0]}/${fileSlug[1]}.md`);
		}
		const content = post.default;
		return {
			content
		};
	} catch (e) {
		console.log(e);
		throw error(404, `Could not find ${params.slug}`)
	}
};
