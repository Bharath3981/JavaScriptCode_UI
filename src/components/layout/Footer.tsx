import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <Box sx={{ p: 2, textAlign: 'center', bgcolor: 'background.paper', mt: 'auto', borderTop: 1, borderColor: 'divider' }}>
            <Typography variant="body2" color="text.secondary">
                © {new Date().getFullYear()} React MIUI App. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
