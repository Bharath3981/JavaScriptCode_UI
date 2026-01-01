import React, { useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useThemeStore } from './store/useThemeStore';
import { getTheme } from './theme/theme';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';

const App: React.FC = () => {
  const { mode } = useThemeStore();

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Home />} /> {/* Fallback */}
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
