import axios from "axios";
import { useAlertStore } from "../store/alertStore";
import { createBrowserHistory } from "history";
import doLogout from "../utils/doLogout.util";

const history = createBrowserHistory();
let isRefreshing = false;

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.url !== "/login" && config.url !== "/signup") {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: any) => {
    const originalRequest = error.config;
    const statusCode = error.response.data.statusCode;
    const message = error.response.data.message;
    
    if (statusCode === 401) {
      if (message[0].includes("일치")) {
        useAlertStore.getState().setAlert(message[0], "red");
      } else {
        doLogout();
      }
      
      return Promise.reject(error);
    }

    if (statusCode === 403) {
      alert("권한이 없습니다.");
      history.back();
      return Promise.reject(error);
    }

    if (statusCode === 462) {
      alert("토큰이 만료되었습니다.");
      doLogout();
      return Promise.reject(error);
    }
    
    if (statusCode === 461) {
      if (isRefreshing) {
        return Promise.reject(error);
      }

      isRefreshing = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        
        if (!refreshToken) {
          alert("세션이 만료되었습니다.");
          doLogout();
          return Promise.reject(error);
        }

        const res = await axios.post(`${process.env.REACT_APP_API_URL}/members/refresh`, 
        {
          refresh_token: refreshToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
        
        if (res.status === 461 || res.status === 462) {
          alert("세션이 만료되었습니다.");
          doLogout();
          return Promise.reject(error);
        }

        const newAccessToken = res.data.data.access_token;
        const newRefreshToken = res.data.data.refresh_token;

        // 로컬스토리지에 새 토큰 저장
        localStorage.setItem("token", newAccessToken);
        if (newRefreshToken) {
          localStorage.setItem("refreshToken", newRefreshToken);
        }

        // 원래 요청의 헤더에 새 토큰 적용 후 재시도
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return apiClient(originalRequest);
      } catch (error: any) {
        // 재발급 실패 => 완전히 로그아웃
        alert("세션이 만료되었습니다.");
        doLogout();
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    } else {
      useAlertStore.getState().setAlert(message, "red");
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;