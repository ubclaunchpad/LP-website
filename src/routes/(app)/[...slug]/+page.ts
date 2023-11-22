import type { PageLoad } from '../../../../.svelte-kit/types/src/routes/(app)/[...slug]/$types';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	let slug = params.slug;
	if (slug.indexOf('.md') !== -1) {
		slug = slug.replace('.md', '');
	}

	const fileSlug = slug.split('/');
	let post;
	if (fileSlug.length === 1) {
		throw redirect(308, `/${fileSlug[0]}/overview.md`);
	} else {
		try {
			post = await import(`../../../docs/${fileSlug[0]}/${fileSlug[1]}.md`);
		} catch (e) {
			console.log(e);
			throw e;
		}
	}
	
	const content = post.default;
	return {
		content
	};
};
