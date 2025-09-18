import { Box, Card, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import IconWithLabel from "@/shared/components/IconWithLabel.tsx";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import { ITrip } from "@/types.ts";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import getLocationText from "@/shared/utils/getLocationText.ts";

const TripCard = ({
  name,
  description,
  departureLocation,
  arrivalLocation,
  departureDate,
  returnDate,
  onClick,
}: ITrip & {
  onClick: () => void;
}) => {
  const departureLocationText = getLocationText(departureLocation);
  const arrivalLocationText = getLocationText(arrivalLocation);

  return (
    <Card>
      <CardContent sx={{ padding: 3 }}>
        <Box display="flex" justifyContent="space-between">
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
                    <strong>Departure:</strong> {departureLocationText}
                  </>
                }
              />
            )}
            {arrivalLocation && (
              <IconWithLabel
                icon={<FlightLandIcon color="secondary" fontSize="small" />}
                label={
                  <>
                    <strong>Arrival:</strong> {arrivalLocationText}
                  </>
                }
              />
            )}
          </Stack>
          <Button
            id={`${name}-trip-manage-button`}
            variant="text"
            startIcon={<BorderColorIcon />}
            onClick={onClick}
          >
            Manage
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TripCard;
