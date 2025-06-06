import Stack from "@mui/material/Stack";
import React, { forwardRef } from "react";
import withLocationAutocomplete from "../../hoc/withLocationAutocomplete.tsx";
import InputAdornment from "@mui/material/InputAdornment";
import PlaceIcon from "@mui/icons-material/Place";
import { ILocation } from "../../types.ts";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

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
  handleOnSelectDepartureLocation: (
    _event: React.SyntheticEvent,
    value: ILocation | null,
  ) => void;
  handleOnSelectArrivalLocation: (
    _event: React.SyntheticEvent,
    value: ILocation | null,
  ) => void;
}

const TripLocationInputForm = ({
  departureLocation,
  arrivalLocation,
  handleOnSelectDepartureLocation,
  handleOnSelectArrivalLocation,
}: TripLocationInputFormProps) => {
  const EnhancedDepartureCountryInput = withLocationAutocomplete(
    LocationInput,
    "country",
  );
  const EnhancedDepartureCityInput = withLocationAutocomplete(
    LocationInput,
    "city",
    departureLocation?.countryCode,
  );
  const EnhancedArrivalCountryInput = withLocationAutocomplete(
    LocationInput,
    "country",
  );
  const EnhancedArrivalCityInput = withLocationAutocomplete(
    LocationInput,
    "city",
    arrivalLocation?.countryCode,
  );

  return (
    <Stack spacing={3} sx={{ my: 3 }}>
      <Typography variant="subtitle2">Departure location</Typography>
      <EnhancedDepartureCountryInput
        id="departure-country-input"
        placeholder="Country - Start typing..."
        value={departureLocation}
        error={!departureLocation?.country}
        helperText="Select a country"
        onChange={handleOnSelectDepartureLocation}
      />
      <EnhancedDepartureCityInput
        id="departure-city-input"
        placeholder="City - Start typing..."
        value={departureLocation}
        helperText="Select a city"
        onChange={handleOnSelectDepartureLocation}
        disabled={!departureLocation?.country}
      />
      <Typography variant="subtitle2">Arrival location</Typography>
      <EnhancedArrivalCountryInput
        id="arrrival-country-input"
        placeholder="Country - Start typing..."
        error={!arrivalLocation?.country}
        helperText="Select a country"
        value={arrivalLocation}
        onChange={handleOnSelectArrivalLocation}
      />
      <EnhancedArrivalCityInput
        id="arrival-city-input"
        placeholder="City - Start typing..."
        value={arrivalLocation}
        helperText="Select a city"
        onChange={handleOnSelectArrivalLocation}
        disabled={!arrivalLocation?.country}
      />
    </Stack>
  );
};

export default TripLocationInputForm;
