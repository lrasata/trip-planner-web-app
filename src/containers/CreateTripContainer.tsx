import { Box, Button, styled } from "@mui/material";
import { ILocation, IStep, ITrip, IUser } from "../types.ts";
import Typography from "@mui/material/Typography";
import {
  ChangeEvent,
  lazy,
  Suspense,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTrip } from "../store/redux/TripSlice.ts";
import { Dayjs } from "dayjs";
import { formatDate } from "../utils/utils.ts";
import Spinner from "../components/Spinner.tsx";
import { draftTripActions } from "../store/redux/DraftTripSlice.ts";

// Lazy import
const Dialog = lazy(() => import("../components/Dialog.tsx"));
const VerticalLinearStepper = lazy(
  () => import("../components/VerticalLinearStepper.tsx"),
);
const TripNameAndDescriptionInputForm = lazy(
  () => import("../components/trip/TripNameAndDescriptionInputForm.tsx"),
);
const TripLocationInputForm = lazy(
  () => import("../components/trip/TripLocationInputForm.tsx"),
);
const TripParticipantInputForm = lazy(
  () => import("../components/trip/TripParticipantInputForm.tsx"),
);
const TripDateInputForm = lazy(
  () => import("../components/trip/TripDateInputForm.tsx"),
);

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.background.default,
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
  maxWidth: "100vw",
  position: "relative",
}));

const CreateTripContainer = () => {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // @ts-ignore
  const draftTrip = useSelector((state) => state.draftTrip);
  const [editTrip, setEditTrip] = useState<ITrip>(draftTrip);

  useEffect(() => {
    setEditTrip(draftTrip);
  }, [draftTrip]);

  const handleEditTrip = (
    key: string,
    value: string | number | IUser[] | ILocation,
  ) => {
    setEditTrip((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleDateChange = (key: string) => (date: Dayjs | null) => {
    handleEditTrip(key, date ? formatDate(date) : "");
  };

  const handleInputChange =
    (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
      handleEditTrip(key, e.target.value);
    };

  const handleLocationInputChange =
    (key: string) =>
    (_event: SyntheticEvent, selectedLocation: ILocation | null) => {
      if (selectedLocation) {
        handleEditTrip(key, selectedLocation);
      }
    };

  const handleOnSelectParticipant =
    (key: string) => (_event: SyntheticEvent, selectedUser: IUser | null) => {
      if (selectedUser) {
        handleEditTrip(key, [...(editTrip.participants ?? []), selectedUser]);
      }
    };

  const steps: IStep[] = [
    {
      label: "Name and description",
      component: (
        <Suspense fallback={<Spinner />}>
          <TripNameAndDescriptionInputForm
            name={editTrip.name}
            description={editTrip.description}
            handleInputNameChange={handleInputChange("name")}
            handleInputDescriptionChange={handleInputChange("description")}
          />
        </Suspense>
      ),
    },
    {
      label: "Destination",
      description: `You can update those information later`,
      component: (
        <Suspense fallback={<Spinner />}>
          <TripLocationInputForm
            {...(editTrip.departureLocation && {
              departureLocation: editTrip.departureLocation,
            })}
            {...(editTrip.arrivalLocation && {
              arrivalLocation: editTrip.arrivalLocation,
            })}
            handleOnSelectDepartureLocation={handleLocationInputChange(
              "departureLocation",
            )}
            handleOnSelectArrivalLocation={handleLocationInputChange(
              "arrivalLocation",
            )}
          />
        </Suspense>
      ),
    },
    {
      label: "Number of participants",
      description: `You can update those information later`,
      component: (
        <Suspense fallback={<Spinner />}>
          <TripParticipantInputForm
            participantCount={editTrip.participantCount}
            participants={editTrip.participants}
            handleOnSelectParticipant={handleOnSelectParticipant(
              "participants",
            )}
            handleInputParticipantCountChange={handleInputChange(
              "participantCount",
            )}
          />
        </Suspense>
      ),
    },
    {
      label: "Dates of departure and return",
      description: `You can update those information later`,
      component: (
        <Suspense fallback={<Spinner />}>
          <TripDateInputForm
            returnDate={editTrip.returnDate}
            departureDate={editTrip.departureDate}
            handleDepartureDateChange={handleDateChange("departureDate")}
            handleReturnDateChange={handleDateChange("returnDate")}
          />
        </Suspense>
      ),
    },
  ];

  const handleStateUpdate = () => {
    dispatch(draftTripActions.update(editTrip));
  };

  const handleOnOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleOnCloseDialog = () => {
    dispatch(draftTripActions.reset());
    setIsDialogOpen(false);
  };

  const handleOnSubmit = async () => {
    // @ts-ignore
    dispatch(createTrip(editTrip));
  };

  return (
    <>
      <StyledBox>
        <Typography variant="h1" gutterBottom color="textSecondary">
          Your journey starts here
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{ mt: 2 }}
          onClick={handleOnOpenDialog}
        >
          Create a new trip
        </Button>
      </StyledBox>

      {isDialogOpen && (
        <Suspense fallback={<Spinner />}>
          <Dialog
            open={isDialogOpen}
            onClose={handleOnCloseDialog}
            title="Create a trip"
            content={
              <VerticalLinearStepper
                steps={steps}
                handleOnClickNextStep={handleStateUpdate}
                handleOnSubmitStep={handleOnSubmit}
                requiredFieldMissing={!editTrip.name}
              />
            }
          />
        </Suspense>
      )}
    </>
  );
};

export default CreateTripContainer;
