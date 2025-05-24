import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BACKEND_URL } from "../../constants/constants.ts";

const initialTripState = {
  plannedTrips: [],
  pastTrips: [],
  isLoading: false,
  error: null,
};

export const fetchPlannedTrips = createAsyncThunk(
  "trips/fetchPlannedTrips",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BACKEND_URL}/trips`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return {
        plannedTrips: data,
      };
    } catch (error) {
      console.error("Error fetching planned trips:", error);
      return rejectWithValue("Oops unable to fetch planned trips from API");
    }
  },
);

const tripSlice = createSlice({
  name: "tasks",
  initialState: initialTripState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPlannedTrips.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPlannedTrips.fulfilled, (state, action) => {
      state.isLoading = false;
      // @ts-ignore
      state.plannedTrips = action.payload.plannedTrips;
    });
    builder.addCase(fetchPlannedTrips.rejected, (state, action) => {
      state.isLoading = false;
      // @ts-ignore
      state.error = action.error.message;
    });
  },
});

export const tripActions = tripSlice.actions;

export default tripSlice.reducer;
