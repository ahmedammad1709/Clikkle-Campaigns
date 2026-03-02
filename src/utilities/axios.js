import axios from "axios";
import { getCookie } from "./cookies";

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER || 'https://api-campaigns-clikkle-com-main.onrender.com', 
});

const safeParse = (s) => {
  try {
    return s ? JSON.parse(s) : null;
  } catch (e) {
    console.error('safeParse error:', e);
    return null;
  }
};

api.interceptors.request.use(
  (config) => {
    if (typeof window === 'undefined') return config;

    // 1. Try to get token from localStorage (direct string)
    let token = localStorage.getItem('token');

    // 2. If not found, check localStorage 'user' object
    if (!token) {
      const userRaw = localStorage.getItem('user');
      const user = safeParse(userRaw);
      if (user && (user.token || user.accessToken)) {
        token = user.token || user.accessToken;
      }
    }

    // 3. If still not found, check cookies
    if (!token) {
      token = getCookie('accessToken') || getCookie('token');
    }

    config.headers = config.headers || {};

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // console.log('Authorization header set:', `Bearer ${String(token).substring(0, 15)}...`);
    } else {
      console.warn('No token set for request to:', config.url);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
