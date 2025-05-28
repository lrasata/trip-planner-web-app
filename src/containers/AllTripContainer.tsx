import TripCard from "../components/trip/TripCard.tsx";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPlannedTrips } from "../store/redux/TripSlice.ts";
import { ITrip } from "../types.ts";
import { useNavigate } from "react-router-dom";

const AllTripContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // @ts-ignore
  const plannedTrips = useSelector((state) => state.trips.plannedTrips);

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchPlannedTrips());
  }, []);

  const handleOnClickNavigate = (taskId: number | undefined) => {
    if (taskId) {
      navigate(`/trips/${taskId}`);
    }
  };

  return (
    <Box my={3}>
      <Typography variant="h2" gutterBottom color="textSecondary">
        All your trips
      </Typography>
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

export default AllTripContainer;
