import Stack from "@mui/material/Stack";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import { ChangeEvent, useState } from "react";

const TripParticipantInputForm = () => {
  const [numberOfMembers, setNumberOfMembers] = useState<number>(1);

  const handleOnInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNumberOfMembers(Number(event.target.value));
  };

  return (
    <Stack spacing={3} sx={{ my: 3 }}>
      <TextField
        id="trip-number-member-input"
        label="Number of participant"
        variant="outlined"
        required
        value={numberOfMembers}
        onChange={handleOnInputChange}
      />
      {[...Array(numberOfMembers)].map((_, index) => (
        <OutlinedInput
          id={`trip-member-${index + 1}-name-input`}
          key={`trip-member-${index + 1}-input`}
          startAdornment={
            <InputAdornment position="start">
              <AccountCircleIcon />
            </InputAdornment>
          }
          placeholder={`Name of participant #${index + 1}`}
        />
      ))}
    </Stack>
  );
};

export default TripParticipantInputForm;
