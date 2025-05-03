import Stack from "@mui/material/Stack";
import BasicDatePicker from "./BasicDatePicker.tsx";

const TripDateInputForm = () => {
    return <Stack spacing={3} sx={{ my: 3 }}>
        <BasicDatePicker label="Departure date" onChange={() => {}} />
        <BasicDatePicker label="Return date" onChange={() => {}} />
    </Stack>
}


export default TripDateInputForm;