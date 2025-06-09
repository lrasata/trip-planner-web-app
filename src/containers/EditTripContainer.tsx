import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { ILocation, ITrip, IUser } from "../types.ts";
import Stack from "@mui/material/Stack";
import BasicDatePicker from "../components/BasicDatePicker.tsx";
import dayjs, { Dayjs } from "dayjs";
import Button from "@mui/material/Button";
import { ChangeEvent, lazy, Suspense, useEffect, useState } from "react";
import { formatDate } from "../utils/utils.ts";
import { useDispatch } from "react-redux";
import { deleteTrip, updateTrip } from "../store/redux/TripSlice.ts";
import { useNavigate } from "react-router-dom";
import AutoDismissAlert from "../components/AutoDismissAlert.tsx";
import Divider from "@mui/material/Divider";
import Spinner from "../components/Spinner.tsx";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import TripLocationInputForm from "../components/trip/TripLocationInputForm.tsx";
import TripParticipantInputForm from "../components/trip/TripParticipantInputForm.tsx";

const Dialog = lazy(() => import("../components/Dialog.tsx"));

interface EditTripContainerProps {
  trip: ITrip;
  status: string;
  error?: string;
}
const EditTripContainer = ({ trip, status, error }: EditTripContainerProps) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tripFormData, setTripFormData] = useState<ITrip>(trip);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setTripFormData(trip);
  }, [trip]);

  const handleEditTrip = <K extends string, V>(param: {
    [key in K]: V;
  }): void => {
    const key = Object.keys(param)[0] as K;
    const value = param[key];

    setTripFormData((prevState) => {
      return { ...prevState, [key]: value };
    });
  };

  const handleInputChange =
    (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
      handleEditTrip({ [key]: e.target.value });
    };

  const handleLocationInputChange =
    (key: string) => (_event: any, selectedLocation: ILocation | null) => {
      if (selectedLocation) {
        handleEditTrip({ [key]: selectedLocation });
      }
    };

  const handleDateChange = (key: string) => (date: Dayjs | null) => {
    date && handleEditTrip({ [key]: formatDate(date) });
  };

  const handleOnSelectParticipant =
    (key: string) => (_event: any, selectedUser: IUser | null) => {
      if (selectedUser) {
        handleEditTrip({
          [key]: [...(tripFormData.participants ?? []), selectedUser],
        });
      }
    };

  const handleOnSave = () => {
    // @ts-ignore
    dispatch(updateTrip(tripFormData));
  };

  const handleOnDelete = () => {
    // @ts-ignore
    dispatch(deleteTrip({ id: tripFormData.id }));
    handleOnCloseDialog();
    navigate("/trips");
  };

  const handleOnOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleOnCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      {tripFormData && (
        <Stack direction="column" spacing={3}>
          <Typography variant="h2" gutterBottom color="textSecondary">
            Manage your trip
          </Typography>
          <TextField
            type="text"
            label="Name"
            value={tripFormData.name || ""}
            onChange={handleInputChange("name")}
            required
            error={!tripFormData.name}
          />
          <TextField
            type="text"
            label="Description"
            value={tripFormData.description}
            onChange={handleInputChange("description")}
          />
          <TripLocationInputForm
            {...(tripFormData.departureLocation && {
              departureLocation: tripFormData.departureLocation,
            })}
            {...(tripFormData.arrivalLocation && {
              arrivalLocation: tripFormData.arrivalLocation,
            })}
            handleOnSelectDepartureLocation={handleLocationInputChange(
              "departureLocation",
            )}
            handleOnSelectArrivalLocation={handleLocationInputChange(
              "arrivalLocation",
            )}
          />
          <TripParticipantInputForm
            {...(tripFormData.participantCount && {
              participantCount: tripFormData.participantCount,
            })}
            {...(tripFormData.participants && {
              participants: tripFormData.participants,
            })}
            handleOnSelectParticipant={handleOnSelectParticipant(
              "participants",
            )}
            handleInputParticipantCountChange={handleInputChange(
              "participantCount",
            )}
          />
          <BasicDatePicker
            value={dayjs(tripFormData.departureDate) ?? ""}
            label="Departure date"
            onChange={handleDateChange("departureDate")}
          />
          <BasicDatePicker
            value={dayjs(tripFormData.returnDate) ?? ""}
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
            <Button
              variant="contained"
              onClick={handleOnSave}
              disabled={!tripFormData.name}
            >
              Save
            </Button>
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Back
            </Button>
          </Stack>
          <Divider />
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              onClick={handleOnOpenDialog}
              color="error"
            >
              Permanently delete
            </Button>
          </Stack>
        </Stack>
      )}
      {isDialogOpen && (
        <Suspense fallback={<Spinner />}>
          <Dialog
            open={isDialogOpen}
            onClose={handleOnCloseDialog}
            title="Delete a trip"
            content={
              <Box py={1} sx={{ minWidth: theme.spacing(56) }}>
                <Typography variant="body1" gutterBottom>
                  Please confirm the deletion of this trip.
                </Typography>
                <Typography variant="body1" color="error" gutterBottom>
                  Be aware that this action cannot be undone
                </Typography>
                <Stack direction="row" spacing={1} mt={3}>
                  <Button
                    variant="contained"
                    onClick={handleOnDelete}
                    color="error"
                  >
                    Permanently delete
                  </Button>
                  <Button variant="outlined" onClick={handleOnCloseDialog}>
                    Cancel
                  </Button>
                </Stack>
              </Box>
            }
          />
        </Suspense>
      )}
    </>
  );
};

export default EditTripContainer;
