import stringify from '@/utils/stringify';
import request from '@/utils/request';
import { ExtraFetchOptions } from '@/types';
import { ParkBuildingListModel, CollectionResponseParkListModel, ParkRequest } from './../interfaces';



export interface GetCustomersIdPromotionBuildingsQuery {
	creamsBuildingIds?: Array<number>; // creamsBuildingIds
}

export interface GetCustomersIdPromotionBuildingsPayload extends ExtraFetchOptions {
	id: number;
	query: GetCustomersIdPromotionBuildingsQuery;
}
    
/**
 * @summary 可绑定楼宇查询
 */
export async function getCustomersIdPromotionBuildings(payload: GetCustomersIdPromotionBuildingsPayload) {
	const { id, query, ...extraFetchOptions } = payload;
    return request<ParkBuildingListModel[]>(`/admin/customers/${id}/promotion/buildings?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}


export interface GetParksQuery {
	areaIds?: Array<number>; // areaIds
	cityId?: number; // cityId
	keyword?: string; // keyword
	page?: number; // page; default: 1
	provinceId?: number; // provinceId
	size?: number; // size; default: 20
}

export interface GetParksPayload extends ExtraFetchOptions {
	query: GetParksQuery;
}
    
/**
 * @summary 楼盘字典表
 */
export async function getParks(payload: GetParksPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<CollectionResponseParkListModel>(`/admin/parks?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface PostParksPayload extends ExtraFetchOptions {
	/**
	 * parkRequest
	 */
	body: ParkRequest;
}
    
/**
 * @summary 楼盘新增
 */
export async function postParks(payload: PostParksPayload) {
	const { body, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/parks`, {
		...extraFetchOptions,
        method: 'post',
		body,
    });
}

export interface GetParksIdPayload extends ExtraFetchOptions {
	id: number;
}
    
/**
 * @summary 楼盘详情
 */
export async function getParksId(payload: GetParksIdPayload) {
	const { id, ...extraFetchOptions } = payload;
    return request<ParkRequest>(`/admin/parks/${id}`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface PutParksIdPayload extends ExtraFetchOptions {
	id: number;
	/**
	 * parkRequest
	 */
	body: ParkRequest;
}
    
/**
 * @summary 楼盘修改
 */
export async function putParksId(payload: PutParksIdPayload) {
	const { id, body, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/parks/${id}`, {
		...extraFetchOptions,
        method: 'put',
		body,
    });
}


export interface PutParksIdStatusQuery {
	status: boolean; // status
}

export interface PutParksIdStatusPayload extends ExtraFetchOptions {
	id: number;
	query: PutParksIdStatusQuery;
}
    
/**
 * @summary 更改楼盘状态
 */
export async function putParksIdStatus(payload: PutParksIdStatusPayload) {
	const { id, query, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/parks/${id}/status?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'put',
    });
}


