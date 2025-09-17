import { Container, ThemeProvider } from "@mui/material";
import theme from "../../theme.ts";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import MainNavigationContainer from "../containers/MainNavigationContainer.tsx";

const MainLayout = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg">
          <MainNavigationContainer />
          <Outlet />
        </Container>
      </ThemeProvider>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default MainLayout;
