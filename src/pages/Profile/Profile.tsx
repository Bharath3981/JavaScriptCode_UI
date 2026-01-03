import React from 'react';
import Grid from '@mui/material/Grid';
import { Box, Typography, Paper, Avatar, Button, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useAuthStore } from '../../store/useAuthStore';

const Profile: React.FC = () => {
    const { user } = useAuthStore();

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <Paper sx={{ p: 4, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
                    <Box sx={{ display: 'flex', gap: 3 }}>
                        <Avatar
                            sx={{
                                width: 100,
                                height: 100,
                                bgcolor: 'primary.main',
                                fontSize: '2.5rem',
                                boxShadow: 2
                            }}
                        >
                            {user?.name?.charAt(0) || 'U'}
                        </Avatar>
                        <Box sx={{ mt: 1 }}>
                            <Typography variant="h4" sx={{ fontWeight: 700 }}>{user?.name}</Typography>
                            <Typography variant="body1" color="text.secondary">{user?.role || 'User'}</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>San Francisco, CA</Typography>
                        </Box>
                    </Box>
                    <Button variant="outlined" startIcon={<EditIcon />}>
                        Edit Profile
                    </Button>
                </Box>

                <Divider sx={{ mb: 4 }} />

                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Personal Information</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box>
                                <Typography variant="caption" color="text.secondary">Full Name</Typography>
                                <Typography variant="body1">{user?.name}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" color="text.secondary">Email Address</Typography>
                                <Typography variant="body1">{user?.email}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" color="text.secondary">Phone</Typography>
                                <Typography variant="body1">+1 (555) 123-4567</Typography>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Address</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box>
                                <Typography variant="caption" color="text.secondary">Country</Typography>
                                <Typography variant="body1">United States</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" color="text.secondary">City/State</Typography>
                                <Typography variant="body1">San Francisco, California</Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default Profile;
