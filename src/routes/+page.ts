export async function load() {
	try {
		const res = await fetch(`/api/page?area=docs&path=README`, {
			method: 'GET'
		});

		if (res.status !== 200) {
			throw new Error('Failed to fetch page');
		}

		const pageContent = await res.text();
		return {
			pageContent
		};
	} catch (error) {
		return {};
	}
}
