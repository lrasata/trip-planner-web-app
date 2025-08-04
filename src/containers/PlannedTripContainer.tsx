import TripCard from "../components/trip/TripCard.tsx";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTrips } from "../store/redux/TripSlice.ts";
import { ITrip } from "../types.ts";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "@/store/redux";
import KoaTypography from "@/components/koa-ui/KoaTypography.tsx";

const PlannedTripContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const plannedTrips = useSelector((state: RootState) => state.trips.trips);

  useEffect(() => {
    dispatch(fetchTrips({ dateFilter: "future" }));
  }, []);

  const handleOnClickNavigate = (taskId: number | undefined) => {
    if (taskId) {
      navigate(`/trips/${taskId}`);
    }
  };

  return (
    <Box my={3}>
      {plannedTrips.length > 0 && (
        <KoaTypography variant="h2" component="h2" color="secondary">
          Your planned trips
        </KoaTypography>
      )}
      {plannedTrips.length === 0 && (
        <KoaTypography variant="h3" component="h3" color="secondary">
          No trip planned yet. Create a new trip
        </KoaTypography>
      )}

      {plannedTrips &&
        plannedTrips.length > 0 &&
        plannedTrips.map((trip: ITrip, index: number) => (
          <Box my={2} key={`${trip.name}-${index}`}>
            <TripCard
              {...trip}
              onClick={() => handleOnClickNavigate(trip.id)}
            />
          </Box>
        ))}
    </Box>
  );
};

export default PlannedTripContainer;
