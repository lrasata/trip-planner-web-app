import TripCard from "../components/TripCard.tsx";
import Typography from "@mui/material/Typography";
import {Box} from "@mui/material";

const PlannedTripContainer = () => {
    return <Box my={3}>
        <Typography variant="h2" gutterBottom color="textSecondary">Your planned trip</Typography>
        <TripCard name="Travel to vietnam"
                  description="exploring Asia"
                  location="Hanoi, Vietnam"
                  departureDate="04/05/2025"
                  returnDate="04/05/2025"
        />
    </Box>
}

export default PlannedTripContainer;