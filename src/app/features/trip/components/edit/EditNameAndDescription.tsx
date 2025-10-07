import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { ITrip } from "@/types.ts";
import { ChangeEvent, useState } from "react";
import Button from "@mui/material/Button";

interface EditNameAndDescriptionProps {
  trip: ITrip;
  handleInputChange: (
    key: string,
  ) => (e: ChangeEvent<HTMLInputElement>) => void;
  handleOnSave: () => void;
}
const EditNameAndDescription = ({
  trip,
  handleInputChange,
  handleOnSave,
}: EditNameAndDescriptionProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleEditSave = () => {
    setEditMode(!editMode);
    handleOnSave();
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Typography variant="h2" gutterBottom color="textSecondary">
          Manage your trip
        </Typography>
        {editMode ? (
          <Button
            id="save-trip-name-description-btn"
            variant="contained"
            onClick={handleEditSave}
            disabled={!trip.name}
          >
            Save
          </Button>
        ) : (
          <Button
            id="edit-trip-name-description-btn"
            variant="contained"
            onClick={() => setEditMode(!editMode)}
            disabled={!trip.name}
          >
            Update
          </Button>
        )}
      </Stack>

      <Stack direction="column" spacing={2} py={2}>
        {editMode ? (
          <>
            <TextField
              id="edit-trip-name-input"
              type="text"
              label="Name"
              value={trip.name || ""}
              onChange={handleInputChange("name")}
              required
              error={!trip.name}
            />
            <TextField
              id="edit-trip-description-input"
              type="text"
              label="Description"
              value={trip.description}
              onChange={handleInputChange("description")}
            />
          </>
        ) : (
          <>
            <Typography variant="h3">{trip.name}</Typography>
            {trip.description && (
              <Typography variant="body1">{trip.description}</Typography>
            )}
          </>
        )}
      </Stack>
    </>
  );
};

export default EditNameAndDescription;
