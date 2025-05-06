import {Card, CardActionArea, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import IconWithLabel from "./IconWithLabel.tsx";
import PlaceIcon from '@mui/icons-material/Place';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import Stack from "@mui/material/Stack";
import {ITrip} from "../types.ts";

const TripCard = ({
                      name,
                      description,
                      city = '',
                      region = '',
                      country = '',
                      departureDate,
                      returnDate}: ITrip) => {

    return <Card>
        <CardActionArea
            sx={{
                height: '100%',
                '&[data-active]': {
                    backgroundColor: 'action.selected',
                    '&:hover': {
                        backgroundColor: 'action.selectedHover',
                    },
                },
            }}
        >
            <CardContent sx={{ height: '100%', padding: 3 }}>
                <Stack direction="column" spacing={1}>
                    <Typography variant="h3" gutterBottom>{name}</Typography>
                    {
                        departureDate && returnDate && (<IconWithLabel icon={<InsertInvitationIcon color="secondary"  />} label={`${departureDate} - ${returnDate}`} />)
                    }
                    {
                        (city || region || country) && (<IconWithLabel icon={<PlaceIcon color="secondary" />} label={`${city} ${region} ${country}`} />)
                    }
                    {
                        description && (<Typography variant="body1" component="div" gutterBottom>{description}</Typography>)
                    }
                </Stack>
            </CardContent>
        </CardActionArea>
    </Card>
}

export default TripCard;