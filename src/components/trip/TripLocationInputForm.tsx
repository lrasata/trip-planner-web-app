import Stack from "@mui/material/Stack";
import { forwardRef, SyntheticEvent } from "react";
import withLocationAutocomplete from "../../hoc/withLocationAutocomplete.tsx";
import InputAdornment from "@mui/material/InputAdornment";
import PlaceIcon from "@mui/icons-material/Place";
import { ILocation } from "@/types.ts";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const LocationInput = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ onChange, ...props }, ref) => (
    <TextField
      variant="outlined"
      {...props} // no onChange here
      slotProps={{
        input: {
          ref,
          startAdornment: (
            <InputAdornment position="start">
              <PlaceIcon />
            </InputAdornment>
          ),
          ...(props.slotProps?.input || {}),
        },
      }}
    />
  ),
);

interface TripLocationInputFormProps {
  departureLocation?: ILocation;
  arrivalLocation?: ILocation;
  handleOnSelectDepartureLocation: (
    _event: SyntheticEvent,
    selectedLocation: ILocation | null,
  ) => void;
  handleOnSelectArrivalLocation: (
    _event: SyntheticEvent,
    selectedLocation: ILocation | null,
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
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Stack spacing={3} sx={{ my: 1 }}>
          <Typography variant="subtitle2">Departure country</Typography>
          <EnhancedDepartureCountryInput
            id="departure-country-input"
            placeholder="Country - Start typing..."
            value={departureLocation}
            error={!departureLocation?.country}
            helperText="Select a country"
            onChange={handleOnSelectDepartureLocation}
          />
          <Typography variant="subtitle2">Arrival country</Typography>
          <EnhancedArrivalCountryInput
            id="arrival-country-input"
            placeholder="Country - Start typing..."
            error={!arrivalLocation?.country}
            helperText="Select a country"
            value={arrivalLocation}
            onChange={handleOnSelectArrivalLocation}
          />
        </Stack>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Stack spacing={3} sx={{ my: 1 }}>
          <Typography variant="subtitle2">Departure city</Typography>
          <EnhancedDepartureCityInput
            id="departure-city-input"
            placeholder="City - Start typing..."
            value={departureLocation}
            helperText="Select a city"
            onChange={handleOnSelectDepartureLocation}
            disabled={!departureLocation?.country}
          />
          <Typography variant="subtitle2">Arrival city</Typography>
          <EnhancedArrivalCityInput
            id="arrival-city-input"
            placeholder="City - Start typing..."
            value={arrivalLocation}
            helperText="Select a city"
            onChange={handleOnSelectArrivalLocation}
            disabled={!arrivalLocation?.country}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default TripLocationInputForm;
