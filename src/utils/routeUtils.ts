import type { MenuItem } from '../types';

export const flattenRoutes = (menus: MenuItem[]): MenuItem[] => {
    let flatRoutes: MenuItem[] = [];
    menus.forEach(menu => {
        if (menu.path) {
            flatRoutes.push(menu);
        }
        if (menu.children && menu.children.length > 0) {
            flatRoutes = [...flatRoutes, ...flattenRoutes(menu.children)];
        }
    });
    return flatRoutes;
};
