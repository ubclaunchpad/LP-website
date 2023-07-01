import { PUBLIC_GITHUB_API_URI } from '$env/static/public';
const cachedPages: { [key: string]: string } = {};

export const GET = async ({ request, params, url }) => {
	const area = url.searchParams.get('area');
	const path = url.searchParams.get('path');

	if (!area || !path) {
		throw new Error('missing query params');
	}

	const cacheId = convertToCacheId(area, path);

	if (cachedPages[cacheId]) {
		return new Response(cachedPages[cacheId], {
			headers: {
				'Content-Type': 'text/html'
			}
		});
	}

	const res = await fetch(`${PUBLIC_GITHUB_API_URI}/${area}/contents/${path}.md`, {
		method: 'GET',
		headers: {
			Accept: 'application/vnd.github.VERSION.html',
			'User-Agent': 'LP-DOC-V2'
		}
	});

	const page = await res.text();
	cachedPages[cacheId] = page;

	return new Response(page, {
		headers: {
			'Content-Type': 'text/html'
		}
	});
};

const convertToCacheId = (area: string, path: string) => {
	return `${area}/${path}`;
};
