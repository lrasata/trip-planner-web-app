import { configureStore } from "@reduxjs/toolkit";
import tripReducer from "./TripSlice.ts";
import draftTripReducer from "./DraftTripSlice.ts";
import authReducer from "./AuthSlice.ts";
import filterReducer from "./FilterSlice.ts";

const store = configureStore({
  reducer: {
    trips: tripReducer,
    draftTrip: draftTripReducer,
    auth: authReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
