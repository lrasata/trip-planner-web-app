import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  useTheme,
} from "@mui/material";
import {
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  inputSearchText: string;
  handleSearch: (searchText: string) => void;
}

const DEBOUNCE_TIME = 500;

const SearchBar = ({ inputSearchText, handleSearch }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState("");
  const [debouncedInputValue, setDebouncedInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();

  const handleClearInput = () => {
    setInputValue("");
  };

  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
  };

  const handleOnClickSearch = () => {
    handleSearch(inputValue);
  };

  const handleOnKeyDown = (
    event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (event.key === "Enter") {
      handleSearch(inputValue);
    }
  };

  useEffect(() => {
    setInputValue(inputSearchText);
  }, [inputSearchText]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, DEBOUNCE_TIME);
    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  useEffect(() => {
    handleSearch(debouncedInputValue);
  }, [debouncedInputValue]);

  return (
    <OutlinedInput
      value={inputValue}
      fullWidth
      onChange={handleInputChange}
      endAdornment={
        <InputAdornment position="end">
          {inputValue !== "" && (
            <IconButton onClick={handleClearInput}>
              <CloseIcon />
            </IconButton>
          )}
          <IconButton onClick={handleOnClickSearch}>
            <SearchIcon />
          </IconButton>
        </InputAdornment>
      }
      placeholder="Enter a text to start searching..."
      ref={inputRef}
      autoFocus={false}
      onKeyDown={(event) => handleOnKeyDown(event)}
      sx={{ backgroundColor: theme.palette.background.paper }}
      id="search-bar"
    />
  );
};

export default SearchBar;
