import {
  Box,
  BoxProps,
  Button,
  styled,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { API_LOGIN_ENDPOINT } from "../constants/constants.ts";
import { useNavigate } from "react-router-dom";
import { authSliceActions } from "../store/redux/AuthSlice.ts";
import { useDispatch } from "react-redux";
import api from "../api/api.ts";

interface StyledBoxContainerProps extends BoxProps {
  component?: React.ElementType; // React.ElementType can be any HTML or custom component
}

const StyledBoxContainer = styled(Box)<StyledBoxContainerProps>(
  ({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  }),
);

const LoginContainer = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;

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

  const handleLoginSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await api.post(
        API_LOGIN_ENDPOINT,
        { ...inputValue },
        { withCredentials: true },
      );

      handleSuccess("Successfully logged in");

      dispatch(authSliceActions.updateIsLoggedInState({ isLoggedIn: true }));

      const data = response.data;
      dispatch(
        authSliceActions.setTokens({
          token: data.token,
          refreshToken: data.refreshToken,
        }),
      );

      navigate("/");
    } catch (error) {
      console.log(error);
      handleError("Login failed");
    }
  };

  return (
    <StyledBoxContainer component="form" onSubmit={handleLoginSubmit}>
      <TextField
        id="email-login"
        type="email"
        name="email"
        value={email}
        placeholder="Enter your email"
        onChange={handleOnChange}
        label="Email"
        sx={{ backgroundColor: "white" }}
      />
      <TextField
        id="password-login"
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
        <Button
          id="button-submit-login"
          variant="contained"
          type="submit"
          fullWidth={isMobile}
        >
          Log in
        </Button>
      </Box>
    </StyledBoxContainer>
  );
};

export default LoginContainer;
