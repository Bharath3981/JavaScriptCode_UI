export interface MenuItem {
    id: string;
    label: string;
    path?: string;
    icon?: string;
    children?: MenuItem[];
}

export interface User {
    id: string;
    name: string;
    role: 'admin' | 'user';
}
