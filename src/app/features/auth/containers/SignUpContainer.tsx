import Typography from "@mui/material/Typography";
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
import { API_SIGNUP_ENDPOINT } from "@/shared/constants/constants.ts";
import { toast } from "react-toastify";
import api from "../../../../shared/api/api.ts";

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

const SignUpContainer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const { email, password, fullName } = inputValue;

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

  const handleSignInSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await api.post(API_SIGNUP_ENDPOINT, { ...inputValue });

      handleSuccess("You are successfully registered. You can now log in");
      setInputValue((prevState) => ({
        ...prevState,
        email: "",
        password: "",
        fullName: "",
      }));
    } catch (error) {
      console.log(error);
      handleError("Registration failed");
    }
  };

  return (
    <StyledBoxContainer component="form" onSubmit={handleSignInSubmit}>
      <Typography variant="h5" component="h1" align="center">
        Create a new account
      </Typography>
      <TextField
        id="fullname-signup"
        type="text"
        name="fullName"
        value={fullName}
        placeholder="Enter your name"
        onChange={handleOnChange}
        label="fullName"
        sx={{ backgroundColor: "white" }}
      />
      <TextField
        id="email-signup"
        type="email"
        name="email"
        value={email}
        placeholder="Enter your email"
        onChange={handleOnChange}
        label="Email"
        sx={{ backgroundColor: "white" }}
      />
      <TextField
        id="password-signup"
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
          id="button-submit-signup"
          variant="contained"
          type="submit"
          fullWidth={isMobile}
        >
          Submit
        </Button>
      </Box>
    </StyledBoxContainer>
  );
};

export default SignUpContainer;
