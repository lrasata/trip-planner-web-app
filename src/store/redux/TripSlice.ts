import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BACKEND_URL } from "../../constants/constants.ts";
import { existsById, updateItemById } from "../../utils/utils.ts";

const initialTripState = {
  editingTrip: null,
  plannedTrips: [],
  pastTrips: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed' | 'created' | 'updated'
  error: null,
};

export const fetchTrip = createAsyncThunk(
  "trips/fetchTrip",
  async (arg: { id: number }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BACKEND_URL}/trips/${arg.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return {
        trip: data,
      };
    } catch (error) {
      console.error("Error fetching trip with id: ", error);
      return rejectWithValue("Oops unable to fetch trip from API");
    }
  },
);

export const fetchPlannedTrips = createAsyncThunk(
  "trips/fetchPlannedTrips",
  async (arg: { dateFilter?: string }, { rejectWithValue }) => {
    const url = new URL(`${API_BACKEND_URL}/trips`);

    if (arg && arg.dateFilter) {
      url.searchParams.set("dateFilter", arg.dateFilter);
    }

    try {
      const response = await fetch(url.toString(), {
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

export const updateTrip = createAsyncThunk(
  "trips/updateTrip",
  async (
    arg: {
      id: number;
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
      const response = await fetch(`${API_BACKEND_URL}/trips/${arg.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: arg.id,
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
      console.error("Error updating trip:", error);
      return rejectWithValue("Oops unable to update trip");
    }
  },
);

const tripSlice = createSlice({
  name: "tasks",
  initialState: initialTripState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPlannedTrips.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchPlannedTrips.fulfilled, (state, action) => {
      state.status = "succeeded";
      // @ts-ignore
      state.plannedTrips = action.payload.plannedTrips;
    });
    builder.addCase(fetchPlannedTrips.rejected, (state, action) => {
      state.status = "failed";
      // @ts-ignore
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(createTrip.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createTrip.fulfilled, (state, action) => {
      state.status = "created";
      // @ts-ignore
      state.plannedTrips = [...state.plannedTrips, action.payload.trip];
    });
    builder.addCase(createTrip.rejected, (state, action) => {
      state.status = "failed";
      // @ts-ignore
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(updateTrip.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateTrip.fulfilled, (state, action) => {
      state.status = "updated";
      const updatedData = { ...action.payload.trip };

      if (existsById(state.plannedTrips, updatedData.id)) {
        // @ts-ignore
        state.plannedTrips = updateItemById(
          [...state.plannedTrips],
          updatedData.id,
          updatedData,
        );
      }

      if (existsById(state.pastTrips, updatedData.id)) {
        // @ts-ignore
        state.pastTrips = updateItemById(
          [...state.pastTrips],
          updatedData.id,
          updatedData,
        );
      }

      state.editingTrip = updatedData;
    });
    builder.addCase(updateTrip.rejected, (state, action) => {
      state.status = "failed";
      // @ts-ignore
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(fetchTrip.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchTrip.fulfilled, (state, action) => {
      state.status = "succeeded";
      // @ts-ignore
      state.editingTrip = { ...action.payload.trip };
    });
    builder.addCase(fetchTrip.rejected, (state, action) => {
      state.status = "failed";
      // @ts-ignore
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export const tripActions = tripSlice.actions;

export default tripSlice.reducer;
