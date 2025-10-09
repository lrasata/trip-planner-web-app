import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API_USER_ENDPOINT } from "@/shared/constants/constants.ts";
import { nullToUndefined } from "@/shared/utils/utils.ts";
import { IUser } from "@/types.ts";
import api from "../../api/api.ts";

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  authenticatedUser?: IUser;
  status: string;
  error: string | null;
}

const persistedIsLoggedIn = localStorage.getItem("isLoggedIn");

const preloadedAuthState = persistedIsLoggedIn
  ? { isLoggedIn: JSON.parse(persistedIsLoggedIn) }
  : { isLoggedIn: false };

const initialState: AuthState = {
  token: null,
  refreshToken: null,
  authenticatedUser: undefined,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed' | 'created' | 'updated' | 'deleted'
  error: null,
  ...preloadedAuthState,
};

export const fetchAuthenticatedUser = createAsyncThunk(
  "auth/fetchAuthenticatedUser",
  async (_, { rejectWithValue }) => {
    const url = new URL(`${API_USER_ENDPOINT}me`);

    try {
      const response = await api.get(url.toString(), {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = response.data;
      return {
        authenticatedUser: nullToUndefined(data),
      };
    } catch (error) {
      console.error("Error fetching authenticated user:", error);
      return rejectWithValue(
        "Oops unable to fetch authenticated user from API",
      );
    }
  },
);

export const updateAuthenticatedUser = createAsyncThunk(
  "auth/updateAuthenticatedUser",
  async (arg: IUser, { rejectWithValue }) => {
    const url = new URL(`${API_USER_ENDPOINT}profile`);

    try {
      const response = await api.put(
        url.toString(),
        { ...arg },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      const data = response.data;
      return {
        authenticatedUser: nullToUndefined(data),
      };
    } catch (error) {
      console.error("Error updating authenticated user:", error);
      return rejectWithValue(
        "Oops unable to update authenticated user from API",
      );
    }
  },
);

const authSlice = createSlice({
  name: "authentication",
  initialState: initialState,
  reducers: {
    setTokens(
      state,
      action: PayloadAction<{
        token: string | null;
        refreshToken: string | null;
      }>,
    ) {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isLoggedIn = !!action.payload.token;

      // Save only isLoggedIn to localStorage
      localStorage.setItem("isLoggedIn", JSON.stringify(state.isLoggedIn));
    },
    clearTokens(state) {
      state.token = null;
      state.refreshToken = null;
      state.isLoggedIn = false;
      state.authenticatedUser = undefined;

      // Remove from localStorage
      localStorage.removeItem("isLoggedIn");
    },
    updateIsLoggedInState(
      state,
      action: PayloadAction<{ isLoggedIn: boolean }>,
    ) {
      state.isLoggedIn = action.payload.isLoggedIn;
      if (!action.payload.isLoggedIn) {
        state.authenticatedUser = undefined;
      }
      // Keep storage in sync
      localStorage.setItem("isLoggedIn", JSON.stringify(state.isLoggedIn));
    },
    reset() {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuthenticatedUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAuthenticatedUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.authenticatedUser = action.payload.authenticatedUser;
    });
    builder.addCase(fetchAuthenticatedUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(updateAuthenticatedUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateAuthenticatedUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.authenticatedUser = action.payload.authenticatedUser;
    });
    builder.addCase(updateAuthenticatedUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export const authSliceActions = authSlice.actions;

export default authSlice.reducer;
