import axios from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';

export const API_URL = process.env.REACT_APP_API_URL;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;

  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status.toString() === '401' && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.post<AuthResponse>(`${API_URL}/users/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem('accessToken', response.data.accessToken);
        return $api.request(originalRequest);
      } catch (e) {
        console.log('UnauthorizedError!');
      }
    }
    throw error;
  }
);

export default $api;
