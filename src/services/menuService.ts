import type { MenuItem } from '../types';

import { getMenus } from '../api/menuApi';

const SIDEBAR_MENUS: MenuItem[] = [
    { id: 'dashboard', title: 'Dashboard', path: '/dashboard', icon: 'Dashboard' },
    { id: 'posts', title: 'Posts', path: '/posts', icon: 'Article' },
];

export const getMainMenus = async (): Promise<MenuItem[]> => {
    try {
        return await getMenus();
    } catch (error) {
        console.error('Failed to fetch menus:', error);
        return [];
    }
};

export const getSidebarMenus = async (): Promise<MenuItem[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(SIDEBAR_MENUS), 500);
    });
};
