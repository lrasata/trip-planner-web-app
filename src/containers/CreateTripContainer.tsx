import { Box, Button, styled } from "@mui/material";
import VerticalLinearStepper from "../components/VerticalLinearStepper.tsx";
import { IStep, ITrip } from "../types.ts";
import TripNameAndDescriptionInputForm from "../components/TripNameAndDescriptionInputForm.tsx";
import TripLocationInputForm from "../components/TripLocationInputForm.tsx";
import TripParticipantInputForm from "../components/TripParticipantInputForm.tsx";
import TripDateInputForm from "../components/TripDateInputForm.tsx";
import Typography from "@mui/material/Typography";
import Dialog from "../components/Dialog.tsx";
import { useContext, useState } from "react";
import { CreateTripContext } from "../store/context/CreateTripContext.tsx";
import { useDispatch } from "react-redux";
import { createTrip } from "../store/redux/TripSlice.ts";
import { Dayjs } from "dayjs";
import { formatDate } from "../utils/utils.ts";

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
  const {
    name,
    description,
    city,
    region,
    country,
    departureDate,
    returnDate,
    updateTripContext,
  } = useContext(CreateTripContext);
  const [editTrip, setEditTrip] = useState<ITrip>({
    name,
    description,
    city,
    region,
    country,
    departureDate,
    returnDate,
  });

  const handleEditTrip = (key: string, value: string) => {
    setEditTrip((prevState) => ({ ...prevState, [key]: value }));
  };

  const steps: IStep[] = [
    {
      label: "Name and description",
      component: (
        <TripNameAndDescriptionInputForm
          name={editTrip.name}
          description={editTrip.description}
          handleInputNameChange={(e) => handleEditTrip("name", e.target.value)}
          handleInputDescriptionChange={(e) =>
            handleEditTrip("description", e.target.value)
          }
        />
      ),
    },
    {
      label: "Destination",
      description: `You can update those information later`,
      component: (
        <TripLocationInputForm
          city={editTrip.city}
          country={editTrip.country}
          region={editTrip.region}
          handleCityChange={(e) => handleEditTrip("city", e.target.value)}
          handleRegionChange={(e) => handleEditTrip("region", e.target.value)}
          handleCountryChange={(e) => handleEditTrip("country", e.target.value)}
        />
      ),
    },
    {
      label: "Number of participants",
      description: `You can update those information later`,
      component: <TripParticipantInputForm />,
    },
    {
      label: "Dates of departure and return",
      description: `You can update those information later`,
      component: (
        <TripDateInputForm
          returnDate={editTrip.returnDate}
          departureDate={editTrip.departureDate}
          handleDepartureDateChange={(date: Dayjs | null) =>
            handleEditTrip("departureDate", date ? formatDate(date) : "")
          }
          handleReturnDateChange={(date: Dayjs | null) =>
            date && handleEditTrip("returnDate", date ? formatDate(date) : "")
          }
        />
      ),
    },
  ];

  const handleStateUpdate = () => {
    updateTripContext(editTrip);
  };

  const handleOnOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleOnCloseDialog = () => {
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

      <Dialog
        open={isDialogOpen}
        onClose={handleOnCloseDialog}
        title="Create a trip"
        content={
          <VerticalLinearStepper
            steps={steps}
            handleOnClickNextStep={handleStateUpdate}
            handleOnSubmitStep={handleOnSubmit}
          />
        }
      />
    </>
  );
};

export default CreateTripContainer;
