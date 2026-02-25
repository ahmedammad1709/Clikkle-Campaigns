import axios from "axios";


const api = axios.create({
  // baseURL: process.env.REACT_APP_SERVER || '', 
  baseURL: 'https://campaigns.clikkle.com:9000', 
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

    const userRaw = localStorage.getItem('user');
    const refreshRaw = localStorage.getItem('refreshToken');
    console.log('userRaw:', userRaw);
    console.log('refreshRaw:', refreshRaw);
    
    const user = safeParse(userRaw);
    const refreshToken = safeParse(refreshRaw); 

    const token = refreshToken || (user && (user.token || user.accessToken));

    config.headers = config.headers || {};

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Authorization header set:', `Bearer ${String(token).substring(0, 15)}...`);
    } else {
      console.log('No token set for request');
    }

    console.log('Final headers:', config.headers);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
