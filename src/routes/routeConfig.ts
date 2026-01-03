import { lazy } from 'react';

// Lazy load components
// Lazy load components
const Dashboard = lazy(() => import('../pages/Home/Home'));
const Settings = lazy(() => import('../pages/Settings/Settings'));
const Profile = lazy(() => import('../pages/Profile/Profile'));
const UserManagement = lazy(() => import('../pages/Admin/Admin')); // Placeholder if not created yet

// Map of path keys to components
// The API returns paths like '/dashboard', '/settings', etc.
// We map these to the actual React components.
export const COMPONENT_MAP: Record<string, React.LazyExoticComponent<any>> = {
    '/dashboard': Dashboard,
    '/home': Dashboard,
    '/settings': Settings,
    '/users': UserManagement,
    '/settings/profile': Profile,
    '/profile': Profile,
    '/examples/post': Dashboard, // Placeholder re-use
    '/examples/comment': Dashboard, // Placeholder re-use
};
