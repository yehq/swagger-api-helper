import stringify from '@/utils/stringify';
import request from '@/utils/request';
import { ExtraFetchOptions } from '@/types';
import { CreateCreamsAdminResponse, CreateCreamsAdminRequest, UserAccessTokenModel, CollectionResponsePreOrderModel, AdminPreOrderRequest, ExportResponse, PasswordModificationRequest } from './interfaces';


export interface PostUsersCreamsAdminPayload extends ExtraFetchOptions {
	/**
	 * usersRequest
	 */
	body: CreateCreamsAdminRequest;
}
    
/**
 * @summary 创建creams管理员
 */
export async function postUsersCreamsAdmin(payload: PostUsersCreamsAdminPayload) {
	const { body, ...extraFetchOptions } = payload;
    return request<CreateCreamsAdminResponse>(`/admin/users/creams-admin`, {
		...extraFetchOptions,
        method: 'post',
		body,
    });
}

export interface GetUsersCustomerLoginExcelPayload extends ExtraFetchOptions {

}
    
/**
 * @summary userLoginExcel
 */
export async function getUsersCustomerLoginExcel(payload: GetUsersCustomerLoginExcelPayload) {
	const extraFetchOptions = payload;
    return request<string>(`/admin/users/customer/login/excel`, {
		...extraFetchOptions,
        method: 'get',
    });
}


export interface PutUsersEmailModificationQuery {
	email: string; // email
	userId: number; // userId
}

export interface PutUsersEmailModificationPayload extends ExtraFetchOptions {
	query: PutUsersEmailModificationQuery;
}
    
/**
 * @summary 更改用户邮箱
 */
export async function putUsersEmailModification(payload: PutUsersEmailModificationPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/users/email/modification?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'put',
    });
}


export interface PostUsersOauth2LoginQuery {
	clientId: string; // clientId
	oauthCode: string; // oauthCode
	redirectUrl: string; // redirectUrl
}

export interface PostUsersOauth2LoginPayload extends ExtraFetchOptions {
	query: PostUsersOauth2LoginQuery;
}
    
/**
 * @summary 登录
 * @description 使用授权码获取token
 */
export async function postUsersOauth2Login(payload: PostUsersOauth2LoginPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<UserAccessTokenModel>(`/admin/users/oauth2/login?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'post',
    });
}


export interface PostUsersOauth2LoginRefreshTokenQuery {
	clientId: string; // clientId
	refreshToken: string; // refreshToken
}

export interface PostUsersOauth2LoginRefreshTokenPayload extends ExtraFetchOptions {
	query: PostUsersOauth2LoginRefreshTokenQuery;
}
    
/**
 * @summary refreshAccessToken
 */
export async function postUsersOauth2LoginRefreshToken(payload: PostUsersOauth2LoginRefreshTokenPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<UserAccessTokenModel>(`/admin/users/oauth2/login/refreshToken?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'post',
    });
}


export interface GetUsersPreOrderQuery {
	page?: number; // 页码，从0开始
	size?: number; // 每一页请求的数量; default: 10
	sort?: Array<string>; // 排序选项: property(,asc|desc). 默认升序/支持多字段排序
}

export interface GetUsersPreOrderPayload extends ExtraFetchOptions {
	query: GetUsersPreOrderQuery;
}
    
/**
 * @summary 申请试用用户列表
 */
export async function getUsersPreOrder(payload: GetUsersPreOrderPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<CollectionResponsePreOrderModel>(`/admin/users/pre-order?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface PostUsersPreOrderPayload extends ExtraFetchOptions {
	/**
	 * request
	 */
	body: AdminPreOrderRequest;
}
    
/**
 * @summary 创建注册客户
 */
export async function postUsersPreOrder(payload: PostUsersPreOrderPayload) {
	const { body, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/users/pre-order`, {
		...extraFetchOptions,
        method: 'post',
		body,
    });
}


export interface GetUsersPreOrderExportQuery {
	recordEndDate?: string; // 录入结束日期
	recordStartDate?: string; // 录入开始日期
}

export interface GetUsersPreOrderExportPayload extends ExtraFetchOptions {
	query: GetUsersPreOrderExportQuery;
}
    
/**
 * @summary 导出试用客户列表excel
 */
export async function getUsersPreOrderExport(payload: GetUsersPreOrderExportPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<ExportResponse>(`/admin/users/pre-order/export?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface PutUsersIdPreOrderPayload extends ExtraFetchOptions {
	id: number;
	/**
	 * usersRequest
	 */
	body: AdminPreOrderRequest;
}
    
/**
 * @summary 修改注册客户
 */
export async function putUsersIdPreOrder(payload: PutUsersIdPreOrderPayload) {
	const { id, body, ...extraFetchOptions } = payload;
    return request<string>(`/admin/users/${id}/pre-order`, {
		...extraFetchOptions,
        method: 'put',
		body,
    });
}

export interface PutUsersUserIdPasswordPayload extends ExtraFetchOptions {
	userId: number;
	/**
	 * passwordModificationApiRequest
	 */
	body: PasswordModificationRequest;
}
    
/**
 * @summary 使用原密码修改密码
 */
export async function putUsersUserIdPassword(payload: PutUsersUserIdPasswordPayload) {
	const { userId, body, ...extraFetchOptions } = payload;
    return request<string>(`/admin/users/${userId}/password`, {
		...extraFetchOptions,
        method: 'put',
		body,
    });
}


