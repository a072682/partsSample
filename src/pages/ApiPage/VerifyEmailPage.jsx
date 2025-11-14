

import axios from "axios";
import { useEffect, useRef, useState } from "react"; 
import { useSearchParams, useNavigate } from "react-router-dom"; // 從 react-router-dom 匯入讀取查詢參數與導頁工具
axios.defaults.withCredentials = true; // 允許跨域請求時攜帶 Cookie
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'; // 後端 API 基底 URL


export default function VerifyEmailPage() { 

  const [searchParams] = useSearchParams(); 
  // 取得 URL 查詢參數物件（如 ?token=...&email=...）
  const navigate = useNavigate(); 
  // 取得導頁函式，用於程式化導向其他路由
  const [status, setStatus] = useState("loading"); 
  // 狀態機：loading | success | error，預設為 loading
  const [message, setMessage] = useState(""); 
  // 用來顯示成功或錯誤訊息的文字
  const timeoutRef = useRef(null); 
  // 用來保存 setTimeout 的 id

  const verifyEmail = async(token, email) => { // 宣告非同步函式 verifyEmail
    setStatus("loading");
    try { 
        const verifyEmailRef = await axios.post(`${axios.defaults.baseURL}/user/afterEmailCheck`,
            {
            token,
            email
            }
        );
        console.log("Email 驗證成功",verifyEmailRef.data);
        setStatus("success"); // 當驗證通過：設為成功狀態
        setMessage("Email 驗證成功！即將跳回首頁…"); // 告知使用者驗證成功
        // 2 秒後導頁，並把計時器 id 存到 ref
        timeoutRef.current = setTimeout(() => {
            navigate("/ApiPage");
        }, 2000);
    } catch (error) { // 捕捉網路錯誤或程式錯誤
        console.log("Email 驗證失敗",error)
        setStatus("error"); // 設為錯誤狀態
        setMessage("系統繁忙，請稍後再試。"); // 顯示通用錯誤訊息
    }
 };

useEffect(() => { // 在元件掛載或相依變數改變時執行副作用
    const token = searchParams.get("token"); 
    // 從 URL 取出 token 參數
    const email = searchParams.get("email"); 
    // 從 URL 取出 email 參數

    if (!token || !email) { // 若少任一參數，視為不合法或失效
        setStatus("error"); // 將狀態設為錯誤
        setMessage("驗證連結不完整或已失效。"); // 顯示錯誤訊息
        return; // 中止後續流程
    }

    verifyEmail(token, email); // 立刻執行剛宣告的非同步驗證函式

    // 元件卸載或查詢參數改變時，清掉計時器
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };


}, [searchParams]); // 當查詢參數或 navigate 變動時重新執行（一般只有首次掛載會跑一次）

  return (
    <div>
        {
            status === "loading"?
            (<p>正在驗證您的 Email，請稍候…</p>)
            :
            (<p>{message}</p>)
        }
    </div>
  )
}
