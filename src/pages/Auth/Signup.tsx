import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Link as MuiLink, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { Role } from '../../types';

const Signup: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<Role>(Role.USER);
    const { signup } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (email && password) {
            await signup({ email, password, name, role });
            navigate('/');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Typography component="h1" variant="h5" align="center" gutterBottom>
                Sign Up
            </Typography>
            <TextField
                margin="normal"
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
                margin="normal"
                fullWidth
                select
                label="Role"
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
            >
                <MenuItem value={Role.READONLY}>Read Only</MenuItem>
                <MenuItem value={Role.USER}>User</MenuItem>
                <MenuItem value={Role.ADMIN}>Admin</MenuItem>
                <MenuItem value={Role.SUPER_ADMIN}>Super Admin</MenuItem>
            </TextField>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Sign Up
            </Button>
            <Box sx={{ textAlign: 'center' }}>
                <MuiLink component={Link} to="/login" variant="body2">
                    {"Already have an account? Sign In"}
                </MuiLink>
            </Box>
        </Box>
    );
};

export default Signup;
