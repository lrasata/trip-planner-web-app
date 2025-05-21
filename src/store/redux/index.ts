import { configureStore } from '@reduxjs/toolkit';
import tripReducer from "./TripSlice.ts";

const store = configureStore({
    reducer: { trips: tripReducer },
});

export default store;