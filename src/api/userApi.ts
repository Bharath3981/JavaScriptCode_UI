import { UserRestClient } from './clients';
import type { User } from '../types';

export const getUsers = async (): Promise<User[]> => {
    const response = await UserRestClient.get('/');
    // The API returns { data: User[], ... } based on the provided JSON
    return response.data.data;
};

export const createUser = async (data: Partial<User>): Promise<User> => {
    const response = await UserRestClient.post('/', data);
    return response.data.data;
};

export const updateUser = async (id: string, data: Partial<User>): Promise<User> => {
    const response = await UserRestClient.put(`/${id}`, data);
    return response.data.data;
};

export const deleteUser = async (id: string): Promise<void> => {
    await UserRestClient.delete(`/${id}`);
};
