import { json } from '@sveltejs/kit';

const areas: IDirectory[] = [
	{
		name: 'internal',
		files: [],
		directories: []
	}
];

export interface IDirectory {
	name: string;
	files: string[];
	directories: IDirectory[];
}

export const GET = async ({ request, params, url }) => {
	return json(areas);
};
