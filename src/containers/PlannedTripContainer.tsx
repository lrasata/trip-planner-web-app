import TripCard from "../components/trip/TripCard.tsx";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPlannedTrips } from "../store/redux/TripSlice.ts";
import { ITrip } from "../types.ts";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store/redux";

const PlannedTripContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const plannedTrips = useSelector(
    (state: RootState) => state.trips.plannedTrips,
  );

  useEffect(() => {
    dispatch(fetchPlannedTrips({ dateFilter: "future" }));
  }, []);

  const handleOnClickNavigate = (taskId: number | undefined) => {
    if (taskId) {
      navigate(`/trips/${taskId}`);
    }
  };

  return (
    <Box my={3}>
      {plannedTrips.length > 0 && (
        <Typography variant="h2" gutterBottom color="textSecondary">
          Your planned trips
        </Typography>
      )}
      {plannedTrips.length === 0 && (
        <Typography variant="h3" gutterBottom color="textSecondary">
          No trip planned yet. Create a new trip
        </Typography>
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
