import EditTripContainer from "../containers/EditTripContainer.tsx";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchTrip } from "../store/redux/TripSlice.ts";
import { useDispatch, useSelector } from "react-redux";

const EditTripPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // @ts-ignore
  const trip = useSelector((state) => state.trips.editingTrip);

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchTrip({ id }));
  }, []);

  return <EditTripContainer trip={trip} />;
};

export default EditTripPage;
