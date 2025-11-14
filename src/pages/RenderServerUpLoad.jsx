

export default function RenderServerUpLoad() {
  return (
    <div className="container">
        <div className="title-box">
            <h2>Render伺服器端上傳 & 設定</h2>
        </div>
        <p>上傳的前置作業內容:</p>
        <p>將伺服器端上傳至Github</p>
        <p>使用Github登入至Render</p>
        <div>Render網址<a href="https://render.com">https://render.com</a></div>
        <p>點擊右上的按鈕</p>
        <div>
            <img className="mt-12 mb-12" style={{width:"100%",aspectRatio:"1300 / 825",objectFit:"cover",borderRadius:"4px",}} 
            src="/images/RenderServerUpLoad/RenderServerUpLoad-1.png" alt="" />
        </div>
        <p>點選Github登入</p>
        <div>
            <img className="mt-12 mb-12" style={{width:"100%",aspectRatio:"1300 / 825",objectFit:"cover",borderRadius:"4px",}} 
            src="/images/RenderServerUpLoad/RenderServerUpLoad-2.png" alt="" />
        </div>
        <p>首次使用 Render 時，它會先讓你「建立工作區（workspace）」</p>
        <p>其內容:</p>
        <p>
            <br />
            Workspaces are shared areas where teams deploy and operate their code<br />
            「工作區」是團隊用來部署和管理程式碼的共享空間。<br />
            <br />
            What would you like to call your workspace?<br />
            你想把這個工作區命名為什麼？<br />
            <br />
            My workspace<br />
            預設為 My workspace<br />
            <br />
            What will you use this workspace for?<br />
            你打算用這個工作區來做什麼？<br />
            <br />
            Work/Personal projects/Other<br />
            <br />
            How many developers (including yourself) will be working together?<br />
            包含你在內，會有幾位開發者一起使用這個工作區？<br />
            <br />
            Just me/2-10/11-50/51-150/More than 150<br />
        </p>
        <p>
            <br />
            We'll use this to tailor your onboarding experience<br />
            //我們會根據這些資訊，為你客製 onboarding 體驗<br />
            <br />
            What are you looking to build with Render?<br />
            你希望在 Render 上建什麼類型的應用？<br />
            <br />
            Website / landing page //網站或首頁頁面<br />
            AI-native app //原生 AI 應用<br />
            E-commerce //電商網站<br />
            Internal tool //內部工具<br />
            Prototype / MVP //原型 / 最小可行產品<br />
            Side project //側邊專案 / 練習專案<br />
            Backend //後端伺服器（API）<br />
            Background job //背景工作（排程任務等<br />
            <br />
            What capabilities matter most for your project on Render?<br />
            //對你來說哪些功能最重要？<br />
            <br />
            AI/ML //人工智慧／機器學習<br />
            Observability //可觀察性（監控、記錄<br />
            Scalability //可擴展性（自動應對高流量<br />
            Compliance //法規遵循（如 GDPR）<br />
            Security //資安保護<br />
            Developer velocity //開發效率<br />
            Low-downtime migration //低停機率部署<br />
            Other //其他<br />
        </p>
        <p>點擊Add new按鈕</p>
        <p>選擇Web Service</p>
        <div>
            <img className="mt-12 mb-12" style={{width:"100%",aspectRatio:"1300 / 825",objectFit:"cover",borderRadius:"4px",}} 
            src="/images/RenderServerUpLoad/RenderServerUpLoad-3.png" alt="" />
        </div>
        <p>選擇上傳的暫存區</p>
        <div>
            <img className="mt-12 mb-12" style={{width:"100%",aspectRatio:"1300 / 825",objectFit:"cover",borderRadius:"4px",}} 
            src="/images/RenderServerUpLoad/RenderServerUpLoad-4.png" alt="" />
        </div>
        <p>填寫設定(重要)</p>
        <p>
            Name	專案名稱,自由取名<br />
            Region	Singapore<br />
            Branch	main或GitHub上儲存的分支<br />
            Build Command	npm install<br />
            Start Command	node index.js //開啟伺服器的指令<br />
            Root Directory	留空即可 <br />
            <div>
                <img className="mt-12 mb-12" style={{width:"100%",aspectRatio:"1300 / 825",objectFit:"cover",borderRadius:"4px",}} 
                src="/images/RenderServerUpLoad/RenderServerUpLoad-10.png" alt="" />
            </div>
            Environment Variables(設定環境變數)<br />
            //Render 沒辦法讀取 .env 檔案，你需要手動填進去或是讀取.env檔後手動修改<br />
            PORT:5000<br />
            DB_USER://PostgreSQL使用者帳號<br />
            DB_HOST://上傳資料庫後Render給的HOST<br />
            DB_DATABASE:andytest //建立的資料庫<br />
            DB_PASSWORD://密碼<br />
            DB_PORT	5432 //或在本機設定的 port<br />
        </p>
        
        <div>
            <img className="mt-12 mb-12" style={{width:"100%",aspectRatio:"1300 / 825",objectFit:"cover",borderRadius:"4px",}} 
            src="/images/RenderServerUpLoad/RenderServerUpLoad-11.png" alt="" />
        </div>
        <div>
            <img className="mt-12 mb-12" style={{width:"100%",aspectRatio:"1300 / 825",objectFit:"cover",borderRadius:"4px",}} 
            src="/images/RenderServerUpLoad/RenderServerUpLoad-12.png" alt="" />
        </div>
        <p>最後選擇點選「Deploy web service」</p>
        <p>點選首頁</p>
        <p>選擇Manual Deploy中的Clear build cache & deploy</p>
        <p>Render就會開始自動部署了</p>
        <h3 className='mb-12 mt-12'>小提醒</h3>
        <p>此時由於指定的GitHub內部是沒有.env檔案做資料庫的指定因此如果要設定的話要從首頁進入伺服器頁面進行設定如圖所示</p>
        <div>
            <img className="mt-12 mb-12" style={{width:"100%",aspectRatio:"1300 / 825",objectFit:"cover",borderRadius:"4px",}} 
            src="/images/RenderServerUpLoad/RenderServerUpLoad-13.png" alt="" />
        </div>
        <div>
            <img className="mt-12 mb-12" style={{width:"100%",aspectRatio:"1300 / 825",objectFit:"cover",borderRadius:"4px",}} 
            src="/images/RenderServerUpLoad/RenderServerUpLoad-14.png" alt="" />
        </div>
        <div>
            <img className="mt-12 mb-12" style={{width:"100%",aspectRatio:"1550 / 780",objectFit:"cover",borderRadius:"4px",}} 
            src="/images/RenderServerUpLoad/RenderServerUpLoad-15.png" alt="" />
        </div>
        <p>點擊Environment進入頁面尋找Environment區塊，根據情況點選Edit可以對Environment進行編輯，這個區塊的內容等同於本機端上的.env檔。</p>
        <p>如果資料庫也有上傳至Render的話，根據伺服器頁面所提供的資料進行填寫即可進行正確連接。</p>
        <hr />
        <p>
            當資料庫，伺服器上傳後基本上都是斷開連接的因此要進行設定<br />
            首先是伺服器與資料庫的連接<br />
            首先是render中伺服器端的Environment<br />
            要新建一個DATABASE_URL其內容為資料庫中Connections中的External Database URL(直接複製貼上)
            
        </p>
        <div>
            <img className="mt-12 mb-12" style={{width:"100%",objectFit:"cover",borderRadius:"4px",}} 
            src="/images/RenderServerUpLoad/RenderServerUpLoad-16.png" alt="" />
        </div>
        <p>其中DATABASE_URL需要貼上的資料來源請看下圖</p>
        <p>資料來源為上傳的資料庫設定頁面</p>
        <div>
            <img className="mt-12 mb-12" style={{width:"100%",objectFit:"cover",borderRadius:"4px",}} 
            src="/images/RenderServerUpLoad/RenderServerUpLoad-18.png" alt="" />
        </div>
        <p>
            接著需要對原檔案中的db.js內容進行修改
            內容如下:
        </p>
        <div>
            <img className="mt-12 mb-12" style={{width:"100%",objectFit:"cover",borderRadius:"4px",}} 
            src="/images/RenderServerUpLoad/RenderServerUpLoad-17.png" alt="" />
        </div>
        <p>設定完成後重新上傳github讓Render進行更新</p>
    </div>
  );
}
