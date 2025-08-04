import TextField from "@mui/material/TextField";
import { ILocation, ITrip, IUser } from "../types.ts";
import Stack from "@mui/material/Stack";
import BasicDatePicker from "../components/BasicDatePicker.tsx";
import dayjs, { Dayjs } from "dayjs";
import KoaButton from "@/components/koa-ui/KoaButton.tsx";
import { ChangeEvent, useEffect, useState } from "react";
import { formatDate } from "../utils/utils.ts";
import { useDispatch } from "react-redux";
import { deleteTrip, updateTrip } from "../store/redux/TripSlice.ts";
import { useNavigate } from "react-router-dom";
import AutoDismissAlert from "../components/AutoDismissAlert.tsx";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Card } from "@mui/material";
import TripLocationInputForm from "../components/trip/TripLocationInputForm.tsx";
import TripParticipantInputForm from "../components/trip/TripParticipantInputForm.tsx";
import { AppDispatch } from "@/store/redux";
import KoaTypography from "@/components/koa-ui/KoaTypography.tsx";
import KoaDialog from "@/components/koa-ui/KoaDialog.tsx";

interface EditTripContainerProps {
  trip: ITrip;
  status: string;
  error?: string | null;
}
const EditTripContainer = ({ trip, status, error }: EditTripContainerProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [tripFormData, setTripFormData] = useState<ITrip>(trip);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [invalidDates, setInvalidDates] = useState<boolean>(false);

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
    setInvalidDates(false);
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

  const handleOnRemoveParticipant = (key: string) => (userToRemove: IUser) => {
    const updatedUsers = [...(tripFormData.participants ?? [])].filter(
      (user) => user.id !== userToRemove.id,
    );
    handleEditTrip({
      [key]: updatedUsers,
    });
  };

  const handleOnSave = () => {
    if (
      dayjs(tripFormData.returnDate).isBefore(dayjs(tripFormData.departureDate))
    ) {
      setInvalidDates(true);
    } else {
      setInvalidDates(false);
      dispatch(updateTrip(tripFormData));
    }
  };

  const handleOnDelete = () => {
    if (tripFormData.id) {
      dispatch(deleteTrip({ id: tripFormData.id }));
    }
    handleOnCloseDialog();
    navigate("/all-trips");
  };

  const handleOnOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleOnCloseDialog = () => {
    console.log("Closing dialog");

    setIsDialogOpen(false);
  };

  return (
    <Box py={10}>
      {tripFormData && (
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Stack direction="column" spacing={3}>
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
              <KoaTypography variant="h1" component="h1" color="secondary">
                Manage your trip
              </KoaTypography>
              <TextField
                id="edit-trip-name-input"
                type="text"
                label="Name"
                value={tripFormData.name || ""}
                onChange={handleInputChange("name")}
                required
                error={!tripFormData.name}
              />
              <TextField
                id="edit-trip-description-input"
                type="text"
                label="Description"
                value={tripFormData.description}
                onChange={handleInputChange("description")}
              />
              <Divider />
              <BasicDatePicker
                id="edit-departure-date-input"
                value={dayjs(tripFormData.departureDate) ?? ""}
                label="Departure date"
                onChange={handleDateChange("departureDate")}
                hasError={invalidDates}
                helperText="Invalid date"
              />
              <BasicDatePicker
                id="edit-return-date-input"
                value={dayjs(tripFormData.returnDate) ?? ""}
                label="Return date"
                onChange={handleDateChange("returnDate")}
                hasError={invalidDates}
                helperText="Invalid date"
              />
              <Divider />
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
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={2}>
              <Card sx={{ padding: 2 }}>
                <KoaTypography variant="h2" component="h2" color="secondary">
                  Participants
                </KoaTypography>
                <TripParticipantInputForm
                  onEdit
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
                  handleOnRemoveParticipant={handleOnRemoveParticipant(
                    "participants",
                  )}
                />
              </Card>

              <KoaButton onClick={handleOnSave} disabled={!tripFormData.name}>
                Save updates
              </KoaButton>
              <KoaButton variant="outline" onClick={() => navigate(-1)}>
                Back
              </KoaButton>

              <Divider />
              <KoaButton variant="danger" onClick={handleOnOpenDialog}>
                Permanently delete
              </KoaButton>
            </Stack>
          </Grid>
        </Grid>
      )}
      {isDialogOpen && (
        <KoaDialog
          isOpen={isDialogOpen}
          cancel={{
            label: "Cancel",
            variant: "outline",
            onClick: handleOnCloseDialog,
          }}
          submit={{
            label: "Delete",
            variant: "danger",
            onClick: handleOnDelete,
          }}
          title="Delete a trip"
        >
          <>
            <KoaTypography variant="body1" component="div">
              Please confirm the deletion of this trip.
            </KoaTypography>
            <KoaTypography variant="body1" color="danger">
              Be aware that this action cannot be undone
            </KoaTypography>
          </>
        </KoaDialog>
      )}
    </Box>
  );
};

export default EditTripContainer;
