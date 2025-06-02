import Stack from "@mui/material/Stack";
import React, { forwardRef } from "react";
import withLocationAutocomplete from "../../hoc/withLocationAutocomplete.tsx";
import InputAdornment from "@mui/material/InputAdornment";
import PlaceIcon from "@mui/icons-material/Place";
import { ILocation } from "../../types.ts";
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
  departureLocation?: ILocation;
  arrivalLocation?: ILocation;
  handleDepartureChange: (
    _event: React.SyntheticEvent,
    value: ILocation | null,
  ) => void;
  handleArrivalChange: (
    _event: React.SyntheticEvent,
    value: ILocation | null,
  ) => void;
}

const TripLocationInputForm = ({
  departureLocation,
  arrivalLocation,
  handleDepartureChange,
  handleArrivalChange,
}: TripLocationInputFormProps) => {
  const EnhancedDepartureInput = withLocationAutocomplete(
    LocationInput,
    "city",
    "FR",
  );
  const EnhancedArrivalInput = withLocationAutocomplete(
    LocationInput,
    "city",
    "FR",
  );
  return (
    <Stack spacing={3} sx={{ my: 3 }}>
      <EnhancedDepartureInput
        id="departure-city-input"
        placeholder="Departure"
        value={departureLocation}
        onChange={handleDepartureChange}
      />
      <EnhancedArrivalInput
        id="arrival-city-input"
        placeholder="Arrival"
        value={arrivalLocation}
        onChange={handleArrivalChange}
      />
    </Stack>
  );
};

export default TripLocationInputForm;
