export const APP_NAME = "Trip planner";

export const API_BACKEND_URL = `${import.meta.env.VITE_API_URL}/api`;
export const API_LOGIN_ENDPOINT = `${import.meta.env.VITE_API_URL}/auth/login`;
export const API_LOGOUT_ENDPOINT = `${import.meta.env.VITE_API_URL}/auth/logout`;
export const API_USER_ENDPOINT = `${API_BACKEND_URL}/users/`;

export const API_CITIES_GEO_DB_URL = `${import.meta.env.VITE_API_CITIES_GEO_DB_URL}`;
export const API_COUNTRIES_GEO_DB_URL = `${import.meta.env.VITE_API_COUNTRIES_GEO_DB_URL}`;
export const GEO_DB_HOST = `${import.meta.env.VITE_GEO_DB_RAPID_API_HOST}`;
export const GEO_DB_API_KEY = `${import.meta.env.VITE_GEO_DB_RAPID_API_KEY}`;
