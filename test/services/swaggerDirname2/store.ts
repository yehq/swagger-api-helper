import request from '@/utils/request';
import { ExtraFetchOptions } from '@/types';
import { Order } from './interfaces'


export interface GetStoreInventoryPayload extends ExtraFetchOptions {
	
}

/**
 * Returns pet inventories by status
 * 
 */
export async function getStoreInventory(payload: GetStoreInventoryPayload) {
	const extraFetchOptions = payload;
    return request<object>(`/v2/store/inventory`, {
		...extraFetchOptions,
        method: 'get',
    });
}
export interface PostStoreOrderPayload extends ExtraFetchOptions {
	/**
	 * order placed for purchasing the pet
	 */
	body: Order
}

/**
 * Place an order for a pet
 * 
 */
export async function postStoreOrder(payload: PostStoreOrderPayload) {
	const { body, ...extraFetchOptions } = payload;
    return request<undefined>(`/v2/store/order`, {
		...extraFetchOptions,
        method: 'post',
		body,
    });
}
export interface GetStoreOrderOrderIdPayload extends ExtraFetchOptions {
	orderId: number
}

/**
 * Find purchase order by ID
 * 
 */
export async function getStoreOrderOrderId(payload: GetStoreOrderOrderIdPayload) {
	const { orderId, ...extraFetchOptions } = payload;
    return request<undefined>(`/v2/store/order/${orderId}`, {
		...extraFetchOptions,
        method: 'get',
    });
}
export interface DeleteStoreOrderOrderIdPayload extends ExtraFetchOptions {
	orderId: number
}

/**
 * Delete purchase order by ID
 * 
 */
export async function deleteStoreOrderOrderId(payload: DeleteStoreOrderOrderIdPayload) {
	const { orderId, ...extraFetchOptions } = payload;
    return request<undefined>(`/v2/store/order/${orderId}`, {
		...extraFetchOptions,
        method: 'delete',
    });
}

