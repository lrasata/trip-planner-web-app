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

api.interceptors.request.use(async (config) => {
  const { token: token, refreshToken: refresh } = getTokens();

  let newToken = token;

  if (token) {
    const decoded = jwtDecode<DecodedToken>(token);
    const isExpired = decoded.exp * 1000 < Date.now(); // compares decoded.exp (in s) * 1000 --> in ms with Date.now() in ms

    if (isExpired && refresh) {
      try {
        const response = await axios.post(API_REFRESH_TOKEN_ENDPOINT, {
          refreshToken: refresh,
        });
        newToken = response.data.token;
        const newRefresh = response.data.refreshToken;
        dispatch(
          authSliceActions.setTokens({
            token: newToken,
            refreshToken: newRefresh,
          }),
        );
      } catch (error) {
        console.error("Failed to refresh token", error);
        dispatch(authSliceActions.clearTokens());
        throw error;
      }
    }
    config.headers.Authorization = `Bearer ${newToken}`;
  }
  return config;
});

export default api;
