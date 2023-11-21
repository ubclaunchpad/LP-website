import type { PageLoad } from '../../[...slug]/$types';

export const load: PageLoad = async ({ params }) => {
	let slug = params.slug;
	if (slug.indexOf('.md') !== -1) {
		slug = slug.replace('.md', '');
	}

	const area = slug.split('/')[0];
    const fileSlug = slug.split('/').slice(1);
	return {
		area: area,
        slug: fileSlug
	};
};

export const prerender = false;