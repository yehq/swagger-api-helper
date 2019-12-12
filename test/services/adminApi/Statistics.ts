import stringify from '@/utils/stringify';
import request from '@/utils/request';
import { ExtraFetchOptions } from '@/types';
import { CollectionResponsePureAdminStatisticsModel, ExportResponse, CollectionResponseDataAnalyzeModel } from './interfaces';



export interface GetBuildingAssetsStatisticsQuery {
	cityId?: number; // cityId
	endDate?: string; // endDate
	startDate?: string; // startDate
	type?: 'BUILDING_COUNT' | 'ROOM_AREA_SIZE'; // type
}

export interface GetBuildingAssetsStatisticsPayload extends ExtraFetchOptions {
	query: GetBuildingAssetsStatisticsQuery;
}
    
/**
 * @summary 楼宇资产属性饼图
 */
export async function getBuildingAssetsStatistics(payload: GetBuildingAssetsStatisticsPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<CollectionResponsePureAdminStatisticsModel>(`/admin/building-assets/statistics?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}


export interface GetBuildingAssetsStatisticsExportQuery {
	cityId?: number; // cityId
	endDate: string; // endDate
	startDate: string; // startDate
	type?: 'BUILDING_COUNT' | 'ROOM_AREA_SIZE'; // type
}

export interface GetBuildingAssetsStatisticsExportPayload extends ExtraFetchOptions {
	query: GetBuildingAssetsStatisticsExportQuery;
}
    
/**
 * @summary 楼宇资产属性饼图导出
 */
export async function getBuildingAssetsStatisticsExport(payload: GetBuildingAssetsStatisticsExportPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<ExportResponse>(`/admin/building-assets/statistics/export?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}


export interface GetBuildingTypeStatisticsQuery {
	cityId?: number; // cityId
	endDate?: string; // endDate
	startDate?: string; // startDate
	type?: 'BUILDING_COUNT' | 'ROOM_AREA_SIZE'; // type
}

export interface GetBuildingTypeStatisticsPayload extends ExtraFetchOptions {
	query: GetBuildingTypeStatisticsQuery;
}
    
/**
 * @summary 楼宇类型饼图
 */
export async function getBuildingTypeStatistics(payload: GetBuildingTypeStatisticsPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<CollectionResponsePureAdminStatisticsModel>(`/admin/building-type/statistics?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}


export interface GetBuildingTypeStatisticsExportQuery {
	cityId?: number; // cityId
	endDate: string; // endDate
	startDate: string; // startDate
	type?: 'BUILDING_COUNT' | 'ROOM_AREA_SIZE'; // type
}

export interface GetBuildingTypeStatisticsExportPayload extends ExtraFetchOptions {
	query: GetBuildingTypeStatisticsExportQuery;
}
    
/**
 * @summary 楼宇类型饼图导出
 */
export async function getBuildingTypeStatisticsExport(payload: GetBuildingTypeStatisticsExportPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<ExportResponse>(`/admin/building-type/statistics/export?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}


export interface GetBuildingsIncreaseQuery {
	cityId?: number; // cityId
	date: string; // date
	size?: number; // size; default: 10
	type?: 'DAY' | 'WEEK' | 'MONTH'; // type
}

export interface GetBuildingsIncreasePayload extends ExtraFetchOptions {
	query: GetBuildingsIncreaseQuery;
}
    
/**
 * @summary 楼宇增长情况
 */
export async function getBuildingsIncrease(payload: GetBuildingsIncreasePayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<CollectionResponseDataAnalyzeModel>(`/admin/buildings/increase?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}


export interface GetCityStatisticsQuery {
	endDate?: string; // endDate
	startDate?: string; // startDate
	type?: 'CUSTOMER_COUNT' | 'ROOM_AREA_SIZE'; // type
}

export interface GetCityStatisticsPayload extends ExtraFetchOptions {
	query: GetCityStatisticsQuery;
}
    
/**
 * @summary 城市统计饼图
 */
export async function getCityStatistics(payload: GetCityStatisticsPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<CollectionResponsePureAdminStatisticsModel>(`/admin/city/statistics?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}


export interface GetCityStatisticsExportQuery {
	endDate: string; // endDate
	startDate: string; // startDate
	type?: 'CUSTOMER_COUNT' | 'ROOM_AREA_SIZE'; // type
}

export interface GetCityStatisticsExportPayload extends ExtraFetchOptions {
	query: GetCityStatisticsExportQuery;
}
    
/**
 * @summary 城市统计饼图导出
 */
export async function getCityStatisticsExport(payload: GetCityStatisticsExportPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<ExportResponse>(`/admin/city/statistics/export?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}


export interface GetClickBillExportQuery {
	endDate: string; // endDate
	startDate: string; // startDate
}

export interface GetClickBillExportPayload extends ExtraFetchOptions {
	query: GetClickBillExportQuery;
}
    
/**
 * @summary 账单点击统计
 */
export async function getClickBillExport(payload: GetClickBillExportPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<ExportResponse>(`/admin/click/bill/export?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}


export interface GetClickBuildingExportQuery {
	endDate: string; // endDate
	startDate: string; // startDate
}

export interface GetClickBuildingExportPayload extends ExtraFetchOptions {
	query: GetClickBuildingExportQuery;
}
    
/**
 * @summary 楼宇点击统计
 */
export async function getClickBuildingExport(payload: GetClickBuildingExportPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<ExportResponse>(`/admin/click/building/export?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}


export interface GetClickContractExportQuery {
	endDate: string; // endDate
	startDate: string; // startDate
}

export interface GetClickContractExportPayload extends ExtraFetchOptions {
	query: GetClickContractExportQuery;
}
    
/**
 * @summary 合同点击统计
 */
export async function getClickContractExport(payload: GetClickContractExportPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<ExportResponse>(`/admin/click/contract/export?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}


export interface GetClickDemandExportQuery {
	endDate: string; // endDate
	startDate: string; // startDate
}

export interface GetClickDemandExportPayload extends ExtraFetchOptions {
	query: GetClickDemandExportQuery;
}
    
/**
 * @summary 客户需求点击统计
 */
export async function getClickDemandExport(payload: GetClickDemandExportPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<ExportResponse>(`/admin/click/demand/export?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}


export interface GetClickRoomExportQuery {
	endDate: string; // endDate
	startDate: string; // startDate
}

export interface GetClickRoomExportPayload extends ExtraFetchOptions {
	query: GetClickRoomExportQuery;
}
    
/**
 * @summary 房源点击统计
 */
export async function getClickRoomExport(payload: GetClickRoomExportPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<ExportResponse>(`/admin/click/room/export?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}


export interface GetCustomerTypeStatisticsQuery {
	cityId?: number; // cityId
	endDate?: string; // endDate
	startDate?: string; // startDate
	type?: 'CUSTOMER_COUNT' | 'ROOM_AREA_SIZE'; // type
}

export interface GetCustomerTypeStatisticsPayload extends ExtraFetchOptions {
	query: GetCustomerTypeStatisticsQuery;
}
    
/**
 * @summary 客户类型统计饼图
 */
export async function getCustomerTypeStatistics(payload: GetCustomerTypeStatisticsPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<CollectionResponsePureAdminStatisticsModel>(`/admin/customer-type/statistics?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}


export interface GetCustomerTypeStatisticsExportQuery {
	cityId?: number; // cityId
	endDate: string; // endDate
	startDate: string; // startDate
	type?: 'CUSTOMER_COUNT' | 'ROOM_AREA_SIZE'; // type
}

export interface GetCustomerTypeStatisticsExportPayload extends ExtraFetchOptions {
	query: GetCustomerTypeStatisticsExportQuery;
}
    
/**
 * @summary 客户类型统计饼图导出
 */
export async function getCustomerTypeStatisticsExport(payload: GetCustomerTypeStatisticsExportPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<ExportResponse>(`/admin/customer-type/statistics/export?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}


export interface GetCustomersIncreaseQuery {
	cityId?: number; // cityId
	date: string; // date
	size?: number; // size; default: 10
	type?: 'DAY' | 'WEEK' | 'MONTH'; // type
}

export interface GetCustomersIncreasePayload extends ExtraFetchOptions {
	query: GetCustomersIncreaseQuery;
}
    
/**
 * @summary 客户增长情况
 */
export async function getCustomersIncrease(payload: GetCustomersIncreasePayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<CollectionResponseDataAnalyzeModel>(`/admin/customers/increase?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}


export interface GetCustomersLoginStatisticsQuery {
	accountType?: 'CREAMS_MASTER' | 'ALL'; // accountType
	cityId?: number; // cityId
	date: string; // date
	embed?: 'CREAMS_WEB' | 'CREAMS_APP'; // embed
	size?: number; // size; default: 10
	type?: 'DAY' | 'WEEK' | 'MONTH'; // type
}

export interface GetCustomersLoginStatisticsPayload extends ExtraFetchOptions {
	query: GetCustomersLoginStatisticsQuery;
}
    
/**
 * @summary 登录业务员可管理业务员下的所有客户登录数据统计（creams客户下统计图表）
 */
export async function getCustomersLoginStatistics(payload: GetCustomersLoginStatisticsPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<CollectionResponseDataAnalyzeModel>(`/admin/customers/login-statistics?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}


