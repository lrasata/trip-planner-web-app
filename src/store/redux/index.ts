import { configureStore } from "@reduxjs/toolkit";
import tripReducer from "./TripSlice.ts";
import draftTripReducer from "./DraftTripSlice.ts";

const store = configureStore({
  reducer: { trips: tripReducer, draftTrip: draftTripReducer },
});

export default store;
