import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
  baseURL: 'http://167.99.182.79/api',
});

api.interceptors.request.use(async (configObj) => {
  const config = configObj;
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default api;
