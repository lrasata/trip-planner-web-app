import TextField from "@mui/material/TextField";
import Stack from '@mui/material/Stack';


const TripNameAndDescriptionInputForm = () => {

    return <Stack spacing={3} sx={{ my: 3}}>
        <TextField id="trip-name-input" label="Name of the trip" variant="outlined" required />
        <TextField id="trip-description-input" label="Description" variant="outlined" />
    </Stack>
}

export default TripNameAndDescriptionInputForm;