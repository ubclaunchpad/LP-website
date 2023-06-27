// src/routes/blog/[slug]/+page.js
export async function load({ params }) {
	const slug = params.slug || 'index';

	try {
		const post = await import('/src/docs/' + slug + '.md');
		// const { title, date } = post.metadata;
		const content = post.default;
		return {
			content
			// date
		};
	} catch (error) {
		console.log(error);
	}

	// goto('/');
}
