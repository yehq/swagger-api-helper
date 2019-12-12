import stringify from '@/utils/stringify';
import request from '@/utils/request';
import { ExtraFetchOptions } from '@/types';
import { CollectionResponseSystematicNotificationDTO, SystematicNotificationRequest } from './interfaces';



export interface GetNotificationQuery {
	page?: number; // page; default: 1
	size?: number; // size; default: 20
	sort?: 'createdDate' | 'Desc'; // 排序选择; default: createdDate,Desc
	status?: 'SENT' | 'UNSENT'; // status
}

export interface GetNotificationPayload extends ExtraFetchOptions {
	query: GetNotificationQuery;
}
    
/**
 * @summary 获取系统消息列表
 */
export async function getNotification(payload: GetNotificationPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<CollectionResponseSystematicNotificationDTO>(`/admin/notification?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}


export interface PostNotificationQuery {
	backstageUserId?: number; // 后台管理用户的id
}

export interface PostNotificationPayload extends ExtraFetchOptions {
	query: PostNotificationQuery;
	/**
	 * dto
	 */
	body: SystematicNotificationRequest;
}
    
/**
 * @summary 新增一条系统通知消息
 */
export async function postNotification(payload: PostNotificationPayload) {
	const { body, query, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/notification?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'post',
		body,
    });
}


export interface PutNotificationQuery {
	backstageUserId?: number; // 后台管理用户的id
}

export interface PutNotificationPayload extends ExtraFetchOptions {
	query: PutNotificationQuery;
	/**
	 * dto
	 */
	body: SystematicNotificationRequest;
}
    
/**
 * @summary 修改一条系统通知消息
 */
export async function putNotification(payload: PutNotificationPayload) {
	const { body, query, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/notification?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'put',
		body,
    });
}


