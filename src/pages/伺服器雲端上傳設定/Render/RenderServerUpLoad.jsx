import './_RenderServer.scss';//引入指定樣式

export default function RenderServerUpLoad() {
  return (
    <div className='RenderServer'>
        <div className="container">
            <h4>Render伺服器端上傳 & 設定</h4>
            <div>Render網址<a href="https://render.com">https://render.com</a></div>
            <p className='fw-bold fs-20'>將伺服器端上傳至Github</p>
            <div>
                <img className='imgSet' src="/images/伺服器雲端上傳教學/render/renderServer01.png" alt="" />
            </div>
            <p className='fw-bold fs-20'>使用Github登入至Render</p>
            <p>點擊右上的按鈕</p>
            <div>
                <img className="imgSet" src="/images/RenderServerUpLoad/RenderServerUpLoad-1.png" alt="" />
            </div>
            <p className='fw-bold fs-20'>點選Github登入</p>
            <div>
                <img className="imgSet"
                src="/images/RenderServerUpLoad/RenderServerUpLoad-2.png" alt="" />
            </div>
            <p className='fw-bold fs-20'>首次使用 Render 時，它會先讓你「建立工作區（workspace）」</p>
            <p>其內容:</p>
            <div className='contentBox'>
                <div className='textGroup'>
                    <p className='fw-bold'>Workspaces are shared areas where teams deploy and operate their code</p>
                    <p>「工作區」是團隊用來部署和管理程式碼的共享空間。</p>
                </div>
                <div className='textGroup'>
                    <p className='fw-bold'>What would you like to call your workspace?</p>
                    <p>你想把這個工作區命名為什麼？</p>
                    <p className='fw-bold'>My workspace</p>
                    <p>預設為 My workspace</p>
                </div>
                <div className='textGroup'>
                    <p className='fw-bold'>What will you use this workspace for?</p>
                    <p>你打算用這個工作區來做什麼？</p>
                    <p className='fw-bold'>Work/Personal projects/Other</p>
                    <p>公司/個人專案/其他</p>
                </div>
                <div className='textGroup'>
                    <p className='fw-bold'>How many developers (including yourself) will be working together?</p>
                    <p>包含你在內，會有幾位開發者一起使用這個工作區？</p>
                    <p className='fw-bold'>Just me/2-10/11-50/51-150/More than 150</p>
                    <p>單人/2到10人/11到50人/51到150人/超過150人</p>
                </div>
                <div className='textGroup'>
                    <p className='fw-bold'>We'll use this to tailor your onboarding experience</p>
                    <p>我們會根據這些資訊，為你客製 onboarding 體驗</p>
                    <p className='fw-bold'>What are you looking to build with Render?</p>
                    <p>你希望在 Render 上建什麼類型的應用？</p>
                    <p className='fw-bold'>Website / landing page</p>
                    <p>網站或首頁頁面</p>
                    <p className='fw-bold'>AI-native app</p>
                    <p>原生 AI 應用</p>
                    <p className='fw-bold'>E-commerce</p>
                    <p>電商網站</p>
                    <p className='fw-bold'>Internal tool</p>
                    <p>內部工具</p>
                    <p className='fw-bold'>Prototype / MVP</p>
                    <p>原型 / 最小可行產品</p>
                    <p className='fw-bold'>Side project</p>
                    <p>側邊專案 / 練習專案</p>
                    <p className='fw-bold'>Backend</p>
                    <p>後端伺服器（API）</p>
                    <p className='fw-bold'>Background job</p>
                    <p>背景工作（排程任務等</p>
                </div>
                <div className='textGroup'>
                    <p className='fw-bold'>What capabilities matter most for your project on Render?</p>
                    <p>對你來說哪些功能最重要？</p>
                    <p className='fw-bold'>AI/ML</p>
                    <p>人工智慧／機器學習</p>
                    <p className='fw-bold'>Observability</p>
                    <p>可觀察性（監控、記錄</p>
                    <p className='fw-bold'>Scalability</p>
                    <p>可擴展性（自動應對高流量</p>
                    <p className='fw-bold'>Compliance</p>
                    <p>法規遵循（如 GDPR）</p>
                    <p className='fw-bold'>Security </p>
                    <p>資安保護</p>
                    <p className='fw-bold'>Developer velocity</p>
                    <p>開發效率</p>
                    <p className='fw-bold'>Low-downtime migration</p>
                    <p>低停機率部署</p>
                    <p className='fw-bold'>Other </p>
                    <p>其他</p>
                </div>
            </div>
            <br />
            <p className='fw-bold fs-20'>建立專案</p>
            <p>點擊Add new按鈕</p>
            <p>選擇Web Service</p>
            <div>
                <img className="imgSet" 
                src="/images/伺服器雲端上傳教學/render/renderServer02.png" alt="" />
            </div>
            <p className='fw-bold fs-20'>選擇上傳的暫存區</p>
            <div>
                <img className="imgSet" 
                src="/images/伺服器雲端上傳教學/render/renderServer03.png" alt="" />
            </div>
            <p className='fw-bold fs-20'>填寫設定(重要)</p>
            <div>
                <p className='fw-bold'>Name<span className='fw-normal'>/專案名稱,自由取名</span></p>
                <p className='fw-bold'>Region<span className='fw-normal'>/Singapore</span></p>
                <p className='fw-bold'>Branch<span className='fw-normal'>/main或GitHub上儲存的分支</span></p>
                <p className='fw-bold'>Build Command<span className='fw-normal'>/npm install</span></p>
                <p className='fw-bold'>Start Command<span className='fw-normal'>/node index.js - 開啟伺服器的指令</span></p>
                <p className='fw-bold'>Root Directory<span className='fw-normal'>/留空即可</span></p>
            </div>
            <div>
                <img className="imgSet" 
                src="/images/伺服器雲端上傳教學/render/renderServer04.png" alt="" />
            </div>
            <br />
            <div>
                <img className="imgSet" 
                src="/images/伺服器雲端上傳教學/render/renderServer05.png" alt="" />
            </div>
            <br />
            <div>
                <img className="imgSet" 
                src="/images/伺服器雲端上傳教學/render/renderServer06.png" alt="" />
            </div>
            <br />
            <div>
                <img className="imgSet" 
                src="/images/伺服器雲端上傳教學/render/renderServer07.png" alt="" />
            </div>
            <p>最後選擇點選「Deploy web service」</p>
            <br />
            <div>
                <p className='fw-bold fs-20'>Environment Variables(設定環境變數)</p>
                <p>Render 沒辦法讀取 .env 檔案，你需要手動填進去或是讀取.env檔後手動修改</p>
                <p className='fw-bold fs-20'>DB_USER: /PostgreSQL使用者帳號</p>
                <p className='fw-bold fs-20'>DB_HOST: /上傳資料庫後Render給的HOST</p>
                <p className='fw-bold fs-20'>DB_DATABASE:andytest /建立的資料庫</p>
                <p className='fw-bold fs-20'>DB_PASSWORD: /密碼</p>
                <p className='fw-bold fs-20'>DB_PORT:5432 /或在本機設定的 port</p>
            </div>
            <br />
            <div>
                <img className="imgSet" 
                src="/images/伺服器雲端上傳教學/render/renderServer08.png" alt="" />
            </div>
            <br />
            <div>
                <img className="imgSet" 
                src="/images/伺服器雲端上傳教學/render/renderServer09.png" alt="" />
            </div>
            <br />
            <div>
                <img className="imgSet" 
                src="/images/伺服器雲端上傳教學/render/renderServer10.png" alt="" />
            </div>
            <br />
            <div>
                <img className="imgSet" 
                src="/images/伺服器雲端上傳教學/render/renderServer11.png" alt="" />
            </div>
            <br />
            <div>
                <img className="imgSet" 
                src="/images/伺服器雲端上傳教學/render/renderServer12.png" alt="" />
            </div>
            <br />
            <div>
                <img className="imgSet" 
                src="/images/伺服器雲端上傳教學/render/renderServer13.png" alt="" />
            </div>
            <br />
            <div>
                <img className="imgSet" 
                src="/images/伺服器雲端上傳教學/render/renderServer14.png" alt="" />
            </div>
            <p>選擇Manual Deploy中的Clear build cache & deploy</p>
            <p>Render就會開始自動部署了</p>
            <br />
            <div>
                <img className="imgSet" 
                src="/images/伺服器雲端上傳教學/render/renderServer15.png" alt="" />
            </div>
            <p>伺服器正確開啟</p>
            <br />
            <div>
                <img className="imgSet" 
                src="/images/伺服器雲端上傳教學/render/renderServer16.png" alt="" />
            </div>
            <p className='fw-bold fs-20'>https://nevernesstoevernessserver-jeah.onrender.com</p>
            <p>此為上傳後的伺服器網址</p>
            <hr />
            <p>接著需要對原檔案中的db.js內容進行修改,內容如下:</p>
            <div>
                <img className="imgSet"
                src="/images/RenderServerUpLoad/RenderServerUpLoad-17.png" alt="" />
            </div>
            <p>如果使用一行式的資料庫網址會使用"connectionString"</p>
            <p>如果連接的資料庫已上傳雲端則使用ssl進行連接</p>
            <p>設定完成後重新上傳github讓Render進行更新</p>
        </div>
    </div>
    
  );
}
