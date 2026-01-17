import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button
} from '@mui/material';
import type { User } from '../../../types';

interface UserDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: Partial<User>) => void;
    initialData?: User | null;
    mode: 'add' | 'edit';
}

const UserDialog: React.FC<UserDialogProps> = ({
    open,
    onClose,
    onSubmit,
    initialData,
    mode
}) => {
    const [name, setName] = useState(initialData?.name || '');
    const [email, setEmail] = useState(initialData?.email || '');

    // No useEffect needed if we remount the component on open

    const handleSubmit = () => {
        onSubmit({ name, email });
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{mode === 'add' ? 'Add New User' : 'Edit User'}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    margin="dense"
                    id="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={mode === 'edit'} // Usually email is immutable or requires stricter validation
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" disabled={!name || !email}>
                    {mode === 'add' ? 'Add' : 'Save'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserDialog;
