import type { MenuItem } from '../types';

const MAIN_MENUS: MenuItem[] = [
    { id: '1', label: 'Home', path: '/' },
    { id: '2', label: 'Admin', path: '/admin' },
];

const SIDEBAR_MENUS: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: 'Dashboard' },
    { id: 'posts', label: 'Posts', path: '/posts', icon: 'Article' },
    {
        id: 'settings',
        label: 'Settings',
        icon: 'Settings',
        children: [
            { id: 'theme', label: 'Theme', icon: 'Brightness4' } // Special handler for theme
        ]
    },
];

export const getMainMenus = async (): Promise<MenuItem[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(MAIN_MENUS), 500);
    });
};

export const getSidebarMenus = async (): Promise<MenuItem[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(SIDEBAR_MENUS), 500);
    });
};
