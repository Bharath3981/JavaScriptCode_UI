import { lazy } from 'react';

// Lazy load components
// Lazy load components
const Dashboard = lazy(() => import('../pages/Home/Home'));
const Settings = lazy(() => import('../pages/Settings/Settings'));
const Profile = lazy(() => import('../pages/Profile/Profile'));
const UserManagement = lazy(() => import('../pages/Users/UserManagement'));

// Map of path keys to components
// The API returns paths like '/dashboard', '/settings', etc.
// We map these to the actual React components.
export const COMPONENT_MAP: Record<string, React.LazyExoticComponent<React.ComponentType<any>>> = {
    '/dashboard': Dashboard,
    '/home': Dashboard,
    '/settings': Settings,
    '/users/usermanagement': UserManagement,
    '/settings/profile': Profile,
    '/profile': Profile,
    '/examples/post': Dashboard, // Placeholder re-use
    '/examples/comment': Dashboard, // Placeholder re-use
};
