export async function load({ params }) {
	const area = params.area;
	const slug = params.slug || 'README';
	try {
		return {
			area,
			slug
		};
	} catch (error) {
		console.log(error);
	}
}
