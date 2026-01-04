import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User, RegisterUserDto, LoginDto } from '../types';
import { register, login, logout } from '../api/authApi';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (dto: LoginDto) => Promise<void>;
    signup: (dto: RegisterUserDto) => Promise<void>;
    logout: () => Promise<void>;
    clearSession: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            login: async (dto) => {
                try {
                    const user = await login(dto);
                    set({ user, isAuthenticated: true });
                } catch (error) {
                    console.error('Login failed:', error);
                    throw error;
                }
            },
            signup: async (dto) => {
                try {
                    const newUser = await register(dto);
                    set({ user: newUser, isAuthenticated: true });
                } catch (error) {
                    console.error('Signup failed:', error);
                    throw error;
                }
            },
            logout: async () => {
                try {
                    await logout();
                } catch (error) {
                    console.error('Logout failed:', error);
                } finally {
                    set({ user: null, isAuthenticated: false });
                }
            },
            clearSession: () => {
                set({ user: null, isAuthenticated: false });
            },
        }),
        {
            name: 'auth-storage', // unique name for localStorage key
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                user: state.user
                    ? {
                        name: state.user.name,
                        email: state.user.email,
                        token: state.user.token,
                    }
                    : null,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
