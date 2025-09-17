import axios from "axios";
import { API_BACKEND_BASE_URL } from "../constants/constants.ts";
import { authSliceActions } from "../store/redux/AuthSlice.ts";

const api = axios.create({
  baseURL: API_BACKEND_BASE_URL,
});

let getTokens: () => {
  token: string | null;
  refreshToken: string | null;
} = () => ({
  token: null,
  refreshToken: null,
});
let dispatch: any;

export const injectStore = (_dispatch: any, _getTokens: typeof getTokens) => {
  dispatch = _dispatch;
  getTokens = _getTokens;
};

/**
 * Response interceptor to handle 401/403 errors by attempting token refresh.
 */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is from refresh token endpoint, clear tokens and reject immediately.
    if (originalRequest.url === "/auth/refresh-token") {
      dispatch(authSliceActions.clearTokens());
      return Promise.reject(error);
    }

    // If unauthorized or forbidden error and we haven't retried yet
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        // Attempt to refresh token
        const res = await api.post("/auth/refresh-token", null, {
          withCredentials: true,
        });
        const newAccessToken = res.data.token;

        // Update token in Redux store
        dispatch(authSliceActions.setTokens(newAccessToken));

        // Update original request with new token and retry
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed - clear tokens and reject
        dispatch(authSliceActions.clearTokens());
        return Promise.reject(refreshError);
      }
    }

    // For other errors or if already retried, clear tokens and redirect to login
    console.warn("Redirecting to login due to auth/server error");
    dispatch(authSliceActions.clearTokens());
    window.location.href = "/login";

    return Promise.reject(error);
  },
);

export default api;
