import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { ITrip } from "../types.ts";
import Stack from "@mui/material/Stack";
import BasicDatePicker from "../components/BasicDatePicker.tsx";
import dayjs, { Dayjs } from "dayjs";
import Button from "@mui/material/Button";
import { ChangeEvent, useEffect, useState } from "react";
import { formatDate } from "../utils/utils.ts";
import { useDispatch } from "react-redux";
import { updateTrip } from "../store/redux/TripSlice.ts";
import { useNavigate } from "react-router-dom";
import AutoDismissAlert from "../components/AutoDismissAlert.tsx";

interface EditTripContainerProps {
  trip: ITrip;
  status: string;
  error?: string;
}
const EditTripContainer = ({ trip, status, error }: EditTripContainerProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editingTrip, setEditingTrip] = useState<ITrip>(trip);

  useEffect(() => {
    setEditingTrip(trip);
  }, [trip]);

  const handleEditTrip = <K extends string, V>(param: {
    [key in K]: V;
  }): void => {
    const key = Object.keys(param)[0] as K;
    const value = param[key];

    setEditingTrip((prevState) => {
      return { ...prevState, [key]: value };
    });
  };

  const handleInputChange =
    (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
      handleEditTrip({ [key]: e.target.value });
    };

  const handleDateChange = (key: string) => (date: Dayjs | null) => {
    date && handleEditTrip({ [key]: formatDate(date) });
  };

  const handleOnSave = () => {
    // @ts-ignore
    dispatch(updateTrip(editingTrip));
  };

  return (
    <>
      {editingTrip && (
        <Stack direction="column" spacing={3}>
          <Typography variant="h2" gutterBottom color="textSecondary">
            Manage your trip
          </Typography>
          <TextField
            type="text"
            label="Name"
            value={editingTrip.name || ""}
            onChange={handleInputChange("name")}
          />
          <TextField
            type="text"
            label="Description"
            value={editingTrip.description}
            onChange={handleInputChange("description")}
          />
          <TextField
            type="text"
            label="Departure location"
            value={editingTrip.departureLocation || ""}
            onChange={handleInputChange("departureLocation")}
          />
          <TextField
            type="text"
            label="Arrival location"
            value={editingTrip.arrivalLocation || ""}
            onChange={handleInputChange("arrivalLocation")}
          />
          <BasicDatePicker
            value={dayjs(editingTrip.departureDate) ?? ""}
            label="Departure date"
            onChange={handleDateChange("departureDate")}
          />
          <BasicDatePicker
            value={dayjs(editingTrip.returnDate) ?? ""}
            label="Return date"
            onChange={handleDateChange("returnDate")}
          />
          {status === "updated" && (
            <AutoDismissAlert
              severity="success"
              message="Changes saved successfully"
            />
          )}
          {status === "failed" && (
            <AutoDismissAlert
              severity="error"
              message={error || "Something went wrong"}
            />
          )}

          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={handleOnSave}>
              Save
            </Button>
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Back
            </Button>
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default EditTripContainer;
