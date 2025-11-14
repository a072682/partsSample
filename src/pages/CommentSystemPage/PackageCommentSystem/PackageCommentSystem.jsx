

import { useEffect, useState } from 'react';
import './_PackageCommentSystem.scss';
import { Accordion } from 'react-bootstrap';
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援
import dedent from 'dedent';//去除多餘空白保持縮排格式




function PackageCommentSystem() {

    //儲存留言的狀態
    const [comment, setComment] = useState('');

    //留言列表(留言會放入此矩陣)
    const [commentsList, setCommentsList] = useState([]);

    //更新留言
    useEffect(()=>{
        console.log("留言資料:",comment);
    },[comment]);

    //更新留言列表
    useEffect(()=>{
        console.log("留言列表資料:",commentsList);
    },[commentsList]);

    // 預設使用者資料(到時候可以連接API動態改變)
    const user = {
        name: 'Andy',
        avatar: `https://i.pravatar.cc/40?img=5`, // 隨機頭像 (固定 id=5)
    };
    
    // 預設回應者資料(到時候可以連接API動態改變)
    const answer = {
        title:"六角學院",
        teacher:"授課老師",
        text:"嗨嗨 Brian我是六角學院助教 Bingbingboom關於同學的問題：1. 使用 Windows 系統是可以的，沒有問題哩2. 課程內容都是相同的哦～若有問題歡迎再次發問 :D"
    }

    // 處理送出留言
    const handleSubmit = () => {

        //判斷如果流言為空則停止程式
        if (comment.trim() === '') {
            console.log("請輸入留言");
            return;
        }
        //判斷如果流言為空則停止程式

        //取得"現在"的時間物件
        const now = new Date();
        //取得"現在"的時間物件

        //設定新留言
        const newComment = {
            //id為當下時間資料
            id: Date.now(), 
            //留言名稱為留言者名稱
            name: user.name,
            //頭像為留言者頭像
            avatar: user.avatar,
            //留言本身
            text: comment,
            // React 上建議 time 標籤用 dateTime（ISO 字串較標準）
            timestampISO: now.toISOString(),
            timestampText: now.toLocaleString(),
        };

        //將新留言放入留言列表
        setCommentsList(prev => [newComment, ...prev]); 

        setComment(''); // 清空輸入欄
    };

  return (
    <>
        {/* 留言室最外框 */}
        <div className='Comment'>
            {/* 留言輸入區 */}
            <div className='Comment-container'>

                {/* 桌面板留言室外框 */}
                <div className='avatar-dk d-none d-lg-flex'>
                    {/* 使用者頭像 */}
                    <img className='dk-img' src={user.avatar} alt="avatar"/>
                    {/* 使用者頭像 */}

                    {/* 留言室外框 */}
                    <div className="dk-avatar-box d-none d-lg-block">
                        {/* 留言者名稱 */}
                        <div className='dk-user'>{user.name}</div>
                        {/* 留言者名稱 */}

                        {/* 留言區本體 */}
                        <textarea className='dk-textarea' value={comment} onChange={(e) => setComment(e.target.value)} placeholder="上課前有什麼疑問嗎？ 在這裡盡情詢問講師！">
                        </textarea>
                        {/* 留言區本體 */}

                        {/* 備註&送出按鈕外框 */}
                        <div className='dk-btn-container'>
                            {/* 備註本體 */}
                            <div className='dk-Caption'>
                                <p>提問之前也別忘了看看其他同學有沒有跟你有相同的問題哦</p>
                            </div>
                            {/* 備註本體 */}
                            
                            {/* 送出按鈕本體 */}
                            <button onClick={()=>{handleSubmit()}}>
                                送出
                            </button>
                            {/* 送出按鈕本體 */}
                        </div>
                        {/* 備註&送出按鈕外框 */}
                    </div>
                    {/* 留言室外框 */}
                </div>
                {/* 桌面板留言室外框 */}

                {/* 手機版留言室 */}
                <div className='avatar d-lg-none'>
                    {/* 使用者頭像 */}
                    <img className='img' src={user.avatar} alt="avatar"/>
                    {/* 使用者頭像 */}

                    {/* 使用者名稱 */}
                    <div className='user'>{user.name}</div>
                    {/* 使用者名稱 */}

                    {/* 手機板留言室外框 */}
                    <div className="avatar-box">
                        {/* 留言區本體 */}
                        <textarea className='textarea d-lg-none' value={comment} onChange={(e) => setComment(e.target.value)} placeholder="上課前有什麼疑問嗎？ 在這裡盡情詢問講師！">
                        </textarea>
                        {/* 留言區本體 */}

                        {/* 備註&送出按鈕外框 */}
                        <div className='btn-container d-lg-none'>
                            {/* 備註本體 */}
                            <div className='Caption'>
                                <p>提問之前也別忘了看看其他同學有沒有跟你有相同的問題哦</p>
                            </div>
                            {/* 備註本體 */}
                            
                            {/* 送出按鈕本體 */}
                            <button onClick={()=>{handleSubmit()}}>
                                送出
                            </button>
                            {/* 送出按鈕本體 */}
                        </div>
                        {/* 備註&送出按鈕外框 */}
                    </div>
                    {/* 手機板留言室外框 */}
                </div>
                {/* 手機版留言室 */}
            </div>
            
            {/* 留言列表區 */}
            <div className='Comment-List'>
                {
                    commentsList.map((item) => {
                        return(
                            <>
                                {/* 留言外框 */}
                                <div className='List-container' key={item.id}>
                                    {/* 留言者區塊外框 */}
                                    <div className='avatar'>
                                        {/* 留言者照片 */}
                                        <img className='img' src={item.avatar} alt="avatar"/>
                                        {/* 留言者照片 */}

                                        {/* 留言者區塊外框 */}
                                        <div className='user'>
                                            {/* 留言者姓名 */}
                                            <div className='name'>{item.name}</div>
                                            {/* 留言者姓名 */}

                                            {/* 留言時間 */}
                                            <time className='time' dateTime={item.timestamp}>{item.timestamp}</time>
                                            {/* 留言時間 */}
                                        </div>
                                        {/* 留言者區塊外框 */}
                                    </div>
                                    {/* 留言者區塊外框 */}
                                    
                                    {/* 留言本體 */}
                                    <div className='comment'>
                                        {item.text}
                                    </div>
                                    {/* 留言本體 */}

                                    {/* 回應留言者外框 */}
                                    <div className='answer'>
                                        {/* 回應者區塊外框 */}
                                        <div className='Caption'>
                                            {/* 回應者資訊區塊外框 */}
                                            <div className='title-container'>
                                                {/* 回應者姓名 */}
                                                <p className='title'>{answer.title}</p>
                                                {/* 回應者姓名 */}

                                                {/* 回應者稱號 */}
                                                <p className='teacher'>{answer.teacher}</p>
                                                {/* 回應者稱號 */}
                                            </div>
                                            {/* 回應者資訊區塊外框 */}

                                            {/* 回應留言時間 */}
                                            <time className='time' datetime={item.timestamp}>{item.timestamp}</time>
                                            {/* 回應留言時間 */}
                                        </div>
                                        {/* 回應者區塊外框 */}

                                        {/* 回應留言本體 */}
                                        <div className='content'>
                                            <p>{answer.text}</p>
                                        </div>
                                        {/* 回應留言本體 */}
                                    </div>
                                    {/* 回應者外框 */}
                                </div>
                                {/* 留言外框 */}
                            </>
                        )
                        
                    })
                }
            </div>
            {/* 留言列表區 */}
        </div>
        {/* 留言室最外框 */}

        <Accordion defaultActiveKey="" className="defaultReactAccordionContent mx-24">
            {/* 不打開任何一個	<Accordion defaultActiveKey=""> */}
            <Accordion.Item eventKey="0" className="defaultReactAccordionItem">
                <Accordion.Header className="defaultReactAccordionHeader">
                    程式碼說明
                </Accordion.Header>
                <Accordion.Body className="defaultReactAccordionBody p-0">
                    
                    <pre className="language-html m-0 p-16">
                        <div>HTML</div>
                        <code className="language-html">
                            {
                                dedent(
                                    `
                                    import { useEffect, useState } from 'react';//宣告狀態
                                    import './_PackageCommentSystem.scss';//讀取樣式

                                    // 設定檔放置於return上方
                                        //儲存留言的狀態
                                        const [comment, setComment] = useState('');

                                        //留言列表(留言會放入此矩陣)
                                        const [commentsList, setCommentsList] = useState([]);

                                        //更新留言
                                        useEffect(()=>{
                                            console.log("留言資料:",comment);
                                        },[comment]);

                                        //更新留言列表
                                        useEffect(()=>{
                                            console.log("留言列表資料:",commentsList);
                                        },[commentsList]);

                                        // 預設使用者資料(到時候可以連接API動態改變)
                                        const user = {
                                            name: 'Andy',
                                            avatar: \`https://i.pravatar.cc/40?img=5\`, // 隨機頭像 (固定 id=5)
                                        };
                                        
                                        // 預設回應者資料(到時候可以連接API動態改變)
                                        const answer = {
                                            title:"六角學院",
                                            teacher:"授課老師",
                                            text:"嗨嗨 Brian我是六角學院助教 Bingbingboom關於同學的問題：1. 使用 Windows 系統是可以的，沒有問題哩2. 課程內容都是相同的哦～若有問題歡迎再次發問 :D"
                                        }

                                        // 處理送出留言
                                        const handleSubmit = () => {

                                            //判斷如果流言為空則停止程式
                                            if (comment.trim() === '') {
                                                console.log("請輸入留言");
                                                return;
                                            }
                                            //判斷如果流言為空則停止程式

                                            //取得"現在"的時間物件
                                            const now = new Date();
                                            //取得"現在"的時間物件

                                            //設定新留言
                                            const newComment = {
                                                //id為當下時間資料
                                                id: Date.now(), 
                                                //留言名稱為留言者名稱
                                                name: user.name,
                                                //頭像為留言者頭像
                                                avatar: user.avatar,
                                                //留言本身
                                                text: comment,
                                                // React 上建議 time 標籤用 dateTime（ISO 字串較標準）
                                                timestampISO: now.toISOString(),
                                                timestampText: now.toLocaleString(),
                                            };

                                            //將新留言放入留言列表
                                            setCommentsList(prev => [newComment, ...prev]); 

                                            setComment(''); // 清空輸入欄
                                        };

                                    // 元件本體
                                    // 放置於return下方
                                        {/* 留言室最外框 */}
                                        <div className='Comment'>
                                            {/* 留言輸入區 */}
                                            <div className='Comment-container'>

                                                {/* 桌面板留言室外框 */}
                                                <div className='avatar-dk d-none d-lg-flex'>
                                                    {/* 使用者頭像 */}
                                                    <img className='dk-img' src={user.avatar} alt="avatar"/>
                                                    {/* 使用者頭像 */}

                                                    {/* 留言室外框 */}
                                                    <div className="dk-avatar-box d-none d-lg-block">
                                                        {/* 留言者名稱 */}
                                                        <div className='dk-user'>{user.name}</div>
                                                        {/* 留言者名稱 */}

                                                        {/* 留言區本體 */}
                                                        <textarea className='dk-textarea' value={comment} onChange={(e) => setComment(e.target.value)} placeholder="上課前有什麼疑問嗎？ 在這裡盡情詢問講師！">
                                                        </textarea>
                                                        {/* 留言區本體 */}

                                                        {/* 備註&送出按鈕外框 */}
                                                        <div className='dk-btn-container'>
                                                            {/* 備註本體 */}
                                                            <div className='dk-Caption'>
                                                                <p>提問之前也別忘了看看其他同學有沒有跟你有相同的問題哦</p>
                                                            </div>
                                                            {/* 備註本體 */}
                                                            
                                                            {/* 送出按鈕本體 */}
                                                            <button onClick={()=>{handleSubmit()}}>
                                                                送出
                                                            </button>
                                                            {/* 送出按鈕本體 */}
                                                        </div>
                                                        {/* 備註&送出按鈕外框 */}
                                                    </div>
                                                    {/* 留言室外框 */}
                                                </div>
                                                {/* 桌面板留言室外框 */}

                                                {/* 手機版留言室 */}
                                                <div className='avatar d-lg-none'>
                                                    {/* 使用者頭像 */}
                                                    <img className='img' src={user.avatar} alt="avatar"/>
                                                    {/* 使用者頭像 */}

                                                    {/* 使用者名稱 */}
                                                    <div className='user'>{user.name}</div>
                                                    {/* 使用者名稱 */}

                                                    {/* 手機板留言室外框 */}
                                                    <div className="avatar-box">
                                                        {/* 留言區本體 */}
                                                        <textarea className='textarea d-lg-none' value={comment} onChange={(e) => setComment(e.target.value)} placeholder="上課前有什麼疑問嗎？ 在這裡盡情詢問講師！">
                                                        </textarea>
                                                        {/* 留言區本體 */}

                                                        {/* 備註&送出按鈕外框 */}
                                                        <div className='btn-container d-lg-none'>
                                                            {/* 備註本體 */}
                                                            <div className='Caption'>
                                                                <p>提問之前也別忘了看看其他同學有沒有跟你有相同的問題哦</p>
                                                            </div>
                                                            {/* 備註本體 */}
                                                            
                                                            {/* 送出按鈕本體 */}
                                                            <button onClick={()=>{handleSubmit()}}>
                                                                送出
                                                            </button>
                                                            {/* 送出按鈕本體 */}
                                                        </div>
                                                        {/* 備註&送出按鈕外框 */}
                                                    </div>
                                                    {/* 手機板留言室外框 */}
                                                </div>
                                                {/* 手機版留言室 */}
                                            </div>
                                            
                                            {/* 留言列表區 */}
                                            <div className='Comment-List'>
                                                {
                                                    commentsList.map((item) => {
                                                        return(
                                                            <>
                                                                {/* 留言外框 */}
                                                                <div className='List-container' key={item.id}>
                                                                    {/* 留言者區塊外框 */}
                                                                    <div className='avatar'>
                                                                        {/* 留言者照片 */}
                                                                        <img className='img' src={item.avatar} alt="avatar"/>
                                                                        {/* 留言者照片 */}

                                                                        {/* 留言者區塊外框 */}
                                                                        <div className='user'>
                                                                            {/* 留言者姓名 */}
                                                                            <div className='name'>{item.name}</div>
                                                                            {/* 留言者姓名 */}

                                                                            {/* 留言時間 */}
                                                                            <time className='time' dateTime={item.timestamp}>{item.timestamp}</time>
                                                                            {/* 留言時間 */}
                                                                        </div>
                                                                        {/* 留言者區塊外框 */}
                                                                    </div>
                                                                    {/* 留言者區塊外框 */}
                                                                    
                                                                    {/* 留言本體 */}
                                                                    <div className='comment'>
                                                                        {item.text}
                                                                    </div>
                                                                    {/* 留言本體 */}

                                                                    {/* 回應留言者外框 */}
                                                                    <div className='answer'>
                                                                        {/* 回應者區塊外框 */}
                                                                        <div className='Caption'>
                                                                            {/* 回應者資訊區塊外框 */}
                                                                            <div className='title-container'>
                                                                                {/* 回應者姓名 */}
                                                                                <p className='title'>{answer.title}</p>
                                                                                {/* 回應者姓名 */}

                                                                                {/* 回應者稱號 */}
                                                                                <p className='teacher'>{answer.teacher}</p>
                                                                                {/* 回應者稱號 */}
                                                                            </div>
                                                                            {/* 回應者資訊區塊外框 */}

                                                                            {/* 回應留言時間 */}
                                                                            <time className='time' datetime={item.timestamp}>{item.timestamp}</time>
                                                                            {/* 回應留言時間 */}
                                                                        </div>
                                                                        {/* 回應者區塊外框 */}

                                                                        {/* 回應留言本體 */}
                                                                        <div className='content'>
                                                                            <p>{answer.text}</p>
                                                                        </div>
                                                                        {/* 回應留言本體 */}
                                                                    </div>
                                                                    {/* 回應者外框 */}
                                                                </div>
                                                                {/* 留言外框 */}
                                                            </>
                                                        )
                                                        
                                                    })
                                                }
                                            </div>
                                            {/* 留言列表區 */}
                                        </div>
                                        {/* 留言室最外框 */}
                                    `
                                )
                            }       
                        </code>
                    </pre>
                    <pre className="language-html m-0 p-16">
                        <div>SCSS</div>
                        <code className="language-html">
                            {
                                dedent(
                                    `
                                    /* 留言室最外框 */
                                    .Comment{

                                        /* 留言輸入區 */
                                        .Comment-container{
                                            padding: 16px;

                                            /* 桌面板留言室外框 */
                                            .avatar-dk{
                                                display: flex;
                                                justify-content: start;
                                                align-items: start;
                                                gap: 24px;

                                                /* 使用者頭像 */
                                                .dk-img{
                                                    width: 60px;
                                                    height: 60px;
                                                    object-fit: cover;
                                                    border-radius: 50%;
                                                }
                                                /* 留言室外框 */
                                                .dk-avatar-box{
                                                    width: 100%;

                                                    /* 留言者名稱 */
                                                    .dk-user{
                                                        font-weight: 600;
                                                        font-size: 16px;
                                                        line-height: 1.5;
                                                    }

                                                    /* 留言區本體 */
                                                    .dk-textarea{
                                                        margin-top:16px;
                                                        padding: 16px;
                                                        width: 100%;
                                                        min-height: 116px;
                                                        border: none;
                                                    }

                                                    /* 備註&送出按鈕外框 */
                                                    .dk-btn-container{
                                                        margin-top:16px;
                                                        width: 100%;
                                                        display: flex;
                                                        justify-content: space-between;
                                                        align-items: center;

                                                        /* 備註本體 */
                                                        .dk-Caption{
                                                            display: flex;
                                                            justify-content: start;
                                                            align-items: center;
                                                            gap: 8px        ;
                                                        }

                                                        /* 送出按鈕本體 */
                                                        button{
                                                            border: none;
                                                            border-radius: 12px;
                                                            padding: 12px 16px;
                                                            background-color: #0068ff;
                                                            color: #ffffff;
                                                        }
                                                    }
                                                }
                                            }

                                            /* 手機版留言室 */
                                            .avatar{
                                                display: flex;
                                                justify-content: start;
                                                align-items: center;
                                                gap:8px;

                                                /* 使用者頭像 */
                                                img{
                                                    width: 32px;
                                                    height: 32px;
                                                    object-fit: cover;
                                                    border-radius: 50%;
                                                }

                                                /* 使用者名稱 */
                                                .user{
                                                    font-weight: 600;
                                                    font-size: 16px;
                                                    line-height: 1.5;
                                                }

                                                /* 手機板留言室外框 */
                                                .avatar-box{

                                                    /* 留言區本體 */
                                                    .textarea{
                                                        margin-top: 16px;
                                                        padding: 8px;
                                                        width: 100%;
                                                        min-height: 100px;
                                                        border: none;
                                                    }

                                                    /* 備註&送出按鈕外框 */
                                                    .btn-container{

                                                        /* 備註本體 */
                                                        .Caption{
                                                            margin-top:16px;
                                                            display: flex;
                                                            justify-content: start;
                                                            align-items: center;
                                                            p{
                                                                height: fit-content;
                                                                font-weight: 400;
                                                                font-size: 14px;
                                                                line-height: 1.5;
                                                                color: #4b4b4b;
                                                            }
                                                        }

                                                        /* 送出按鈕本體 */
                                                        button{
                                                            margin-top:8px;
                                                            width: 100%;
                                                            border: none;
                                                            border-radius: 12px;
                                                            background-color: #0068ff;
                                                            color:#ffffff;
                                                            padding: 12px 0;
                                                        }
                                                    }
                                                }
                                            }
                                        }

                                        /* 留言列表區 */
                                        .Comment-List{
                                            margin-top: 16px;

                                            /* 留言外框 */
                                            .List-container{
                                                padding: 16px;

                                                /* 留言者區塊外框 */
                                                .avatar{
                                                    display: flex;
                                                    justify-content: start;
                                                    align-items: center;
                                                    gap: 8px;

                                                    /* 留言者照片 */
                                                    img{
                                                        width: 44px;
                                                        height: 44px;
                                                        object-fit: cover;
                                                        border-radius: 50%;
                                                    }

                                                    /* 留言者區塊外框 */
                                                    .user{

                                                        /* 留言者姓名 */
                                                        .name{
                                                            font-weight: 600;
                                                            font-size: 16px;
                                                            line-height: 1.5;
                                                        }

                                                        /* 留言時間 */
                                                        .time{
                                                            font-weight: 400;
                                                            font-size: 14px;
                                                            line-height: 1.5;
                                                            color: #909090;
                                                        }
                                                    }
                                                }

                                                /* 留言本體 */
                                                .comment{
                                                    margin-top: 24px;
                                                    width: 100%;
                                                    height: fit-content;
                                                    font-weight: 400;
                                                    font-size: 14px;
                                                    color: #4b4b4b;
                                                }

                                                /* 回應留言者外框 */
                                                .answer{
                                                    padding: 16px;

                                                    /* 回應者區塊外框 */
                                                    .Caption{

                                                        /* 回應者資訊區塊外框 */
                                                        .title-container{
                                                            display: flex;
                                                            justify-items: start;
                                                            align-items: center;
                                                            gap:8px;

                                                            /* 回應者姓名 */
                                                            .title{
                                                                font-weight: 600;
                                                                font-size: 16px;
                                                                line-height: 1.5;
                                                            }

                                                            /* 回應者稱號 */
                                                            .teacher{
                                                                border-radius: 8px;
                                                                border: 1px solid #0068ff;
                                                                color: #0068ff;
                                                                font-weight: 400;
                                                                font-size: 12px;
                                                                line-height: 1.5;
                                                            }
                                                        }

                                                        /* 回應留言時間 */
                                                        .time{
                                                            margin-top: 4px;
                                                            font-weight: 400;
                                                            font-size: 14px;
                                                            line-height: 1.5;
                                                            color: #909090;
                                                        }
                                                    }

                                                    /* 回應留言本體 */
                                                    .content{

                                                    }
                                                }
                                            }
                                        }
                                    }
                                    `
                                )
                            }       
                        </code>
                    </pre>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    </>
  );
}

export default PackageCommentSystem;
