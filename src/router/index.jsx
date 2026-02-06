


import { createHashRouter } from "react-router-dom";
import FrontLayout from "../layouts/FrontLayout";
import Index from "../pages/Index";
import VerifyEmailPage from "../pages/ApiPage/VerifyEmailPage";
import 切版 from "../pages/切版/切版";
import 常用元件範例 from "../pages/常用元件範例/常用元件範例";
import 基礎框架 from "../pages/基礎框架教學/基礎框架";
import 常用系統範例 from "../pages/常用系統/常用系統範例";
import GoogleToken取得頁面 from "../pages/常用系統/會員系統/前端/google登入/GoogleToken取得頁面/GoogleToken取得頁面";
import 伺服器雲端上傳 from "../pages/伺服器雲端上傳設定/伺服器雲端上傳";
import 資料庫雲端上傳 from "../pages/資料庫雲端上傳設定/資料庫雲端上傳";
import 常用JS函式 from "../pages/常用JS函式/常用JS函式";
import 常用標籤 from "../pages/常用標籤/常用標籤";




const router = createHashRouter([ //createHashRouter為建立router的方法
	{
		path:"/",
		element: <FrontLayout />,
        children:[
            {
                path: "",
                element: <Index />,
            },
            {
                path: "切版",
                element: <切版 />,
            },
            {
                path: "基礎框架教學",
                element: <基礎框架 />,
            },
            {
                path: "常用元件範例",
                element: <常用元件範例 />,
            },
            {
                path: "常用系統範例",
                element: <常用系統範例 />,
            },
            {
                path: "常用系統範例/token",
                element: <GoogleToken取得頁面 />,
            },
            {
                path: "常用JS函式",
                element: <常用JS函式 />,
            },
            {
                path: "常用標籤",
                element: <常用標籤 />,
            },
            {
                path: "伺服器雲端上傳",
                element: <伺服器雲端上傳 />,
            },
            {
                path: "資料庫雲端上傳",
                element: <資料庫雲端上傳 />,
            },
            {
                path: "verify",
                element: <VerifyEmailPage />,
            },
        ],
	}
])
export default router;