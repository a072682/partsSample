// src/api/apiClient.js
// 攔截器設定
import axios from "axios";

// 請求攔截器(全域)：每次發送 request 前執行
axios.interceptors.request.use((config) => {
    // 從 localStorage 取得 token
    const token = localStorage.getItem('token');

    // 如果有 token，自動加入 Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);