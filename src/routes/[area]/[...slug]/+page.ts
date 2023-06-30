export async function load({ params }) {
	const area = params.area.toLocaleLowerCase();
	const slug = params.slug.toLocaleLowerCase();
	const BASE_PATH = '/src/docs/';
	try {
		const post = await import(BASE_PATH + area + `/${slug}.md`);
		const { title, date } = post.metadata || {};
		const content = post.default;
		return {
			content,
			date,
			title
		};
	} catch (error) {
		console.log(error);
	}
}
