import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useMediaQuery, useTheme } from "@mui/material";
import { Dayjs } from "dayjs";

interface Props {
  id: string;
  label: string;
  value?: Dayjs | null | undefined;
  onChange: (date: Dayjs | null) => void;
}
const BasicDatePicker = ({ id, label, value, onChange }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]} sx={{ padding: 0 }}>
        <DemoItem label={label}>
          <DatePicker
            format="DD-MM-YYYY"
            sx={{
              maxWidth: isMobile ? "100%" : "20px",
              backgroundColor: "white",
            }}
            onChange={onChange}
            slotProps={{
              textField: {
                id,
                inputProps: { "data-testid": id },
              },
              openPickerButton: {
                id: `${id}-button`
              },
            }}
            {...(value && { value })}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default BasicDatePicker;
