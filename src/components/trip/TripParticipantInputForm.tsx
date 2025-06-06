import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import React, { ChangeEvent, forwardRef } from "react";
import withUserAutocomplete from "../../hoc/withUserAutocomplete.tsx";
import { IUser } from "../../types.ts";

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

interface Props {
  participantCount?: number;
  participants?: IUser[];
  handleInputParticipantCountChange: (
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
  handleOnSelectParticipant: (
    _event: React.SyntheticEvent,
    value: IUser | null,
  ) => void;
}

const TripParticipantInputForm = ({
  participantCount,
  participants,
  handleInputParticipantCountChange,
  handleOnSelectParticipant,
}: Props) => {
  const EnhancedParticipantInput = withUserAutocomplete(ParticipantInput);

  return (
    <Stack spacing={3} sx={{ my: 3 }}>
      <TextField
        id="trip-number-member-input"
        label="Number of participants"
        variant="outlined"
        required
        value={participantCount}
        onChange={handleInputParticipantCountChange}
        error={!participantCount}
      />
      {[...Array(participantCount)].map((_, index) => (
        <EnhancedParticipantInput
          id={`participant-name-${index}-name-input`}
          key={`participant-name-${index}-input`}
          placeholder={`Name of participant #${index + 1}`}
          onChange={handleOnSelectParticipant}
          {...(participants && {
            value: participants[index],
          })}
        />
      ))}
    </Stack>
  );
};

export default TripParticipantInputForm;
