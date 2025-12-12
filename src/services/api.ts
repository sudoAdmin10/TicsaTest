import axios from 'axios';
import type { PostModel, FormPostModel } from '../store/types';

const API_URL = 'https://jsonplaceholder.typicode.com';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPost = async (): Promise<PostModel[]> => {
  const response = await axiosInstance.get<PostModel[]>('/posts');
  return response.data;
};

export const createPost = async (postData: FormPostModel): Promise<PostModel> => {
  const response = await axiosInstance.post<PostModel>('/posts', {
    title: postData.title,
    body: postData.body,
    userId: 1,
  });
  
  return {
    ...response.data,
    id: Date.now(),
  };
};

export const updatePost = async (id: number, postData: FormPostModel): Promise<PostModel> => {
  const response = await axiosInstance.put<PostModel>(`/posts/${id}`, {
    title: postData.title,
    body: postData.body,
    userId: 1,
  });
  return { ...response.data, id };
};

export const deletePost = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/posts/${id}`);
};