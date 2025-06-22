import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { API_LOGIN_ENDPOINT } from "../constants/constants.ts";
import Typography from "@mui/material/Typography";
import {
  Box,
  BoxProps,
  Button,
  Card,
  styled,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useCookies } from "react-cookie";
import Brand from "../components/Brand.tsx";

interface StyledBoxContainerProps extends BoxProps {
  component?: React.ElementType; // React.ElementType can be any HTML or custom component
}

const StyledBoxContainer = styled(Box)<StyledBoxContainerProps>(
  ({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(3),
    padding: theme.spacing(3),
  }),
);

const LoginPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // @ts-ignore
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;

  useEffect(() => {
    removeCookie("token");
  }, []);

  const handleOnChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err: string) =>
    toast.error(err, {
      position: "top-left",
    });
  const handleSuccess = (msg: string) =>
    toast.success(msg, {
      position: "top-left",
    });

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await fetch(API_LOGIN_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ ...inputValue }),
      });

      if (!response.ok) {
        handleError("Login failed");
      } else {
        handleSuccess("Successfully logged in");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Card sx={{ width: isMobile ? "100%" : "50%" }}>
        <Brand />
        <StyledBoxContainer component="form" onSubmit={handleSubmit}>
          <Typography variant="h5" component="h1">
            Log in
          </Typography>
          <TextField
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
            label="Email"
            sx={{ backgroundColor: "white" }}
          />
          <TextField
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
            label="Password"
            sx={{ backgroundColor: "white" }}
          />
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            justifyContent="center"
            alignItems="center"
          >
            <Button variant="contained" type="submit" fullWidth={isMobile}>
              Submit
            </Button>
            {/*<Typography>Already have an account? <Link to={"/signup"}>Signup</Link></Typography>*/}
          </Box>
        </StyledBoxContainer>
        <ToastContainer />
      </Card>
    </Box>
  );
};

export default LoginPage;
