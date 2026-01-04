import axios from 'axios';

// Create separate clients if you need different configs for Auth, User, etc.
// For now, they might share the same base URL.
// Helper to attach token to requests
import { useAuthStore } from '../store/useAuthStore';

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

// Helper to handle 401 Unauthorized responses
const attachResponseInterceptor = (client: any) => {
    client.interceptors.response.use(
        (response: any) => response,
        async (error: any) => {
            if (error.response && error.response.status === 401) {
                // Clear auth state
                await useAuthStore.getState().logout();

                // Redirect to login if not already there
                if (!window.location.pathname.includes('/login')) {
                    window.location.href = '/login';
                }
            }
            return Promise.reject(error);
        }
    );
};

export const AuthRestClient = axios.create({
    baseURL: 'http://localhost:3000/api/auth',
    headers: {
        'Content-Type': 'application/json',
    },
});
attachTokenInterceptor(AuthRestClient);
attachResponseInterceptor(AuthRestClient);

export const UserRestClient = axios.create({
    baseURL: 'http://localhost:3000/api/users',
    headers: {
        'Content-Type': 'application/json',
    },
});
attachTokenInterceptor(UserRestClient);
attachResponseInterceptor(UserRestClient);

export const MenuRestClient = axios.create({
    baseURL: 'http://localhost:3000/api/menus',
    headers: {
        'Content-Type': 'application/json',
    },
});
attachTokenInterceptor(MenuRestClient);
attachResponseInterceptor(MenuRestClient);
