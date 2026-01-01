import React from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useSidebarStore } from '../../store/useSidebarStore';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
}));

interface MainLayoutProps {
    children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const { isOpen } = useSidebarStore();
    // We need to use Outlet if we use routing layouts, but user asked for "MainLayout" that wraps content.
    // This component expects 'children' to be passed or we can use Outlet here if we refactor App.tsx to use Layout routes.
    // For now I'll support children.

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Header />
            <Sidebar />
            <Main open={isOpen}>
                <Toolbar /> {/* Spacer for AppBar */}
                <Box sx={{ flex: 1 }}>
                    {children}
                </Box>
                <Footer />
            </Main>
        </Box>
    );
};

export default MainLayout;
