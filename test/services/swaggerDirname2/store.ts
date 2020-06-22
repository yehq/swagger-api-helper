import request from '@/utils/request';
import { ExtraFetchOptions } from '@/types';
import { Order } from './interfaces';


export interface PostStoreOrderPayload extends ExtraFetchOptions {
	/**
	 * order placed for purchasing the pet
	 */
	body: Order;
}
    
/**
 * @summary Place an order for a pet
 */
export async function postStoreOrder(payload: PostStoreOrderPayload) {
	const { body, ...extraFetchOptions } = payload;
    return request<Order>(`/v2/store/order`, {
		...extraFetchOptions,
        method: 'post',
		body,
    });
}

export interface GetStoreOrderOrderIdPayload extends ExtraFetchOptions {
	orderId: number;
}
    
/**
 * @summary Find purchase order by ID
 * @description For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions
 */
export async function getStoreOrderOrderId(payload: GetStoreOrderOrderIdPayload) {
	const { orderId, ...extraFetchOptions } = payload;
    return request<Order>(`/v2/store/order/${orderId}`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface DeleteStoreOrderOrderIdPayload extends ExtraFetchOptions {
	orderId: number;
}
    
/**
 * @summary Delete purchase order by ID
 * @description For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors
 */
export async function deleteStoreOrderOrderId(payload: DeleteStoreOrderOrderIdPayload) {
	const { orderId, ...extraFetchOptions } = payload;
    return request<undefined>(`/v2/store/order/${orderId}`, {
		...extraFetchOptions,
        method: 'delete',
    });
}

export interface GetStoreInventoryPayload extends ExtraFetchOptions {

}
    
/**
 * @summary Returns pet inventories by status
 * @description Returns a map of status codes to quantities
 */
export async function getStoreInventory(payload: GetStoreInventoryPayload) {
	const extraFetchOptions = payload;
    return request<object>(`/v2/store/inventory`, {
		...extraFetchOptions,
        method: 'get',
    });
}


