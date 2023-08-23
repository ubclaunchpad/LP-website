import type { LayoutServerLoad } from './$types';
export const load: LayoutServerLoad = async ({ fetch }) => {
	const response = await fetch(`/api/posts`);
	const posts = await response.json();
	return {
		posts
	};
};
