import stringify from '@/utils/stringify';
import request from '@/utils/request';
import { ExtraFetchOptions } from '@/types';
import { CollectionResponseFeedbackResponse, FeedbackRemarkRequest } from './../interfaces';



export interface GetParksFeedbackQuery {
	page?: number; // page; default: 1
	size?: number; // size; default: 20
}

export interface GetParksFeedbackPayload extends ExtraFetchOptions {
	query: GetParksFeedbackQuery;
}
    
/**
 * @summary 报错反馈列表
 */
export async function getParksFeedback(payload: GetParksFeedbackPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<CollectionResponseFeedbackResponse>(`/admin/parks/feedback?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface PutParksFeedbackRemarkIdPayload extends ExtraFetchOptions {
	id: number;
	/**
	 * remarkRequest
	 */
	body: FeedbackRemarkRequest;
}
    
/**
 * @summary 添加报错反馈备注
 */
export async function putParksFeedbackRemarkId(payload: PutParksFeedbackRemarkIdPayload) {
	const { id, body, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/parks/feedback-remark/${id}`, {
		...extraFetchOptions,
        method: 'put',
		body,
    });
}

export interface PutParksFeedbackIdPayload extends ExtraFetchOptions {
	id: number;
}
    
/**
 * @summary 处理房源报错反馈
 */
export async function putParksFeedbackId(payload: PutParksFeedbackIdPayload) {
	const { id, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/parks/feedback/${id}`, {
		...extraFetchOptions,
        method: 'put',
    });
}


