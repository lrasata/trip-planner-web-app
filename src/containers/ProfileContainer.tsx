import Box from "@mui/material/Box";
import { Card, CardContent, useMediaQuery, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { IUser } from "../types.ts";
import TextField from "@mui/material/TextField";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAuthenticatedUser } from "../store/redux/AuthSlice.ts";
import { toast } from "react-toastify";
import { AppDispatch, RootState } from "../store/redux";

interface ProfileContainerProps {
  user: IUser;
}

const ProfileContainer = ({ user }: ProfileContainerProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.auth.status);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [userProfile, setUserProfile] = useState<IUser>(user);

  useEffect(() => {
    setUserProfile(user);
  }, [user]);

  useEffect(() => {
    if (status === "succeeded") {
      toast.success("Your profile has been updated", {
        position: "top-left",
      });
    }
    if (status === "failed") {
      toast.success("Something went wrong", {
        position: "top-left",
      });
    }
  }, [status]);

  const handleEdit = <K extends string, V>(param: {
    [key in K]: V;
  }): void => {
    const key = Object.keys(param)[0] as K;
    const value = param[key];

    setUserProfile((prevState) => {
      return { ...prevState, [key]: value };
    });
  };

  const handleInputChange =
    (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
      handleEdit({ [key]: e.target.value.trim() });
    };

  const handleOnSave = () => {
    dispatch(updateAuthenticatedUser(userProfile));
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" py={10}>
      <Card sx={{ width: isMobile ? "100%" : "50%" }}>
        <CardContent>
          <Typography variant="h1" color="textSecondary" gutterBottom>
            User profile
          </Typography>

          <Stack spacing={1.5}>
            <ProfileItem
              label="Name"
              value={userProfile.fullName}
              type="text"
              onChange={handleInputChange("fullName")}
            />
            <ProfileItem
              label="Email"
              value={userProfile.email}
              type="email"
              onChange={handleInputChange("email")}
            />
            <ProfileItem
              label="Reset password"
              type="password"
              onChange={handleInputChange("password")}
            />
            <Button variant="contained" onClick={handleOnSave}>
              Save changes
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

const ProfileItem = ({
  label,
  value,
  type,
  onChange,
}: {
  label: string;
  value?: string;
  type: string;
  onChange: any;
}) => (
  <Stack spacing={0.5}>
    <Typography variant="body1" fontWeight={600} gutterBottom={false}>
      {label}
    </Typography>
    <TextField type={type} value={value} onChange={onChange} />
  </Stack>
);

export default ProfileContainer;
