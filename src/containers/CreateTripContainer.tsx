import {Button} from "@mui/material";
import VerticalLinearStepper from "../components/VerticalLinearStepper.tsx";
import {IStep} from "../types.ts";
import TripNameAndDescriptionInputForm from "../components/TripNameAndDescriptionInputForm.tsx";
import TripLocationInputForm from "../components/TripLocationInputForm.tsx";
import TripParticipantInputForm from "../components/TripParticipantInputForm.tsx";
import TripDateInputForm from "../components/TripDateInputForm.tsx";

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

const CreateTripContainer = () => {
    return <>
        <Button variant="contained" size="large">Create a new trip</Button>
        <VerticalLinearStepper steps={steps} />
    </>
}

export default CreateTripContainer;