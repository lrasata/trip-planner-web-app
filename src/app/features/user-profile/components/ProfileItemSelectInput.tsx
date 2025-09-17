import { IRole } from "@/types.ts";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";

interface ProfileItemSelectInputProps {
  id: string;
  label: string;
  value: IRole["name"];
  options: IRole[];
  onChange: (event: SelectChangeEvent<IRole["name"]>) => void;
  disabled?: boolean;
}
const ProfileItemSelectInput = ({
  id,
  label,
  value,
  options,
  onChange,
  disabled = false,
}: ProfileItemSelectInputProps) => (
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
      disabled={disabled}
      data-testid={id}
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

export default ProfileItemSelectInput;
