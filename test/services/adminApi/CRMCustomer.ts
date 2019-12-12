import stringify from '@/utils/stringify';
import request from '@/utils/request';
import { ExtraFetchOptions } from '@/types';
import { PageCustomerModel, CustomerAddRequest, ProjectModel, ProjectBosRequest, CustomerModel } from './interfaces';



export interface GetCrmCustomersQuery {
	bosUserId?: number; // bosUserId
	customerType?: 'FORMAL' | 'EXPERIENCE'; // customerType
	keyword?: string; // keyword
	page: number; // page
	size: number; // size
}

export interface GetCrmCustomersPayload extends ExtraFetchOptions {
	query: GetCrmCustomersQuery;
}
    
/**
 * @summary bos查询业主列表
 */
export async function getCrmCustomers(payload: GetCrmCustomersPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<PageCustomerModel>(`/admin/crm/customers?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface PostCrmCustomersPayload extends ExtraFetchOptions {
	/**
	 * customerRequest
	 */
	body: CustomerAddRequest;
}
    
/**
 * @summary bos创建主账号
 */
export async function postCrmCustomers(payload: PostCrmCustomersPayload) {
	const { body, ...extraFetchOptions } = payload;
    return request<number>(`/admin/crm/customers`, {
		...extraFetchOptions,
        method: 'post',
		body,
    });
}


export interface GetCrmCustomersProjectsQuery {
	customerId: number; // customerId
}

export interface GetCrmCustomersProjectsPayload extends ExtraFetchOptions {
	query: GetCrmCustomersProjectsQuery;
}
    
/**
 * @summary bos业主查询项目列表
 */
export async function getCrmCustomersProjects(payload: GetCrmCustomersProjectsPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<ProjectModel[]>(`/admin/crm/customers/projects?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}


export interface PostCrmCustomersProjectsQuery {
	customerId: number; // customerId
}

export interface PostCrmCustomersProjectsPayload extends ExtraFetchOptions {
	query: PostCrmCustomersProjectsQuery;
	/**
	 * request
	 */
	body: ProjectBosRequest;
}
    
/**
 * @summary bos创建项目
 */
export async function postCrmCustomersProjects(payload: PostCrmCustomersProjectsPayload) {
	const { body, query, ...extraFetchOptions } = payload;
    return request<number>(`/admin/crm/customers/projects?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'post',
		body,
    });
}

export interface PutCrmCustomersProjectsIdPayload extends ExtraFetchOptions {
	id: number;
	/**
	 * request
	 */
	body: ProjectBosRequest;
}
    
/**
 * @summary bos修改项目
 */
export async function putCrmCustomersProjectsId(payload: PutCrmCustomersProjectsIdPayload) {
	const { id, body, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/crm/customers/projects/${id}`, {
		...extraFetchOptions,
        method: 'put',
		body,
    });
}


export interface PostCrmCustomersProjectsIdImportQuery {
	buildingName: string; // buildingName
	userTel: string; // userTel
}

export interface PostCrmCustomersProjectsIdImportPayload extends ExtraFetchOptions {
	id: number;
	query: PostCrmCustomersProjectsIdImportQuery;
	/**
	 * 
	 * export interface FormContent {
	 * 	resourceFile: File; // resourceFile
	 * }
	 * 
	 */
	body: FormData;
}
    
/**
 * @summary bos房源导入
 */
export async function postCrmCustomersProjectsIdImport(payload: PostCrmCustomersProjectsIdImportPayload) {
	const { id, query, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/crm/customers/projects/${id}/import?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'post',
    });
}

export interface GetCrmCustomersIdPayload extends ExtraFetchOptions {
	id: number;
}
    
/**
 * @summary bos业主详情
 */
export async function getCrmCustomersId(payload: GetCrmCustomersIdPayload) {
	const { id, ...extraFetchOptions } = payload;
    return request<CustomerModel>(`/admin/crm/customers/${id}`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface PutCrmCustomersIdPayload extends ExtraFetchOptions {
	id: number;
	/**
	 * customerRequest
	 */
	body: CustomerAddRequest;
}
    
/**
 * @summary bos编辑主账号
 */
export async function putCrmCustomersId(payload: PutCrmCustomersIdPayload) {
	const { id, body, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/crm/customers/${id}`, {
		...extraFetchOptions,
        method: 'put',
		body,
    });
}


