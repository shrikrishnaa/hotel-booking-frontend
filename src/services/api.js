import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/';

const API = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the auth token to every request if logged in
API.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    const client = localStorage.getItem('client');
    const uid = localStorage.getItem('uid');
    if (accessToken && client && uid) {
      config.headers['access-token'] = accessToken;
      config.headers['client'] = client;
      config.headers['uid'] = uid;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;