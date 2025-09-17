import { createSlice } from "@reduxjs/toolkit";

interface FilterState {
  searchKeyword: string;
}
const initialFilterState: FilterState = {
  searchKeyword: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState: initialFilterState,
  reducers: {
    updateSearchKeyword(state, action) {
      state.searchKeyword = action.payload.searchKeyword;
    },
  },
});

export const filterActions = filterSlice.actions;

export default filterSlice.reducer;
