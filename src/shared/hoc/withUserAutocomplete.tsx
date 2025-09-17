import {
  ComponentType,
  FC,
  memo,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { API_BACKEND_URL } from "../constants/constants";
import { IUser } from "@/types.ts";

const DEBOUNCE_TIME = 700; // milliseconds

interface WithUserProps {
  id: string;
  placeholder: string;
  value?: IUser;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  onChange?: (_event: SyntheticEvent, value: IUser | null) => void;
}

const withLocationAutocomplete = <P extends object>(
  WrappedComponent: ComponentType<P>,
): FC<Omit<P, "onChange"> & WithUserProps> => {
  const AutocompleteWrapper: FC<Omit<P, "onChange"> & WithUserProps> = (
    props,
  ) => {
    const [options, setOptions] = useState<IUser[]>([]);
    const [inputValue, setInputValue] = useState("");

    // Extract onChange from props to handle in Autocomplete only
    const { onChange, ...restProps } = props;

    const fetchUsers = async (inputValue: string) => {
      const url = `${API_BACKEND_URL}/users?emailContains=${encodeURIComponent(inputValue)}`;

      try {
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const json = await response.json();

        const formatted = json.map((item: IUser) => ({
          id: item.id,
          name: item.fullName,
          email: item.email,
          role: item.role,
        }));

        setOptions(formatted);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    useEffect(() => {
      const timeout = setTimeout(() => {
        if (inputValue !== "") {
          fetchUsers(inputValue);
        }
      }, DEBOUNCE_TIME);

      return () => clearTimeout(timeout);
    }, [inputValue]);

    return (
      <Autocomplete
        options={options}
        getOptionLabel={(option) => option.email}
        value={props.value ?? null}
        onChange={(event, value) => onChange?.(event, value)}
        onInputChange={(_, value) => setInputValue(value)}
        disabled={props.disabled}
        renderInput={(params) => (
          <WrappedComponent
            {...(params as unknown as P)} // <-- Type assertion fix here
            {...restProps}
            onChange={undefined} // Prevent clash with Autocomplete's onChange
            disabled={props.disabled}
            inputProps={params.inputProps}
            InputLabelProps={params.InputLabelProps}
            slotProps={{
              input: {
                ref: params.InputProps?.ref,
              },
            }}
          />
        )}
        noOptionsText="No matching User - Please check spelling"
      />
    );
  };

  return memo(AutocompleteWrapper);
};

export default withLocationAutocomplete;
