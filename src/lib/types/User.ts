import { PUBLIC_USERS_API_URI } from '$env/static/public';
import { fetcher } from '$lib/util/fetcher';
import { STRATEGY_EMAIL } from '$lib/util/links';
import { getDate } from '$lib/util/user';
import { token } from '../../stores/auth';
export interface IUser {
	id: number;
	firstName: string;
	lastName: string;
	prefName: string;
	resumeLink?: string;
	email: string;
	faculty: Dict<string>;
	standing: Dict<string>;
	specialization: Dict<string>;
	roles: Dict<string>[];
	username: string;
	createdAt: string;
	updatedAt: string;
	memberSince: string | undefined;
}

export interface IUserRequest {
	firstName: string;
	lastName: string;
	prefName: string;
	resumeLink?: string;
	email: string;
	facultyId: number;
	standingId: number;
	specializationId: number;
	roleId?: number[];
	username?: string;
}

export type IUserPatchRequest = Partial<IUserRequest>;

export function UserRequestMapper(user: IUser): IUserPatchRequest {
	const partialUser = {
		firstName: user.firstName,
		lastName: user.lastName,
		prefName: user.prefName,
		resumeLink: user.resumeLink,
		email: user.email,
		facultyId: user.faculty.id,
		standingId: user.standing.id,
		specializationId: user.specialization.id,
		roleId: user.roles.map((role) => role.id),
		username: user.username
	};

	return removeUndefinedKeys(partialUser);
}

export async function getUserInfo(id: number) {
	let userToken;
	token.subscribe((token) => {
		userToken = token;
	});

	if (!userToken) {
		console.log('no token');
		return;
	}

	const response = await fetcher({
		URI: `${PUBLIC_USERS_API_URI}/users/${id}`,
		requestInit: {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userToken}`
			}
		},
		notifyError: {
			title: 'Oops!',
			message: `Could not retrieve profile. if error persists, please contact us at ${STRATEGY_EMAIL}`,
			type: 'warning'
		}
	});

	return response;
}

function removeUndefinedKeys<T extends { [s: string]: unknown }>(obj: T): Partial<T> {
	return Object.entries(obj).reduce((acc, [key, value]) => {
		if (value !== undefined) {
			acc[key as keyof T] = value as T[keyof T];
		}
		return acc;
	}, {} as Partial<T>);
}

export interface Dict<T> {
	id: number;
	name: T;
}

export type IFaculty = Dict<string>[];
export type ISpecialization = Dict<string>[];
export type IStanding = Dict<string>[];
export type IRole = Dict<string>[];

export const userFieldMapper = <K extends keyof IUser>(key: K, value: IUser[K]): string => {
	switch (key) {
		case 'createdAt':
		case 'updatedAt':
			return value ? getDate(value as string) : '';
		case 'memberSince':
			return value ? getDate(value as string) : 'N/A';
		case 'faculty':
		case 'standing':
		case 'specialization':
			return (value as { name: string }).name;
		case 'roles':
			return (value as IRole).map((role: { name: string }) => role.name).join(', ');
		default:
			return value as string;
	}
};
