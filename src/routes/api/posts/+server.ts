import { json } from '@sveltejs/kit';
import { fetchMarkdownPosts } from '$lib/util/blogReader';

export const GET = async () => {
	const allPosts = await fetchMarkdownPosts();
	return json(allPosts);
};
