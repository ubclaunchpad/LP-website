export async function load() {
	try {
		const post = await import('./README' + '.md');
		const content = post.default;
		return {
			content
		};
	} catch (error) {
		return {};
	}
}
