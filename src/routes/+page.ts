export async function load() {
	try {
		const res = await fetch(`/api/page?area=docs&path=README`, {
			method: 'GET'
		});
		const pageContent = await res.text();
		return {
			pageContent
		};
	} catch (error) {
		return {};
	}
}
