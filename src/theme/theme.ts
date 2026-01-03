import { createTheme, alpha } from '@mui/material/styles';

const FONT_FAMILY = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"';

// TailPanel-inspired palette
const colors = {
    primary: '#2563EB', // Blue 600
    primaryLight: '#60A5FA', // Blue 400
    darkBg: '#0F172A', // Slate 900
    darkPaper: '#1E293B', // Slate 800
    darkSidebar: '#020617', // Slate 950
    lightBg: '#F8FAFC', // Slate 50
    lightPaper: '#FFFFFF',
    textPrimaryDark: '#F1F5F9', // Slate 100
    textSecondaryDark: '#94A3B8', // Slate 400
    textPrimaryLight: '#1E293B', // Slate 800
    textSecondaryLight: '#64748B', // Slate 500
    dividerDark: '#334155', // Slate 700
    dividerLight: '#E2E8F0', // Slate 200
};

export const getTheme = (mode: 'light' | 'dark') => createTheme({
    palette: {
        mode,
        primary: {
            main: colors.primary,
            contrastText: '#ffffff',
        },
        background: {
            default: mode === 'dark' ? colors.darkBg : colors.lightBg,
            paper: mode === 'dark' ? colors.darkPaper : colors.lightPaper,
        },
        text: {
            primary: mode === 'dark' ? colors.textPrimaryDark : colors.textPrimaryLight,
            secondary: mode === 'dark' ? colors.textSecondaryDark : colors.textSecondaryLight,
        },
        divider: mode === 'dark' ? colors.dividerDark : colors.dividerLight,
    },
    typography: {
        fontFamily: FONT_FAMILY,
        h1: { fontWeight: 700 }, // bold headings
        h2: { fontWeight: 700 },
        h3: { fontWeight: 700 },
        h4: { fontWeight: 600 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 },
        button: { textTransform: 'none', fontWeight: 600 },
    },
    shape: {
        borderRadius: 12, // rounded-xl Look
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    scrollbarColor: mode === 'dark' ? '#334155 #0F172A' : '#CBD5E1 #F1F5F9',
                    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                        backgroundColor: 'transparent',
                        width: 8,
                    },
                    '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                        borderRadius: 8,
                        backgroundColor: mode === 'dark' ? '#334155' : '#CBD5E1',
                        minHeight: 24,
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '8px 16px',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
                containedPrimary: {
                    background: `linear-gradient(to bottom right, ${colors.primary}, ${colors.primary})`,
                    '&:hover': {
                        background: `linear-gradient(to bottom right, ${colors.primary}, ${colors.primary})`,
                        filter: 'brightness(1.1)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none', // Remove elevation overlay in dark mode
                    boxShadow: mode === 'light' ? '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' : '0 1px 3px 0 rgb(0 0 0 / 0.3)', // tailwind shadow-sm
                },
                rounded: {
                    borderRadius: 12,
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: mode === 'dark' ? alpha(colors.darkBg, 0.8) : alpha(colors.lightPaper, 0.8),
                    backdropFilter: 'blur(8px)',
                    boxShadow: 'none',
                    borderBottom: `1px solid ${mode === 'dark' ? colors.dividerDark : colors.dividerLight}`,
                    color: mode === 'dark' ? colors.textPrimaryDark : colors.textPrimaryLight,
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: mode === 'dark' ? colors.darkSidebar : colors.lightBg,
                    borderRight: `1px solid ${mode === 'dark' ? colors.dividerDark : colors.dividerLight}`,
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    margin: '4px 8px',
                    '&.Mui-selected': {
                        backgroundColor: mode === 'dark' ? alpha(colors.primary, 0.15) : alpha(colors.primary, 0.1),
                        color: colors.primary,
                        '&:hover': {
                            backgroundColor: mode === 'dark' ? alpha(colors.primary, 0.25) : alpha(colors.primary, 0.15),
                        },
                        '& .MuiListItemIcon-root': {
                            color: colors.primary,
                        },
                    },
                    '&:hover': {
                        backgroundColor: mode === 'dark' ? alpha(colors.textSecondaryDark, 0.05) : alpha(colors.textSecondaryLight, 0.05),
                    },
                },
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    minWidth: 40,
                    color: mode === 'dark' ? colors.textSecondaryDark : colors.textSecondaryLight,
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    backgroundColor: mode === 'dark' ? alpha(colors.darkPaper, 0.5) : alpha(colors.lightBg, 0.5),
                    borderRadius: 8,
                },
            },
        },
    },
});
