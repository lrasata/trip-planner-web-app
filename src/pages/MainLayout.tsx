import { Container, ThemeProvider } from "@mui/material";
import theme from "../theme.ts";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import MainNavigationContainer from "../containers/MainNavigationContainer.tsx";
import Box from "@mui/material/Box";
import { CookiesProvider } from "react-cookie";

const MainLayout = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CookiesProvider defaultSetOptions={{ path: "/" }}>
          <Container maxWidth="lg">
            <MainNavigationContainer />
            <Box my={10}>
              <Outlet />
            </Box>
          </Container>
        </CookiesProvider>
      </ThemeProvider>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default MainLayout;
