import Stack from "@mui/material/Stack";
import BasicDatePicker from "../BasicDatePicker.tsx";
import dayjs, { Dayjs } from "dayjs";

interface ITripDateInputFormProps {
  returnDate?: string;
  departureDate?: string;
  handleDepartureDateChange: (date: Dayjs | null) => void;
  handleReturnDateChange: (date: Dayjs | null) => void;
}
const TripDateInputForm = ({
  departureDate,
  returnDate,
  handleDepartureDateChange,
  handleReturnDateChange,
}: ITripDateInputFormProps) => {
  return (
    <Stack spacing={3} sx={{ my: 3 }}>
      <BasicDatePicker
        id="trip-departure-date-input"
        value={dayjs(departureDate) ?? ""}
        label="Departure date"
        onChange={handleDepartureDateChange}
      />
      <BasicDatePicker
        id="trip-return-date-input"
        value={dayjs(returnDate) ?? ""}
        label="Return date"
        onChange={handleReturnDateChange}
      />
    </Stack>
  );
};

export default TripDateInputForm;
