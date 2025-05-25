import { Card, CardActionArea, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import IconWithLabel from "./IconWithLabel.tsx";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import { ITrip } from "../types.ts";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";

const TripCard = ({
  name,
  description,
  departureLocation = "",
  arrivalLocation = "",
  departureDate,
  returnDate,
}: ITrip) => {
  return (
    <Card>
      <CardActionArea
        sx={{
          "&[data-active]": {
            backgroundColor: "action.selected",
            "&:hover": {
              backgroundColor: "action.selectedHover",
            },
          },
        }}
      >
        <CardContent sx={{ padding: 3 }}>
          <Stack direction="column" spacing={1}>
            <Typography variant="h3" gutterBottom>
              {name}
            </Typography>
            {description && (
              <Typography variant="body1" gutterBottom>
                {description}
              </Typography>
            )}
            {departureDate && returnDate && (
              <IconWithLabel
                icon={
                  <InsertInvitationIcon color="secondary" fontSize="small" />
                }
                label={`${dayjs(departureDate).format("DD MMMM  YYYY")} - ${dayjs(returnDate).format("DD MMMM YYYY")}`}
              />
            )}
            {departureLocation && (
              <IconWithLabel
                icon={<FlightTakeoffIcon color="secondary" fontSize="small" />}
                label={
                  <>
                    <strong>Departure:</strong> {departureLocation}
                  </>
                }
              />
            )}
            {arrivalLocation && (
              <IconWithLabel
                icon={<FlightLandIcon color="secondary" fontSize="small" />}
                label={
                  <>
                    <strong>Arrival:</strong> {arrivalLocation}
                  </>
                }
              />
            )}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default TripCard;
