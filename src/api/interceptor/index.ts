import axios from "axios";
import { TOKEN, USER } from "../../constants/Commom";

export const setUnLogin = () => {
  localStorage.removeItem(TOKEN);
  localStorage.removeItem(USER);
};

const axiosInstance = axios.create({
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (localStorage.getItem(TOKEN) && config.headers) {
      config.headers.Authorization = localStorage.getItem(TOKEN);
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    console.log(err);
    if (err.response) {
      switch (err.response.status) {
        case 401:
          alert(err.response.data.message);
          setUnLogin();
          location.reload();
          break;
        default:
          alert(err.response.data.message);
      }
    } else {
      alert(err.message + "(请刷新重试～)");
    }
    return Promise.reject(err);
  }
);

export { axiosInstance };
