import fsPromises from 'fs/promises';
import path from 'path';

interface Directory {
	name: string;
	files: string[];
	directories: Directory[];
}

async function getPaths(): Promise<Directory> {
	const currentDirectory = path.join(process.cwd(), 'src/docs');
	try {
		const siblingEntries = await fsPromises.readdir(currentDirectory, { withFileTypes: true });

		const files = siblingEntries
			.filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
			.map((entry) => path.basename(entry.name, '.md'));

		const directories = siblingEntries
			.filter(
				(entry) =>
					entry.isDirectory() &&
					/^[A-Za-z]/.test(entry.name) &&
					entry.name !== '[...slug]' &&
					!entry.name.includes('...')
			)
			.map(async (entry) => ({
				name: entry.name,
				files: await getFilesInDirectory(path.join(currentDirectory, entry.name)),
				directories: await getPathsInDirectory(path.join(currentDirectory, entry.name))
			}));

		return {
			name: currentDirectory,
			files: files,
			directories: await Promise.all(directories)
		};
	} catch (error) {
		return {
			name: currentDirectory,
			files: [],
			directories: []
		};
	}
}

async function getFilesInDirectory(directoryPath: string): Promise<string[]> {
	try {
		const files = await fsPromises.readdir(directoryPath);
		return files
			.filter(
				(file) =>
					path.extname(file) === '.md' &&
					!file.toLowerCase().includes('index') &&
					!file.toLowerCase().includes('readme')
			)
			.map((file) => path.basename(file, '.md'));
	} catch (error) {
		return [];
	}
}

async function getPathsInDirectory(directoryPath: string): Promise<Directory[]> {
	try {
		const siblingEntries = await fsPromises.readdir(directoryPath, { withFileTypes: true });

		const directories = siblingEntries
			.filter(
				(entry) =>
					entry.isDirectory() &&
					/^[A-Za-z]/.test(entry.name) &&
					entry.name !== '[...slug]' &&
					!entry.name.includes('...')
			)
			.map(async (entry) => ({
				name: entry.name,
				files: await getFilesInDirectory(path.join(directoryPath, entry.name)),
				directories: await getPathsInDirectory(path.join(directoryPath, entry.name))
			}));

		return Promise.all(directories);
	} catch (error) {
		return [];
	}
}

export const load = async ({ params }) => {
	return await getPaths(params.slug);
};

export const prerender = true;
