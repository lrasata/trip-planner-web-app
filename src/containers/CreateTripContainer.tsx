import {Box, Button, styled} from "@mui/material";
import VerticalLinearStepper from "../components/VerticalLinearStepper.tsx";
import {IStep} from "../types.ts";
import TripNameAndDescriptionInputForm from "../components/TripNameAndDescriptionInputForm.tsx";
import TripLocationInputForm from "../components/TripLocationInputForm.tsx";
import TripParticipantInputForm from "../components/TripParticipantInputForm.tsx";
import TripDateInputForm from "../components/TripDateInputForm.tsx";
import Typography from "@mui/material/Typography";
import Dialog from "../components/Dialog.tsx";
import {useState} from "react";

const steps: IStep[] = [
    {
        label: 'Name and description',
        component: <TripNameAndDescriptionInputForm />
    },
    {
        label: 'Destination',
        description: `You can update those information later`,
        component: <TripLocationInputForm />
    },
    {
        label: 'Number of participants',
        description: `You can update those information later`,
        component: <TripParticipantInputForm />
    },
    {
        label: 'Dates of departure and return',
        description: `You can update those information later`,
        component: <TripDateInputForm />
    },
];

const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    width: '100vw',
    position: 'relative',
    left: '50%',
    right: '50%',
    marginLeft: '-50vw',
    marginRight: '-50vw',
}));



const CreateTripContainer = () => {
    const [ isDialogOpen, setIsDialogOpen ] = useState(false);

    const handleOnOpenDialog = () => {
        setIsDialogOpen(true);
    }

    const handleOnCloseDialog = () => {
        setIsDialogOpen(false);
    }
    return <>
        <StyledBox>
            <Typography variant="h1" gutterBottom color="textSecondary">Your journey starts here</Typography>
            <Button variant="contained" size="large" sx={{ mt: 2 }} onClick={handleOnOpenDialog}>Create a new trip</Button>
        </StyledBox>

        <Dialog
            open={isDialogOpen}
            onClose={handleOnCloseDialog}
            title="Create a trip"
            content={<VerticalLinearStepper steps={steps} />}
        />
    </>
}

export default CreateTripContainer;