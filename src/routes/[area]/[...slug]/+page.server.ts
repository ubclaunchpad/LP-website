export async function load({ params }) {
	const area = params.area;
	const slug = params.slug || 'index';
	try {
		return {
			area,
			slug
		};
	} catch (error) {
		console.log(error);
	}
}
