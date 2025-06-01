import { ComponentType, memo, useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import {
  API_GEO_DB_URL,
  GEO_DB_API_KEY,
  GEO_DB_HOST,
} from "../constants/constants";
import { City } from "../types";

const DEBOUNCE_TIME = 500;

const withLocationAutocomplete = <P extends object>(
  WrappedComponent: ComponentType<P>,
) => {
  const AutocompleteWrapper = (
    props: P & {
      id: string;
      placeholder: string;
      value?: City;
      onSelect?: (_event: any, value: City | null) => void;
    },
  ) => {
    const [options, setOptions] = useState<City[]>([]);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        fetchCities(inputValue);
      }, DEBOUNCE_TIME);

      return () => clearTimeout(timeoutId);
    }, [inputValue]);

    const fetchCities = async (query: string) => {
      if (!query) return;

      try {
        const url = `${API_GEO_DB_URL}?namePrefix=${encodeURIComponent(query)}&limit=10`;

        const response = await fetch(url, {
          headers: {
            "X-RapidAPI-Key": GEO_DB_API_KEY,
            "X-RapidAPI-Host": GEO_DB_HOST,
          },
        });

        const jsonData = await response.json();

        const cities: City[] = jsonData.data.map((city: any) => ({
          id: city.id,
          name: `${city.name}, ${city.country}`,
          country: city.country,
        }));

        setOptions(cities);
      } catch (err) {
        console.error("Failed to fetch cities:", err);
      }
    };

    return (
      <Autocomplete
        options={options}
        getOptionLabel={(option) => option.name}
        value={props.value ?? null}
        onInputChange={(_, value) => {
          setInputValue(value);
        }}
        renderInput={(params) => (
          <WrappedComponent
            {...(params as unknown as P)}
            {...props}
            id={params.id}
            inputProps={params.inputProps}
            InputLabelProps={params.InputLabelProps}
            slotProps={{
              input: {
                ref: params.InputProps.ref, // <-- Important
              },
            }}
          />
        )}
      />
    );
  };

  return memo(AutocompleteWrapper);
};

export default withLocationAutocomplete;
