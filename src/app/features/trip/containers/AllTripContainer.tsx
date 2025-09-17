import TripCard from "../components/TripCard.tsx";
import Typography from "@mui/material/Typography";
import { Box, Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, useEffect, useState } from "react";
import { fetchTrips } from "@/shared/store/redux/TripSlice.ts";
import { IPagination, ITrip } from "@/types.ts";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "@/shared/store/redux/index.ts";
import SearchBarContainer from "@/shared/containers/SearchBarContainer.tsx";
import useQueryParams from "@/shared/hooks/useQueryParams.ts";
import { PAGE_QUERY_PARAMETER } from "@/shared/constants/constants.ts";
import Spinner from "@/shared/components/Spinner.tsx";

const AllTripContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const trips: ITrip[] = useSelector((state: RootState) => state.trips.trips);
  const pagination: IPagination | null = useSelector(
    (state: RootState) => state.trips.pagination,
  );
  const status: string = useSelector((state: RootState) => state.trips.status);
  const searchKeyword: string = useSelector(
    (state: RootState) => state.filter.searchKeyword,
  );
  const { getQueryParamByKey, setQueryParam } = useQueryParams();
  // fetch page from url if exists
  const pageQueryParam = getQueryParamByKey(PAGE_QUERY_PARAMETER);
  const [searchFilter, setSearchFilter] = useState<string>(searchKeyword);

  useEffect(() => {
    dispatch(
      fetchTrips({
        keyword: searchFilter,
        ...(pageQueryParam !== "" && { page: Number(pageQueryParam) - 1 || 0 }),
      }),
    );
  }, [searchFilter, pageQueryParam]);

  const handleOnClickNavigate = (taskId: number | undefined) => {
    if (taskId) {
      navigate(`/trips/${taskId}`);
    }
  };

  const handleOnChangePage = (_event: ChangeEvent<unknown>, page: number) => {
    setQueryParam(PAGE_QUERY_PARAMETER, String(page));
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
          {pagination && (
            <Box my={3} justifyContent="center" display="flex">
              <Pagination
                count={pagination.totalPages}
                page={pagination.currentPage + 1}
                color="primary"
                size="large"
                onChange={handleOnChangePage}
              />
            </Box>
          )}
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
