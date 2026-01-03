import { create } from 'zustand';
import type { MenuItem } from '../types';

interface MenuState {
    menus: MenuItem[];
    activeRootId: string | null;
    setMenus: (menus: MenuItem[]) => void;
    setActiveRoot: (id: string | null) => void;
}

export const useMenuStore = create<MenuState>((set) => ({
    menus: [],
    activeRootId: null,
    setMenus: (menus) => set({ menus }),
    setActiveRoot: (id) => set({ activeRootId: id }),
}));
