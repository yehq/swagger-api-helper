import stringify from '@/utils/stringify';
import request from '@/utils/request';
import { ExtraFetchOptions } from '@/types';
import { CollectionResponseFeignCustomerWithMasterUser, CustomerCreateRequest, ExportResponse, CustomerFollowModel, CustomerWithIdNameModel, CustomerStatisticsResponse, CollectionResponseCustomerWithIdNameModel, CollectionResponseSubAccount, CustomerDetailModel, CustomerUpdateRequest, CustomerActiveRequest, AppIconResponse, AppIconRequest, AppTaskStatusResponse, CollectionResponseUserLoginHistoryModel, DataAnalyzeModel, CollectionResponseCustomerLogModel, MobileImageResponse, MobileImageRequest, CustomerDetailStatisticsResponse, WebImageResponse, WebImageRequest, LoginWebImage } from './interfaces';



export interface GetCustomersQuery {
	active?: boolean; // active
	belongType?: 'CUSTOMER_ADDRESS' | 'FOLLOW_ADDRESS' | 'BUILDING_ADDRESS'; // 筛选省城市时，是客户地址还是跟进人所属
	cityId?: number; // cityId
	followIds?: Array<number>; // followIds
	keyword?: string; // keyword
	loginCount?: number; // loginCount
	loginEndDate?: string; // 登录结束时间筛选
	loginStartDate?: string; // 登录开始时间筛选
	official?: boolean; // official
	page?: number; // page
	provinceId?: number; // provinceId
	registerEndDate?: string; // registerEndDate
	registerStartDate?: string; // registerStartDate
	size?: number; // size
	sort?: string; // 排序选择:createdDate,loginCount,areaSizeLimit; default: createdDate,desc
}

export interface GetCustomersPayload extends ExtraFetchOptions {
	query: GetCustomersQuery;
}
    
/**
 * @summary 正式客户列表
 */
export async function getCustomers(payload: GetCustomersPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<CollectionResponseFeignCustomerWithMasterUser>(`/admin/customers?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface PostCustomersPayload extends ExtraFetchOptions {
	/**
	 * usersRequest
	 */
	body: CustomerCreateRequest;
}
    
/**
 * @summary 创建正式客户
 */
export async function postCustomers(payload: PostCustomersPayload) {
	const { body, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/customers`, {
		...extraFetchOptions,
        method: 'post',
		body,
    });
}


export interface GetCustomersAddTianyanchaAmountQuery {
	followId: number; // followId
	id: number; // id
	increaseAmount: number; // increaseAmount
}

export interface GetCustomersAddTianyanchaAmountPayload extends ExtraFetchOptions {
	query: GetCustomersAddTianyanchaAmountQuery;
}
    
/**
 * @summary 添加天眼查费用
 */
export async function getCustomersAddTianyanchaAmount(payload: GetCustomersAddTianyanchaAmountPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<boolean>(`/admin/customers/add-tianyancha-amount?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}


export interface GetCustomersExportQuery {
	active?: boolean; // active
	belongType?: 'CUSTOMER_ADDRESS' | 'FOLLOW_ADDRESS' | 'BUILDING_ADDRESS'; // 筛选省城市时，是客户地址还是跟进人所属
	cityId?: number; // cityId
	followIds?: Array<number>; // followIds
	keyword?: string; // keyword
	loginCount?: number; // loginCount
	loginEndDate?: string; // 登录结束时间筛选
	loginStartDate?: string; // 登录开始时间筛选
	official?: boolean; // official
	provinceId?: number; // provinceId
	registerEndDate?: string; // registerEndDate
	registerStartDate?: string; // registerStartDate
	sort?: string; // 排序选择:createdDate,loginCount,areaSizeLimit; default: createdDate,desc
}

export interface GetCustomersExportPayload extends ExtraFetchOptions {
	query: GetCustomersExportQuery;
}
    
/**
 * @summary 导出正式客户excel
 */
export async function getCustomersExport(payload: GetCustomersExportPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<ExportResponse>(`/admin/customers/export?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}


export interface GetCustomersExportTianyanchaamountQuery {
	customerId: number; // customerId
	endDate?: string; // endDate
	startDate?: string; // startDate
	userIds?: Array<number>; // userIds
}

export interface GetCustomersExportTianyanchaamountPayload extends ExtraFetchOptions {
	query: GetCustomersExportTianyanchaamountQuery;
}
    
/**
 * @summary 天眼查费用统计导出
 */
export async function getCustomersExportTianyanchaamount(payload: GetCustomersExportTianyanchaamountPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<string>(`/admin/customers/export-tianyanchaamount?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface GetCustomersFollowsPayload extends ExtraFetchOptions {

}
    
/**
 * @summary 跟进人列表(城市列表下包含跟进人列表)
 */
export async function getCustomersFollows(payload: GetCustomersFollowsPayload) {
	const extraFetchOptions = payload;
    return request<CustomerFollowModel[]>(`/admin/customers/follows`, {
		...extraFetchOptions,
        method: 'get',
    });
}


export interface GetCustomersSearchQuery {
	keyword: string; // keyword
}

export interface GetCustomersSearchPayload extends ExtraFetchOptions {
	query: GetCustomersSearchQuery;
}
    
/**
 * @summary 通过客户名称搜索客户
 */
export async function getCustomersSearch(payload: GetCustomersSearchPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<CustomerWithIdNameModel[]>(`/admin/customers/search?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface GetCustomersStatisticsPayload extends ExtraFetchOptions {

}
    
/**
 * @summary 正式客户头部数据
 */
export async function getCustomersStatistics(payload: GetCustomersStatisticsPayload) {
	const extraFetchOptions = payload;
    return request<CustomerStatisticsResponse>(`/admin/customers/statistics`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface GetCustomersUserManagePayload extends ExtraFetchOptions {

}
    
/**
 * @summary 可管理客户列表
 */
export async function getCustomersUserManage(payload: GetCustomersUserManagePayload) {
	const extraFetchOptions = payload;
    return request<CollectionResponseCustomerWithIdNameModel>(`/admin/customers/user-manage`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface GetCustomersCustomerIdSubAccountsPayload extends ExtraFetchOptions {
	customerId: number;
}
    
/**
 * @summary 客户子账号列表
 */
export async function getCustomersCustomerIdSubAccounts(payload: GetCustomersCustomerIdSubAccountsPayload) {
	const { customerId, ...extraFetchOptions } = payload;
    return request<CollectionResponseSubAccount>(`/admin/customers/${customerId}/sub-accounts`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface GetCustomersIdPayload extends ExtraFetchOptions {
	id: number;
}
    
/**
 * @summary 客户详情
 */
export async function getCustomersId(payload: GetCustomersIdPayload) {
	const { id, ...extraFetchOptions } = payload;
    return request<CustomerDetailModel>(`/admin/customers/${id}`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface PutCustomersIdPayload extends ExtraFetchOptions {
	id: number;
	/**
	 * request
	 */
	body: CustomerUpdateRequest;
}
    
/**
 * @summary 修改客户
 */
export async function putCustomersId(payload: PutCustomersIdPayload) {
	const { id, body, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/customers/${id}`, {
		...extraFetchOptions,
        method: 'put',
		body,
    });
}

export interface PutCustomersIdActivePayload extends ExtraFetchOptions {
	id: number;
	/**
	 * request
	 */
	body: CustomerActiveRequest;
}
    
/**
 * @summary 禁用/启用客户
 */
export async function putCustomersIdActive(payload: PutCustomersIdActivePayload) {
	const { id, body, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/customers/${id}/active`, {
		...extraFetchOptions,
        method: 'put',
		body,
    });
}

export interface GetCustomersIdAppIconPayload extends ExtraFetchOptions {
	id: number;
}
    
/**
 * @summary 查询 App icon
 */
export async function getCustomersIdAppIcon(payload: GetCustomersIdAppIconPayload) {
	const { id, ...extraFetchOptions } = payload;
    return request<AppIconResponse>(`/admin/customers/${id}/app-icon`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface PostCustomersIdAppIconPayload extends ExtraFetchOptions {
	id: number;
	/**
	 * request
	 */
	body: AppIconRequest;
}
    
/**
 * @summary 保存 App icon
 */
export async function postCustomersIdAppIcon(payload: PostCustomersIdAppIconPayload) {
	const { id, body, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/customers/${id}/app-icon`, {
		...extraFetchOptions,
        method: 'post',
		body,
    });
}

export interface GetCustomersIdAppTaskPayload extends ExtraFetchOptions {
	id: number;
}
    
/**
 * @summary 查看 App 上传情况
 */
export async function getCustomersIdAppTask(payload: GetCustomersIdAppTaskPayload) {
	const { id, ...extraFetchOptions } = payload;
    return request<AppTaskStatusResponse>(`/admin/customers/${id}/app-task`, {
		...extraFetchOptions,
        method: 'get',
    });
}


export interface GetCustomersIdLoginHistoryQuery {
	loginEndDate: string; // loginEndDate
	loginStartDate: string; // loginStartDate
	page?: number; // page; default: 1
	size?: number; // size; default: 20
	userId?: number; // userId
}

export interface GetCustomersIdLoginHistoryPayload extends ExtraFetchOptions {
	id: number;
	query: GetCustomersIdLoginHistoryQuery;
}
    
/**
 * @summary 客户登录历史记录列表
 */
export async function getCustomersIdLoginHistory(payload: GetCustomersIdLoginHistoryPayload) {
	const { id, query, ...extraFetchOptions } = payload;
    return request<CollectionResponseUserLoginHistoryModel>(`/admin/customers/${id}/login-history?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}


export interface GetCustomersIdLoginStatisticsQuery {
	date: string; // 最后一天的数据
	embed?: 'web_app' | 'mobile_app'; // web_app:web登录; mobile_app:app登录; 
	size?: number; // 请求的柱状图条数; default: 10
	type: 'DAY' | 'WEEK' | 'MONTH'; // DAY:天; WEEK：周; MONTH：月;
	userId?: number; // userId
}

export interface GetCustomersIdLoginStatisticsPayload extends ExtraFetchOptions {
	id: number;
	query: GetCustomersIdLoginStatisticsQuery;
}
    
/**
 * @summary 用户登录统计
 */
export async function getCustomersIdLoginStatistics(payload: GetCustomersIdLoginStatisticsPayload) {
	const { id, query, ...extraFetchOptions } = payload;
    return request<DataAnalyzeModel[]>(`/admin/customers/${id}/login-statistics?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}


export interface GetCustomersIdLogsQuery {
	page?: number; // page; default: 1
	size?: number; // size; default: 10
}

export interface GetCustomersIdLogsPayload extends ExtraFetchOptions {
	id: number;
	query: GetCustomersIdLogsQuery;
}
    
/**
 * @summary 客户操作记录列表
 */
export async function getCustomersIdLogs(payload: GetCustomersIdLogsPayload) {
	const { id, query, ...extraFetchOptions } = payload;
    return request<CollectionResponseCustomerLogModel>(`/admin/customers/${id}/logs?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface GetCustomersIdMobileImagePayload extends ExtraFetchOptions {
	id: number;
}
    
/**
 * @summary 查询 App 图片配置
 */
export async function getCustomersIdMobileImage(payload: GetCustomersIdMobileImagePayload) {
	const { id, ...extraFetchOptions } = payload;
    return request<MobileImageResponse>(`/admin/customers/${id}/mobile-image`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface PostCustomersIdMobileImagePayload extends ExtraFetchOptions {
	id: number;
	/**
	 * request
	 */
	body: MobileImageRequest;
}
    
/**
 * @summary 保存 App 图片配置
 */
export async function postCustomersIdMobileImage(payload: PostCustomersIdMobileImagePayload) {
	const { id, body, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/customers/${id}/mobile-image`, {
		...extraFetchOptions,
        method: 'post',
		body,
    });
}

export interface GetCustomersIdStatisticsPayload extends ExtraFetchOptions {
	id: number;
}
    
/**
 * @summary 客户详情统计数据
 */
export async function getCustomersIdStatistics(payload: GetCustomersIdStatisticsPayload) {
	const { id, ...extraFetchOptions } = payload;
    return request<CustomerDetailStatisticsResponse>(`/admin/customers/${id}/statistics`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface GetCustomersIdWebImagePayload extends ExtraFetchOptions {
	id: number;
}
    
/**
 * @summary 查询 web 图片配置
 */
export async function getCustomersIdWebImage(payload: GetCustomersIdWebImagePayload) {
	const { id, ...extraFetchOptions } = payload;
    return request<WebImageResponse>(`/admin/customers/${id}/web-image`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface PostCustomersIdWebImagePayload extends ExtraFetchOptions {
	id: number;
	/**
	 * request
	 */
	body: WebImageRequest;
}
    
/**
 * @summary 保存 web 图片配置
 */
export async function postCustomersIdWebImage(payload: PostCustomersIdWebImagePayload) {
	const { id, body, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/customers/${id}/web-image`, {
		...extraFetchOptions,
        method: 'post',
		body,
    });
}

export interface GetCustomersIdWebLoginPayload extends ExtraFetchOptions {
	id: number;
}
    
/**
 * @summary 查询 WEB 登录页图片
 */
export async function getCustomersIdWebLogin(payload: GetCustomersIdWebLoginPayload) {
	const { id, ...extraFetchOptions } = payload;
    return request<LoginWebImage>(`/admin/customers/${id}/web-login`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface PostCustomersIdWebLoginPayload extends ExtraFetchOptions {
	id: number;
	/**
	 * webImage
	 */
	body: LoginWebImage;
}
    
/**
 * @summary 保存WEB登录页图片配置
 */
export async function postCustomersIdWebLogin(payload: PostCustomersIdWebLoginPayload) {
	const { id, body, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/customers/${id}/web-login`, {
		...extraFetchOptions,
        method: 'post',
		body,
    });
}


