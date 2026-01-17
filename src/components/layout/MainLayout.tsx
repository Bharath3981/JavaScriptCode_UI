import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { useLocation, Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar, { DRAWER_WIDTH } from './Sidebar';
import { useMenuStore } from '../../store/useMenuStore';

interface MainLayoutProps {
    children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { setActiveRoot, menus, activeRootId } = useMenuStore();

    // Determine if we should show the sidebar
    // We only show it if the *active* menu has children that are NOT context menus
    const displayMenus = (menus.find(m => m.id === activeRootId)?.children || [])
        .filter((child: any) => child.placement !== 'CONTEXT_MENU');

    const showSidebar = displayMenus.length > 0;
    const location = useLocation();

    // Sync Active Root based on URL
    useEffect(() => {
        if (menus.length > 0) {
            const findRootForPath = (menuList: any[], currentPath: string): string | undefined => {
                for (const menu of menuList) {
                    // Check if this menu matches
                    if (menu.path && menu.path !== '#' && currentPath.startsWith(menu.path)) {
                        return menu.id;
                    }
                    // Check children recursively (but we only care about TOP level ID)
                    // Actually, we just need to know if *any* child matches, return THIS menu's ID.
                    if (menu.children && menu.children.length > 0) {
                        const hasChildMatch = menu.children.some((child: any) =>
                            child.path && child.path !== '#' && currentPath.startsWith(child.path)
                        );
                        if (hasChildMatch) return menu.id;
                    }
                }
                return undefined;
            };

            const rootId = findRootForPath(menus, location.pathname);
            if (rootId) {
                setActiveRoot(rootId);
            } else if (!activeRootId && menus.length > 0) {
                // Fallback to isDefault menu or the first one
                const defaultMenu = menus.find(m => m.isDefault);
                setActiveRoot(defaultMenu ? defaultMenu.id : menus[0].id);
            }
        }
    }, [location.pathname, menus, setActiveRoot, activeRootId]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* Header controls spacing and mobile toggle */}
            <Header onDrawerToggle={handleDrawerToggle} showSidebar={showSidebar} />

            {/* Sidebar handles its own fixed width and responsive hiding */}
            {showSidebar && (
                <Sidebar mobileOpen={mobileOpen} onClose={handleDrawerToggle} />
            )}

            {/* Main Content Area */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: showSidebar ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%' },
                    minHeight: '100vh',
                    bgcolor: 'background.default'
                }}
            >
                <Toolbar /> {/* Spacer underneath Fixed AppBar */}
                {children || <Outlet />}
            </Box>
        </Box>
    );
};

export default MainLayout;
