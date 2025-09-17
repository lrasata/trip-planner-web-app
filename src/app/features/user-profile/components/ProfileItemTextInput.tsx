import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

interface ProfileItemTextInputProps {
  id: string;
  label: string;
  value?: string;
  type: string;
  onChange: any;
}
const ProfileItemTextInput = ({
  id,
  label,
  value,
  type,
  onChange,
}: ProfileItemTextInputProps) => (
  <Stack spacing={0.5}>
    <Typography variant="body1" fontWeight={600} gutterBottom={false}>
      {label}
    </Typography>
    <TextField
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      inputProps={{ "data-testid": id }}
    />
  </Stack>
);

export default ProfileItemTextInput;
