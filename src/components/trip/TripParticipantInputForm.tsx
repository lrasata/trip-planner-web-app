import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { ChangeEvent, forwardRef, useState } from "react";
import withUserAutocomplete from "../../hoc/withUserAutocomplete.tsx";

const ParticipantInput = forwardRef<HTMLInputElement, TextFieldProps>(
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
                <AccountCircleIcon />
              </InputAdornment>
            ),
            ...(props.slotProps?.input || {}),
          },
        }}
      />
    );
  },
);

const TripParticipantInputForm = () => {
  const [numberOfMembers, setNumberOfMembers] = useState<number>(1);

  const handleOnInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNumberOfMembers(Number(event.target.value));
  };

  const EnhancedParticipantInput = withUserAutocomplete(ParticipantInput);

  return (
    <Stack spacing={3} sx={{ my: 3 }}>
      <TextField
        id="trip-number-member-input"
        label="Number of participants"
        variant="outlined"
        required
        value={numberOfMembers}
        onChange={handleOnInputChange}
        error={!numberOfMembers}
      />
      {[...Array(numberOfMembers)].map((_, index) => (
        <EnhancedParticipantInput
          id={`participant-name-${index + 1}-name-input`}
          key={`participant-name-${index + 1}-input`}
          placeholder={`Name of participant #${index + 1}`}
        />
      ))}
    </Stack>
  );
};

export default TripParticipantInputForm;
