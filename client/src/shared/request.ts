import axios from 'axios';
import { getSession } from './session';

const request = axios.create({
  baseURL: '/api',
  headers: {
    Authorization: process.env.REACT_APP_AUTH_TOKEN,
  },
});

request.interceptors.request.use(config => {
  const session = getSession();

  if (!config.headers) config.headers = {};

  if (session) {
    config.headers.Authorization = `Basic ${session}`;
  }

  return config;
});

export default request;
