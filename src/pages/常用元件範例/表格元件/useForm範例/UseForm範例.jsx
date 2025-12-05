


import { useForm } from 'react-hook-form';
import './_useForm.scss';
import { useEffect, useState } from 'react';

import { Accordion } from 'react-bootstrap';
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援
import dedent from 'dedent';//去除多餘空白保持縮排格式




export default function UseForm() {
  
    //#region
    //#endregion

    //#region 假設的外部資料
    const[inputData,setInputData] = useState({
        username:"aaa",
        email:"aaa@aaa.aaa",
    })
    //#endregion

    //#region 儲存表格輸出資料
    const[formData, setFormData] = useState(null);
    useEffect(()=>{},[formData]);
    //#endregion

    //#region 初始化 useForm
    const {
        register,       
        // input物件
        handleSubmit,   
        // 用來包住 onSubmit，進行驗證
        formState: { errors }, 
        // 收集驗證錯誤
        reset           
        // 重置表單
    } = useForm({
            //初始資料
            defaultValues: {
                username: "",
                email: "",
            }
        }
    );
    //#endregion

    //#region 用 useEffect 把外部資料塞入 RHF
    useEffect(() => {
        if (inputData) {
            reset(inputData); // 直接把外部資料注入表單
        }
    }, [inputData, reset]);
    //#endregion

    //#region 表單送出的行為（驗證通過後的階段）
    const onSubmit = (data) => {
        console.log("提交的資料：", data);
        setFormData(data);
        reset(); // 清空表單
    };
    //#endregion

    return (
        <>
            <article className='UseForm範例'>
                <h3>UseForm範例</h3>
                    {/* 表單最外圍 */}
                    <form className='formSet' onSubmit={handleSubmit(onSubmit)}>
                    {/* 標題 */}
                    <h2 className='titleSer'>註冊表單</h2>
                    {/* 標題 */}

                    {/* InputGroup(使用者名稱) */}
                    <div className='inputGroup username'>
                        {/* Input標題 */}
                        {/* id需要自己手動加上 */}
                        <label className='labelSet' htmlFor="username">使用者名稱：</label>
                        {/* Input標題 */}

                        {/* Input本體 */}
                        <input
                            className='inputSet'
                            id="username"
                            {
                                // input物件展開
                                ...register(
                                    //input名稱
                                    "username", {
                                    //input名稱
                                        //required本身代表該欄位不可為空
                                        //後面的內容代表偵測到錯誤會發出的錯誤訊息
                                        required: "使用者名稱必填",

                                        //minLength為驗證規則:這個欄位至少要輸入 X 個字
                                        minLength: {
                                            //value 是最少字數
                                            value: 3,
                                            //message 是錯誤訊息。
                                            message: "至少需要 3 個字"
                                        }
                                        //required會優先檢測如果先判定錯誤就會直接輸出"使用者名稱必填"
                                        //而required通過後才會驗證minLength
                                        //此時如果在minLength判定錯誤才會送出"至少需要 3 個字"
                                    }
                                )
                                // input物件展開
                            }
                        />
                        {/* Input本體 */}
                        {/* 錯誤訊息本體 */}
                        {errors.username && <p className='errorMsg'>{errors.username.message}</p>}
                        {/* 錯誤訊息本體 */}
                        {/* error本體結構 */}
                        {/* 
                            errors = {
                                username: {
                                    type: "required",<=代表錯誤來源 如果是required就會顯示required 如果是minLength 就會顯示 minLength
                                    message: "使用者名稱必填"
                                }
                            } 
                        */}
                        {/* error本體結構 */}
                    </div>
                    {/* InputGroup(使用者名稱) */}

                    {/* register為input物件 */}
                    {/* 內容會像如下 */}
                    {/* 
                        {
                            name: "username",
                            onChange: ƒ,
                            onBlur: ƒ,
                            ref: ƒ
                        } 
                    */}


                    {/* InputGroup(Email) */}
                    <div className='inputGroup email'>
                        {/* Input標題 */}
                        <label className='labelSet' htmlFor="email">Email：</label>
                        {/* Input標題 */}

                        {/* Input本體 */}
                        <input
                            className='inputSet'
                            id="email"
                            {
                                ...register("email", {
                                    required: "Email 必填",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Email 格式錯誤"
                                    }
                                })
                            }
                        />
                        {/* Input本體 */}

                        {/* 錯誤訊息本體 */}
                        {errors.email && <p className='errorMsg'>{errors.email.message}</p>}
                        {/* 錯誤訊息本體 */}
                    </div>
                    {/* InputGroup(Email) */}

                    {/* InputGroup(密碼) */}
                    <div className='inputGroup password'>
                        {/* Input標題 */}
                        <label className='labelSet' htmlFor="password">密碼：</label>
                        {/* Input標題 */}

                        {/* Input本體 */}
                        <input
                            className='inputSet'
                            id="password"
                            type="password"
                            {
                                ...register("password", {
                                    required: "密碼必填",
                                    minLength: {
                                        value: 6,
                                        message: "密碼至少要 6 碼"
                                    }
                                })
                            }
                        />
                        {/* Input本體 */}
                        {errors.password && <p className='errorMsg'>{errors.password.message}</p>}
                    </div>
                    {/* InputGroup(密碼) */}

                    {/* 表單送出按鈕 */}
                    <button className='formBtn' type="submit">送出</button>
                    {/* 表單送出按鈕 */}
                </form>
                {/* 表單最外圍 */}
                <div>
                    <p>表單資料:</p>
                    <pre>{formData && JSON.stringify(formData, null, 2)}</pre>
                </div>

                <Accordion defaultActiveKey="" className="defaultReactAccordionContent mb-24">
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
                                        import { useForm } from 'react-hook-form';//宣告元件
                                        import './_useForm.scss';//讀取樣式

                                        //元件設定
                                        // 放置於return上方
                                        //#region 初始化 useForm
                                            const {
                                                register,       
                                                // input物件
                                                handleSubmit,   
                                                // 用來包住 onSubmit，進行驗證
                                                formState: { errors }, 
                                                // 收集驗證錯誤
                                                reset           
                                                // 重置表單
                                            } = useForm();
                                            //#endregion

                                            //#region 表單送出的行為（驗證通過後的階段）
                                            const onSubmit = (data) => {
                                                console.log("提交的資料：", data);
                                                setFormData(data);
                                                reset(); // 清空表單
                                            };
                                        //#endregion

                                        // 元件本體
                                        // 放置於return下方
                                        {/* 表單最外圍 */}
                                        <form className='formSet' onSubmit={handleSubmit(onSubmit)}>
                                            {/* 標題 */}
                                            <h2 className='titleSer'>註冊表單</h2>
                                            {/* 標題 */}

                                            {/* InputGroup(使用者名稱) */}
                                            <div className='inputGroup username'>

                                                {/* Input標題 */}
                                                {/* id需要自己手動加上 */}
                                                <label className='labelSet' htmlFor="username">使用者名稱：</label>
                                                {/* Input標題 */}

                                                {/* Input本體 */}
                                                <input
                                                    className='inputSet'
                                                    id="username"
                                                    {
                                                        // input物件展開
                                                        ...register(
                                                            //input名稱
                                                            "username", {
                                                                required: "使用者名稱必填",
                                                                minLength: {
                                                                    value: 3,
                                                                    message: "至少需要 3 個字"
                                                                }
                                                            }
                                                        )
                                                        // input物件展開
                                                    }
                                                />
                                                {/* Input本體 */}

                                                {/* 錯誤訊息本體 */}
                                                {errors.username && <p className='errorMsg'>{errors.username.message}</p>}
                                                {/* 錯誤訊息本體 */}

                                            </div>
                                            {/* InputGroup(使用者名稱) */}

                                            {/* InputGroup(Email) */}
                                            <div className='inputGroup email'>
                                                {/* Input標題 */}
                                                <label className='labelSet' htmlFor="email">Email：</label>
                                                {/* Input標題 */}

                                                {/* Input本體 */}
                                                <input
                                                    className='inputSet'
                                                    id="email"
                                                    {
                                                        ...register("email", {
                                                            required: "Email 必填",
                                                            pattern: {
                                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                                message: "Email 格式錯誤"
                                                            }
                                                        })
                                                    }
                                                />
                                                {/* Input本體 */}

                                                {/* 錯誤訊息本體 */}
                                                {errors.email && <p className='errorMsg'>{errors.email.message}</p>}
                                                {/* 錯誤訊息本體 */}
                                            </div>
                                            {/* InputGroup(Email) */}

                                            {/* InputGroup(密碼) */}
                                            <div className='inputGroup password'>
                                                {/* Input標題 */}
                                                <label className='labelSet' htmlFor="password">密碼：</label>
                                                {/* Input標題 */}

                                                {/* Input本體 */}
                                                <input
                                                    className='inputSet'
                                                    id="password"
                                                    type="password"
                                                    {
                                                        ...register("password", {
                                                            required: "密碼必填",
                                                            minLength: {
                                                                value: 6,
                                                                message: "密碼至少要 6 碼"
                                                            }
                                                        })
                                                    }
                                                />
                                                {/* Input本體 */}
                                                {errors.password && <p className='errorMsg'>{errors.password.message}</p>}
                                            </div>
                                            {/* InputGroup(密碼) */}

                                            {/* 表單送出按鈕 */}
                                            <button className='formBtn' type="submit">送出</button>
                                            {/* 表單送出按鈕 */}
                                        </form>
                                        {/* 表單最外圍 */}
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
                                            // 表單最外圍
                                            .formSet{
                                                border: 1px solid #000000;
                                                border-radius: 12px;
                                                background-color: #474747;
                                                width: 50%;
                                                height: auto;
                                                padding: 20px;
                                                display: flex;
                                                flex-direction: column;
                                                justify-content: start;
                                                align-items: start;
                                                gap: 24px;
                                                // 標題
                                                .titleSer{
                                                    font-size: 36px;
                                                    color: #ffffff;
                                                }
                                                // 標題

                                                //Input群組
                                                .inputGroup{
                                                    display: flex;
                                                    flex-direction: column;
                                                    justify-content: start;
                                                    align-items: start;
                                                    gap: 12px;
                                                    // Input標題
                                                    .labelSet{
                                                        display: block;
                                                        color: #ffffff;
                                                    }
                                                    // Input標題

                                                    // Input本體
                                                    .inputSet{
                                                        background-color: transparent;
                                                        color: #ffffff;
                                                        border-radius: 12px;
                                                        padding: 10px;
                                                    }
                                                    // Input本體

                                                    //錯誤訊息本體
                                                    .errorMsg{
                                                        font-size: 20px;
                                                        color: #ff0000;
                                                    }
                                                    //錯誤訊息本體

                                                    //使用者名稱
                                                    &.username{

                                                    }
                                                    //使用者名稱

                                                    //email
                                                    &.email{

                                                    }
                                                    //email

                                                    //password
                                                    &.password{

                                                    }
                                                    //password
                                                }
                                                //Input群組

                                                //表單送出按鈕
                                                .formBtn{
                                                    width: 50%;
                                                    height: auto;
                                                    aspect-ratio: 5 / 1;
                                                    border: none;
                                                    border-radius: 8px;
                                                    background-color: #00fff26c;
                                                    color: #ffffff;
                                                }
                                                //表單送出按鈕
                                                
                                            }
                                            // 表單最外圍
                                            `
                                        )
                                    }       
                                </code>
                            </pre>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </article>
        </>
        
    );
}
