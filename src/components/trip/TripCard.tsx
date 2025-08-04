import { Box, Card, CardContent } from "@mui/material";
import IconWithLabel from "../IconWithLabel.tsx";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import { ITrip } from "@/types.ts";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import getLocationText from "@/utils/getLocationText.ts";
import KoaButton from "@/components/koa-ui/KoaButton.tsx";
import KoaTypography from "@/components/koa-ui/KoaTypography.tsx";

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
            <KoaTypography variant="h1" component="h3" color="primary">
              {name}
            </KoaTypography>
            {description && (
              <KoaTypography variant="body1">{description}</KoaTypography>
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
          <KoaButton
            id={`${name}-trip-manage-button`}
            variant="text"
            startIcon={<BorderColorIcon />}
            onClick={onClick}
          >
            Manage
          </KoaButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TripCard;
