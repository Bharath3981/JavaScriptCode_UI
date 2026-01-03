import axios from 'axios';

// Create separate clients if you need different configs for Auth, User, etc.
// For now, they might share the same base URL.
// Helper to attach token to requests
const attachTokenInterceptor = (client: any) => {
    client.interceptors.request.use((config: any) => {
        // Read from Zustand persist storage
        const storageStr = localStorage.getItem('auth-storage');
        if (storageStr) {
            try {
                const storage = JSON.parse(storageStr);
                const token = storage.state?.user?.token;
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            } catch (e) {
                // Ignore parse error
            }
        }
        return config;
    }, (error: any) => {
        return Promise.reject(error);
    });
};

export const AuthRestClient = axios.create({
    baseURL: 'http://localhost:3000/api/auth',
    headers: {
        'Content-Type': 'application/json',
    },
});
attachTokenInterceptor(AuthRestClient);

// ... (existing code)

export const UserRestClient = axios.create({
    baseURL: 'http://localhost:3000/api/users',
    headers: {
        'Content-Type': 'application/json',
    },
});
attachTokenInterceptor(UserRestClient);

export const MenuRestClient = axios.create({
    baseURL: 'http://localhost:3000/api/menus',
    headers: {
        'Content-Type': 'application/json',
    },
});
attachTokenInterceptor(MenuRestClient);
