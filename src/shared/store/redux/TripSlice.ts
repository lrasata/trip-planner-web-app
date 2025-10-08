import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BACKEND_URL } from "@/shared/constants/constants.ts";
import {
  existsById,
  nullToUndefined,
  removeItemById,
  updateItemById,
} from "@/shared/utils/utils.ts";
import { IPagination, ITrip, TripPaginatedResponse } from "@/types.ts";
import api from "../../api/api.ts";
import { AxiosResponse } from "axios";

interface ITripState {
  editingTrip: ITrip | null;
  trips: ITrip[];
  status: string;
  error: string | null;
  pagination: IPagination | null;
}

const initialTripState: ITripState = {
  editingTrip: null,
  trips: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed' | 'created' | 'updated' | 'deleted'
  error: null,
  pagination: null,
};

export const fetchTrip = createAsyncThunk(
  "trips/fetchTrip",
  async (arg: { id: number }, { rejectWithValue }) => {
    try {
      const tripResponse = await api.get(`${API_BACKEND_URL}/trips/${arg.id}`, {
        withCredentials: true,
      });

      const response = tripResponse.data;
      const tripData = nullToUndefined(response);

      // Extract participantIds from tripData
      const participantIds = tripData.participantIds;

      // If there are participant IDs, fetch participants in batch
      let participants = [];
      if (participantIds && participantIds.length > 0) {
        const participantsResponse = await api.get(
          `${API_BACKEND_URL}/users?ids=${participantIds.join(",")}`,
          {
            withCredentials: true,
          },
        );

        participants = participantsResponse.data;
      }
      return {
        trip: {
          ...tripData,
          participants: participants,
          metadata: [...tripData.metadataList],
        },
      };
    } catch (error) {
      console.error("Error fetching trip with id: ", error);
      return rejectWithValue("Oops unable to fetch trip from API");
    }
  },
);

export const fetchTrips = createAsyncThunk(
  "trips/fetchTrips",
  async (
    arg: {
      dateFilter?: string;
      keyword?: string;
      page?: number;
      size?: number;
    },
    { rejectWithValue },
  ) => {
    const url = new URL(`${API_BACKEND_URL}/trips`);

    arg?.dateFilter && url.searchParams.set("dateFilter", arg.dateFilter);
    arg?.keyword && url.searchParams.set("keyword", arg.keyword);
    arg?.page && url.searchParams.set("page", String(arg.page));
    arg?.size && url.searchParams.set("size", String(arg.size));

    try {
      const response: AxiosResponse<TripPaginatedResponse> = await api.get(
        url.toString(),
        {
          withCredentials: true,
        },
      );
      const data = response.data.content;
      return {
        trips: nullToUndefined(data),
        pagination: {
          currentPage: response.data.page,
          sizePerPage: response.data.size,
          totalElements: response.data.totalElements,
          totalPages: response.data.totalPages,
          isLastPage: response.data.last,
        },
      };
    } catch (error) {
      console.error("Error fetching planned trips:", error);
      return rejectWithValue("Oops unable to fetch planned trips from API");
    }
  },
);

export const createTrip = createAsyncThunk(
  "trips/createTrip",
  async (arg: Omit<ITrip, "id">, { rejectWithValue }) => {
    const { participants, ...body } = arg;

    try {
      const participantIds = [
        ...new Set((participants ?? []).map((user) => user.id)),
      ]; // remove duplicates

      const response = await api.post(
        `${API_BACKEND_URL}/trips`,
        {
          ...body,
          participantIds,
        },
        {
          withCredentials: true,
        },
      );

      const data = response.data;
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
  async (arg: ITrip, { rejectWithValue }) => {
    const { participants, ...body } = arg;

    try {
      const participantIds = [
        ...new Set((participants ?? []).map((user) => user.id)),
      ];

      const response = await api.put(
        `${API_BACKEND_URL}/trips/${arg.id}`,
        {
          ...body,
          participantIds,
        },
        {
          withCredentials: true,
        },
      );

      const data = response.data;

      return {
        trip: {
          ...data,
          participants: participants,
        },
      };
    } catch (error) {
      console.error("Error updating trip:", error);
      return rejectWithValue("Oops unable to update trip");
    }
  },
);

export const deleteTrip = createAsyncThunk(
  "trips/deleteTrip",
  async (arg: { id: number }, { rejectWithValue }) => {
    try {
      await api.delete(`${API_BACKEND_URL}/trips/${arg.id}`, {
        withCredentials: true,
      });
      return {
        trip: { id: arg.id },
      };
    } catch (error) {
      console.error("Error deleting trip with id: ", error);
      return rejectWithValue("Oops unable to delete trip from API");
    }
  },
);

const tripSlice = createSlice({
  name: "tasks",
  initialState: initialTripState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTrips.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchTrips.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.trips = action.payload.trips;
      state.pagination = action.payload.pagination;
    });
    builder.addCase(fetchTrips.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(createTrip.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createTrip.fulfilled, (state, action) => {
      state.status = "created";
      state.trips = [...state.trips, action.payload.trip];
    });
    builder.addCase(createTrip.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(updateTrip.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateTrip.fulfilled, (state, action) => {
      state.status = "updated";
      const updatedData = { ...action.payload.trip };

      if (existsById(state.trips, updatedData.id)) {
        state.trips = updateItemById(
          [...state.trips],
          updatedData.id,
          updatedData,
        );
      }

      state.editingTrip = updatedData;
    });
    builder.addCase(updateTrip.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(fetchTrip.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchTrip.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.editingTrip = { ...action.payload.trip };
    });
    builder.addCase(fetchTrip.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(deleteTrip.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteTrip.fulfilled, (state, action) => {
      state.status = "deleted";
      const deletedId = action.payload.trip.id;
      if (existsById(state.trips, deletedId)) {
        state.trips = removeItemById([...state.trips], deletedId);
      }
    });
    builder.addCase(deleteTrip.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export const tripActions = tripSlice.actions;

export default tripSlice.reducer;
