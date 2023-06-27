// src/routes/blog/[slug]/+page.js
export async function load({ params }) {
	let slug = params.slug || 'index';

	if (slug.endsWith('index')) {
		slug = slug.replace('index', 'README');
	}

	console.log('slug', slug);

	try {
		console.log('sss', params);
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
// export const csr = false;
