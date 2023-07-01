import { PUBLIC_USERS_API_URI } from '$env/static/public';

export const getDate = (timestamp: string) => {
	const dateObj = new Date(timestamp);
	const month = dateObj.getUTCMonth() + 1; //months from 1-12
	const day = dateObj.getUTCDate();
	const year = dateObj.getUTCFullYear();

	return year + '/' + month + '/' + day;
};

export const COLUMN_MAPPER = {
	firstName: 'First Name',
	lastName: 'Last Name',
	prefName: 'Preferred Name',
	email: 'Email',
	faculty: 'Faculty',
	specialization: 'Specialization',
	standing: 'Standing',
	roles: 'Roles',
	createdAt: 'Created At',
	updatedAt: 'Updated At',
	memberSince: 'Member since',
	username: 'Username',
	id: 'Id'
};

export const getFaculties = async (): Promise<{ id: number; name: string }[]> => {
	const response = await fetch(`${PUBLIC_USERS_API_URI}/faculties`, {
		method: 'GET'
	});

	return await response.json();
};

export const getSpecializations = async (): Promise<{ id: number; name: string }[]> => {
	const response = await fetch(`${PUBLIC_USERS_API_URI}/specializations`, {
		method: 'GET'
	});

	return await response.json();
};

export const getRoles = async () => {
	const response = await fetch(`${PUBLIC_USERS_API_URI}/roles`, {
		method: 'GET'
	});

	return await response.json();
};

export const getStandings = async (): Promise<{ id: number; name: string }[]> => {
	const response = await fetch(`${PUBLIC_USERS_API_URI}/standings`, {
		method: 'GET'
	});

	return await response.json();
};
