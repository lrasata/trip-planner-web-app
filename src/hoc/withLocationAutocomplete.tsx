import React, {
  ComponentType,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import Autocomplete from "@mui/material/Autocomplete";
import {
  API_CITIES_GEO_DB_URL,
  API_COUNTRIES_GEO_DB_URL,
  GEO_DB_API_KEY,
  GEO_DB_HOST,
} from "../constants/constants";
import { ILocation } from "../types";

const DEBOUNCE_TIME = 1000;

type DataType = "city" | "country";

interface WithLocationProps {
  id: string;
  placeholder: string;
  value?: ILocation;
  onChange?: (_event: React.SyntheticEvent, value: ILocation | null) => void;
}

const withLocationAutocomplete = <P extends object>(
  WrappedComponent: ComponentType<P>,
  dataType: DataType,
  countryCode?: string,
) => {
  const AutocompleteWrapper = (props: P & WithLocationProps) => {
    const [options, setOptions] = useState<ILocation[]>([]);
    const [inputValue, setInputValue] = useState("");

    const fetchLocations = useCallback(
      async (query: string) => {
        if (!query) return;

        let url = "";
        const urlQuery = `namePrefix=${encodeURIComponent(query)}&limit=10`;

        switch (dataType) {
          case "country":
            url = `${API_COUNTRIES_GEO_DB_URL}?${urlQuery}`;
            break;
          case "city":
            url = `${API_CITIES_GEO_DB_URL}?countryIds=${countryCode}&${urlQuery}`;
            break;
        }

        try {
          const response = await fetch(url, {
            headers: {
              "X-RapidAPI-Key": GEO_DB_API_KEY,
              "X-RapidAPI-Host": GEO_DB_HOST,
            },
          });

          const json = await response.json();
          const data = json.data;

          const formatted =
            dataType === "country"
              ? data.map((item: any) => ({
                  country: item.name,
                  countryCode: item.code,
                }))
              : data.map((item: any) => ({
                  id: item.id,
                  city: item.name,
                  country: item.country,
                  countryCode: countryCode,
                }));

          setOptions(formatted);
        } catch (err) {
          console.error("Failed to fetch locations:", err);
        }
      },
      [dataType, countryCode],
    );

    useEffect(() => {
      const timeout = setTimeout(() => {
        fetchLocations(inputValue);
      }, DEBOUNCE_TIME);

      return () => clearTimeout(timeout);
    }, [inputValue, fetchLocations]);

    return (
      <Autocomplete
        options={options}
        getOptionLabel={(option) => `${option.city || ""} ${option.country}`}
        value={props.value ?? null}
        onChange={(event, value) => props.onChange?.(event, value)}
        onInputChange={(_, value) => setInputValue(value)}
        renderInput={(params) => (
          <WrappedComponent
            {...(params as unknown as P)}
            {...(props as P)}
            inputProps={params.inputProps}
            InputLabelProps={params.InputLabelProps}
            slotProps={{
              input: {
                ref: params.InputProps?.ref,
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
