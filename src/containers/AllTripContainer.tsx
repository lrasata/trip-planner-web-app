import TripCard from "../components/trip/TripCard.tsx";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchTrips } from "../store/redux/TripSlice.ts";
import { ITrip } from "../types.ts";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "@/store/redux";
import SearchBarContainer from "@/containers/SearchBarContainer.tsx";
import Spinner from "@/components/Spinner.tsx";

const AllTripContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const trips: ITrip[] = useSelector((state: RootState) => state.trips.trips);
  const status: string = useSelector((state: RootState) => state.trips.status);
  const searchKeyword: string = useSelector(
    (state: RootState) => state.filter.searchKeyword,
  );
  const [searchFilter, setSearchFilter] = useState<string>(searchKeyword);

  useEffect(() => {
    if (searchFilter !== "") {
      dispatch(fetchTrips({ keyword: searchFilter }));
    } else {
      dispatch(fetchTrips({}));
    }
  }, [searchFilter]);

  const handleOnClickNavigate = (taskId: number | undefined) => {
    if (taskId) {
      navigate(`/trips/${taskId}`);
    }
  };

  return (
    <Box py={10}>
      <Typography variant="h2" gutterBottom color="textSecondary">
        All your trips
      </Typography>
      <SearchBarContainer handleFilterChange={setSearchFilter} />
      {status === "loading" && <Spinner />}
      {status === "succeeded" && trips.length > 0 && (
        <>
          <Typography variant="body1" gutterBottom color="textSecondary" mt={1}>
            Display {trips.length} results
          </Typography>
          {trips.map((trip: ITrip, index: number) => (
            <Box my={2} key={`${trip.name}-${index}`}>
              <TripCard
                {...trip}
                onClick={() => handleOnClickNavigate(trip.id)}
              />
            </Box>
          ))}
        </>
      )}
      {status === "succeeded" && trips.length === 0 && (
        <Typography variant="body1" color="textSecondary" my={1}>
          No trip found.
        </Typography>
      )}
    </Box>
  );
};

export default AllTripContainer;
