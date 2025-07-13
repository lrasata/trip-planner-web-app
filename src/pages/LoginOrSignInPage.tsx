import { ToastContainer } from "react-toastify";
import { Box, Card, useMediaQuery, useTheme } from "@mui/material";
import Brand from "../components/Brand.tsx";
import Divider from "@mui/material/Divider";
import LoginContainer from "../containers/LoginContainer.tsx";
import SignUpContainer from "../containers/SignUpContainer.tsx";

const LoginOrSignInPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box display="flex" justifyContent="center" alignItems="center" py={8}>
      <Card sx={{ width: isMobile ? "100%" : "50%" }}>
        <Brand />
        <LoginContainer />
        <Divider />
        <SignUpContainer />
        <ToastContainer />
      </Card>
    </Box>
  );
};

export default LoginOrSignInPage;
