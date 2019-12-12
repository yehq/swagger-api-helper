import request from '@/utils/request';
import { ExtraFetchOptions } from '@/types';
import { CollectionResponseRegionsModelTemp } from './interfaces';


export interface GetRegionsPayload extends ExtraFetchOptions {

}
    
/**
 * @summary 查出省市区列表
 */
export async function getRegions(payload: GetRegionsPayload) {
	const extraFetchOptions = payload;
    return request<CollectionResponseRegionsModelTemp>(`/admin/regions`, {
		...extraFetchOptions,
        method: 'get',
    });
}


