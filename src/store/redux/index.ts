import { configureStore } from "@reduxjs/toolkit";
import tripReducer from "./TripSlice.ts";
import draftTripReducer from "./DraftTripSlice.ts";
import authReducer from "./AuthSlice.ts";

const store = configureStore({
  reducer: {
    trips: tripReducer,
    draftTrip: draftTripReducer,
    auth: authReducer,
  },
});

export default store;
