import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import './_apitest.scss';
import ReCAPTCHA from "react-google-recaptcha";//v2
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';//v3


// axios.defaults.withCredentials = true; 
// 允許跨域請求時攜帶 Cookie

//#region 範例 單一api要求帶cookie
    // const test = {withCredentials: true};
    // axios.get("http://localhost:5000/protected-data", test);
//#endregion

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'; // 後端 API 基底 URL
//axios.defaults為指定方法

// 建立 API 實例
//新API基底
const apiSec = import.meta.env.VITE_API_SEC_BASE_URL;

export default function APITEST() {

    

    const [user, setUser] = useState(null);        // 儲存會員資料
    //更新會員資料
    useEffect(()=>{},[user]);

    const [loading, setLoading] = useState(true); // 載入狀態
    const [error, setError] = useState('');    // 錯誤訊息

    // 頁面載入後就嘗試取得目前登入者資料
    useEffect(() => {
        apiLinkTest();
        handleLogInCheck();
    }, []);

    //#region
    //#endregion
  
    //#region api連接測試
    /*api連接測試*/
        const [linkTest, setLinkTest]=useState(null);
        useEffect(()=>{},[linkTest]);
        const apiLinkTest = async()=>{
            try{
            const result = await axios.get(`${axios.defaults.baseURL}/test-db`);
            console.log("結果:",result.data.message);
            setLinkTest(result.data.message);
            }catch(error){
            console.log("結果失敗:",error);
            setLinkTest(error.message);
            }
        }
    /*api連接測試*/
    //#endregion

    //#region 新增會員測試
    //新增會員測試
        const[newUser,setNewUser]=useState({
            username:"", 
            email:"", 
            password:"", 
            avatar_url:null,
            avatar_public_id:null,
        })

        useEffect(()=>{
            console.log("新會員資料:",newUser);
        },[newUser]);

        const handleNewUserDataIn = (event)=>{
            const { value, name } = event.target;
            setNewUser(
                {
                    ...newUser,
                    [name]:value,
                }
            )
        }

        const handleNewUserDataUp = async(event)=>{
            event.preventDefault(); // 阻止預設送出行為
            // 建立一個陣列來收集缺少的欄位
            const missingFields = [];
            if (!newUser.username) missingFields.push("使用者名稱");
            if (!newUser.email) missingFields.push("信箱");
            if (!newUser.password) missingFields.push("密碼");

            if (missingFields.length > 0) {
                const message = `${missingFields.join("、")} 必須填寫`;//.join("、")為合併成一個字串
                console.log(message);
                alert(message);
                return;
            }
            try{
                const handleNewUserDataUpRef = await axios.post(`${axios.defaults.baseURL}/user/register`,newUser);
                console.log("新增會員成功:",handleNewUserDataUpRef.data);
                getAllUserData();
                setNewUser(
                    {
                        username:"", 
                        email:"", 
                        password:"", 
                        avatar_url:null,
                        avatar_public_id:null,
                    }
                )
            }catch(error){
                console.log("新增會員失敗",error.response.data.error);
                alert(error.response.data.error);
                setNewUser(
                    {
                        username:"", 
                        email:"", 
                        password:"", 
                        avatar_url:null,
                        avatar_public_id:null,
                    }
                )
            }
        }
    //新增會員測試
    //#endregion

    //#region 重新寄出驗證信件
    const[reEmail,setReEmail]=useState({
            email:"", 
    })

    useEffect(()=>{
        console.log("信箱資料:",reEmail);
    },[reEmail]);

    const handleReEmailData = (event)=>{
        const { value } = event.target;
        setReEmail(
            {
                ...reEmail,
                email:value,
            }
        )
    }
    const reEmailPost = async()=>{
        try{
            const reEmailPostRef = await axios.post(`${axios.defaults.baseURL}/user/emailPostTest`,reEmail);
            console.log("認證信件寄送成功:",reEmailPostRef.data);
            setReEmail({
                email:"",
            });
        }catch(error){
            console.log("認證信件寄送失敗",error.response.data.error);
            setReEmail({
                email:"",
            });
        }
    }
    //#endregion

    //#region 上傳使用者頭像圖片
    //上傳使用者頭像圖片

        const userImgUpload = async (event) => {
            const { files } = event.target;
            const file = files?.[0];
            if (!file) {                               // ✅ 如果沒有選擇檔案就提示
                alert('請先選擇檔案');
                return;
            }
            setUploadingImage(true);
            try {
                const userImgData = new FormData();               
                // ✅ 建立 FormData 物件，用來包裝要送到後端的資料（支援檔案上傳）
                userImgData.append('image', file);                
                // ✅ 把檔案放進 FormData，key 必須和後端 upload.single('image') 相同
                const userImgUploadRes = await axios.post(`${axios.defaults.baseURL}/api/upAvatarImg`, userImgData, 
                    { // ✅ 發送 POST 請求到後端圖片上傳 API
                        headers: { 'Content-Type': 'multipart/form-data' }, // ✅ 設定請求頭，讓後端知道是 multipart/form-data 格式
                    }
                );
                console.log('上傳成功:', userImgUploadRes.data);
                setNewUser(
                    {
                        ...newUser,
                        avatar_url:userImgUploadRes.data.avatar_url,
                        avatar_public_id:userImgUploadRes.data.avatar_public_id,
                    }
                )
                event.target.value = '';
            } catch (error) {
                console.log('圖片上傳失敗:', error);
                alert(error.response?.data?.error || '上傳失敗'); // ✅ 如果後端回傳錯誤訊息就顯示，否則顯示預設「上傳失敗」
                event.target.value = '';
            }finally {
                setUploadingImage(false);
            }
        };
    //上傳使用者頭像圖片
    //#endregion

    //#region Google API
    // 觸發 Google 登入流程（導向後端 /auth/google）
    const handleGoogleLogin = () => {
        window.location.href = `${axios.defaults.baseURL}/auth/google`; // 直接跳轉到後端 Google 認證入口
    };
    //#endregion

    //#region 會員登入
    //會員登入
        const [userData,setUserData]=useState(
            {
                email:"",
                password:"",
            }
        )

        const handleInputChange = (event) =>{
            const { value, name } = event.target;
            setUserData({
                ...userData,
                [name]:value
            })
        }

        useEffect(()=>{
            console.log("登入資料:",userData);
        },[userData])

    const handleLogIn = async(event)=>{
        event.preventDefault(); // 阻止預設送出行為
        try{
            const handleLogInRef = await axios.post(`${axios.defaults.baseURL}/user/login`,userData);
            console.log("登入成功:",handleLogInRef);
            fetchMe();
            setUserData(
                {
                    email:"",
                    password:"",
                }
            )
        }catch(error){
            console.log("登入失敗:",error);
            setUserData(
                {
                    email:"",
                    password:"",
                }
            )
        }
    }
    //會員登入
    //#endregion

    //#region 登入驗證
    //登入驗證
    const handleLogInCheck = async()=>{
        try{
        const handleLogInCheckRef = await axios.post(`${axios.defaults.baseURL}/user/logInCheck`);
        console.log("驗證成功:",handleLogInCheckRef);
        fetchMe();
        }catch(error){
        console.log("驗證失敗:",error);
        fetchMe();
        }
    }
    //登入驗證
    //#endregion

    //#region GoogleReCAPTCHA套件
        //#region GoogleReCAPTCHA-Checkbox套件
        const recaptchaRef = useRef(null);
        const [captchaToken, setCaptchaToken] = useState(""); // 存 reCAPTCHA token
        const [reCAPTCHAMessage, setReCAPTCHAMessage] = useState(""); // 顯示回應訊息
        useEffect(()=>{},[reCAPTCHAMessage]);
        const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY; // 前端的 sitekey

        // 當使用者勾選時，Google reCAPTCHA 會回傳一個 token
        const onCaptchaChange = (token) => {
            setCaptchaToken(token || "");
            setReCAPTCHAMessage("驗證中，請稍候...");
            // 把 token 丟到後端測試
            verifyWithServer(token);
        };

        // 驗證 token：呼叫後端 /V2Checkbox API
        const verifyWithServer = async (token) => {
            try {
                const verifyWithServerRef = await axios.post(`${axios.defaults.baseURL}/user/V2Checkbox`, {
                    recaptchaToken: token,
                });
                console.log("驗證成功:",verifyWithServerRef.data);
                if (verifyWithServerRef.data.ok) {
                    setReCAPTCHAMessage(`✅ 驗證成功！ ${verifyWithServerRef.data.message}`);
                } else {
                    setReCAPTCHAMessage("❌ 驗證失敗：" + (data.error || "未知錯誤"));
                }
            } catch (err) {
                console.error("伺服器驗證錯誤:", err);
                setReCAPTCHAMessage("⚠️ 系統繁忙，請稍後再試");
                recaptchaRef.current?.reset(); // 重置 reCAPTCHA
                setCaptchaToken("");
            }
        };
        //#endregion GoogleReCAPTCHA-Checkbox套件

        //#region GoogleReCAPTCHA-Invisible套件
        const invisibleRecaptchaRef = useRef(null);
        const [invisibleToken, setInvisibleToken] = useState(""); // 存 reCAPTCHA token
        const [invisiblereCAPTCHAMessage, setInvisibleReCAPTCHAMessage] = useState(""); // 顯示回應訊息
        useEffect(()=>{},[invisiblereCAPTCHAMessage]);
        const InvisiblesiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY_INVISIBLE; // 前端的 sitekey

        // 觸發 Invisible 驗證
        const InvisiblehandleSubmit = () => {
            if (invisibleRecaptchaRef.current) {
                invisibleRecaptchaRef.current.execute(); // Invisible reCAPTCHA 會自動跑驗證
                //execute()意思為 手動觸發 reCAPTCHA 驗證
            }
        };

        // 驗證 token：呼叫後端 /V2Checkbox API
        const verifyInvisibleWithServer = async (token) => {
            try {
                const verifyInvisibleWithServerRef = await axios.post(`${axios.defaults.baseURL}/user/V2Invisible`, {
                    recaptchaToken: token,
                });
                console.log("驗證成功:",verifyInvisibleWithServerRef.data);
                if (verifyInvisibleWithServerRef.data.ok) {
                    setInvisibleReCAPTCHAMessage(`✅ 驗證成功！ ${verifyInvisibleWithServerRef.data.message}`);
                } else {
                    setInvisibleReCAPTCHAMessage("❌ 驗證失敗：" + (verifyInvisibleWithServerRef.data.error || "未知錯誤"));
                }
            } catch (err) {
                console.error("伺服器驗證錯誤:", err);
                setInvisibleReCAPTCHAMessage("⚠️ 系統繁忙，請稍後再試");
                invisibleRecaptchaRef.current?.reset(); // 重置 reCAPTCHA
                setInvisibleToken("");
            }
        };
        //#endregion

        //#region GoogleReCAPTCHA-V3套件

        const { executeRecaptcha } = useGoogleReCaptcha();//V3套件

        const [V3Message, setV3Message] = useState(""); // 顯示回應訊息
        useEffect(()=>{},[V3Message]);
        const ACTION = "v3_test"; // 修改：與後端 expectedAction 一致

        // 驗證 token：呼叫後端 /V3 API
        const verifyV3WithServer = async () => {
            try {
                setV3Message("驗證中…");
                if (!executeRecaptcha) {                            // ✅ 初始化防呆
                    setV3Message("⚠️ reCAPTCHA 尚未初始化，請稍後再試");
                    return;
                }

                const token = await executeRecaptcha(ACTION);       // ✅ 取得 v3 token（帶 action）
                if (!token) {
                    setV3Message("⚠️ 未取得 token，請再試一次");
                    return;
                }

                const verifyV3WithServerRes = await axios.post(`${axios.defaults.baseURL}/user/V3`, {          // ✅ 丟給後端驗證
                    recaptchaToken: token,
                });

                if (verifyV3WithServerRes.data?.ok) {
                    setV3Message(`✅ 驗證成功！${verifyV3WithServerRes.data.message}`);
                } else {
                    setV3Message(`❌ 驗證失敗：${verifyV3WithServerRes.data?.error ?? "未知錯誤"}`);
                    //?? 意思是 如果左邊是空值就顯示右邊的
                }
            } catch (err) {
                console.error("v3 驗證流程錯誤：", err);
                setV3Message("🚨 驗證流程失敗，請稍後再試");
            } 
        };
        //#endregion
    //#endregion

    //#region 驗證登錄
        //驗證登錄
        // 呼叫後端 API 取得目前登入者的資料
        const fetchMe = async () => {
            try {
            setLoading(true); // 開始載入
            setError('');     // 清空錯誤
            const fetchMeRes = await axios.get(`${axios.defaults.baseURL}/user/me`); // 向後端請求目前使用者資料（會自動帶 cookie）
            console.log("取得使用者資料:",fetchMeRes.data);
            setUser(fetchMeRes.data);  // 將取得的資料存進 state
            } catch (err) {
            // 如果是 401 表示尚未登入，其它錯誤則顯示訊息
            if (err.response?.status !== 401) {
                setError(err.response?.data?.error || '取得資料失敗'); // 設定錯誤訊息
            }
            setUser(null); // 清空會員資料
            } finally {
            setLoading(false); // 結束載入
            }
        };
        //驗證登錄
    //#endregion

    //#region 登出
    //登出
    const handleLogout = async()=>{
        try{
        const handleLogoutRef = await axios.post(`${axios.defaults.baseURL}/user/logout`);
        console.log("登出成功:",handleLogoutRef);
        setUser(null);
        }catch(error){
        console.log("登出失敗:",error);
        }
    }
    //登出
    //#endregion

    //#region 上傳圖片
        //上傳圖片
        //#region 上傳圖片說明
        //.append('image', file);用途:傳檔案
        //image → 要跟後端 upload.single('image') 對應
        //file → 來自 <input type="file"> 的 File 物件
        //FormData 的其他方法
        // .has('image');          // 檢查是否有 key
        // .get('username');       // 取第一個值
        // .getAll('photos');      // 取該 key 的所有值
        // .delete('image');       // 刪除該 key
        // ✅ 圖片上傳（最簡版、單檔、無前端驗證）
        //取得圖片檔案方法一(useRef方式)
        //const inputRef = useRef();先宣告一個ref儲存圖片檔案
        //宣告一個函式讀取圖片並儲存圖片
        // const handleUpload = () => {
        //   const file = inputRef.current.files[0]; // 從 DOM 讀取第一個檔案
        //   console.log(file);
        // };
        //用法
        // <input type="file" ref={inputRef} />
        // <button onClick={handleUpload}>上傳</button>

        //取得圖片檔案方法二(onChange + useState 方式)
        //const [file, setFile] = useState(null);宣告一個狀態來儲存圖片
        //宣告一個函式讀取圖片並儲存圖片
        //const handleChange = (e) => {
        //   setFile(e.target.files[0]); // 直接存到 state
        // };
        //宣告一個函式來上傳圖片
        // const handleUpload = () => {
        //   console.log(file);
        // };
        //用法
        // <input type="file" onChange={handleChange} />
        // <button onClick={handleUpload}>上傳</button>
    //#endregion

        const [imgData, setImgData] = useState(null);// 用來儲存上傳成功的圖片

        useEffect(()=>{},[imgData])//隨時更新圖片狀態

        const inputRef = useRef(null);                  // ✅ 新增 inputRef：抓取檔案輸入框的 DOM 元素，方便取得檔案物件

        const onUpload = async () => {
            const file = inputRef.current?.files?.[0]; // ✅ 從 inputRef 抓到檔案，?. 避免沒有選檔案時報錯
            if (!file) {                               // ✅ 如果沒有選擇檔案就提示
            alert('請先選擇檔案');
            return;
            }
            try {
            const imgData = new FormData();               // ✅ 建立 FormData 物件，用來包裝要送到後端的資料（支援檔案上傳）
            imgData.append('image', file);                // ✅ 把檔案放進 FormData，key 必須和後端 upload.single('image') 相同
            const imgDataRes = await axios.post(`${axios.defaults.baseURL}/api/upload`, imgData, { // ✅ 發送 POST 請求到後端圖片上傳 API
                headers: { 'Content-Type': 'multipart/form-data' }, // ✅ 設定請求頭，讓後端知道是 multipart/form-data 格式
            });
            setImgData(imgDataRes.data);                     // ✅ 把後端回傳的上傳結果存到 result 狀態，方便前端顯示
            console.log('上傳成功:', imgDataRes.data);
            inputRef.current.value = "";
            } catch (error) {
            console.log('圖片上傳失敗:', error);
            alert(error.response?.data?.error || '上傳失敗'); // ✅ 如果後端回傳錯誤訊息就顯示，否則顯示預設「上傳失敗」
            inputRef.current.value = "";
            }
        };
    //上傳圖片
    //#endregion

    //#region 取得產品資料夾圖片
        //取得產品資料夾圖片
            const [pages, setPages] = useState([]);       // 快取所有頁面
            useEffect(()=>{},[pages]);

            const [pageIndex, setPageIndex] = useState(0); // 當前頁索引
            useEffect(()=>{},[pageIndex]);

            const getImgData = async() => {
                try{
                    const getImgDataRef = await axios.get(`${axios.defaults.baseURL}/api/getImages`);
                    console.log('取得圖片資料成功:', getImgDataRef.data);
                    const firstPage = { items: getImgDataRef.data.items, nextCursor: getImgDataRef.data.next_cursor };
                    setPages([firstPage]);   // 快取第 1 頁
                    setPageIndex(0);         // 指到第 1 頁
                }catch(error){
                    console.log('取得圖片資料失敗:',error);
                }
            }
        
        // 下一頁
        const getNextImgData = async() => {
            if (!pages[pageIndex]?.nextCursor) return; // 沒有下一頁
            try{

                // 如果下一頁已經快取 → 直接切換，不打 API
                if (pages[pageIndex + 1]) {
                    setPageIndex(pageIndex + 1);
                    return;
                }

                const getNextImgDataRef = await axios.get(`${axios.defaults.baseURL}/api/getImages`,{
                    params:{
                        next:pages[pageIndex].nextCursor
                    }
                });
                console.log('取得下一頁圖片資料成功:', getNextImgDataRef.data);
                const newPage = { items: getNextImgDataRef.data.items, nextCursor: getNextImgDataRef.data.next_cursor };
                setPages([...pages, newPage]);  // 加到快取
                setPageIndex(pageIndex + 1);    // 切換頁面
            }catch(error){
                console.log('取得圖片資料失敗:',error);
            }
        }
        // 下一頁

        // 上一頁
        const getPrevImgData = () => {
            if (pageIndex === 0) return; // 已經在第一頁
            setPageIndex(pageIndex - 1); // 往前切換快取
        };
        // 上一頁
    //取得產品資料夾圖片
    //#endregion

    //#region 修改產品資料夾圖片
        //修改產品資料夾圖片
            const changeImage = async (event, publicId) => {
                const file = event.target.files?.[0];
                const changeImageData = new FormData();
                changeImageData.append('public_id', publicId); // e.g. "products/hr0t6tjsiolfoxa75rs5"
                changeImageData.append('image', file);         // input[type=file] 選到的新圖
                try{
                    const changeImageRes = await axios.post(`${axios.defaults.baseURL}/api/changeImages`, changeImageData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    });
                    console.log('修改圖片資料成功:', changeImageRes.data);
                    // 只更新這張圖的 URL（加 cache buster）
                    const newUrl = `${changeImageRes.data.url}?t=${Date.now()}`;
                    setPages(prev => {
                        const copy = [...prev];             // 1) 複製 pages 陣列（淺拷貝，保持不可變）
                        const cur = copy[pageIndex];        // 2) 取出目前這一頁的物件
                        copy[pageIndex] = {                 // 3) 生成一個「新的」當前頁物件
                            ...cur,
                            items: cur.items.map(x =>         // 4) 生成一個「新的」items 陣列
                            x.public_id === publicId
                                ? { ...x, url: newUrl }       // 5) 只更新被覆蓋的那一張圖（換成新 URL）
                                : x
                            ),
                        };
                        return copy;                        // 6) 回傳新的 pages → 觸發 React 重新渲染
                    });
                    event.target.value = '';
                }catch(error){
                    console.log("修改圖片資料失敗:",error);
                    event.target.value = '';
                }
            };
        //修改產品資料夾圖片
    //#endregion

    //#region 刪除產品資料夾圖片
        //刪除產品資料夾圖片
            const deleteImage = async (public_id) => {
                try{
                    const deleteImageRes = await axios.delete(`${axios.defaults.baseURL}/api/deleteImage/${encodeURIComponent(public_id)}`);
                    //如果id中有/ ? & = #等特殊字眼 就要用 encodeURIComponent()
                    //用來把字串裡「不適合直接放在網址裡的字元」轉換成安全的格式。
                    console.log('刪除圖片資料成功:', deleteImageRes.data);
                    getImgData();
                }catch(error){
                    console.log("刪除圖片資料失敗:",error);
                }
            };
        //刪除產品資料夾圖片
    //#endregion

    //#region 上傳使用者頭像圖片
    //上傳使用者頭像圖片
        const inputRef02 = useRef(null);                  // ✅ 新增 inputRef：抓取檔案輸入框的 DOM 元素，方便取得檔案物件

        const onAvatarImgUpload = async () => {
            const file = inputRef02.current?.files?.[0]; 
            // ✅ 從 inputRef 抓到檔案，?. 避免沒有選檔案時報錯
            if (!file) {                               // ✅ 如果沒有選擇檔案就提示
            alert('請先選擇檔案');
            return;
            }
            setUploadingImage(true);
            try {
                const imgAvatarData = new FormData();               
                // ✅ 建立 FormData 物件，用來包裝要送到後端的資料（支援檔案上傳）
                imgAvatarData.append('image', file);                
                // ✅ 把檔案放進 FormData，key 必須和後端 upload.single('image') 相同
                const imgAvatarDataRes = await axios.post(`${axios.defaults.baseURL}/api/upAvatarImg`, imgAvatarData, 
                    { // ✅ 發送 POST 請求到後端圖片上傳 API
                        headers: { 'Content-Type': 'multipart/form-data' }, // ✅ 設定請求頭，讓後端知道是 multipart/form-data 格式
                    }
                );
                console.log('上傳成功:', imgAvatarDataRes.data);
                fetchMe();  //成功後重新拿取個人資料
            } catch (error) {
                console.log('圖片上傳失敗:', error);
                alert(error.response?.data?.error || '上傳失敗'); // ✅ 如果後端回傳錯誤訊息就顯示，否則顯示預設「上傳失敗」
            }finally {
                setUploadingImage(false);
            }
        };
    //上傳使用者頭像圖片
    //#endregion

    //#region 會員管理員api測試
    //管理員api測試
        //#region 取得所有會員資料
            //取得所有會員資料
            const[allUserData,setAllUserData]=useState([]);

            useEffect(()=>{},[allUserData]);

            const getAllUserData = async()=>{
                try{
                    const getAllUserDataRef = await axios.get(`${axios.defaults.baseURL}/user/getAllUser`);
                    console.log("取得所有會員資料成功:",getAllUserDataRef.data);
                    setAllUserData(getAllUserDataRef.data);
                }catch(error){
                    console.log("取得所有會員資料失敗",error);
                }
            }
            //取得所有會員資料
        //#endregion

        //#region 修改會員資料
            //修改會員資料
                // 表單狀態
                const [formData, setFormData] = useState({
                    userId:"",
                    username: "",
                    email: "",
                    role: ""
                });

                useEffect(()=>{
                    console.log("會員資料:",formData);
                },[formData])

                // 表單過濾函式
                const handleDataInput = (input) => {
                    setFormData({
                        userId:input.id,
                        username: input.username,
                        email: input.email,
                        role: input.role,
                    });
                };

                // 表單輸入函式
                const handleDataChange = (e) => {
                    const { name, value } = e.target;
                    setFormData((prev) => ({
                        ...prev,
                        [name]: value
                    }));
                };
                
                //會員修改函式
                const patchUserData = async(event)=>{
                    event.preventDefault(); // 防止頁面重新整理
                    if(formData.userId === ""){
                        console.log("會員ID不可為空");
                        alert("會員ID不可為空");
                    }else if(formData.role === ""){
                        console.log("會員角色不可為空");
                        alert("會員角色不可為空");
                        return;
                    }
                    try{
                        const patchUserDataRef = await axios.patch(`${axios.defaults.baseURL}/user/patchUserData`,formData);
                        console.log("修改會員資料成功:",patchUserDataRef.data);
                        getAllUserData();
                    }catch(error){
                        console.log("修改會員資料失敗",error);
                    }
                }
            //修改會員資料
        //#endregion

        //#region 刪除指定會員資料
            //刪除指定會員資料
            const delUserData = async(id)=>{
                try{
                    const delUserDataRef = await axios.delete(`${axios.defaults.baseURL}/user/delUserData`,{ data: { user_id: id } });
                    console.log("刪除會員資料成功:",delUserDataRef.data);
                    getAllUserData();
                }catch(error){
                    console.log("刪除會員資料失敗",error);
                }
            }
            //刪除指定會員資料
        //#endregion
    //管理員api測試
    //#endregion

    //#region 產品相關api測試
        //產品相關api測試
            //#region 取得產品資料
                //取得產品資料
                const[productData,setProductData] = useState(null);

                useEffect(()=>{},[productData])

                const handleGetProductData = async()=>{
                    try{
                        const handleGetProductDataRef = await axios.get(`${axios.defaults.baseURL}/products/getProduct`);
                        console.log("產品資料取得成功:",handleGetProductDataRef.data);
                        setProductData(handleGetProductDataRef.data);
                    }catch(error){
                        console.log("產品資料取得失敗:",error.message);
                    }
                }
                //取得產品資料
            //#endregion

            //#region 取得單一產品資料
                //取得單一產品資料
                const[singleProductData,setSingleProductData] = useState({
                    id:"",
                })

                useEffect(()=>{
                    console.log("單一產品資料ID:",singleProductData);
                },[singleProductData])

                const handleSingleProductDataInput = (event) => {
                    const { value, name } = event.target;
                    setSingleProductData({
                        ...singleProductData,
                        [name]:value
                    })
                };

                const handleGetSingleProductData = async()=>{
                    try{
                        const handleGetPSingleProductDataRef = await axios.get(`${axios.defaults.baseURL}/products/getProduct`,{id});
                        console.log("單一產品資料取得成功:",handleGetPSingleProductDataRef.data);
                        setSingleProductData({
                            id:""
                        });
                    }catch(error){
                        console.log("單一產品資料取得失敗:",error.message);
                        setSingleProductData({
                            id:""
                        });
                    }
                }
                //取得單一產品資料
            //#endregion
        
            //#region 上傳產品圖片
                //上傳產品圖片
                    // const inputRef03 = useRef(null);                  // ✅ 新增 inputRef：抓取檔案輸入框的 DOM 元素，方便取得檔案物件

                    const onProductImgUpload = async (event) => {
                        const { files, name } = event.target;
                        const file = files?.[0];
                        // const file = inputRef03.current?.files?.[0]; // ✅ 從 inputRef 抓到檔案，?. 避免沒有選檔案時報錯
                        if (!file) {                               // ✅ 如果沒有選擇檔案就提示
                            alert('請先選擇檔案');
                            return;
                        }
                        setUploadingImage(true);
                        try {
                            const imgProductData = new FormData();             
                            imgProductData.append('image', file);                
                            const imgAProductDataRes = await axios.post(`${axios.defaults.baseURL}/api/upload`, imgProductData,{ 
                                headers: { 'Content-Type': 'multipart/form-data' },
                            });
                            console.log('上傳成功:', imgAProductDataRes.data.url);
                            if(name === "postProductData-image_url"){
                                setPostProductData((content) => ({ ...content, image_url: imgAProductDataRes.data.url }));
                            }else if(name === "putProductData-image_url"){
                                setPutProductData((content) => ({ ...content, image_url: imgAProductDataRes.data.url }));
                            }
                            event.target.value = "";
                        } catch (error) {
                            console.log('圖片上傳失敗:', error);
                            alert(error.response?.data?.error || '上傳失敗');
                            event.target.value = "";
                        }finally {
                            setUploadingImage(false);
                        }
                    };
                //上傳產品圖片
            //#endregion
            
            //#region 新增產品資料
                //新增產品資料
                    const [uploadingImage, setUploadingImage] = useState(false);//紀錄圖片上傳狀態

                    useEffect(()=>{},[uploadingImage]);

                    const[postProductData,setPostProductData]=useState({
                        name:"",
                        price:"",
                        description:"",
                        image_url:""
                    })

                    useEffect(()=>{
                        console.log("產品資料:",postProductData);
                    },[postProductData])


                    const handlePostProductData = async()=>{

                        // 基本驗證
                        const { name, price, description, image_url } = postProductData;
                        if(!image_url){
                            console.log("請先上傳圖片");
                            alert("請先上傳圖片");
                            return;
                        }else if (!name || !price || !description) {
                            console.log("請輸入完整的產品資訊");
                            alert("請輸入完整的產品資訊");
                            return;
                        }

                        // 準備 payload（避免剛 setState 尚未反映）
                        const payload = {
                            name,
                            price: Number(price), // 後端若要數字，記得轉型
                            description,
                            image_url,
                        };

                        try{
                            const handlePostProductDataRef = await axios.post(`${axios.defaults.baseURL}/products/postProduct`,payload);
                            console.log("新增產品成功:",handlePostProductDataRef.data);
                            
                            await handleGetProductData();

                            // 若想清空表單
                            setPostProductData({
                                name: "",
                                price: "",
                                description: "",
                                image_url: ""
                            });
                        }catch(error){
                            console.log("新增產品失敗:",error.message);
                            alert("新增產品失敗");
                            await handleGetProductData();
                        }
                    }
                //新增產品資料
            //#endregion
            
            //#region 修改產品資料
                //修改產品資料
                    // 表單狀態
                        const [putProductData, setPutProductData] = useState({
                            productId:"",
                            name:"",
                            price:"",
                            description:"",
                            image_url:""
                        });

                        useEffect(()=>{
                            console.log("產品資訊:",putProductData);
                        },[putProductData])
                    // 表單狀態

                    // 表單過濾函式
                        const handlePutProductDataInput = (input) => {
                            setPutProductData({
                                productId:input.id,
                                name:input.name,
                                price:input.price,
                                description:input.description,
                                image_url:input.image_url,
                            });
                        };
                    // 表單過濾函式

                    // 表單輸入函式
                        const handlePutProductDataChange = (e) => {
                            const { name, value } = e.target;
                            setPutProductData((prev) => ({
                                ...prev,
                                [name]: value
                            }));
                        };
                    // 表單輸入函式
                    
                    //產品修改函式
                        const handlePutProductData = async(event,id)=>{
                        event.preventDefault(); // 防止頁面重新整理

                        const { name, price, description, image_url } = putProductData;

                        if (!id) {
                            alert("缺少產品 ID");
                            return;
                        }

                        const payload = {
                            name,
                            price: Number(price),        // schema 多半要求 number
                            description,
                            image_url,                   // 若 schema 沒這欄就移除
                        };

                        if (!name || !price || !description) {
                            console.log("請輸入完整的產品修改資訊");
                            alert("請輸入完整的產品修改資訊");
                            return;
                        }

                        try{
                            const handlePutProductDataRef = await axios.put(`${axios.defaults.baseURL}/products/putProduct/${id}`,payload);
                            console.log("修改產品資料成功:",handlePutProductDataRef.data);

                            

                            // 更新清單或 UI
                            await handleGetProductData();
                        }catch(error){
                            console.log("修改產品資料失敗",error);
                            // 更新清單或 UI
                            await handleGetProductData();
                        }finally{
                            setPutProductData({
                                productId:"",
                                name:"",
                                price:"",
                                description:"",
                                image_url:""
                            })
                        }
                    }
                //修改產品資料
            //#endregion

            //#region 刪除指定產品資料
                //刪除指定產品資料
                    const delProductData = async(id)=>{
                        try{
                            const delProductDataRef = await axios.delete(`${axios.defaults.baseURL}/products/delProduct/${id}`);
                            console.log("刪除指定產品資料成功:",delProductDataRef.data);
                            await handleGetProductData();
                        }catch(error){
                            console.log("刪除指定產品資料失敗",error);
                            await handleGetProductData();
                        }
                    }
                //刪除指定產品資料
            //#endregion
        //產品相關api測試
    //#endregion
    
    //#region 購物車相關api測試
        //#region 儲存購物車資料
            //儲存購物車資料
                const[cartData,setCartData] = useState(null);
                useEffect(()=>{
                    console.log("取得的購物車資料:",cartData);
                },[cartData]);
            //儲存購物車資料
        //#endregion
        
        //#region 取得購物車資料
            //取得購物車資料
                const getCartData = async()=>{
                    try{
                        const getCartDataRef = await axios.get(`${axios.defaults.baseURL}/cart/getCart`);
                        console.log("取得購物車資料成功:",getCartDataRef.data);
                        setCartData(getCartDataRef.data.allItems);
                    }catch(error){
                        console.log("取得購物車資料失敗",error);
                    }
                }
            //取得購物車資料
        //#endregion

        //#region 加入購物車資料
            //加入購物車資料
                const addCartData = async(productId)=>{
                    try{
                        const addCartDataRef = await axios.post(`${axios.defaults.baseURL}/cart/addCart`,{ productId:productId });
                        console.log("加入購物車資料成功:",addCartDataRef.data);
                        
                    }catch(error){
                        console.log("加入購物車資料失敗",error);
                    }
                }
            //加入購物車資料
        //#endregion

        //#region 修改購物車資料
            //修改購物車資料
                const upCart = async(itemId,Qty)=>{
                    try{
                        const upCartRef = await axios.put(`${axios.defaults.baseURL}/cart/updateCart/${itemId}`,{quantity:Qty});
                        console.log("修改購物車資料成功:",upCartRef.data);
                        getCartData();
                    }catch(error){
                        console.log("修改購物車資料失敗",error);
                    }
                }
            //修改購物車資料
        //#endregion

        //#region 刪除購物車資料
        //刪除購物車資料
            const delCart = async(itemId)=>{
                try{
                    const delCartRef = await axios.delete(`${axios.defaults.baseURL}/cart/deleteCart/${itemId}`);
                    console.log("刪除購物車資料成功:",delCartRef.data);
                    getCartData();
                }catch(error){
                    console.log("刪除購物車資料失敗",error);
                }
            }
        //刪除購物車資料
    //#endregion
    //#endregion
    
    //#region 訂單相關api測試
            const[userAllOrderData,setUserAllOrderData] = useState(null);

            useEffect(()=>{
                console.log("訂單資料:",userAllOrderData);
            },[userAllOrderData])
        
        //#region 付款方式狀態
            //付款方式狀態

                //付款方式狀態
                const [selectedPayment, setSelectedPayment] = useState("");

                //更新付款方式狀態
                useEffect(()=>{
                    console.log("付款方式:",selectedPayment);
                },[selectedPayment]);

                //處理選擇付款方式的變化跟上傳
                const handlePaymentChange = (event) => {
                    const code = event.target.value;       // 例如 'CASH' / 'APPLE_PAY' / 'LINE_PAY'
                    console.log("看看:",code)
                    setSelectedPayment(code);

                    // 如果要在選擇當下就送到後端：
                    if (singleOtherData) {                 // singleOtherData 應該是「訂單ID」
                        putOtherData(singleOtherData.id,code);
                    } else {
                        alert("請先選取訂單");
                        setSelectedPayment("");
                    }
                };
            //付款方式狀態
        //#endregion

        //#region 取得訂單資料
            const getOrder = async() => {
                try{
                    const getOrderRef = await axios.get(`${axios.defaults.baseURL}/order/getOrder`);
                    console.log("取得訂單資料成功:",getOrderRef.data);
                    setUserAllOrderData(getOrderRef.data.orders);
                }catch(error){
                    console.log("取得訂單資料失敗",error);
                }
            }
        //#endregion

        //#region 生成訂單資料
            const postOrder = async() => {
                try{
                    const postOrderRef = await axios.post(`${axios.defaults.baseURL}/order/postOrder`);
                    console.log("生成訂單資料成功:",postOrderRef.data);
                    getOrder();
                }catch(error){
                    console.log("生成訂單資料失敗",error);
                }
            }
        //#endregion

        //#region 修改訂單(付款方式)上傳函式
            //儲存單一訂單資料狀態
            const[singleOtherData,setSingleOtherData] = useState(null);
            //儲存單一訂單資料狀態

            //更新單一訂單資料狀態
            useEffect(()=>{
                console.log("單一訂單資料:",singleOtherData);
            },[singleOtherData])
            //更新單一訂單資料狀態
            
            //修改訂單(付款方式)上傳函式
            const putOtherData = async (orderId,payload) => {
                if (!orderId) {
                    alert("請先選取訂單");
                    return;
                }
                try {
                    const putOtherDataRes = await axios.put(`${axios.defaults.baseURL}/order/putOrder/${orderId}`,{ paymentMethodCode:payload });
                    console.log("修改訂單資料(付款方式)成功:", putOtherDataRes.data);
                    setSelectedPayment("");
                    // 需要的話：更新畫面
                    await getOrder();
                } catch (error) {
                    console.log("修改訂單資料(付款方式)失敗", error);
                    alert(error.response?.data?.error || "修改失敗");
                    setSelectedPayment("");
                }
            };
            //修改訂單(付款方式)上傳函式
        //#endregion

        //#region 修改訂單(取消訂單)上傳函式
            
            //修改訂單(取消訂單)上傳函式
            const cancelOtherData = async (orderId) => {
                if (!orderId) {
                    alert("請先選取訂單");
                    return;
                }
                try {
                    const cancelOtherDataRes = await axios.patch(`${axios.defaults.baseURL}/order/cancelOrder/${orderId}`);
                    console.log("修改訂單資料(取消訂單)成功:", cancelOtherDataRes.data);
                    setSelectedPayment("");
                    // 需要的話：更新畫面
                    await getOrder();
                } catch (error) {
                    console.log("修改訂單資料(取消訂單)失敗", error);
                    alert(error.response?.data?.error || "修改失敗");
                    setSelectedPayment("");
                }
            };
            //修改訂單(取消訂單)上傳函式
        //#endregion
    //#endregion

    //#region 新api測試
            
        //#region 連線測試
            const [newLinkTest, setNewLinkTest]=useState(null);
            useEffect(()=>{},[newLinkTest]);
            const newApiLinkTest = async()=>{
                try{
                    const result = await axios.get(`${apiSec}/test-db`);
                    console.log("結果:",result.data.message);
                    setNewLinkTest(result.data.message);
                }catch(error){
                    console.log("結果失敗:",error);
                    setNewLinkTest(error.message);
                }
            }
        //#endregion

        //#region 會員圖片上傳
            const [userAvatarImgData, setUserAvatarImgData] = useState(null);// 用來儲存上傳成功的圖片
            useEffect(()=>{},[userAvatarImgData])//隨時更新圖片狀態
            const [userAvatarImgID, setUserAvatarImgID] = useState(null);// 用來儲存上傳成功的圖片
            useEffect(()=>{},[userAvatarImgID])//隨時更新圖片狀態

            const userAvatarImgRef = useRef(null);                  // ✅ 新增 inputRef：抓取檔案輸入框的 DOM 元素，方便取得檔案物件

            const userAvatarImgUpload = async () => {
                const file = userAvatarImgRef.current?.files?.[0]; // ✅ 從 inputRef 抓到檔案，?. 避免沒有選檔案時報錯
                if (!file) {                               // ✅ 如果沒有選擇檔案就提示
                    alert('請先選擇檔案');
                    return;
                }
                try {
                    console.log("圖片上傳");
                    const userAvatarImgData = new FormData();               // ✅ 建立 FormData 物件，用來包裝要送到後端的資料（支援檔案上傳）
                    userAvatarImgData.append('image', file);                // ✅ 把檔案放進 FormData，key 必須和後端 upload.single('image') 相同
                    const userAvatarImgDataRes = await axios.post(`${apiSec}/api/upload`, userAvatarImgData, { // ✅ 發送 POST 請求到後端圖片上傳 API
                        headers: { 'Content-Type': 'multipart/form-data' }, // ✅ 設定請求頭，讓後端知道是 multipart/form-data 格式
                    });
                    console.log('上傳成功:', userAvatarImgDataRes.data);
                    setUserAvatarImgData(userAvatarImgDataRes.data.url);
                    setUserAvatarImgID(userAvatarImgDataRes.data.filename);
                    userAvatarImgRef.current.value = "";
                } catch (error) {
                    console.log('圖片上傳失敗:', error);
                    alert(error.response?.data?.error || '上傳失敗'); // ✅ 如果後端回傳錯誤訊息就顯示，否則顯示預設「上傳失敗」
                    userAvatarImgRef.current.value = "";
                }
            };
        //#endregion

        //#region 會員圖片替換上傳                
            const userAvatarImgChangeUpload = async () => {
                const file = userAvatarImgRef.current?.files?.[0]; 
                if (!file) {                              
                    alert('請先選擇檔案');
                    return;
                }
                try {
                    console.log("圖片覆蓋");
                    const userAvatarImgData = new FormData();     
                    userAvatarImgData.append('public_id', userAvatarImgID);//文字要在前面          
                    userAvatarImgData.append('image', file);
                    console.log("圖片id:",userAvatarImgID);
                    const userAvatarImgDataRes = await axios.put(`${apiSec}/api/changeUploadImages`, userAvatarImgData, { 
                        headers: { 'Content-Type': 'multipart/form-data' }, 
                    });
                    console.log('覆蓋成功:', userAvatarImgDataRes.data);
                    setUserAvatarImgData(userAvatarImgDataRes.data.url);
                    setUserAvatarImgID(userAvatarImgDataRes.data.filename);
                    userAvatarImgRef.current.value = "";
                } catch (error) {
                    console.log('圖片覆蓋失敗:', error);
                    alert(error.response?.data?.error || '覆蓋失敗'); 
                    userAvatarImgRef.current.value = "";
                }
            };
        //#endregion

    //#endregion
        


  return (
    <div className="container">
      <h3>API測試</h3>

        <div className='連接測試'>
            <div>連接測試:{linkTest}</div>
        </div>
        
        <div className='圖片相關測試'>
            <h4>圖片相關測試</h4>
            <div className='my-24'>
                <h4>圖片上傳測試</h4>
                <div className='my-24'>
                    {/*圖片上傳測試區*/}
                    
                    <input onClick={()=>{}} type="file" ref={inputRef} />     {/* ✅ 綁定 inputRef 以便 onUpload 讀取檔案 */}
                    <button onClick={()=>{onUpload()}}>上傳</button> {/* ✅ 點擊後觸發 onUpload 上傳檔案 */}

                    {imgData?.url && (                        // ✅ 如果上傳成功（result 有 url），顯示連結與預覽圖
                        <>
                        <p>URL：{imgData.url}</p>
                        <img src={imgData.url} alt="uploaded" style={{ maxWidth: 240 }} />
                        </>
                    )}
                    {/*圖片上傳測試區*/}
                </div>
            </div>

            <div className='my-24'>
                <h4>圖片取得測試</h4>
                <div className='my-24'>
                    <button onClick={()=>{getImgData()}}>取得圖片資料</button>

                    {pages[pageIndex] && 
                        (
                            <>
                                <div className='my-24 d-flex justify-content-between gap-12'> 
                                    {
                                        pages[pageIndex].items?.map((item)=>{
                                            // 建立每張圖獨立的 input id（避免重複）
                                            const inputId = `imgInput-${item.public_id.replace(/[^\w-]/g, "_")}`;
                                            return(
                                                <div key={item.public_id} className='w-100'>
                                                    <div className='my-12 imgBox w-100'>
                                                        <img  src={item.url} alt="uploaded" 
                                                                style={{ width:"100%",objectFit:"cover", aspectRatio: "1 / 1",}} />
                                                    </div>
                                                    <div className='imgBtnBox d-flex justify-content-center align-items-center gap-12'>
                                                        <label htmlFor={inputId} className='btn btn-primary'>修改</label>
                                                        <input  className='d-none'
                                                                id={inputId}
                                                                type="file" 
                                                                accept="image/*" 
                                                                onChange={(event)=>{changeImage(event,item.public_id)}} />
                                                        <button className='btn btn-primary' onClick={()=>{deleteImage(item.public_id)}}>刪除</button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className='imgPageBox d-flex justify-content-center align-items-center gap-24'>
                                    <button className='btn btn-primary' onClick={()=>{getPrevImgData()}} disabled={pageIndex === 0}>上一頁</button>
                                    <button className='btn btn-primary' onClick={()=>{getNextImgData()}} disabled={!pages[pageIndex]?.nextCursor}>下一頁</button>
                                </div>
                            </>
                        )
                    }
                    
                </div>
            </div>
        </div>
        
        <div className='my-24 使用者頭像替換測試'>
            <h4>使用者頭像替換測試</h4>
            {/* 使用者頭像圖片替換 */}
            <input type="file" ref={inputRef02} />     {/* ✅ 綁定 inputRef 以便 onUpload 讀取檔案 */}
            <button onClick={()=>{onAvatarImgUpload()}}>上傳</button> {/* ✅ 點擊後觸發 onUpload 上傳檔案 */}
            {/* 使用者頭像圖片替換 */}
        </div>
      
        {/* 載入中的提示 */}
        {loading && <p>載入中…</p>}

        {/* 錯誤訊息顯示 */}
        {!!error && <p style={{ color: 'red' }}>{error}</p>}

        {/* 如果沒有登入（user 為 null），顯示 Google 登入按鈕 */}
        {!loading && !user && (
            <>  
                <div className='p-24' style={{border:"1px solid #000000",}}>
                    <h4 className='mb-24'>會員登入測試</h4>
                    <div className='my-24'>
                        <button
                            onClick={handleGoogleLogin}
                            style={{
                                backgroundColor: '#4285F4',
                                color: 'white',
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '16px',
                                cursor: 'pointer'
                            }}
                        >
                        使用 Google 登入
                        </button>
                    </div>
                    
                    <form onSubmit={handleLogIn} className='my-24'>
                    {/* <!-- Email 欄位 --> */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">電子郵件</label>
                        <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        placeholder="請輸入電子郵件"
                        required
                        />
                    </div>

                    {/* <!-- 密碼欄位 --> */}
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">密碼</label>
                        <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={userData.password}
                        onChange={handleInputChange}
                        placeholder="請輸入密碼"
                        required
                        autoComplete="current-password"
                        />
                    </div>

                    {/* <!-- 登入按鈕 --> */}
                    <button type="submit" className="btn btn-primary w-100">登入</button>
                    </form>
                </div>
            </>
        )}
        {/* 如果已登入，顯示會員資料 */}
        {user && (
            <div className='p-24' style={{border:"1px solid #000000",  }}>
            <h4>我的資訊</h4>
            <ul>
                <li>ID：{user.id}</li>
                <li>名稱：{user.username}</li>
                <li>Email：{user.email}</li>
                <li>角色：{user.role}</li>
                <li>頭像：<img src={user.avatar_url} alt={user.username} style={{width:"80px",height:"80px",objectFit:"cover",borderRadius:"50%",}}/></li>
            </ul>

            {/* 功能按鈕：重新整理資料與登出 */}
            <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={fetchMe}>重新整理資料</button> {/* 重新呼叫 /users/me */}
                <button onClick={()=>{handleLogout()}}>登出</button>      {/* 呼叫登出 API */}
            </div>
            </div>
        )}
    
         
        <div className='my-24 管理員測試'> 
            <h4>管理員測試</h4>
            <button onClick={()=>{getAllUserData();}}>取得所有會員資料</button>
        </div>
        
        <div className='my-24 所有會員資料'>
            <h4>所有會員資料</h4>
            {
                allUserData?.map((item)=>{
                    return(
                        <>
                            <div className='d-flex gap-24'>
                                <div style={{width:"100px",}} key={item.id}>{item.username}</div>
                                <div>{item.email_verified_at?("帳號已驗證"):("帳號還未進行驗證")}</div>
                                <button onClick={()=>{delUserData(item.id);}}>刪除</button>
                                <button onClick={()=>{handleDataInput(item);}}>修改資料</button>
                            </div>
                        </>
                    )
                })
            }
        </div>
        
        <div className='my-24 修改會員資料測試'>
            <h4>修改會員資料測試</h4>
            <form onSubmit={patchUserData}>
                {/* 使用者名稱 */}
                <div>
                    <label>使用者名稱：</label>
                    <input
                    type="text"
                    name="username"
                    placeholder="輸入新名稱"
                    value={formData.username}
                    onChange={handleDataChange}
                    />
                </div>

                {/* Email */}
                <div>
                    <label>Email：</label>
                    <input
                    type="email"
                    name="email"
                    placeholder="輸入新 Email"
                    value={formData.email}
                    onChange={handleDataChange}
                    />
                </div>

                {/* 角色 */}
                <div>
                    <label>角色：</label>
                    <select
                    name="role"
                    value={formData.role}
                    onChange={handleDataChange}
                    >
                        <option value="">--選擇角色--</option>
                        <option value="user">一般會員</option>
                        <option value="admin">管理員</option>
                    </select>
                </div>

                <div className='d-flex'>
                    <span>角色：</span>
                    <div className='d-flex'>
                        <div className='d-flex'>
                            <input
                                id="role-user"
                                type="radio"
                                name="role"
                                value="user"
                                checked={formData.role === 'user'}
                                onChange={handleDataChange}
                            />
                            <label htmlFor="role-user" style={{ marginLeft: 6 }}>一般會員</label>
                        </div>

                        <div className='d-flex'>
                            <input
                            id="role-admin"
                            type="radio"
                            name="role"
                            value="admin"
                            checked={formData.role === 'admin'}
                            onChange={handleDataChange}
                            />
                            <label htmlFor="role-admin" style={{ marginLeft: 6 }}>管理員</label>
                        </div>
                    </div>
                    
                </div>


                <button type="submit">更新資料</button>
            </form>
        </div>
        
        <div className='my-24 新增會員測試'>
            <h4>新增會員測試</h4>
            <form onSubmit={handleNewUserDataUp}>
                {/* 使用者名稱 */}
                <div>
                    <label>使用者名稱：</label>
                    <input
                    type="text"
                    name="username"
                    placeholder="輸入新名稱"
                    value={newUser.username}
                    onChange={handleNewUserDataIn}
                    />
                </div>

                {/* Email */}
                <div>
                    <label>Email：</label>
                    <input
                    type="email"
                    name="email"
                    placeholder="輸入mail"
                    value={newUser.email}
                    onChange={handleNewUserDataIn}
                    />
                </div>

                {/* password */}
                <div>
                    <label>password：</label>
                    <input
                    type="password"
                    name="password"
                    placeholder="輸入密碼"
                    value={newUser.password}
                    onChange={handleNewUserDataIn}
                    />
                </div>

                <div>
                    <label>會員圖像：</label>
                    <img src={newUser.avatar_url} alt={newUser.avatar_public_id} style={{width:"150px", height:"150px", objectFit:"cover"}}/>
                    <input
                        type="file"
                        name="userImg"
                        accept="image/*"
                        // ref={inputRef03}
                        onChange={(event)=>{userImgUpload(event)}} // ← 選檔就上傳
                        disabled={uploadingImage}
                    />
                </div>

                <button type="submit">新增會員</button>

                {/* reEmail */}
                <div>
                    <label>Email：</label>
                    <input
                    type="email"
                    name="reEmail"
                    placeholder="輸入mail"
                    value={reEmail.email}
                    onChange={handleReEmailData}
                    />
                </div>
                <button type="button" onClick={()=>{reEmailPost()}}>重新寄送認證信件</button>
            </form>
        </div>

        <div className="google-ReCAPTCHA驗證測試">
            <div className="my-24">
                <h4>google-ReCAPTCHA驗證測試</h4>
                {/* v2 checkbox 小工具（使用者勾選後會得到 token） */}
                <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={siteKey}
                    onChange={(token)=>{onCaptchaChange(token)}}
                    onExpired={() => {
                        setCaptchaToken("");
                        setReCAPTCHAMessage("⚠️ 驗證碼已過期，請重新勾選");
                }}
                />
                {/* onExpired作用為token失效時，會觸發 */}
                {/* 顯示驗證結果 */}
                <div style={{ marginTop: "12px", fontWeight: "bold" }}>
                {reCAPTCHAMessage}
                </div>
            </div>
            <div className="my-24">
                <h4>google-ReCAPTCHA Invisible 測試</h4>

                {/* Invisible reCAPTCHA 元件 */}
                <ReCAPTCHA
                    ref={invisibleRecaptchaRef}
                    sitekey={InvisiblesiteKey}
                    size="invisible" // Invisible 模式
                    onChange={(token)=>{verifyInvisibleWithServer(token)}}
                    onExpired={() => {
                        setInvisibleReCAPTCHAMessage("⚠️ 驗證碼已過期，請重新嘗試");
                    }}
                />

                {/* 觸發驗證按鈕 */}
                <button
                    type="button"
                    onClick={()=>{InvisiblehandleSubmit()}}
                    className="px-4 py-2 bg-blue-500 rounded mt-4"
                >
                    提交驗證
                </button>

                {/* 顯示驗證結果 */}
                <div style={{ marginTop: "12px", fontWeight: "bold" }}>
                    {invisiblereCAPTCHAMessage}
                </div>
            </div>
            <div className="my-24">
                <h4>google-reCAPTCHA v3 測試</h4>

                {/* 修改：v3 不渲染 <ReCAPTCHA/>，只放一顆觸發按鈕 */}
                <button
                    type="button"
                    onClick={verifyV3WithServer}
                    className="px-4 py-2 bg-blue-500 rounded mt-4"
                >
                    {loading ? "驗證中…" : "提交驗證"}
                </button>

                <div style={{ marginTop: 12, fontWeight: "bold" }}>{V3Message}</div>
            </div>
        </div>

        <div className='my-24 產品相關測試'>
            <h4>產品相關測試</h4>

            <div className='產品資料取得測試'>
                <h4 className='my-24'>產品資料取得測試</h4>
                <button onClick={()=>{handleGetProductData();}}>取得產品資料</button>
                {
                    productData?(
                        <div>
                        {
                            productData?.map(product => (
                                <div className="product-item d-flex justify-content-between" key={product.id}>

                                    <div className="img-box">
                                    <img src={product.image_url} alt={product.name} style={{width:"80px", height:"80px", objectFit:"cover"}}/>
                                    <p>{product.name}</p>
                                    </div>

                                    <div className="price-box">
                                    <p className="price-text">NT$ {product.price.toLocaleString()}</p>
                                    <p>{product.description}</p>
                                    </div>

                                    <div className="btn-box">
                                        <button type="button" className="product-btn" onClick={()=>{addCartData(product.id)}}>
                                            加入購物車
                                        </button>
                                        <button type="button" className="product-btn" onClick={()=>{handlePutProductDataInput(product)}}>
                                            修改產品
                                        </button>
                                        <button type="button" className="product-btn" onClick={()=>{delProductData(product.id)}}>
                                            刪除
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                        </div>
                    )
                    :
                    (   
                        <div>目前無產品資料</div>
                        
                    )
                }
            </div>
             
            <div className='產品資料(單一)取得測試'>
                <h4 className='my-24'>產品資料(單一)取得測試</h4>
                <label>取得單一產品資料：</label>
                <input
                type="text"
                name="id"
                placeholder="請輸入id"
                value={singleProductData.id}
                onChange={handleSingleProductDataInput}
                />
                <button onClick={()=>{handleGetSingleProductData();}}>取得單一產品資料</button>
            </div>
            
            <div className='新增產品測試'>
                <h4 className='my-24'>新增產品測試</h4>
                <form onSubmit={handlePostProductData}>
                    <div>
                        <label>產品名稱</label>
                        <input
                        type="text"
                        value={postProductData.name}
                        onChange={(event) => setPostProductData((content) => ({ ...content, name: event.target.value }))}
                        placeholder="輸入產品名稱"
                        />
                    </div>

                    <div>
                        <label>價格</label>
                        <input
                            type="number"
                            min="0"
                            step="1"
                            value={postProductData.price}
                            onChange={(event) => setPostProductData((content) => ({ ...content, price: event.target.value }))}
                            placeholder="輸入價格"
                        />
                    </div>

                    <div className='d-flex'>
                        <label>描述</label>
                        <textarea
                            value={postProductData.description}
                            onChange={(event) => setPostProductData((content) => ({ ...content, description: event.target.value }))}
                            placeholder="輸入描述"
                            rows={4}
                        />
                    </div>

                    {/* 對應 /api/upload 的 input：選檔即上傳 */}
                    <div>
                        <label>產品圖片</label>
                        <input
                            type="file"
                            accept="image/*"
                            // ref={inputRef03}
                            name="postProductData-image_url"
                            onChange={onProductImgUpload} // ← 選檔就上傳
                            disabled={uploadingImage}
                        />
                        {uploadingImage && <p>圖片上傳中...</p>}
                        {postProductData.image_url && (
                        <div style={{ marginTop: 8 }}>
                            <img
                            src={postProductData.image_url}
                            alt="預覽"
                            style={{ maxWidth: 240, display: "block" }}
                            />
                            <small>已上傳：{postProductData.image_url}</small>
                        </div>
                        )}
                    </div>

                    <button type="submit" disabled={uploadingImage}>
                        建立產品
                    </button>
                </form>
            </div>
            
            <div className='my-24 修改產品資料測試'>
                 <h4>修改產品資料測試</h4>
                <form onSubmit={(event)=>{handlePutProductData(event,putProductData.productId)}}>
                    
                    <div>
                        <label>產品ID：</label>
                        <input
                            type="text"
                            defaultValue={putProductData.productId}
                        />
                    </div>

                    <div>
                        <label>產品名稱：</label>
                        <input
                            type="text"
                            value={putProductData.name}
                            name="name"
                            onChange={handlePutProductDataChange}
                            placeholder="輸入產品名稱"
                        />
                    </div>

                    
                    <div>
                        <label>價格：</label>
                        <input
                            type="number"
                            min="0"
                            step="1"
                            name="price"
                            value={putProductData.price}
                            onChange={handlePutProductDataChange}
                            placeholder="輸入價格"
                        />
                    </div>

                    
                    <div>
                        <label>描述：</label>
                        <textarea
                            value={putProductData.description}
                            name="description"
                            onChange={handlePutProductDataChange}
                            placeholder="輸入描述"
                            rows={4}
                        />
                    </div>

                    <div>
                        <label>產品圖片：</label>
                        <img src={putProductData.image_url} alt={putProductData.name} style={{width:"150px", height:"150px", objectFit:"cover"}}/>
                        <input
                            type="file"
                            name="putProductData-image_url"
                            accept="image/*"
                            // ref={inputRef03}
                            onChange={onProductImgUpload} // ← 選檔就上傳
                            disabled={uploadingImage}
                        />
                    </div>

                    <button type="submit">更新資料</button>
                </form>
            </div>
        </div>
        
        <div className='購物車相關測試'>
            <h4 className='my-24'>購物車相關測試</h4>
            <div>
                <h4 className='my-24'>購物車資料取得測試</h4>
                <button onClick={()=>{getCartData();}}>取得購物車資料</button>
            </div>
            <div>
                <h4 className='my-24'>購物車資料(單人)列表</h4>
                <div className='d-flex justify-content-between'>
                    <div className='text-center w-100'>使用者名稱</div>
                    <div className='text-center w-100'>產品名稱</div>
                    <div className='text-center w-100'>產品圖片</div>
                    <div className='text-center w-100'>數量</div>
                    <div className='text-center w-100'>總價</div>
                    <div className='text-center w-100'>刪除</div>
                </div>
                
                    {
                        cartData?(
                            <>
                                {
                                    cartData?.map((item)=>{
                                        return(
                                            <>
                                                <div key={item.item_id} className='list my-24'>
                                                    <div className='d-flex justify-content-between'>
                                                        <div className='text-center w-100'>{item.username}</div>
                                                        <div className='text-center w-100'>{item.product_name}</div>
                                                        <div className='text-center w-100'>
                                                            <img src={item.image_url} alt={item.product_name} style={{width:"150px", height:"150px", objectFit:"cover"}}/>
                                                        </div>
                                                        <div className='text-center w-100 d-flex flex-column justify-content-center align-items-center'>
                                                            <button className='' onClick={()=>{upCart(item.item_id,item.quantity + 1)}}>增加</button>
                                                            {item.quantity}
                                                            <button className='' onClick={()=>{upCart(item.item_id,item.quantity - 1)}}>減少</button>
                                                        </div>
                                                        <div className='text-center w-100'>{item.total}</div>
                                                        <div className='text-center w-100'>
                                                            <button className='me-12' onClick={()=>{delCart(item.item_id)}}>刪除</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                                <button type='button' className='btn btn-primary d-block ms-auto' onClick={()=>{postOrder();}} >生成訂單</button>
                            </>
                        )
                        :
                        (
                            <div>目前尚未取得購物車資料</div>
                        )
                    }
            </div>
        </div>

        <div className='訂單相關測試'>
            <h4 className='my-24'>訂單相關測試</h4>
            <div>
                <h4 className='my-24'>訂單資料取得測試</h4>
                <button onClick={()=>{getOrder();}}>取得訂單資料</button>
            </div>
            <div>
                <h4 className='my-24'>訂單資料(單人)列表</h4>
                <div className='d-flex justify-content-between'>
                    <div className='text-center w-100'>訂單ID</div>
                    <div className='text-center w-100'>訂單時間</div>
                    <div className='text-center w-100'>訂單狀態</div>
                    <div className='text-center w-100'>付款方式</div>
                    <div className='text-center w-100'>總價</div>
                    <div className='text-center w-100'>刪除</div>
                </div>
                {
                    userAllOrderData?.map((item)=>{
                        const timedate = new Date(item.created_at).toLocaleString("zh-TW", {timeZone: "Asia/Taipei"});
                        return(
                            <>
                                <div key={item.id} className='d-flex justify-content-between my-12'>
                                    <div className='text-center w-100'>{item.order_number}</div>
                                    <div className='text-center w-100'>{timedate}</div>
                                    <div className='text-center w-100'>{item.status}</div>
                                    <div className='text-center w-100'>
                                        {
                                            item.payment_method_name === "未選擇付款方式"?
                                            (
                                                <button type='button' 
                                                        className='btn btn-primary' 
                                                        onClick={()=>{setSingleOtherData(item)}}
                                                        disabled={item.status === "cancelled"}>
                                                        
                                                        付款方式
                                                </button>
                                            )
                                            :
                                            (
                                                <div>
                                                    <div>付款方式:{item.payment_method_name}</div>
                                                    <button type='button' 
                                                            className='btn btn-primary' 
                                                            onClick={()=>{setSingleOtherData(item)}}
                                                            disabled={item.status === "cancelled"}>
                                                                
                                                            修改付款方式
                                                    </button>
                                                </div>
                                            )
                                        }
                                        
                                    </div>
                                    <div className='text-center w-100'>{item.grand_total}</div>
                                    <div className='text-center w-100'>
                                        <button type='button' 
                                                className='btn btn-primary' 
                                                onClick={()=>{cancelOtherData(item.id)}}
                                                disabled={item.status === "cancelled"}
                                                >
                                                取消訂單
                                        </button>
                                    </div>
                                </div>
                            </>
                        )
                    })
                }
            </div>
            <div>
                <h4 className='my-24'>付款方式</h4>
                <div>訂單ID:{singleOtherData?(singleOtherData.order_number):("尚未選取訂單")}</div>
                <div className='payItem'>
                    <div className="card rounded-0">
                        <div className="card-header bg-white border-0 py-3" id="heading1">
                            <input  id="pay01" 
                                    type="radio" 
                                    name="payment" 
                                    value="cash" 
                                    checked={selectedPayment === "cash"} 
                                    onChange={handlePaymentChange}/>
                            <label htmlFor="pay01" className="mb-0 position-relative custom-checkout-label">
                                現金支付
                            </label>
                        </div>
                    </div>

                    <div className="card rounded-0">
                        <div className="card-header bg-white border-0 py-3" id="heading2">
                            <input
                                id="pay02"
                                type="radio"
                                name="payment"
                                value="credit_card"
                                checked={selectedPayment === "credit_card"}
                                onChange={handlePaymentChange}
                                data-bs-toggle="collapse"
                                data-bs-target="#creditCardInputTest"
                                aria-expanded={selectedPayment === "credit_card"}
                                aria-controls="creditCardInputTest"
                            />
                            <label htmlFor="pay02" className="mb-0 position-relative custom-checkout-label">
                                信用卡支付
                            </label>
                        </div>
                    </div>

                    <div className="card rounded-0">
                        <div
                            className="card-header bg-white border-0 py-3"
                            id="heading3"
                        >
                            <input  id="pay03" 
                                    type="radio" 
                                    name="payment" 
                                    value="atm" 
                                    checked={selectedPayment === "atm"} 
                                    onChange={handlePaymentChange}/>
                            <label htmlFor="pay03" className="mb-0 position-relative custom-checkout-label">
                                銀行轉帳
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className='新api測試'>
            <h4 className='my-24'>新api測試</h4>

            <div className='連線測試'>
                <h4 className='my-24'>連線測試</h4>
                <button type='button' onClick={()=>{newApiLinkTest()}}>連線測試</button>
                <div>連接測試:{newLinkTest}</div>
            </div>

            <div className='新api會員頭像圖片上傳測試'>
                <div className='my-24'>
                    <h4>新api會員頭像圖片上傳測試</h4>
                    <div className='my-24'>
                        {/*圖片上傳測試區*/}
                        
                        <input  type="file" 
                                ref={userAvatarImgRef} 
                                onChange={ userAvatarImgID ? userAvatarImgChangeUpload : userAvatarImgUpload }/> 

                        {userAvatarImgData && (                        
                            <>
                            <p>會員圖像ID:{userAvatarImgID}</p>
                            <img src={userAvatarImgData} alt="uploaded" style={{ maxWidth: 240 }} />
                            </>
                        )}
                        {/*圖片上傳測試區*/}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}