import request from '@/utils/request';
import { ExtraFetchOptions } from '@/types';
import { RiskstormCustomerResponse, RiskstormCustomerRequest } from './interfaces';


export interface GetRiskstormCustomerIdPayload extends ExtraFetchOptions {
	customerId: number;
}
    
/**
 * @summary 获取风报对接信息
 */
export async function getRiskstormCustomerId(payload: GetRiskstormCustomerIdPayload) {
	const { customerId, ...extraFetchOptions } = payload;
    return request<RiskstormCustomerResponse>(`/admin/riskstorm/${customerId}`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface PostRiskstormCustomerIdPayload extends ExtraFetchOptions {
	customerId: number;
	/**
	 * request
	 */
	body: RiskstormCustomerRequest;
}
    
/**
 * @summary 新增风报对接信息
 */
export async function postRiskstormCustomerId(payload: PostRiskstormCustomerIdPayload) {
	const { customerId, body, ...extraFetchOptions } = payload;
    return request<RiskstormCustomerResponse>(`/admin/riskstorm/${customerId}`, {
		...extraFetchOptions,
        method: 'post',
		body,
    });
}

export interface PutRiskstormCustomerIdPayload extends ExtraFetchOptions {
	customerId: number;
	/**
	 * request
	 */
	body: RiskstormCustomerRequest;
}
    
/**
 * @summary 修改风报对接信息
 */
export async function putRiskstormCustomerId(payload: PutRiskstormCustomerIdPayload) {
	const { customerId, body, ...extraFetchOptions } = payload;
    return request<RiskstormCustomerResponse>(`/admin/riskstorm/${customerId}`, {
		...extraFetchOptions,
        method: 'put',
		body,
    });
}

export interface DeleteRiskstormCustomerIdPayload extends ExtraFetchOptions {
	customerId: number;
}
    
/**
 * @summary 删除风报对接信息
 */
export async function deleteRiskstormCustomerId(payload: DeleteRiskstormCustomerIdPayload) {
	const { customerId, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/riskstorm/${customerId}`, {
		...extraFetchOptions,
        method: 'delete',
    });
}


