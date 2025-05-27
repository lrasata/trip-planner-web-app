import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { ITrip } from "../types.ts";
import Stack from "@mui/material/Stack";
import BasicDatePicker from "../components/BasicDatePicker.tsx";
import dayjs from "dayjs";

interface EditTripContainerProps {
  trip: ITrip;
}
const EditTripContainer = ({ trip }: EditTripContainerProps) => {
  return (
    <>
      {trip && (
        <Stack direction="column" spacing={3}>
          <Typography variant="h2" gutterBottom color="textSecondary">
            Manage your trip
          </Typography>
          <TextField type="text" label="Name" value={trip.name} />
          <TextField type="text" label="Description" value={trip.description} />
          <TextField
            type="text"
            label="Departure location"
            value={trip.departureLocation}
          />
          <TextField
            type="text"
            label="Arrival location"
            value={trip.arrivalLocation}
          />
          <BasicDatePicker
            value={dayjs(trip.departureDate) ?? ""}
            label="Departure date"
            onChange={() => {}}
          />
          <BasicDatePicker
            value={dayjs(trip.returnDate) ?? ""}
            label="Return date"
            onChange={() => {}}
          />
        </Stack>
      )}
    </>
  );
};

export default EditTripContainer;
