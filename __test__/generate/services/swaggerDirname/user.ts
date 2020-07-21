import stringify from '@/utils/stringify';
import request from '@/utils/request';
import { ExtraFetchOptions } from '@/types';
import { User } from './interfaces';


export interface PostUserCreateWithArrayPayload extends ExtraFetchOptions {
	/**
	 * List of user object
	 */
	body: User[];
}
    
/**
 * @summary Creates list of users with given input array
 */
export async function postUserCreateWithArray(payload: PostUserCreateWithArrayPayload) {
	const { body, ...extraFetchOptions } = payload;
    return request<undefined>(`/v2/user/createWithArray`, {
		...extraFetchOptions,
        method: 'post',
		body,
    });
}

export interface PostUserCreateWithListPayload extends ExtraFetchOptions {
	/**
	 * List of user object
	 */
	body: User[];
}
    
/**
 * @summary Creates list of users with given input array
 */
export async function postUserCreateWithList(payload: PostUserCreateWithListPayload) {
	const { body, ...extraFetchOptions } = payload;
    return request<undefined>(`/v2/user/createWithList`, {
		...extraFetchOptions,
        method: 'post',
		body,
    });
}

export interface GetUserUsernamePayload extends ExtraFetchOptions {
	username: string;
}
    
/**
 * @summary Get user by user name
 */
export async function getUserUsername(payload: GetUserUsernamePayload) {
	const { username, ...extraFetchOptions } = payload;
    return request<User>(`/v2/user/${username}`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface PutUserUsernamePayload extends ExtraFetchOptions {
	username: string;
	/**
	 * Updated user object
	 */
	body: User;
}
    
/**
 * @summary Updated user
 * @description This can only be done by the logged in user.
 */
export async function putUserUsername(payload: PutUserUsernamePayload) {
	const { username, body, ...extraFetchOptions } = payload;
    return request<undefined>(`/v2/user/${username}`, {
		...extraFetchOptions,
        method: 'put',
		body,
    });
}

export interface DeleteUserUsernamePayload extends ExtraFetchOptions {
	username: string;
}
    
/**
 * @summary Delete user
 * @description This can only be done by the logged in user.
 */
export async function deleteUserUsername(payload: DeleteUserUsernamePayload) {
	const { username, ...extraFetchOptions } = payload;
    return request<undefined>(`/v2/user/${username}`, {
		...extraFetchOptions,
        method: 'delete',
    });
}


export interface GetUserLoginQuery {
	username: string; // The user name for login
	password: string; // The password for login in clear text
}

export interface GetUserLoginPayload extends ExtraFetchOptions {
	query: GetUserLoginQuery;
}
    
/**
 * @summary Logs user into the system
 */
export async function getUserLogin(payload: GetUserLoginPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<string>(`/v2/user/login?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface GetUserLogoutPayload extends ExtraFetchOptions {

}
    
/**
 * @summary Logs out current logged in user session
 */
export async function getUserLogout(payload: GetUserLogoutPayload) {
	const extraFetchOptions = payload;
    return request<undefined>(`/v2/user/logout`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface PostUserPayload extends ExtraFetchOptions {
	/**
	 * Created user object
	 */
	body: User;
}
    
/**
 * @summary Create user
 * @description This can only be done by the logged in user.
 */
export async function postUser(payload: PostUserPayload) {
	const { body, ...extraFetchOptions } = payload;
    return request<undefined>(`/v2/user`, {
		...extraFetchOptions,
        method: 'post',
		body,
    });
}


