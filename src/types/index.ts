export interface MenuItem {
    id: string;
    title: string;
    path?: string;
    icon?: string;
    requiredPermission?: string;
    isDefault?: boolean;
    children?: MenuItem[];
}

export interface User {
    id?: string;
    name: string;
    email: string;
    role?: Role;
    token?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    code: string;
}

export interface AuthResponseData {
    user: User;
    token: string;
}

export type Role = 'ADMIN' | 'USER';
export const Role = {
    ADMIN: 'ADMIN' as Role,
    USER: 'USER' as Role
};

export interface RegisterUserDto {
    email: string;
    password: string;
    name?: string;
    role?: Role;
}

export interface LoginDto {
    email: string;
    password: string;
}
