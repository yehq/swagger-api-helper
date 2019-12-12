import stringify from '@/utils/stringify';
import request from '@/utils/request';
import { ExtraFetchOptions } from '@/types';
import { AreaModel, FilterResponse } from './interfaces';


export interface GetAreasCitiesIdPayload extends ExtraFetchOptions {
	id: number;
}
    
/**
 * @summary 通过城市获取区域
 */
export async function getAreasCitiesId(payload: GetAreasCitiesIdPayload) {
	const { id, ...extraFetchOptions } = payload;
    return request<AreaModel[]>(`/admin/areas/cities/${id}`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface PostAreasCitiesIdPayload extends ExtraFetchOptions {
	id: number;
}
    
/**
 * @summary 通过城市获取区域(POST)
 */
export async function postAreasCitiesId(payload: PostAreasCitiesIdPayload) {
	const { id, ...extraFetchOptions } = payload;
    return request<AreaModel[]>(`/admin/areas/cities/${id}`, {
		...extraFetchOptions,
        method: 'post',
    });
}

export interface GetBuildingsCountAllPayload extends ExtraFetchOptions {

}
    
/**
 * @summary 获取总楼盘数，在发布需求之后展示用
 */
export async function getBuildingsCountAll(payload: GetBuildingsCountAllPayload) {
	const extraFetchOptions = payload;
    return request<object>(`/admin/buildings/count/all`, {
		...extraFetchOptions,
        method: 'get',
    });
}


export interface GetFilterQuery {
	cityId: number; // cityId
}

export interface GetFilterPayload extends ExtraFetchOptions {
	query: GetFilterQuery;
}
    
/**
 * @summary 获取筛选条件
 */
export async function getFilter(payload: GetFilterPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<FilterResponse>(`/admin/filter?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}


