import request from '@/utils/request';
import { ExtraFetchOptions } from '@/types';


export interface PostDemandsIdInvalidPayload extends ExtraFetchOptions {
	id: number;
}
    
/**
 * @summary 需求失效设置
 */
export async function postDemandsIdInvalid(payload: PostDemandsIdInvalidPayload) {
	const { id, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/demands/${id}/invalid`, {
		...extraFetchOptions,
        method: 'post',
    });
}


