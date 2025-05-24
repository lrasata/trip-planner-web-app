import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { ChangeEvent } from "react";

interface Props {
  name: string;
  description?: string;
  handleInputNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleInputDescriptionChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TripNameAndDescriptionInputForm = ({
  name,
  description,
  handleInputNameChange,
  handleInputDescriptionChange,
}: Props) => {
  return (
    <Stack spacing={3} sx={{ my: 3 }}>
      <TextField
        id="trip-name-input"
        label="Name of the trip"
        variant="outlined"
        required
        value={name}
        onChange={handleInputNameChange}
      />
      <TextField
        id="trip-description-input"
        label="Description"
        variant="outlined"
        value={description}
        onChange={handleInputDescriptionChange}
      />
    </Stack>
  );
};

export default TripNameAndDescriptionInputForm;
