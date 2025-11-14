import { useEffect, useState } from "react";
import axios from 'axios';
axios.defaults.withCredentials = true; // 允許跨域請求時攜帶 Cookie
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'; // 後端 API 基底 URL


export default function EmailTestPage() {
  
    const [email, setEmail] = useState("");

    useEffect(()=>{
        console.log("email內容確認:",email);
    },[email])

    const [msg, setMsg] = useState("");

    const handleEmailTest = async () => {
        try {
            const handleEmailTestRes = await axios.post(`${axios.defaults.baseURL}/user/emailPostTest`, { email });
            console.log("信件寄送成功:",handleEmailTestRes.data);
            setMsg(handleEmailTestRes.data.message);
            setEmail("");
        } catch (err) {
            setMsg("寄送失敗，請稍後再試");
            setEmail("");
        }
    };


    return (
        <div className="container">
        <h4>信件測試</h4>
        <div>
            <input
                type="email"
                placeholder="輸入 email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={()=>{handleEmailTest()}}>送出驗證信</button>
            {msg && <p>{msg}</p>}
        </div>
        </div>
    );
}
