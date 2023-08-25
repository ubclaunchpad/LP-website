import { json } from '@sveltejs/kit';

export const GET = async () => {
	const allPosts = await fetchMarkdownPosts();
	return json(allPosts);
};

const fetchMarkdownPosts = async () => {
	const prefix = '/src/docs/';
	const allPostFiles = import.meta.glob('/src/docs/**/*.md', { eager: true });
	const files: any = {
		posts: {},
		directories: {}
	};

	for (let path in allPostFiles) {
		const file = allPostFiles[path];

		path = path.replace(prefix, '');
		if (path === 'index.md') continue;
		const slug = path.split('/').at(-1)?.replace('.md', '');
		const section = path.split('/').at(-2);

		if (file && typeof file === 'object' && slug) {
			const metadata = {}; // file.metadata as object;
			const post = { ...metadata, slug };
			if (section) {
				files.directories[section] = files.directories[section]
					? [...files.directories[section], post]
					: [post];
			} else {
				files.posts[slug] = post;
			}
		}
	}
	return files;
};
