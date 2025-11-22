


import { createHashRouter } from "react-router-dom";
import FrontLayout from "../layouts/FrontLayout";
import Index from "../pages/Index";
import PostmanTest from "../pages/PostmanTest";
import RenderServerUpLoad from "../pages/RenderServerUpLoad";
import RenderDataBaseUpLoad from "../pages/RenderDataBaseUpLoad";
import PreCodePage from "../pages/PreCodePage";
import ApiPage from "../pages/ApiPage/ApiPage";
import CommentSystem from "../pages/CommentSystemPage/CommentSystem";
import ShoppingCart from "../pages/ShoppingCartPage/ShoppingCart";
import ChartTest from "../pages/Chart/Chart";
import VerifyEmailPage from "../pages/ApiPage/VerifyEmailPage";
import DataBase from "../pages/DataBase/DataBase";
import D3 from "../pages/D3/D3";
import WebInfrastructure from "../pages/WebInfrastructure/WebInfrastructure";
import FramerMotion from "../pages/FramerMotion/FramerMotion";
import 切版 from "../pages/切版/切版";
import 常用元件範例 from "../pages/常用元件範例/常用元件範例";
import AnimationCss from "../pages/AnimationCss/AnimationCss";


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
                path: "AnimationCss",
                element: <AnimationCss />,
            },
            {
                path: "FramerMotion",
                element: <FramerMotion />,
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