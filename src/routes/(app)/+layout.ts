import type { LayoutLoad } from '../../../.svelte-kit/types/src/routes/(app)/$types';

export const load: LayoutLoad = async ({ fetch }) => {
	const response = await fetch(`/api/posts`);
	const posts = await response.json();
	return {
		posts
	};
};

export const prerender = true;
