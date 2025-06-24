import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import useIsAuthenticated from "../hooks/useIsAuthenticated.ts";

const ProfilePage = () => {
  const { user } = useIsAuthenticated();

  if (!user) return null;

  return (
    <>
      <Typography variant="h1" color="textSecondary" gutterBottom>
        My Profile
      </Typography>

      <Stack spacing={1.5}>
        <ProfileItem label="Name" value={user.fullName} />
        <ProfileItem label="Email" value={user.email} />
        <ProfileItem label="Role" value={user.role.name} />
      </Stack>
    </>
  );
};

const ProfileItem = ({ label, value }: { label: string; value: string }) => (
  <Stack direction="row" spacing={0.5}>
    <Typography variant="body1" fontWeight={600} gutterBottom={false}>
      {label}:
    </Typography>
    <Typography variant="body1" color="textSecondary" gutterBottom={false}>
      {value}
    </Typography>
  </Stack>
);

export default ProfilePage;
