import { createTheme, ThemeOptions } from '@mui/material/styles';

// Define your theme options
const themeOptions: ThemeOptions = {
    palette: {
        primary: {
            main: '#4AA397',
        },
        secondary: {
            main: '#F1C55E',
        },
        error: {
            main: '#D2514A',
        },
        background: {
            default: '#F5F5F5',
        },
    },
    typography: {
        fontFamily: '"Baloo 2", "Poppins", "Quicksand", sans-serif',
        h1: {
            fontSize: '2rem',
            fontWeight: 700,
            color: '#4AA397',
        },
        h2: {
            fontSize: '1.75rem',
            fontWeight: 600,
            color: '#4AA397',
        },
        body1: {
            fontSize: '1rem',
            color: '#333',
        }
    },
    shape: {
        borderRadius: 12,
    },
};

// Create and export the theme
const theme = createTheme(themeOptions);

export default theme;
