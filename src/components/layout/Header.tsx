import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useSidebarStore } from '../../store/useSidebarStore';
import { getMainMenus } from '../../services/menuService';
import type { MenuItem } from '../../types';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    const { toggleSidebar } = useSidebarStore();
    const [menus, setMenus] = useState<MenuItem[]>([]);

    useEffect(() => {
        getMainMenus().then(setMenus);
    }, []);

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={toggleSidebar}
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    React MIUI App
                </Typography>
                <Box sx={{ display: 'flex' }}>
                    {menus.map((menu) => (
                        <Button color="inherit" component={Link} to={menu.path || '#'} key={menu.id}>
                            {menu.label}
                        </Button>
                    ))}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
