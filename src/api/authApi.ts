import { AuthRestClient } from './clients';
import type { RegisterUserDto, User, LoginDto, ApiResponse, AuthResponseData } from '../types';

export const register = async (dto: RegisterUserDto): Promise<User> => {
    const response = await AuthRestClient.post<User>('/register', dto);
    return response.data;
};

export const login = async (dto: LoginDto): Promise<User> => {
    const response = await AuthRestClient.post<ApiResponse<AuthResponseData>>('/login', dto);
    const { user, token } = response.data.data;
    // Merge token into user object for compatibility with store
    return { ...user, token };
};

export const logout = async (): Promise<void> => {
    await AuthRestClient.post('/logout');
};
