
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import SettingsIcon from '@mui/icons-material/Settings';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import HomeIcon from '@mui/icons-material/Home';

export const getIcon = (iconName?: string) => {
    switch (iconName) {
        case 'Dashboard': return <DashboardIcon />;
        case 'Article': return <ArticleIcon />;
        case 'Settings': return <SettingsIcon />;
        case 'Brightness4': return <Brightness4Icon />;
        case 'Home': return <HomeIcon />;
        default: return null;
    }
};
