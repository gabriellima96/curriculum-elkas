import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
  baseURL: 'http://api.curriculumelkas.com/api',
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
