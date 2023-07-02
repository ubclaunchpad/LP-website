import { PUBLIC_RESOURCE_URI } from '$env/static/public';
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

	console.log(`${PUBLIC_RESOURCE_URI}/${area}/${path}`);

	const res = await fetch(`${PUBLIC_RESOURCE_URI}/${area}/${path}`, {
		method: 'GET',
		headers: {
			Accept: 'text/html'
		}
	});

	console.log(res.status);
	if (res.status !== 200) {
		return new Response('Page not found', {
			status: 306,
			headers: {
				'Content-Type': 'text/html'
			}
		});
	}

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
