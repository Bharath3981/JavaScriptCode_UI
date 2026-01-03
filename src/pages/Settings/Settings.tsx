import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Box, Typography, Paper, Tabs, Tab, TextField, Button, Avatar } from '@mui/material';
import { useAuthStore } from '../../store/useAuthStore';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

const Settings: React.FC = () => {
    const [value, setValue] = useState(0);
    const { user } = useAuthStore();

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        void _event;
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>Settings</Typography>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <Tabs value={value} onChange={handleChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tab label="My Account" />
                    <Tab label="Profile" />
                    <Tab label="Password" />
                    <Tab label="Team" disabled />
                    <Tab label="Billing" disabled />
                    <Tab label="Notifications" disabled />
                </Tabs>

                {/* My Account Tab */}
                <TabPanel value={value} index={0}>
                    <Typography variant="h6" gutterBottom>Account Preferences</Typography>
                    <Typography color="text.secondary">General account settings and preferences.</Typography>
                </TabPanel>

                {/* Profile Tab */}
                <TabPanel value={value} index={1}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
                        <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main', fontSize: '2rem' }}>
                            {user?.name?.charAt(0) || 'U'}
                        </Avatar>
                        <Button variant="outlined" component="label">
                            Change Avatar
                            <input type="file" hidden />
                        </Button>
                        <Button color="error">Remove</Button>
                    </Box>

                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField fullWidth label="Full Name" defaultValue={user?.name} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField fullWidth label="Email Address" defaultValue={user?.email} />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Button variant="contained">Save Changes</Button>
                        </Grid>
                    </Grid>
                </TabPanel>

                {/* Password Tab */}
                <TabPanel value={value} index={2}>
                    <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>Change Password</Typography>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField fullWidth label="Current Password" type="password" />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField fullWidth label="New Password" type="password" />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField fullWidth label="Confirm New Password" type="password" />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Button variant="contained">Update Password</Button>
                        </Grid>
                    </Grid>
                </TabPanel>
            </Paper>
        </Box>
    );
};

export default Settings;
