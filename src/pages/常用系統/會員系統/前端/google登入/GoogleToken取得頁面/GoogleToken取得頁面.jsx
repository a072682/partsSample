import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function GoogleToken取得頁面() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 取得 query string
    const params = new URLSearchParams(location.search);
    console.log("params",params);
    const token = params.get("value"); // 或 token
    console.log("token內容",token);

    if (token) {
      // 存 JWT
      localStorage.setItem("token", token);
      console.log("JWT 已存入 localStorage",token);
    }

    // 🔁 自動導回你想回去的頁面
    navigate("/常用系統範例", { replace: true });
    //{ replace: true } 確保跳轉頁面後按上一頁時token也不會再出現
  }, [navigate]);

  return null; // 不需要畫面
}
