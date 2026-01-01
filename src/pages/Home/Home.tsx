import React from 'react';
import { Typography, Paper, Box } from '@mui/material';

const Home: React.FC = () => {
    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Welcome to the Home Page
            </Typography>
            <Paper sx={{ p: 3 }}>
                <Typography variant="body1">
                    This is a responsive React application using Material UI and Zustand.
                    Check the Sidebar for more options.
                </Typography>
            </Paper>
        </Box>
    );
};

export default Home;
