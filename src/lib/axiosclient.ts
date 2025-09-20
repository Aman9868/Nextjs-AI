import axios from 'axios';
const axiosClient = axios.create({
    baseURL:process.env.NEXT_PUBLIC_API_URL,
    headers:{
        'Content-Type':'application/json'
    }
});
//-----Add a request interceptor
axiosClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
export default axiosClient;