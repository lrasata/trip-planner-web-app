import Stack from "@mui/material/Stack";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import PlaceIcon from "@mui/icons-material/Place";
import { ChangeEvent } from "react";

interface Props {
  departureLocation?: string;
  arrivalLocation?: string;
  handleDepartureChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleArrivalChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
const TripLocationInputForm = ({
  departureLocation = "",
  arrivalLocation = "",
  handleDepartureChange,
  handleArrivalChange,
}: Props) => {
  return (
    <Stack spacing={3} sx={{ my: 3 }}>
      <OutlinedInput
        id={`trip-city-input`}
        key={`trip-city-input`}
        startAdornment={
          <InputAdornment position="start">
            <PlaceIcon />
          </InputAdornment>
        }
        placeholder="Departure"
        value={departureLocation}
        onChange={handleDepartureChange}
      />
      <OutlinedInput
        id={`trip-region-input`}
        key={`trip-region-input`}
        startAdornment={
          <InputAdornment position="start">
            <PlaceIcon />
          </InputAdornment>
        }
        placeholder="Arrival"
        value={arrivalLocation}
        onChange={handleArrivalChange}
      />
    </Stack>
  );
};

export default TripLocationInputForm;
