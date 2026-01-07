import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// 引入 Bootstrap5 原生CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// 引入 Bootstrap5 原生JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { RouterProvider } from 'react-router-dom';//使用ReactRouter時引入
import router from './router'//使用ReactRouter時引入

import { Provider } from 'react-redux'//使用ReduxToolkit時引入
import { store } from './store.js'//使用ReduxToolkit時引入

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";//Google reCAPTCHA v3套件

import "chart.js/auto";//chart.js圖表套件

import "./pages/常用系統/會員系統/前端/API/API.js"//api攔截器

import './assets/styles/all.scss'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      {/* 把 RouterProvider 包在 GoogleReCaptchaProvider 內 */}
      <GoogleReCaptchaProvider
        reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY_V3} // ★ 修改：v3 的 site key（前端）
        scriptProps={{ async: true, defer: true }}              
        //這是為了流暢度設定不加也無訪
        useEnterprise={false}                                    
        // false為標準版 true是付費版
      >
        <RouterProvider router={router}/>
      </GoogleReCaptchaProvider>
    </Provider>
  </StrictMode>,
)
