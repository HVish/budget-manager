import axios from 'axios';

const request = axios.create({
  baseURL: '/api',
  headers: {
    Authorization: process.env.REACT_APP_AUTH_TOKEN,
  },
});

export default request;
