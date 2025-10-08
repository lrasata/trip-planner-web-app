import EditTripContainer from "../containers/EditTripContainer.tsx";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchTrip } from "@/shared/store/redux/TripSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/shared/store/redux/index.ts";

const EditTripPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const trip = useSelector((state: RootState) => state.trips.editingTrip);
  const status = useSelector((state: RootState) => state.trips.status);
  const error = useSelector((state: RootState) => state.trips.error);

  useEffect(() => {
    dispatch(fetchTrip({ id: Number(id) }));
  }, []);

  return (
    <>
      {trip && <EditTripContainer trip={trip} status={status} error={error} />}
    </>
  );
};

export default EditTripPage;
