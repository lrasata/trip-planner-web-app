export const APP_NAME = "Trip planner";

export const API_BACKEND_BASE_URL = import.meta.env.VITE_API_URL;
export const API_BACKEND_URL = `${API_BACKEND_BASE_URL}/api`;
export const API_SIGNUP_ENDPOINT = `${API_BACKEND_BASE_URL}/auth/signup`;
export const API_LOGIN_ENDPOINT = `${API_BACKEND_BASE_URL}/auth/login`;
export const API_LOGOUT_ENDPOINT = `${API_BACKEND_BASE_URL}/auth/logout`;
export const API_USER_ENDPOINT = `${API_BACKEND_URL}/users/`;

export const API_LOCATIONS = import.meta.env.VITE_API_LOCATIONS;
export const API_UPLOAD_MEDIA = import.meta.env.VITE_API_UPLOAD_MEDIA;

export const SEARCH_QUERY_PARAMETER = "search";
export const PAGE_QUERY_PARAMETER = "page";
