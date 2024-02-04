import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch, url }) => {
	const response = await fetch(`/api/posts`);
	const posts = await response.json();
	return {
		posts,
		url: url.pathname
	};
};

export const prerender = true;
