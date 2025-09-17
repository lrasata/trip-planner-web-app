import { ITrip } from "@/types.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ITrip = {
  name: "",
  description: "",
  departureLocation: undefined,
  arrivalLocation: undefined,
  departureDate: "",
  returnDate: "",
  participantCount: undefined,
  participants: undefined,
};

const draftTripSlice = createSlice({
  name: "draftTrip",
  initialState: initialState,
  reducers: {
    update(state, action: PayloadAction<Partial<ITrip>>) {
      Object.assign(state, action.payload);
    },
    reset() {
      return { ...initialState };
    },
  },
});

export const draftTripActions = draftTripSlice.actions;

export default draftTripSlice.reducer;
