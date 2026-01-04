import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
    Box, Drawer, List, ListItem, ListItemButton,
    ListItemIcon, ListItemText, Typography, Avatar, Divider,
    useTheme, alpha
} from '@mui/material';
import { useMenuStore } from '../../store/useMenuStore';
import { getIcon } from '../../utils/getIcon';
import { useAuthStore } from '../../store/useAuthStore';

// Define the drawer width constant here or import from a constants file
export const DRAWER_WIDTH = 240;

interface SidebarProps {
    mobileOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onClose }) => {
    const theme = useTheme();
    const location = useLocation();
    const { user } = useAuthStore();
    const { menus, activeRootId } = useMenuStore();

    // Derive displayed menus from active root
    const displayMenus = (menus.find(m => m.id === activeRootId)?.children || [])
        .filter((child: any) => child.placement !== 'CONTEXT_MENU');

    // Auto-open logic can be handled here if needed, but for now we trust `displayMenus` array.

    const drawerContent = (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Logo Area */}
            <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{
                    width: 35, height: 35,
                    bgcolor: 'primary.main',
                    borderRadius: 1.5,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: 'bold', fontSize: '1.1rem',
                    boxShadow: '0px 4px 10px rgba(0,0,0,0.1)'
                }}>
                    TP
                </Box>
                <Typography variant="h6" fontWeight={700} color="text.primary" sx={{ letterSpacing: '-0.5px' }}>
                    TailPanel
                </Typography>
            </Box>

            <List sx={{ flex: 1, px: 1.5 }}>
                {displayMenus.map((menu) => {
                    const isActive = location.pathname === menu.path;
                    return (
                        <ListItem key={menu.id} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                                component={Link}
                                to={menu.path || '#'}
                                onClick={onClose}
                                sx={{
                                    borderRadius: 2,
                                    py: 1, // Compact padding
                                    minHeight: 44,
                                    transition: 'all 0.2s',
                                    bgcolor: isActive ? 'primary.soft' : 'transparent',
                                    color: isActive ? 'primary.main' : 'text.secondary',
                                    '&:hover': {
                                        bgcolor: 'action.hover',
                                        color: 'primary.main',
                                        transform: 'translateX(3px)'
                                    },
                                    ...(isActive && {
                                        bgcolor: alpha(theme.palette.primary.main, 0.08),
                                    })
                                }}
                            >
                                <ListItemIcon sx={{
                                    minWidth: 36,
                                    color: isActive ? 'primary.main' : 'inherit'
                                }}>
                                    {getIcon(menu.icon)}
                                </ListItemIcon>
                                <ListItemText
                                    primary={menu.title}
                                    primaryTypographyProps={{
                                        fontWeight: isActive ? 600 : 500,
                                        fontSize: '0.9rem'
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

            <Divider sx={{ my: 1.5 }} />

            {/* Profile Footer */}
            <Box sx={{ p: 1.5 }}>
                <Box sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    display: 'flex', alignItems: 'center', gap: 1.5,
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'all 0.2s',
                    '&:hover': { borderColor: 'primary.main' }
                }}>
                    <Avatar
                        sx={{ bgcolor: 'primary.main', width: 36, height: 36, fontSize: '0.9rem' }}
                    >
                        {user?.name?.charAt(0)}
                    </Avatar>
                    <Box sx={{ overflow: 'hidden' }}>
                        <Typography variant="subtitle2" noWrap sx={{ fontSize: '0.875rem' }}>{user?.name}</Typography>
                        <Typography variant="caption" color="text.secondary" noWrap display="block" sx={{ fontSize: '0.75rem' }}>
                            {user?.role}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );

    return (
        <Box
            component="nav"
            sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            {/* Mobile Drawer (Temporary) */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={onClose}
                ModalProps={{ keepMounted: true }} // Better open performance on mobile.
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
                }}
            >
                {drawerContent}
            </Drawer>

            {/* Desktop Drawer (Permanent) */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
                }}
                open
            >
                {drawerContent}
            </Drawer>
        </Box>
    );
};

export default Sidebar;
