import stringify from '@/utils/stringify';
import request from '@/utils/request';
import { ExtraFetchOptions } from '@/types';
import { ApiResponse, Pet } from './interfaces';


export interface PostPetPetIdUploadImagePayload extends ExtraFetchOptions {
	petId: number;
	/**
	 * 
	 * export interface FormContent {
	 * 	additionalMetadata?: string; // Additional data to pass to server
	 * 	file?: File; // file to upload
	 * }
	 * 
	 */
	body: FormData;
}
    
/**
 * @summary uploads an image
 */
export async function postPetPetIdUploadImage(payload: PostPetPetIdUploadImagePayload) {
	const { petId, ...extraFetchOptions } = payload;
    return request<ApiResponse>(`/v2/pet/${petId}/uploadImage`, {
		...extraFetchOptions,
        method: 'post',
    });
}

export interface PostPetPayload extends ExtraFetchOptions {
	/**
	 * Pet object that needs to be added to the store
	 */
	body: Pet;
}
    
/**
 * @summary Add a new pet to the store
 */
export async function postPet(payload: PostPetPayload) {
	const { body, ...extraFetchOptions } = payload;
    return request<undefined>(`/v2/pet`, {
		...extraFetchOptions,
        method: 'post',
		body,
    });
}

export interface PutPetPayload extends ExtraFetchOptions {
	/**
	 * Pet object that needs to be added to the store
	 */
	body: Pet;
}
    
/**
 * @summary Update an existing pet
 */
export async function putPet(payload: PutPetPayload) {
	const { body, ...extraFetchOptions } = payload;
    return request<undefined>(`/v2/pet`, {
		...extraFetchOptions,
        method: 'put',
		body,
    });
}


export interface GetPetFindByStatusQuery {
	status: Array<'available' | 'pending' | 'sold'>; // Status values that need to be considered for filter
}

export interface GetPetFindByStatusPayload extends ExtraFetchOptions {
	query: GetPetFindByStatusQuery;
}
    
/**
 * @summary Finds Pets by status
 * @description Multiple status values can be provided with comma separated strings
 */
export async function getPetFindByStatus(payload: GetPetFindByStatusPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<Pet[]>(`/v2/pet/findByStatus?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}


export interface GetPetFindByTagsQuery {
	tags: Array<string>; // Tags to filter by
}

export interface GetPetFindByTagsPayload extends ExtraFetchOptions {
	query: GetPetFindByTagsQuery;
}
    
/**
 * 废弃不用 
 * @deprecated
 * @summary Finds Pets by tags
 * @description Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
 */
export async function getPetFindByTags(payload: GetPetFindByTagsPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<Pet[]>(`/v2/pet/findByTags?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface GetPetPetIdPayload extends ExtraFetchOptions {
	petId: number;
}
    
/**
 * @summary Find pet by ID
 * @description Returns a single pet
 */
export async function getPetPetId(payload: GetPetPetIdPayload) {
	const { petId, ...extraFetchOptions } = payload;
    return request<Pet>(`/v2/pet/${petId}`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface PostPetPetIdPayload extends ExtraFetchOptions {
	petId: number;
	/**
	 * 
	 * export interface FormContent {
	 * 	name?: string; // Updated name of the pet
	 * 	status?: string; // Updated status of the pet
	 * }
	 * 
	 */
	body: FormData;
}
    
/**
 * @summary Updates a pet in the store with form data
 */
export async function postPetPetId(payload: PostPetPetIdPayload) {
	const { petId, ...extraFetchOptions } = payload;
    return request<undefined>(`/v2/pet/${petId}`, {
		...extraFetchOptions,
        method: 'post',
    });
}

export interface DeletePetPetIdPayload extends ExtraFetchOptions {
	petId: number;
}
    
/**
 * @summary Deletes a pet
 */
export async function deletePetPetId(payload: DeletePetPetIdPayload) {
	const { petId, ...extraFetchOptions } = payload;
    return request<undefined>(`/v2/pet/${petId}`, {
		...extraFetchOptions,
        method: 'delete',
    });
}


