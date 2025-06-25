import Box from "@mui/material/Box";
import { Card, CardContent, useMediaQuery, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { IUser } from "../types.ts";
import TextField from "@mui/material/TextField";

interface ProfileContainerProps {
  user: IUser;
}
const ProfileContainer = ({ user }: ProfileContainerProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Card sx={{ width: isMobile ? "100%" : "50%" }}>
        <CardContent>
          <Typography variant="h1" color="textSecondary" gutterBottom>
            User profile
          </Typography>

          <Stack spacing={1.5}>
            <ProfileItem label="Name" value={user.fullName} />
            <ProfileItem label="Email" value={user.email} />
            <ProfileItem label="Role" value={user.role} />
            <Button variant="contained">Save changes</Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

const ProfileItem = ({ label, value }: { label: string; value: string }) => (
  <Stack spacing={0.5}>
    <Typography variant="body1" fontWeight={600} gutterBottom={false}>
      {label}
    </Typography>
    <TextField type="text" value={value} required error={!value} />
  </Stack>
);

export default ProfileContainer;
