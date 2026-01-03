import React from 'react';
import { AppBar, Toolbar, IconButton, Box, Avatar, Badge, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeStore } from '../../store/useThemeStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useMenuStore } from '../../store/useMenuStore';
import { useNavigate } from 'react-router-dom';
import { DRAWER_WIDTH } from './Sidebar'; // Import shared constant

interface HeaderProps {
    onDrawerToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onDrawerToggle }) => {
    const { mode, toggleTheme } = useThemeStore();
    const { user } = useAuthStore();
    const { menus, activeRootId, setActiveRoot } = useMenuStore();
    const navigate = useNavigate();

    const handleMenuClick = (menu: any) => {
        setActiveRoot(menu.id);

        // precise handling for # paths or empty paths
        if (menu.path && !menu.path.startsWith('#')) {
            navigate(menu.path);
        } else if (menu.children && menu.children.length > 0) {
            // Priority 1: Check if any child is marked as default
            const defaultChild = menu.children.find((c: any) => c.isDefault && c.path && !c.path.startsWith('#'));

            // Priority 2: Fallback to first navigable child
            const targetChild = defaultChild || menu.children.find((c: any) => c.path && !c.path.startsWith('#'));

            if (targetChild) {
                navigate(targetChild.path);
            }
        }
    };

    return (
        <AppBar
            position="fixed"
            color="inherit"
            elevation={0}
            sx={{
                width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
                ml: { sm: `${DRAWER_WIDTH}px` },
                borderBottom: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper'
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={onDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Box>

                {/* Right Actions */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {/* Banner Menus (Root Level) */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, mr: 2 }}>
                        {menus.map(menu => (
                            <Button
                                key={menu.id}
                                onClick={() => handleMenuClick(menu)}
                                sx={{
                                    color: activeRootId === menu.id ? 'primary.main' : 'text.secondary',
                                    fontWeight: activeRootId === menu.id ? 700 : 500,
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    borderRadius: 2,
                                    px: 2,
                                    '&:hover': { bgcolor: 'action.hover' }
                                }}
                            >
                                {menu.title}
                            </Button>
                        ))}
                    </Box>

                    <IconButton onClick={toggleTheme} color="inherit">
                        {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <Box sx={{
                        display: 'flex', alignItems: 'center', gap: 1,
                        ml: 1,
                        p: 0.5, pr: 1.5,
                        borderRadius: 50,
                        cursor: 'pointer',
                        '&:hover': { bgcolor: 'action.hover' }
                    }}>
                        <Avatar
                            sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}
                        >
                            {user?.name?.charAt(0)}
                        </Avatar>
                        <Typography variant="body2" fontWeight={600} sx={{ display: { xs: 'none', sm: 'block' } }}>
                            {user?.name}
                        </Typography>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
