import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useThemeStore } from './store/useThemeStore';
import { useAuthStore } from './store/useAuthStore';
import { getTheme } from './theme/theme';
import MainLayout from './components/layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import { COMPONENT_MAP } from './routes/routeConfig';
import { getMainMenus } from './services/menuService';
import type { MenuItem } from './types';

// Protected Route Wrapper
const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

import { flattenRoutes } from './utils/routeUtils';

const App: React.FC = () => {
  const { mode } = useThemeStore();
  const [routes, setRoutes] = useState<MenuItem[]>([]);

  useEffect(() => {
    getMainMenus().then(menus => {
      setRoutes(flattenRoutes(menus));
    });
  }, []);

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route index element={(() => {
                const defaultRoute = routes.find(r => r.isDefault);
                return defaultRoute && defaultRoute.path ? <Navigate to={defaultRoute.path} replace /> : <Home />;
              })()} />
              {routes.map(route => {
                const Component = route.path && COMPONENT_MAP[route.path];
                return Component ? (
                  <Route
                    key={route.id}
                    path={route.path}
                    element={
                      <Suspense fallback={<div>Loading...</div>}>
                        <Component />
                      </Suspense>
                    }
                  />
                ) : null;
              })}
              <Route path="*" element={<Home />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
