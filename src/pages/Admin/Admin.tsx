import React from 'react';
import { Typography, Paper, Box, Alert } from '@mui/material';

const Admin: React.FC = () => {
    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Admin Dashboard
            </Typography>
            <Alert severity="info" sx={{ mb: 2 }}>
                This area is restricted to administrators.
            </Alert>
            <Paper sx={{ p: 3 }}>
                <Typography variant="body1">
                    Admin settings and controls will appear here.
                </Typography>
            </Paper>
        </Box>
    );
};

export default Admin;
