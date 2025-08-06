import {
  ComponentType,
  FC,
  memo,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { API_LOCATIONS } from "../constants/constants";
import { ILocation } from "../types";

const DEBOUNCE_TIME = 700; // milliseconds

type DataType = "city" | "country";

interface WithLocationProps {
  id: string;
  placeholder: string;
  value?: ILocation;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  onChange?: (_event: SyntheticEvent, value: ILocation | null) => void;
}

// Return a component that accepts all props of WrappedComponent
// except `onChange`, plus WithLocationProps
const withLocationAutocomplete = <P extends object>(
  WrappedComponent: ComponentType<P>,
  dataType: DataType,
  countryCode?: string,
): FC<Omit<P, "onChange"> & WithLocationProps> => {
  const AutocompleteWrapper = (
    props: Omit<P, "onChange"> & WithLocationProps,
  ) => {
    const [options, setOptions] = useState<ILocation[]>([]);
    const [inputValue, setInputValue] = useState("");

    // Extract onChange from props to handle in Autocomplete only
    const { onChange, ...restProps } = props;

    const fetchLocations = useCallback(
      async (query: string) => {
        if (!query) return;

        let url = "";
        const urlQuery = `dataType=${encodeURIComponent(dataType)}&namePrefix=${encodeURIComponent(query)}`; // API_LOCATIONS

        if (dataType === "city") {
          url = `${API_LOCATIONS}?countryCode=${countryCode}&${urlQuery}`;
        } else {
          url = `${API_LOCATIONS}?${urlQuery}`;
        }

        try {
          const response = await fetch(url);

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
                  region: item.region,
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
        getOptionLabel={(option) => {
          if (dataType === "country") {
            return option.country || "";
          } else {
            return option.city && option.region
              ? `${option.city} (${option.region})`
              : "";
          }
        }}
        value={props.value ?? null}
        onChange={(event, value) => onChange?.(event, value)}
        onInputChange={(_, value) => setInputValue(value)}
        disabled={props.disabled}
        renderInput={(params) => {
          // Omit onChange from WrappedComponent props — explicitly set to undefined
          return (
            <WrappedComponent
              {...(params as unknown as P)}
              {...restProps}
              onChange={undefined}
              disabled={props.disabled}
              inputProps={{
                ...params.inputProps,
                id: props.id, // explicitly forward id for e2e testing
              }}
              InputLabelProps={params.InputLabelProps}
              slotProps={{
                input: {
                  ref: params.InputProps?.ref,
                },
              }}
            />
          );
        }}
        noOptionsText="No matching locations - Please check spelling"
      />
    );
  };

  return memo(AutocompleteWrapper);
};

export default withLocationAutocomplete;
