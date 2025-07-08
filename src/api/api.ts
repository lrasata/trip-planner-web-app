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

// Response interceptor: redirect to login on 401 / 403
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        console.warn("Redirecting to login due to auth/server error");
        dispatch(authSliceActions.clearTokens());
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
