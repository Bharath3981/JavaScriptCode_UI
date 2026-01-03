import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Home: React.FC = () => {
    return (
        <Box sx={{ border: '2px dashed red', p: 2 }}>
            <Typography variant="h3" color="primary" gutterBottom>
                LAYOUT SANITY CHECK
            </Typography>
            <Typography variant="body1" paragraph>
                If you see this text, the <strong>Router</strong> and <strong>MainLayout</strong> are working correctly.
            </Typography>
            <Typography variant="body1">
                The red dashed border marks the boundaries of the "Content Area".
                If this is NOT visible or overlaps the sidebar, the flex container in MainLayout is broken.
            </Typography>

            <Box sx={{ mt: 4, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                <Paper sx={{ p: 4, bgcolor: '#e3f2fd' }}>Left Widget</Paper>
                <Paper sx={{ p: 4, bgcolor: '#f3e5f5' }}>Right Widget</Paper>
            </Box>
        </Box>
    );
};

export default Home;
