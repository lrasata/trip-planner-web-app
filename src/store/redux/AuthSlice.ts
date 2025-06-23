import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialState,
  reducers: {
    update(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      Object.assign(state, action.payload);
    },
    reset() {
      return { ...initialState };
    },
  },
});

export const authSliceActions = authSlice.actions;

export default authSlice.reducer;
