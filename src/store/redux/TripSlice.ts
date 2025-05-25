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

export const createTrip = createAsyncThunk(
  "trips/createTrip",
  async (
    arg: {
      name?: string;
      description?: string;
      departureLocation?: string;
      arrivalLocation?: string;
      departureDate?: string;
      returnDate?: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(`${API_BACKEND_URL}/trips`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: arg.name,
          description: arg.description,
          departureLocation: arg.departureLocation,
          arrivalLocation: arg.arrivalLocation,
          departureDate: `${arg.departureDate}`,
          returnDate: `${arg.returnDate}`,
        }),
      });
      const data = await response.json();
      return {
        trip: data,
      };
    } catch (error) {
      console.error("Error creating trip:", error);
      return rejectWithValue("Oops unable to create trip");
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
    builder.addCase(createTrip.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createTrip.fulfilled, (state, action) => {
      state.isLoading = false;
      // @ts-ignore
      state.plannedTrips = [...state.plannedTrips, action.payload.trip];
    });
    builder.addCase(createTrip.rejected, (state, action) => {
      state.isLoading = false;
      // @ts-ignore
      state.error = action.error.message;
    });
  },
});

export const tripActions = tripSlice.actions;

export default tripSlice.reducer;
