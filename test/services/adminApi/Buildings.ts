import stringify from '@/utils/stringify';
import request from '@/utils/request';
import { ExtraFetchOptions } from '@/types';
import { CollectionResponseBuildingSummaryModel, BuildingModel, BuildingCreateRequest, ExportResponse, BuildingStatisticsResponse, BuildingActiveRequest, BuildingResponse, CollectionResponseCustomerLogModel, FloorModel, BuildingDetailStatisticResponse } from './interfaces';



export interface GetBuildingsQuery {
	active?: boolean; // active
	areaSizeType?: 'RENT_AREA_SIZE' | 'ROOM_AREA_SIZE' | 'CONTRACT_AREA_SIZE'; // areaSizeType
	cityId?: number; // cityId
	createEndDate?: string; // createEndDate
	createStartDate?: string; // createStartDate
	keyword?: string; // 楼宇名称，所属主体
	maxAreaSize?: number; // maxAreaSize
	minAreaSize?: number; // minAreaSize
	page?: number; // page
	provinceId?: number; // provinceId
	size?: number; // size
	sort?: string; // 排序选择:createdDate,rentAreaSize,roomAreaSize; default: createdDate,desc
}

export interface GetBuildingsPayload extends ExtraFetchOptions {
	query: GetBuildingsQuery;
}
    
/**
 * @summary 楼宇列表
 */
export async function getBuildings(payload: GetBuildingsPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<CollectionResponseBuildingSummaryModel>(`/admin/buildings?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface PostBuildingsPayload extends ExtraFetchOptions {
	/**
	 * request
	 */
	body: BuildingCreateRequest;
}
    
/**
 * @summary 给客户创建新楼宇
 */
export async function postBuildings(payload: PostBuildingsPayload) {
	const { body, ...extraFetchOptions } = payload;
    return request<BuildingModel>(`/admin/buildings`, {
		...extraFetchOptions,
        method: 'post',
		body,
    });
}


export interface GetBuildingsExportQuery {
	active?: boolean; // active
	areaSizeType?: 'RENT_AREA_SIZE' | 'ROOM_AREA_SIZE' | 'CONTRACT_AREA_SIZE'; // areaSizeType
	cityId?: number; // cityId
	createEndDate?: string; // createEndDate
	createStartDate?: string; // createStartDate
	keyword?: string; // 楼宇名称，所属主体
	maxAreaSize?: number; // maxAreaSize
	minAreaSize?: number; // minAreaSize
	provinceId?: number; // provinceId
	sort?: string; // 排序选择:createdDate,rentAreaSize,roomAreaSize; default: createdDate,desc
}

export interface GetBuildingsExportPayload extends ExtraFetchOptions {
	query: GetBuildingsExportQuery;
}
    
/**
 * @summary 导出楼宇excel
 */
export async function getBuildingsExport(payload: GetBuildingsExportPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<ExportResponse>(`/admin/buildings/export?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}


export interface GetBuildingsStatisticsQuery {
	active?: boolean; // active
	areaSizeType?: 'RENT_AREA_SIZE' | 'ROOM_AREA_SIZE' | 'CONTRACT_AREA_SIZE'; // areaSizeType
	cityId?: number; // cityId
	createEndDate?: string; // createEndDate
	createStartDate?: string; // createStartDate
	keyword?: string; // keyword
	maxAreaSize?: number; // maxAreaSize
	minAreaSize?: number; // minAreaSize
	provinceId?: number; // provinceId
}

export interface GetBuildingsStatisticsPayload extends ExtraFetchOptions {
	query: GetBuildingsStatisticsQuery;
}
    
/**
 * @summary 楼宇列表头部统计数据
 */
export async function getBuildingsStatistics(payload: GetBuildingsStatisticsPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<BuildingStatisticsResponse>(`/admin/buildings/statistics?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface PutBuildingsBuildingIdActivePayload extends ExtraFetchOptions {
	buildingId: number;
	/**
	 * buildingActiveRequest
	 */
	body: BuildingActiveRequest;
}
    
/**
 * @summary 修改楼宇启用状态
 */
export async function putBuildingsBuildingIdActive(payload: PutBuildingsBuildingIdActivePayload) {
	const { buildingId, body, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/buildings/${buildingId}/active`, {
		...extraFetchOptions,
        method: 'put',
		body,
    });
}

export interface PostBuildingsBuildingIdRoomsPayload extends ExtraFetchOptions {
	buildingId: number;
	/**
	 * 
	 * export interface FormContent {
	 * 	file: File; // file
	 * }
	 * 
	 */
	body: FormData;
}
    
/**
 * @summary 导入房源
 */
export async function postBuildingsBuildingIdRooms(payload: PostBuildingsBuildingIdRoomsPayload) {
	const { buildingId, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/buildings/${buildingId}/rooms`, {
		...extraFetchOptions,
        method: 'post',
    });
}

export interface GetBuildingsIdPayload extends ExtraFetchOptions {
	id: number;
}
    
/**
 * @summary 楼宇详情
 */
export async function getBuildingsId(payload: GetBuildingsIdPayload) {
	const { id, ...extraFetchOptions } = payload;
    return request<BuildingResponse>(`/admin/buildings/${id}`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface PutBuildingsIdPayload extends ExtraFetchOptions {
	id: number;
	/**
	 * request
	 */
	body: BuildingCreateRequest;
}
    
/**
 * @summary 更新楼宇
 */
export async function putBuildingsId(payload: PutBuildingsIdPayload) {
	const { id, body, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/buildings/${id}`, {
		...extraFetchOptions,
        method: 'put',
		body,
    });
}


export interface GetBuildingsIdLogsQuery {
	page?: number; // page; default: 1
	size?: number; // size; default: 10
}

export interface GetBuildingsIdLogsPayload extends ExtraFetchOptions {
	id: number;
	query: GetBuildingsIdLogsQuery;
}
    
/**
 * @summary 楼宇操作记录列表
 */
export async function getBuildingsIdLogs(payload: GetBuildingsIdLogsPayload) {
	const { id, query, ...extraFetchOptions } = payload;
    return request<CollectionResponseCustomerLogModel>(`/admin/buildings/${id}/logs?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface DeleteBuildingsIdRoomPayload extends ExtraFetchOptions {
	id: number;
}
    
/**
 * @summary 清空楼宇下房源
 */
export async function deleteBuildingsIdRoom(payload: DeleteBuildingsIdRoomPayload) {
	const { id, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/buildings/${id}/room`, {
		...extraFetchOptions,
        method: 'delete',
    });
}

export interface GetBuildingsIdRoomsPayload extends ExtraFetchOptions {
	id: number;
}
    
/**
 * @summary 楼宇房源列表
 * @description 输入楼宇id
 */
export async function getBuildingsIdRooms(payload: GetBuildingsIdRoomsPayload) {
	const { id, ...extraFetchOptions } = payload;
    return request<FloorModel[]>(`/admin/buildings/${id}/rooms`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface GetBuildingsIdStatisticsPayload extends ExtraFetchOptions {
	id: number;
}
    
/**
 * @summary 楼宇详情头部统计数据
 */
export async function getBuildingsIdStatistics(payload: GetBuildingsIdStatisticsPayload) {
	const { id, ...extraFetchOptions } = payload;
    return request<BuildingDetailStatisticResponse>(`/admin/buildings/${id}/statistics`, {
		...extraFetchOptions,
        method: 'get',
    });
}


