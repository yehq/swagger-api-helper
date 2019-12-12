import stringify from '@/utils/stringify';
import request from '@/utils/request';
import { ExtraFetchOptions } from '@/types';
import { FileInfoApiModel, FileInfoApiRequest, AliyunStsFeignResponse } from './interfaces';



export interface GetFilesQuery {
	domainType: string; // domainType
	objectId: number; // objectId
}

export interface GetFilesPayload extends ExtraFetchOptions {
	query: GetFilesQuery;
}
    
/**
 * @summary 附件列表
 */
export async function getFiles(payload: GetFilesPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<FileInfoApiModel[]>(`/admin/files?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface PostFilesPayload extends ExtraFetchOptions {
	/**
	 * fileRequest
	 */
	body: FileInfoApiRequest;
}
    
/**
 * @summary 增加对象附件文件
 */
export async function postFiles(payload: PostFilesPayload) {
	const { body, ...extraFetchOptions } = payload;
    return request<FileInfoApiModel>(`/admin/files`, {
		...extraFetchOptions,
        method: 'post',
		body,
    });
}

export interface GetFilesIdPayload extends ExtraFetchOptions {
	id: number;
}
    
/**
 * @summary 根据文件 ID 获取文件信息
 */
export async function getFilesId(payload: GetFilesIdPayload) {
	const { id, ...extraFetchOptions } = payload;
    return request<FileInfoApiModel>(`/admin/files/${id}`, {
		...extraFetchOptions,
        method: 'get',
    });
}

export interface DeleteFilesIdPayload extends ExtraFetchOptions {
	id: number;
}
    
/**
 * @summary 删除文件
 */
export async function deleteFilesId(payload: DeleteFilesIdPayload) {
	const { id, ...extraFetchOptions } = payload;
    return request<undefined>(`/admin/files/${id}`, {
		...extraFetchOptions,
        method: 'delete',
    });
}


export interface GetOssDownloadStsTokenQuery {
	id?: number; // id
	url?: string; // url
}

export interface GetOssDownloadStsTokenPayload extends ExtraFetchOptions {
	query: GetOssDownloadStsTokenQuery;
}
    
/**
 * @summary 请求文件下载的token
 * @description 需要提供oss file id 或者 url 以便提供精准的token，一个token只能下载一个唯一对应的文件，文件下载地址为localtion.path+location.name，location.name为oss中存放的用户名，已经转码过，不可恢复，原始文件名从oss file 详情中获取。token有效时间为15分钟。
 */
export async function getOssDownloadStsToken(payload: GetOssDownloadStsTokenPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<AliyunStsFeignResponse>(`/admin/oss/download-sts-token?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}


export interface GetOssUploadStsTokenQuery {
	type: string; // type
}

export interface GetOssUploadStsTokenPayload extends ExtraFetchOptions {
	query: GetOssUploadStsTokenQuery;
}
    
/**
 * @summary 请求文件上传的token
 * @description 不同的文件类型提供不同的type，会限制其上传文件存放的路径以及文件名，localtion.path+location.name为文件存放路径，前端自己添加任意扩展名，只能以此文件名上传。原始文件名请在http header的 Content-Disposition 中添加好（参考文档https://help.aliyun.com/document_detail/31978.html?spm=a2c4g.11186623.6.897.jyK0KM）。token有效时间为15分钟。
 */
export async function getOssUploadStsToken(payload: GetOssUploadStsTokenPayload) {
	const { query, ...extraFetchOptions } = payload;
    return request<AliyunStsFeignResponse>(`/admin/oss/upload-sts-token?${stringify(query)}`, {
		...extraFetchOptions,
        method: 'get',
    });
}


