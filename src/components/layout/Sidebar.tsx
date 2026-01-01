import React, { useEffect, useState } from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Collapse, Switch } from '@mui/material';
import { useSidebarStore } from '../../store/useSidebarStore';
import { useThemeStore } from '../../store/useThemeStore';
import { getSidebarMenus } from '../../services/menuService';
import type { MenuItem } from '../../types';
import { getIcon } from '../../utils/getIcon';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar: React.FC = () => {
    const { isOpen } = useSidebarStore();
    const { mode, toggleTheme } = useThemeStore();
    const [menus, setMenus] = useState<MenuItem[]>([]);
    const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

    useEffect(() => {
        getSidebarMenus().then(setMenus);
    }, []);

    const handleSubmenuClick = (id: string) => {
        setOpenSubmenus((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const renderMenu = (menu: MenuItem, nested = false) => {
        const hasChildren = menu.children && menu.children.length > 0;
        const isThemeToggle = menu.id === 'theme';

        if (isThemeToggle) {
            return (
                <ListItem key={menu.id} disablePadding sx={{ pl: nested ? 4 : 0 }}>
                    <ListItemButton onClick={toggleTheme}>
                        <ListItemIcon>{getIcon(menu.icon)}</ListItemIcon>
                        <ListItemText primary="Dark Mode" />
                        <Switch checked={mode === 'dark'} onChange={toggleTheme} />
                    </ListItemButton>
                </ListItem>
            );
        }

        return (
            <React.Fragment key={menu.id}>
                <ListItem disablePadding sx={{ pl: nested ? 4 : 0 }}>
                    <ListItemButton
                        component={hasChildren ? 'div' : Link}
                        to={hasChildren ? undefined : menu.path}
                        onClick={() => hasChildren && handleSubmenuClick(menu.id)}
                    >
                        <ListItemIcon>{getIcon(menu.icon)}</ListItemIcon>
                        <ListItemText primary={menu.label} />
                        {hasChildren ? (openSubmenus[menu.id] ? <ExpandLess /> : <ExpandMore />) : null}
                    </ListItemButton>
                </ListItem>
                {hasChildren && (
                    <Collapse in={openSubmenus[menu.id]} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {menu.children!.map((child) => renderMenu(child, true))}
                        </List>
                    </Collapse>
                )}
            </React.Fragment>
        );
    };

    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={isOpen}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    {menus.map((menu) => renderMenu(menu))}
                </List>
            </Box>
        </Drawer>
    );
};

import { Box } from '@mui/material';

export default Sidebar;
