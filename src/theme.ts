import { createTheme, ThemeOptions } from "@mui/material/styles";

// Define your theme options
const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "#4AA397",
    },
    secondary: {
      main: "#F1C55E",
    },
    error: {
      main: "#D2514A",
    },
    background: {
      default: "#F5F5F5",
      paper: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: '"Baloo 2", "Poppins", "Quicksand", sans-serif',
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
      color: "#4AA397",
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 600,
      color: "#4AA397",
    },
    h3: {
      fontSize: "1.50rem",
      fontWeight: 600,
      color: "#4AA397",
    },
    body1: {
      fontSize: "1rem",
      color: "#333",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          padding: "8px 16px",
          textTransform: "none",
          fontSize: "1rem",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          boxShadow: "0px 10px 15px rgba(0,0,0,0.15)",
        },
      },
    },
  },
};

// Create and export the theme
const theme = createTheme(themeOptions);

export default theme;
