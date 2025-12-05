


import { createHashRouter } from "react-router-dom";
import FrontLayout from "../layouts/FrontLayout";
import Index from "../pages/Index";
import PostmanTest from "../pages/其他工具教學/postman教學/PostmanTest";
import RenderServerUpLoad from "../pages/伺服器雲端上傳/Render/RenderServerUpLoad";
import RenderDataBaseUpLoad from "../pages/資料庫雲端上傳/Render/RenderDataBaseUpLoad";
import PreCodePage from "../pages/其他套件設定/PreCode設定/PreCodePage";
import ApiPage from "../pages/ApiPage/ApiPage";
import CommentSystem from "../pages/CommentSystemPage/CommentSystem";
import ShoppingCart from "../pages/ShoppingCartPage/ShoppingCart";
import ChartTest from "../pages/常用元件範例/圖表元件/Chart/Chart";
import VerifyEmailPage from "../pages/ApiPage/VerifyEmailPage";
import DataBase from "../pages/DataBase/DataBase";
import D3 from "../pages/常用元件範例/圖表元件/D3/D3";
import WebInfrastructure from "../pages/基礎框架教學/WebInfrastructure/WebInfrastructure";
import 切版 from "../pages/切版/切版";
import 常用元件範例 from "../pages/常用元件範例/常用元件範例";


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
                path: "常用元件範例",
                element: <常用元件範例 />,
            },
            {
                path: "WebInfrastructure",
                element: <WebInfrastructure />,
            },
            {
                path: "verify",
                element: <VerifyEmailPage />,
            },
            {
                path: "ChartTest",
                element: <ChartTest />,
            },
            {
                path: "D3",
                element: <D3 />,
            },
            {
                path: "CommentSystem",
                element: <CommentSystem />,
            },
            {
                path: "ShoppingCart",
                element: <ShoppingCart />,
            },
            {
                path: "PreCodePage",
                element: <PreCodePage />,
            },
            {
                path: "DataBase",
                element: <DataBase />,
            },
            {
                path: "ApiPage",
                element: <ApiPage />,
            },
            {
                path: "PostmanTest",
                element: <PostmanTest />,
            },
            {
                path: "RenderServerUpLoad",
                element: <RenderServerUpLoad />,
            },
            {
                path: "RenderDataBaseUpLoad",
                element: <RenderDataBaseUpLoad />,
            },
        ],
	}
])
export default router;