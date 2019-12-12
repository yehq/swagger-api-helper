import stringify from '@/utils/stringify';
import request from '@/utils/request';
import { ExtraFetchOptions } from '@/types';
import { PageClientModel, ClientCreateResponse, ClientCreateRequest } from './interfaces';



export interface GetClientsQuery {
	page?: number; // page
	size?: number; // size
}

export interface GetClientsPayload extends ExtraFetchOptions {
	query: GetClientsQuery;
}
    
/**
 * @summary queryClients
 */
export async function getClients(payload: GetClientsPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<PageClientModel>(`/admin/clients?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface PostClientsPayload extends ExtraFetchOptions {
	/**
	 * createModel
	 */
	body: ClientCreateRequest;
}
    
/**
 * @summary createNewClient
 */
export async function postClients(payload: PostClientsPayload) {
	const { body, ...extraFetchOptions } = payload;
    return request<ClientCreateResponse>(`/admin/clients`, {
		...extraFetchOptions,
        method: 'post',
		body,
    });
}


export interface DeleteClientsQuery {
	clientId: string; // clientId
}

export interface DeleteClientsPayload extends ExtraFetchOptions {
	query: DeleteClientsQuery;
}
    
/**
 * @summary deleteClient
 */
export async function deleteClients(payload: DeleteClientsPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/clients?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'delete',
    });
}


export interface PutClientsCloseQuery {
	clientId: string; // clientId
}

export interface PutClientsClosePayload extends ExtraFetchOptions {
	query: PutClientsCloseQuery;
}
    
/**
 * @summary closeClient
 */
export async function putClientsClose(payload: PutClientsClosePayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/clients/close?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'put',
    });
}


export interface PutClientsOpenQuery {
	clientId: string; // clientId
}

export interface PutClientsOpenPayload extends ExtraFetchOptions {
	query: PutClientsOpenQuery;
}
    
/**
 * @summary openClient
 */
export async function putClientsOpen(payload: PutClientsOpenPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/clients/open?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'put',
    });
}


