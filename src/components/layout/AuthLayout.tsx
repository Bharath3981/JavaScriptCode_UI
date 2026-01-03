import React from 'react';
import { Container, Box, Paper, Typography } from '@mui/material';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

const AuthLayout: React.FC = () => {
    const { isAuthenticated } = useAuthStore();

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
                    MyApp
                </Typography>
                <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 2 }}>
                    <Outlet />
                </Paper>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
                    © {new Date().getFullYear()} MyApp. All rights reserved.
                </Typography>
            </Box>
        </Container>
    );
};

export default AuthLayout;
