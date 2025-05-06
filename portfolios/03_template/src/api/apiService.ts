import { CommonDataResponse, CommonListResponse } from "../dtos/common.dto";
import apiClient from "./apiClient";
import fileApiClient from "./fileApiClient";

interface TClass<T> {
  new (...args: any[]): T;
}

export const apiService = {
  // GET data 요청
  getData: async <T>(
    url: string, 
    params?: Record<string, any>,
    ClassRef?: new (d?: Partial<T>) => T
  ): Promise<CommonDataResponse<T>> => {
    const response = await apiClient.get(url, { params });
  
    return new CommonDataResponse<T>(response.data, ClassRef);
  },

  // GET list 요청
  getList: async <T>(
    url: string, 
    params?: Record<string, any>,
    ClassRef?: new (d?: Partial<T>) => T
  ): Promise<CommonListResponse<T>> => {
    const response = await apiClient.get(url, { params });
  
    return new CommonListResponse<T>(response.data, ClassRef);
  },

  // POST 요청
  postData: async <T>(
    url: string,
    data?: Record<string, any>,
    ClassRef?: new (d?: Partial<T>) => T
  ): Promise<CommonDataResponse<T>> => {
    const response = await apiClient.post(url, data);
  
    return new CommonDataResponse<T>(response.data, ClassRef);
  },

  postList: async <T>(
    url: string, 
    params?: Record<string, any>,
    ClassRef?: new (d?: Partial<T>) => T
  ): Promise<CommonListResponse<T>> => {
    const response = await apiClient.get(url, { params });
  
    return new CommonListResponse<T>(response.data, ClassRef);
  },

  post: async <T>(
    url: string,
    data?: Record<string, any>,
    ClassRef?: TClass<T>
  ): Promise<T> => {
    const response = await apiClient.post<T>(url, data);
    return ClassRef ? new ClassRef(response.data) : response.data;
  },

  // PUT 요청
  putData: async <T>(
    url: string,
    data?: Record<string, any>,
    ClassRef?: new (d?: Partial<T>) => T
  ): Promise<CommonDataResponse<T>> => {
    const response = await apiClient.put(url, data);
  
    return new CommonDataResponse<T>(response.data, ClassRef);
  },

  put: async <T>(url: string, data?: Record<string, any>): Promise<T> => {
    const response = await apiClient.put<T>(url, data);
    return response.data;
  },

  // DELETE 요청
  deleteData: async <T>(
    url: string,
    data?: Record<string, any>,
    ClassRef?: new (d?: Partial<T>) => T
  ): Promise<CommonDataResponse<T>> => {
    const response = await apiClient.delete(url, { data });
  
    return new CommonDataResponse<T>(response.data, ClassRef);
  },

  delete: async <T>(url: string, data?: Record<string, any>): Promise<T> => {
    const response = await apiClient.delete<T>(url, { data });
    return response.data;
  },
};