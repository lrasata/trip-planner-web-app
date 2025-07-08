import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  API_BACKEND_BASE_URL,
  API_REFRESH_TOKEN_ENDPOINT,
} from "../constants/constants.ts";
import { authSliceActions } from "../store/redux/AuthSlice.ts";

interface DecodedToken {
  exp: number;
}

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

// Request interceptor: refresh access token if expired
api.interceptors.request.use(async (config) => {
  const { token, refreshToken } = getTokens();
  let currentToken = token;

  if (token) {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const isExpired = decoded.exp * 1000 < Date.now(); // exp is in seconds, Date.now() is in ms

      if (isExpired && refreshToken) {
        const response = await axios.post(API_REFRESH_TOKEN_ENDPOINT, {
          refreshToken,
        });
        currentToken = response.data.token;
        const newRefresh = response.data.refreshToken;

        dispatch(
          authSliceActions.setTokens({
            token: currentToken,
            refreshToken: newRefresh,
          }),
        );
      }
    } catch (error) {
      console.error("Failed to refresh token", error);
      dispatch(authSliceActions.clearTokens());
      throw error;
    }

    if (currentToken) {
      config.headers.Authorization = `Bearer ${currentToken}`;
    }
  }

  return config;
});

// Response interceptor: redirect to login on 401 / 403 / 500
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      if (status === 401 || status === 403 || status === 500) {
        console.warn("Redirecting to login due to auth/server error");
        dispatch(authSliceActions.clearTokens());
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
