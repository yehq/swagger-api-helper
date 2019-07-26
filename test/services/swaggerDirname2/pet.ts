import { stringify } from '../../utils';
import { request } from '../../utils';
import { ExtraFetchOptions } from '../../utils';
import { Pet, ApiResponse } from './interfaces'


    export interface PostPetPayload extends ExtraFetchOptions {
	/**
	 * Pet object that needs to be added to the store
	 */
	body: Pet
}
    
    /**
     * Add a new pet to the store
     * 
     */
    export async function postPet(payload: PostPetPayload) {
	const { body, ...extraFetchOptions } = payload;
        return request<undefined>(`/pet`, {
		...extraFetchOptions,
            method: 'post',
		body,
        });
    }
    export interface PutPetPayload extends ExtraFetchOptions {
	/**
	 * Pet object that needs to be added to the store
	 */
	body: Pet
}
    
    /**
     * Update an existing pet
     * 
     */
    export async function putPet(payload: PutPetPayload) {
	const { body, ...extraFetchOptions } = payload;
        return request<undefined>(`/pet`, {
		...extraFetchOptions,
            method: 'put',
		body,
        });
    }
    
export interface GetPetFindByStatusQuery {
	status: Array<'available' | 'pending' | 'sold'>	// Status values that need to be considered for filter   
}

export interface GetPetFindByStatusPayload extends ExtraFetchOptions {
	query: GetPetFindByStatusQuery
}
    
    /**
     * Finds Pets by status
     * 
     */
    export async function getPetFindByStatus(payload: GetPetFindByStatusPayload) {
	const { query, ...extraFetchOptions } = payload;
        return request<undefined>(`/pet/findByStatus?${stringify(query)}`, {
		...extraFetchOptions,
            method: 'get',
        });
    }
    
export interface GetPetFindByTagsQuery {
	tags: Array<string>	// Tags to filter by   
}

export interface GetPetFindByTagsPayload extends ExtraFetchOptions {
	query: GetPetFindByTagsQuery
}
    
    /**
     * 废弃不用 Finds Pets by tags
     * @deprecated
     */
    export async function getPetFindByTags(payload: GetPetFindByTagsPayload) {
	const { query, ...extraFetchOptions } = payload;
        return request<undefined>(`/pet/findByTags?${stringify(query)}`, {
		...extraFetchOptions,
            method: 'get',
        });
    }
    export interface GetPetPetIdPayload extends ExtraFetchOptions {
	petId: number
}
    
    /**
     * Find pet by ID
     * 
     */
    export async function getPetPetId(payload: GetPetPetIdPayload) {
	const { petId, ...extraFetchOptions } = payload;
        return request<undefined>(`/pet/${petId}`, {
		...extraFetchOptions,
            method: 'get',
        });
    }
    export interface PostPetPetIdPayload extends ExtraFetchOptions {
	petId: number
	/**
	 * 
	 * export interface FormContent {
	 * 	name?: string	// Updated name of the pet   
	 * 	status?: string	// Updated status of the pet   
	 * }
	 * 
	 */
	body: FormData
}
    
    /**
     * Updates a pet in the store with form data
     * 
     */
    export async function postPetPetId(payload: PostPetPetIdPayload) {
	const { petId, ...extraFetchOptions } = payload;
        return request<undefined>(`/pet/${petId}`, {
		...extraFetchOptions,
            method: 'post',
        });
    }
    export interface DeletePetPetIdPayload extends ExtraFetchOptions {
	petId: number
}
    
    /**
     * Deletes a pet
     * 
     */
    export async function deletePetPetId(payload: DeletePetPetIdPayload) {
	const { petId, ...extraFetchOptions } = payload;
        return request<undefined>(`/pet/${petId}`, {
		...extraFetchOptions,
            method: 'delete',
        });
    }
    export interface PostPetPetIdUploadImagePayload extends ExtraFetchOptions {
	petId: number
	/**
	 * 
	 * export interface FormContent {
	 * 	additionalMetadata?: string	// Additional data to pass to server   
	 * 	file?: File	// file to upload   
	 * }
	 * 
	 */
	body: FormData
}
    
    /**
     * uploads an image
     * 
     */
    export async function postPetPetIdUploadImage(payload: PostPetPetIdUploadImagePayload) {
	const { petId, ...extraFetchOptions } = payload;
        return request<ApiResponse>(`/pet/${petId}/uploadImage`, {
		...extraFetchOptions,
            method: 'post',
        });
    }
    
    