import stringify from '@/utils/stringify';
import request from '@/utils/request';
import { ExtraFetchOptions } from '@/types';
import { CollectionResponseDepartmentModel, DepartmentCreateRequest, DepartmentUpdateRequest, CollectionResponseBackstageUserModel, UserCreateRequest, BackstageUserDetailModel, CollectionResponseBackstageUserSummary, UserUpdateRequest, BackstageUserActiveRequest } from './interfaces';


export interface GetDepartmentsPayload extends ExtraFetchOptions {

}
    
/**
 * @summary 部门列表
 */
export async function getDepartments(payload: GetDepartmentsPayload) {
	const extraFetchOptions = payload;
    return request<CollectionResponseDepartmentModel>(`/admin/departments`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface PostDepartmentsPayload extends ExtraFetchOptions {
	/**
	 * request
	 */
	body: DepartmentCreateRequest;
}
    
/**
 * @summary 新建部门
 */
export async function postDepartments(payload: PostDepartmentsPayload) {
	const { body, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/departments`, {
		...extraFetchOptions,
        method: 'post',
		body,
    });
}

export interface GetDepartmentsLowerLevelPayload extends ExtraFetchOptions {

}
    
/**
 * @summary 获取下级部门，包括本部门
 */
export async function getDepartmentsLowerLevel(payload: GetDepartmentsLowerLevelPayload) {
	const extraFetchOptions = payload;
    return request<CollectionResponseDepartmentModel>(`/admin/departments/lower-level`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface PutDepartmentsIdPayload extends ExtraFetchOptions {
	id: number;
	/**
	 * request
	 */
	body: DepartmentUpdateRequest;
}
    
/**
 * @summary 更新部门名称
 */
export async function putDepartmentsId(payload: PutDepartmentsIdPayload) {
	const { id, body, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/departments/${id}`, {
		...extraFetchOptions,
        method: 'put',
		body,
    });
}

export interface DeleteDepartmentsIdPayload extends ExtraFetchOptions {
	id: number;
}
    
/**
 * @summary 删除部门
 */
export async function deleteDepartmentsId(payload: DeleteDepartmentsIdPayload) {
	const { id, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/departments/${id}`, {
		...extraFetchOptions,
        method: 'delete',
    });
}

export interface GetDepartmentsIdMemberPayload extends ExtraFetchOptions {
	id: number;
}
    
/**
 * @summary 通过部门id获取部门下所有用户
 */
export async function getDepartmentsIdMember(payload: GetDepartmentsIdMemberPayload) {
	const { id, ...extraFetchOptions } = payload;
    return request<CollectionResponseBackstageUserModel>(`/admin/departments/${id}/member`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface PostUsersPayload extends ExtraFetchOptions {
	/**
	 * request
	 */
	body: UserCreateRequest;
}
    
/**
 * @summary 添加成员
 */
export async function postUsers(payload: PostUsersPayload) {
	const { body, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/users`, {
		...extraFetchOptions,
        method: 'post',
		body,
    });
}


export interface PutUsersBindOpenidQuery {
	invitationCode: string; // invitationCode
}

export interface PutUsersBindOpenidPayload extends ExtraFetchOptions {
	query: PutUsersBindOpenidQuery;
}
    
/**
 * @summary 开通绑定后台管理账号
 */
export async function putUsersBindOpenid(payload: PutUsersBindOpenidPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<BackstageUserDetailModel>(`/admin/users/bind-openid?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'put',
    });
}

export interface GetUsersFollowsPayload extends ExtraFetchOptions {

}
    
/**
 * @summary 用户可管理部门中的所有人员,包括自己(跟进人列表,协助管理者列表)
 */
export async function getUsersFollows(payload: GetUsersFollowsPayload) {
	const extraFetchOptions = payload;
    return request<CollectionResponseBackstageUserSummary>(`/admin/users/follows`, {
		...extraFetchOptions,
        method: 'get',
    });
}


export interface GetUsersInfoQuery {
	invitationCode?: string; // invitationCode
}

export interface GetUsersInfoPayload extends ExtraFetchOptions {
	query: GetUsersInfoQuery;
}
    
/**
 * @summary 用户详情
 */
export async function getUsersInfo(payload: GetUsersInfoPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<BackstageUserDetailModel>(`/admin/users/info?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface GetUsersIdPayload extends ExtraFetchOptions {
	id: number;
}
    
/**
 * @summary 用户详情
 */
export async function getUsersId(payload: GetUsersIdPayload) {
	const { id, ...extraFetchOptions } = payload;
    return request<BackstageUserDetailModel>(`/admin/users/${id}`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface PutUsersIdPayload extends ExtraFetchOptions {
	id: number;
	/**
	 * request
	 */
	body: UserUpdateRequest;
}
    
/**
 * @summary 更新成员
 */
export async function putUsersId(payload: PutUsersIdPayload) {
	const { id, body, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/users/${id}`, {
		...extraFetchOptions,
        method: 'put',
		body,
    });
}

export interface DeleteUsersIdPayload extends ExtraFetchOptions {
	id: number;
}
    
/**
 * @summary 删除用户
 */
export async function deleteUsersId(payload: DeleteUsersIdPayload) {
	const { id, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/users/${id}`, {
		...extraFetchOptions,
        method: 'delete',
    });
}

export interface PutUsersIdActivePayload extends ExtraFetchOptions {
	id: number;
	/**
	 * request
	 */
	body: BackstageUserActiveRequest;
}
    
/**
 * @summary 启用/禁用 用户
 */
export async function putUsersIdActive(payload: PutUsersIdActivePayload) {
	const { id, body, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/users/${id}/active`, {
		...extraFetchOptions,
        method: 'put',
		body,
    });
}


