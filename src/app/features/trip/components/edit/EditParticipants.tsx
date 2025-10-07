import Typography from "@mui/material/Typography";
import TripParticipantInputForm from "@/app/features/trip/components/inputs/TripParticipantInputForm.tsx";
import Button from "@mui/material/Button";
import { ITrip, IUser } from "@/types.ts";
import { ChangeEvent } from "react";

interface EditParticipantsProps {
  trip: ITrip;
  handleInputChange: (
    key: string,
  ) => (e: ChangeEvent<HTMLInputElement>) => void;
  handleOnSelectParticipant: (
    key: string,
  ) => (_event: any, selectedUser: IUser | null) => void;
  handleOnRemoveParticipant: (key: string) => (userToRemove: IUser) => void;
  handleOnSave: () => void;
}
const EditParticipants = ({
  trip,
  handleInputChange,
  handleOnRemoveParticipant,
  handleOnSelectParticipant,
  handleOnSave,
}: EditParticipantsProps) => {
  return (
    <>
      <Typography variant="h3" gutterBottom color="textSecondary">
        Participants
      </Typography>
      <TripParticipantInputForm
        onEdit
        {...(trip.participantCount && {
          participantCount: trip.participantCount,
        })}
        {...(trip.participants && {
          participants: trip.participants,
        })}
        handleOnSelectParticipant={handleOnSelectParticipant("participants")}
        handleInputParticipantCountChange={handleInputChange(
          "participantCount",
        )}
        handleOnRemoveParticipant={handleOnRemoveParticipant("participants")}
      />
      <Button
        id="save-edit-participant-btn"
        variant="contained"
        onClick={handleOnSave}
        disabled={!trip.name}
        sx={{ width: "max-content" }}
      >
        Save changes
      </Button>
    </>
  );
};

export default EditParticipants;
