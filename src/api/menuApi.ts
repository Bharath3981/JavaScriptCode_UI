import { MenuRestClient } from './clients';
import type { MenuItem, ApiResponse } from '../types';

export const getMenus = async (): Promise<MenuItem[]> => {
    const response = await MenuRestClient.get<ApiResponse<MenuItem[]>>('/');
    return response.data.data;
};
