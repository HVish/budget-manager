import axios from 'axios';
import { clearSession } from './session';

const request = axios.create({
  baseURL: '/api',
});

request.interceptors.response.use(
  response => response,
  err => {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      clearSession();
      window.location.replace('/auth');
    }
    return Promise.reject(err);
  }
);

export default request;
