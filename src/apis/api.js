import axios from 'axios';

const ACCESS_TOKEN = localStorage.getItem('accessToken');

// baseURL: process.env.REACT_BASE_URL,
export const instance = axios.create({
  baseURL: `https://pre-onboarding-selection-task.shop`,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  function (config) {
    if (ACCESS_TOKEN) {
      config.headers.Authorization = ACCESS_TOKEN;
    } else {
      config.headers.Authorization = localStorage.getItem('accessToken');
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
