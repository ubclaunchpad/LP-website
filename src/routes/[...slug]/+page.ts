import { goto } from '$app/navigation';

// src/routes/blog/[slug]/+page.js
export async function load({ params }) {
	const slug = params.slug;
	try {
		const post = await import('../' + slug + '.md');
		// const { title, date } = post.metadata;
		const content = post.default;
		return {
			content
			// date
		};
	} catch (error) {
		// console.log(error);
	}

	goto('/');
}
