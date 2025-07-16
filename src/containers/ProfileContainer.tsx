import Box from "@mui/material/Box";
import { Card, CardContent, useMediaQuery, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { IRole, IUser } from "../types.ts";
import TextField from "@mui/material/TextField";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAuthenticatedUser } from "../store/redux/AuthSlice.ts";
import { toast } from "react-toastify";
import { AppDispatch, RootState } from "@/store/redux";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface ProfileContainerProps {
  user: IUser;
  roles: IRole[];
}

const ProfileContainer = ({ user, roles }: ProfileContainerProps) => {
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

  const handleSelectChange = (key: string) => (event: SelectChangeEvent) => {
    const filteredRole: IRole = roles.filter(
      (role) => role.name === (event.target.value as string),
    )[0];
    handleEdit({ [key]: { ...filteredRole } });
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
            <ProfileItemTextInput
              id="profile-user-name-input"
              label="Name"
              value={userProfile.fullName}
              type="text"
              onChange={handleInputChange("fullName")}
            />
            <ProfileItemTextInput
              id="profile-user-email-input"
              label="Email"
              value={userProfile.email}
              type="email"
              onChange={handleInputChange("email")}
            />
            <ProfileItemTextInput
              id="profile-user-password-input"
              label="Reset password"
              type="password"
              onChange={handleInputChange("password")}
            />
            {roles.length > 0 && (
              <ProfileItemSelectInput
                id="profile-user-role"
                label="Role"
                options={roles}
                onChange={handleSelectChange("role")}
                value={userProfile.role?.name ?? ""}
              />
            )}
            <Button
              id="submit-profile-update"
              variant="contained"
              onClick={handleOnSave}
            >
              Save changes
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

const ProfileItemTextInput = ({
  id,
  label,
  value,
  type,
  onChange,
}: {
  id: string;
  label: string;
  value?: string;
  type: string;
  onChange: any;
}) => (
  <Stack spacing={0.5}>
    <Typography variant="body1" fontWeight={600} gutterBottom={false}>
      {label}
    </Typography>
    <TextField id={id} type={type} value={value} onChange={onChange} />
  </Stack>
);

const ProfileItemSelectInput = ({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: IRole["name"];
  options: IRole[];
  onChange: (event: SelectChangeEvent<IRole["name"]>) => void;
}) => (
  <Stack spacing={0.5}>
    <Typography variant="body1" fontWeight={600} gutterBottom={false}>
      {label}
    </Typography>
    <Select
      labelId="demo-simple-select-label"
      id={id}
      value={value}
      onChange={onChange}
      renderValue={(selected) => {
        const role = options.find((r) => r.name === selected);
        return role ? role.description : "";
      }}
      disabled
    >
      {options.map((role: IRole, index) => {
        return (
          <MenuItem key={`${index}-${role.name}`} value={role.name}>
            {role.description}
          </MenuItem>
        );
      })}
    </Select>
  </Stack>
);

export default ProfileContainer;
