


import { createHashRouter } from "react-router-dom";
import FrontLayout from "../layouts/FrontLayout";
import Accordion from "../pages/AccordionPage/Accordion";
import Index from "../pages/Index";
import PostmanTest from "../pages/PostmanTest";
import RenderServerUpLoad from "../pages/RenderServerUpLoad";
import RenderDataBaseUpLoad from "../pages/RenderDataBaseUpLoad";
import PreCodePage from "../pages/PreCodePage";
import ApiPage from "../pages/ApiPage/ApiPage";
import TabPage from "../pages/TabPage/TabPage";
import Dropdown from "../pages/DropdownPage/Dropdown";
import InputGroup from "../pages/InputGroupPage/InputGroup";
import CollapsePage from "../pages/CollapsePage/Collapse";
import Swiper from "../pages/SwiperPage/Swiper";
import CommentSystem from "../pages/CommentSystemPage/CommentSystem";
import ShoppingCart from "../pages/ShoppingCartPage/ShoppingCart";
import ChartTest from "../pages/Chart/Chart";
import EmailTestPage from "../pages/EmailTestPage";
import VerifyEmailPage from "../pages/ApiPage/VerifyEmailPage";
import DataBase from "../pages/DataBase/DataBase";
import D3 from "../pages/D3/D3";
import AnimationCss from "../pages/AnimationCss/animationCss";
import WebInfrastructure from "../pages/WebInfrastructure/WebInfrastructure";
import FramerMotion from "../pages/FramerMotion/FramerMotion";
import 切版 from "../pages/切版/切版";



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
                path: "EmailTestPage",
                element: <EmailTestPage />,
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
                path: "Accordion",
                element: <Accordion />,
            },
            {
                path: "Dropdown",
                element: <Dropdown />,
            },
            {
                path: "Tab",
                element: <TabPage />,
            },
            {
                path: "Collapse",
                element: <CollapsePage />,
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
                path: "Swiper",
                element: <Swiper />,
            },
            {
                path: "InputGroup",
                element: <InputGroup />,
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