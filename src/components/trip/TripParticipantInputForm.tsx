import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import React, { ChangeEvent, forwardRef } from "react";
import withUserAutocomplete from "../../hoc/withUserAutocomplete.tsx";
import { IUser } from "../../types.ts";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

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
  handleOnRemoveParticipant?: (participant: IUser) => void;
  onEdit?: boolean;
}

const TripParticipantInputForm = ({
  participantCount,
  participants,
  handleInputParticipantCountChange,
  handleOnSelectParticipant,
  onEdit = false,
  handleOnRemoveParticipant,
}: Props) => {
  const EnhancedParticipantInput = withUserAutocomplete(ParticipantInput);

  return (
    <Stack spacing={3} sx={{ my: 3 }}>
      <TextField
        id={`trip-number-participants-input`}
        helperText="Number of participants"
        variant="outlined"
        required
        value={participantCount ?? ""}
        onChange={handleInputParticipantCountChange}
        error={!participantCount}
      />
      {[...Array(Number(participantCount || 0))].map((_, index) => (
        <Stack
          direction="row"
          key={`participant-name-${index}-input`}
          spacing={1}
          sx={{ alignItems: "center" }}
        >
          <EnhancedParticipantInput
            id={`participant-name-${index}-name-input`}
            placeholder="Email"
            helperText={`Participant #${index + 1}`}
            onChange={handleOnSelectParticipant}
            {...(participants && {
              value: participants[index],
            })}
            {...(onEdit &&
              participants && { disabled: participants[index] !== undefined })}
          />
          {onEdit &&
            participants &&
            participants[index] !== undefined &&
            handleOnRemoveParticipant && (
              <IconButton
                aria-label="delete"
                onClick={() => handleOnRemoveParticipant(participants[index])}
              >
                <DeleteIcon />
              </IconButton>
            )}
        </Stack>
      ))}
    </Stack>
  );
};

export default TripParticipantInputForm;
