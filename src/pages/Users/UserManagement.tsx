import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Container, Alert, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { getUsers, createUser, updateUser, deleteUser } from '../../api/userApi';
import type { User } from '../../types';
import UserListTable from './components/UserListTable';
import UserDialog from './components/UserDialog';
import DeleteConfirmDialog from './components/DeleteConfirmDialog';

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Dialog States
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await getUsers();
            setUsers(data);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch users', err);
            setError('Failed to load users. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log('[UserManagement] Component Mounted');
        fetchUsers();
    }, []);

    const handleAddUser = async (data: Partial<User>) => {
        try {
            await createUser(data);
            setIsAddOpen(false);
            fetchUsers();
        } catch (err) {
            console.error('Failed to create user', err);
            // In a real app, I'd show a snackbar here
        }
    };

    const handleEditUser = async (data: Partial<User>) => {
        if (!selectedUser?.id) return;
        try {
            await updateUser(selectedUser.id, data);
            setIsEditOpen(false);
            fetchUsers();
        } catch (err) {
            console.error('Failed to update user', err);
        }
    };

    const handleDeleteUser = async () => {
        if (!selectedUser?.id) return;
        try {
            await deleteUser(selectedUser.id);
            setIsDeleteOpen(false);
            fetchUsers();
        } catch (err) {
            console.error('Failed to delete user', err);
        }
    };

    const openEditDialog = (user: User) => {
        setSelectedUser(user);
        setIsEditOpen(true);
    };

    const openDeleteDialog = (user: User) => {
        setSelectedUser(user);
        setIsDeleteOpen(true);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" component="h1">
                    User Management
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setIsAddOpen(true)}
                >
                    Add User
                </Button>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            {loading ? (
                <Box display="flex" justifyContent="center" my={4}>
                    <CircularProgress />
                </Box>
            ) : (
                <UserListTable
                    users={users}
                    onEdit={openEditDialog}
                    onDelete={openDeleteDialog}
                />
            )}

            {isAddOpen && (
                <UserDialog
                    open={isAddOpen}
                    onClose={() => setIsAddOpen(false)}
                    onSubmit={handleAddUser}
                    mode="add"
                />
            )}

            {isEditOpen && (
                <UserDialog
                    open={isEditOpen}
                    onClose={() => setIsEditOpen(false)}
                    onSubmit={handleEditUser}
                    initialData={selectedUser}
                    mode="edit"
                />
            )}

            <DeleteConfirmDialog
                open={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={handleDeleteUser}
                title="Delete User"
                description={`Are you sure you want to delete user "${selectedUser?.name}"? This action cannot be undone.`}
            />
        </Container>
    );
};

export default UserManagement;
