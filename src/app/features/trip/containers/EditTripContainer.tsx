import Typography from "@mui/material/Typography";
import { ILocation, ITrip, IUser } from "@/types.ts";
import Stack from "@mui/material/Stack";
import dayjs, { Dayjs } from "dayjs";
import Button from "@mui/material/Button";
import { ChangeEvent, lazy, Suspense, useEffect, useState } from "react";
import { formatDate } from "@/shared/utils/utils.ts";
import { useDispatch } from "react-redux";
import { deleteTrip, updateTrip } from "@/shared/store/redux/TripSlice.ts";
import { useNavigate } from "react-router-dom";
import AutoDismissAlert from "@/shared/components/AutoDismissAlert.tsx";
import Divider from "@mui/material/Divider";
import Spinner from "@/shared/components/Spinner.tsx";
import Box from "@mui/material/Box";
import { Card, useTheme } from "@mui/material";
import { AppDispatch } from "@/shared/store/redux/index.ts";
import EditDatesAndDestinations from "@/app/features/trip/components/edit/EditDatesAndDestinations.tsx";
import EditParticipants from "@/app/features/trip/components/edit/EditParticipants.tsx";
import EditNameAndDescription from "@/app/features/trip/components/edit/EditNameAndDescription.tsx";
import BannerContainer from "@/app/features/trip/containers/BannerContainer.tsx";

const Dialog = lazy(() => import("@/shared/components/Dialog.tsx"));

interface EditTripContainerProps {
  trip: ITrip;
  status: string;
  error?: string | null;
}
const EditTripContainer = ({ trip, status, error }: EditTripContainerProps) => {
  const theme = useTheme();
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
    setIsDialogOpen(false);
  };

  return (
    <>
      {trip.id && <BannerContainer tripId={trip.id} />}
      <Box pt={40} pb={10}>
        {tripFormData && (
          <Stack spacing={3}>
            <Card sx={{ padding: 3, minHeight: 100, zIndex: 1 }}>
              <EditNameAndDescription
                trip={tripFormData}
                handleInputChange={handleInputChange}
                handleOnSave={handleOnSave}
              />
            </Card>
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
            <EditDatesAndDestinations
              trip={tripFormData}
              invalidDates={invalidDates}
              handleDateChange={handleDateChange}
              handleLocationInputChange={handleLocationInputChange}
              handleOnSave={handleOnSave}
            />
            <Divider />
            <EditParticipants
              trip={tripFormData}
              handleInputChange={handleInputChange}
              handleOnSelectParticipant={handleOnSelectParticipant}
              handleOnRemoveParticipant={handleOnRemoveParticipant}
              handleOnSave={handleOnSave}
            />

            <Divider />
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                onClick={handleOnOpenDialog}
                color="error"
              >
                Permanently delete
              </Button>
              <Button variant="outlined" onClick={() => navigate(-1)}>
                Back
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
      </Box>
    </>
  );
};

export default EditTripContainer;
