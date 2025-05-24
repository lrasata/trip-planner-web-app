import Stack from "@mui/material/Stack";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import PlaceIcon from "@mui/icons-material/Place";
import { ChangeEvent } from "react";

interface Props {
  city?: string;
  region?: string;
  country?: string;
  handleCityChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleRegionChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleCountryChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
const TripLocationInputForm = ({
  city = "",
  region = "",
  country = "",
  handleCityChange,
  handleRegionChange,
  handleCountryChange,
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
        placeholder="City"
        value={city}
        onChange={handleCityChange}
      />
      <OutlinedInput
        id={`trip-region-input`}
        key={`trip-region-input`}
        startAdornment={
          <InputAdornment position="start">
            <PlaceIcon />
          </InputAdornment>
        }
        placeholder="Region"
        value={region}
        onChange={handleRegionChange}
      />
      <OutlinedInput
        id={`trip-country-input`}
        key={`trip-country-input`}
        startAdornment={
          <InputAdornment position="start">
            <PlaceIcon />
          </InputAdornment>
        }
        placeholder="Country"
        value={country}
        onChange={handleCountryChange}
      />
    </Stack>
  );
};

export default TripLocationInputForm;
