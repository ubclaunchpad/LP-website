import type { IDirectory } from './api/areas/+server';

export const load = async (event) => {
	let directories: IDirectory[] = [];
	try {
		const res = await event.fetch(`/api/areas`, {
			method: 'GET'
		});
		directories = (await res.json()) as IDirectory[];
		return {
			directories
		};
	} catch (error) {
		return {
			directories
		};
	}
};
