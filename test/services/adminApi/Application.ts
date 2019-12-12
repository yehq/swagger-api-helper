import stringify from '@/utils/stringify';
import request from '@/utils/request';
import { ExtraFetchOptions } from '@/types';
import { PageApplicationDTO, ApplicationAddRequest, ApplicationUpdateRequest, ApplicationDTO, PageBannerDTO, BannerAddRequest, BannerUpdateRequest, BannerDTO, SortBannerApiRequest } from './interfaces';



export interface GetApplicationsQuery {
	page?: number; // 页码，从0开始
	size?: number; // 每一页请求的数量; default: 10
	sort?: Array<string>; // 排序选项: property(,asc|desc). 默认升序/支持多字段排序
}

export interface GetApplicationsPayload extends ExtraFetchOptions {
	query: GetApplicationsQuery;
}
    
/**
 * @summary 应用列表
 */
export async function getApplications(payload: GetApplicationsPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<PageApplicationDTO>(`/admin/applications?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface PostApplicationsPayload extends ExtraFetchOptions {
	/**
	 * applicationRequest
	 */
	body: ApplicationAddRequest;
}
    
/**
 * @summary 新增应用
 */
export async function postApplications(payload: PostApplicationsPayload) {
	const { body, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/applications`, {
		...extraFetchOptions,
        method: 'post',
		body,
    });
}


export interface PutApplicationsQuery {
	id: number; // id
}

export interface PutApplicationsPayload extends ExtraFetchOptions {
	query: PutApplicationsQuery;
	/**
	 * applicationUpdateRequest
	 */
	body: ApplicationUpdateRequest;
}
    
/**
 * @summary 修改应用
 */
export async function putApplications(payload: PutApplicationsPayload) {
	const { body, query, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/applications?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'put',
		body,
    });
}


export interface DeleteApplicationsQuery {
	ids: Array<number>; // ids
}

export interface DeleteApplicationsPayload extends ExtraFetchOptions {
	query: DeleteApplicationsQuery;
}
    
/**
 * @summary 删除应用
 */
export async function deleteApplications(payload: DeleteApplicationsPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/applications?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'delete',
    });
}


export interface GetApplicationsDetailQuery {
	id: number; // id
}

export interface GetApplicationsDetailPayload extends ExtraFetchOptions {
	query: GetApplicationsDetailQuery;
}
    
/**
 * @summary 应用详情
 */
export async function getApplicationsDetail(payload: GetApplicationsDetailPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<ApplicationDTO>(`/admin/applications/detail?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}


export interface GetBannersQuery {
	page?: number; // 页码，从0开始
	size?: number; // 每一页请求的数量; default: 10
	sort?: Array<string>; // 排序选项: property(,asc|desc). 默认升序/支持多字段排序
}

export interface GetBannersPayload extends ExtraFetchOptions {
	query: GetBannersQuery;
}
    
/**
 * @summary banners列表
 */
export async function getBanners(payload: GetBannersPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<PageBannerDTO>(`/admin/banners?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface PostBannersPayload extends ExtraFetchOptions {
	/**
	 * bannerAddRequest
	 */
	body: BannerAddRequest;
}
    
/**
 * @summary 新增banner
 */
export async function postBanners(payload: PostBannersPayload) {
	const { body, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/banners`, {
		...extraFetchOptions,
        method: 'post',
		body,
    });
}


export interface PutBannersQuery {
	id: number; // id
}

export interface PutBannersPayload extends ExtraFetchOptions {
	query: PutBannersQuery;
	/**
	 * bannerUpdateRequest
	 */
	body: BannerUpdateRequest;
}
    
/**
 * @summary 修改banner
 */
export async function putBanners(payload: PutBannersPayload) {
	const { body, query, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/banners?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'put',
		body,
    });
}


export interface DeleteBannersQuery {
	ids: Array<number>; // ids
}

export interface DeleteBannersPayload extends ExtraFetchOptions {
	query: DeleteBannersQuery;
}
    
/**
 * @summary 删除banner
 */
export async function deleteBanners(payload: DeleteBannersPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/banners?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'delete',
    });
}


export interface GetBannersDetailQuery {
	id: number; // id
}

export interface GetBannersDetailPayload extends ExtraFetchOptions {
	query: GetBannersDetailQuery;
}
    
/**
 * @summary banner详情
 */
export async function getBannersDetail(payload: GetBannersDetailPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<BannerDTO>(`/admin/banners/detail?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface PutBannersQueuePayload extends ExtraFetchOptions {
	/**
	 * sortBannerRequest
	 */
	body: SortBannerApiRequest;
}
    
/**
 * @summary 修改banner排序，全穿
 */
export async function putBannersQueue(payload: PutBannersQueuePayload) {
	const { body, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/banners/queue`, {
		...extraFetchOptions,
        method: 'put',
		body,
    });
}


