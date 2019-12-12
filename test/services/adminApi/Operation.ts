import stringify from '@/utils/stringify';
import request from '@/utils/request';
import { ExtraFetchOptions } from '@/types';
import { LaunchImages, LaunchImagesParams, OfficeWeb, OfficeWebParams, AppVersion, CollectionResponseCityModel, OperationCityRequest, CityModel, DomainResponse, DomainRequest, CollectionResponseNewsModel, NewsModel, CollectionResponseProvinceModel } from './interfaces';


export interface GetLaunchImagesPayload extends ExtraFetchOptions {

}
    
/**
 * @summary 获取最新启动图
 */
export async function getLaunchImages(payload: GetLaunchImagesPayload) {
	const extraFetchOptions = payload;
    return request<LaunchImages[]>(`/admin/launch-images`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface PostLaunchImagesPayload extends ExtraFetchOptions {
	/**
	 * params
	 */
	body: LaunchImagesParams[];
}
    
/**
 * @summary 上传启动图
 */
export async function postLaunchImages(payload: PostLaunchImagesPayload) {
	const { body, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/launch-images`, {
		...extraFetchOptions,
        method: 'post',
		body,
    });
}

export interface DeleteLaunchImagesIdPayload extends ExtraFetchOptions {
	id: number;
}
    
/**
 * @summary deleteStartPicture
 */
export async function deleteLaunchImagesId(payload: DeleteLaunchImagesIdPayload) {
	const { id, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/launch-images/${id}`, {
		...extraFetchOptions,
        method: 'delete',
    });
}


export interface GetOfficeWebQuery {
	city?: string; // city
	type: 'OFFICE_WEB' | 'OFFICE_CASE'; // type
}

export interface GetOfficeWebPayload extends ExtraFetchOptions {
	query: GetOfficeWebQuery;
}
    
/**
 * @summary getOfficeWeb
 */
export async function getOfficeWeb(payload: GetOfficeWebPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<OfficeWeb[]>(`/admin/office-web?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface PostOfficeWebPayload extends ExtraFetchOptions {
	/**
	 * params
	 */
	body: OfficeWebParams[];
}
    
/**
 * @summary saveOfficeWeb
 */
export async function postOfficeWeb(payload: PostOfficeWebPayload) {
	const { body, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/office-web`, {
		...extraFetchOptions,
        method: 'post',
		body,
    });
}


export interface PutOfficeWebQuery {
	id: number; // id
}

export interface PutOfficeWebPayload extends ExtraFetchOptions {
	query: PutOfficeWebQuery;
	/**
	 * params
	 */
	body: OfficeWebParams;
}
    
/**
 * @summary updateOfficeWeb
 */
export async function putOfficeWeb(payload: PutOfficeWebPayload) {
	const { body, query, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/office-web?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'put',
		body,
    });
}

export interface DeleteOfficeWebIdPayload extends ExtraFetchOptions {
	id: number;
}
    
/**
 * @summary deleteOfficeWeb
 */
export async function deleteOfficeWebId(payload: DeleteOfficeWebIdPayload) {
	const { id, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/office-web/${id}`, {
		...extraFetchOptions,
        method: 'delete',
    });
}


export interface PutOperationAppLatestVersionQuery {
	appTypeEnum: 'ANDRIOD_AGENT' | 'IOS_AGENT' | 'ANDRIOD_CREAMS' | 'IOS_CREAMS'; // appTypeEnum
	needAlert: boolean; // needAlert
	updateInfo: string; // updateInfo
	version: string; // version
}

export interface PutOperationAppLatestVersionPayload extends ExtraFetchOptions {
	query: PutOperationAppLatestVersionQuery;
}
    
/**
 * @summary 设置app的最新版本号
 */
export async function putOperationAppLatestVersion(payload: PutOperationAppLatestVersionPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/operation/app/latestVersion?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'put',
    });
}

export interface GetOperationAppVersionsPayload extends ExtraFetchOptions {

}
    
/**
 * @summary 各个app的最新版本信息
 */
export async function getOperationAppVersions(payload: GetOperationAppVersionsPayload) {
	const extraFetchOptions = payload;
    return request<AppVersion[]>(`/admin/operation/appVersions`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface GetOperationCitiesPayload extends ExtraFetchOptions {

}
    
/**
 * @summary 启用城市列表
 */
export async function getOperationCities(payload: GetOperationCitiesPayload) {
	const extraFetchOptions = payload;
    return request<CollectionResponseCityModel>(`/admin/operation/cities`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface PostOperationCitiesPayload extends ExtraFetchOptions {
	/**
	 * request
	 */
	body: OperationCityRequest;
}
    
/**
 * @summary 启用城市
 */
export async function postOperationCities(payload: PostOperationCitiesPayload) {
	const { body, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/operation/cities`, {
		...extraFetchOptions,
        method: 'post',
		body,
    });
}

export interface GetOperationCitiesAreasPayload extends ExtraFetchOptions {

}
    
/**
 * @summary 获取城市和区域列表
 */
export async function getOperationCitiesAreas(payload: GetOperationCitiesAreasPayload) {
	const extraFetchOptions = payload;
    return request<CityModel[]>(`/admin/operation/cities-areas`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface GetOperationCitiesIdDefaultPayload extends ExtraFetchOptions {
	id: number;
}
    
/**
 * @summary 设置默认城市
 */
export async function getOperationCitiesIdDefault(payload: GetOperationCitiesIdDefaultPayload) {
	const { id, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/operation/cities/${id}/default`, {
		...extraFetchOptions,
        method: 'get',
    });
}


export interface GetOperationDomainQuery {
	customerId: number; // customerId
}

export interface GetOperationDomainPayload extends ExtraFetchOptions {
	query: GetOperationDomainQuery;
}
    
/**
 * @summary 查看子域名
 */
export async function getOperationDomain(payload: GetOperationDomainPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<DomainResponse>(`/admin/operation/domain?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface PostOperationDomainPayload extends ExtraFetchOptions {
	/**
	 * request
	 */
	body: DomainRequest;
}
    
/**
 * @summary 添加子域名
 */
export async function postOperationDomain(payload: PostOperationDomainPayload) {
	const { body, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/operation/domain`, {
		...extraFetchOptions,
        method: 'post',
		body,
    });
}


export interface GetOperationNewsQuery {
	pageIndex: number; // pageIndex
	pageSize: number; // pageSize
}

export interface GetOperationNewsPayload extends ExtraFetchOptions {
	query: GetOperationNewsQuery;
}
    
/**
 * @summary 新闻列表
 */
export async function getOperationNews(payload: GetOperationNewsPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<CollectionResponseNewsModel>(`/admin/operation/news?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface PostOperationNewsPayload extends ExtraFetchOptions {
	/**
	 * newsModel
	 */
	body: NewsModel;
}
    
/**
 * @summary 创建新闻
 */
export async function postOperationNews(payload: PostOperationNewsPayload) {
	const { body, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/operation/news`, {
		...extraFetchOptions,
        method: 'post',
		body,
    });
}

export interface PutOperationNewsPayload extends ExtraFetchOptions {
	/**
	 * newsModel
	 */
	body: NewsModel;
}
    
/**
 * @summary 更新新闻
 */
export async function putOperationNews(payload: PutOperationNewsPayload) {
	const { body, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/operation/news`, {
		...extraFetchOptions,
        method: 'put',
		body,
    });
}

export interface GetOperationNewsIdPayload extends ExtraFetchOptions {
	id: number;
}
    
/**
 * @summary 新闻详情
 */
export async function getOperationNewsId(payload: GetOperationNewsIdPayload) {
	const { id, ...extraFetchOptions } = payload;
    return request<NewsModel>(`/admin/operation/news/${id}`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface GetRegionsBlockPayload extends ExtraFetchOptions {

}
    
/**
 * @summary 查出启用城市对应的省市区商圈
 */
export async function getRegionsBlock(payload: GetRegionsBlockPayload) {
	const extraFetchOptions = payload;
    return request<CollectionResponseProvinceModel>(`/admin/regions/block`, {
		...extraFetchOptions,
        method: 'get',
    });
}


