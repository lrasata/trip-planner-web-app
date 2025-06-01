import Stack from "@mui/material/Stack";
import { forwardRef } from "react";
import withLocationAutocomplete from "../../hoc/withLocationAutocomplete.tsx";
import InputAdornment from "@mui/material/InputAdornment";
import PlaceIcon from "@mui/icons-material/Place";
import { City } from "../../types.ts";
import TextField, { TextFieldProps } from "@mui/material/TextField";

const LocationInput = forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    return (
      <TextField
        variant="outlined"
        {...props}
        slotProps={{
          input: {
            ref, // <- Forwarded ref from Autocomplete
            startAdornment: (
              <InputAdornment position="start">
                <PlaceIcon />
              </InputAdornment>
            ),
            ...(props.slotProps?.input || {}),
          },
        }}
      />
    );
  },
);

interface TripLocationInputFormProps {
  departureLocation?: City;
  arrivalLocation?: City;
  handleDepartureChange: (_event: any, selectedCity: City | null) => void;
  handleArrivalChange: (_event: any, selectedCity: City | null) => void;
}

const TripLocationInputForm = ({
  departureLocation,
  arrivalLocation,
  handleDepartureChange,
  handleArrivalChange,
}: TripLocationInputFormProps) => {
  const EnhancedDepartureInput = withLocationAutocomplete(LocationInput);
  const EnhancedArrivalInput = withLocationAutocomplete(LocationInput);
  return (
    <Stack spacing={3} sx={{ my: 3 }}>
      <EnhancedDepartureInput
        id="departure-location-input"
        placeholder="Departure"
        value={departureLocation}
        onSelect={handleDepartureChange}
      />
      <EnhancedArrivalInput
        id="arrival-location-input"
        placeholder="Arrival"
        value={arrivalLocation}
        onSelect={handleArrivalChange}
      />
    </Stack>
  );
};

export default TripLocationInputForm;
