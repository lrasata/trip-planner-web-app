import Stack from '@mui/material/Stack';
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from '@mui/material/InputAdornment';
import PlaceIcon from '@mui/icons-material/Place';

const locationTypes: string[] = ['City', 'Region', 'Country'];

const TripLocationInputForm = () => {

    return <Stack spacing={3} sx={{ my: 3 }}>
        {
            locationTypes.map((locationType) => (
                <OutlinedInput id={`trip-${locationType}-input`} key={`trip-${locationType}-input`}
                               startAdornment={
                                   <InputAdornment position="start">
                                       <PlaceIcon/>
                                   </InputAdornment>}
                               placeholder={locationType}/>
            ))
        }
    </Stack>
}

export default TripLocationInputForm;