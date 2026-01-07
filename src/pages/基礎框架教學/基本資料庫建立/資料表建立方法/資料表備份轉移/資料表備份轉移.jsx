
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援

import dedent from 'dedent';//去除多餘空白保持縮排格式


export default function 資料表備份轉移() {

  return (
    <div className="container">
        <div className="content-box">
            <h4>資料表備份轉移設定</h4>
            <p className='fw-bold fs-20'>從原本的資料庫中右鍵選取tools在選擇備份</p>
            <div>
                <img className="mt-12 mb-12"
                src="/images/基礎框架教學/基本資料庫建立/資料表建立方法/資料表備份轉移/資料表備份轉移01.png" alt="" />
            </div>
            <p>接著會出現此視窗</p>
            <div>
                <img className="mt-12 mb-12" style={{width:"100%",objectFit:"cover",borderRadius:"4px",}} 
                src="/images/基礎框架教學/基本資料庫建立/資料表建立方法/資料表備份轉移/資料表備份轉移02.png" alt="" />
            </div>
            <p>點擊public後再點擊next</p>
            <div>
                <img className="mt-12 mb-12" style={{width:"100%",objectFit:"cover",borderRadius:"4px",}} 
                src="/images/基礎框架教學/基本資料庫建立/資料表建立方法/資料表備份轉移/資料表備份轉移03.png" alt="" />
            </div>
            <p>接著進行輸出設定</p>
            <div>
                <img className="mt-12 mb-12" style={{width:"100%",aspectRatio:"1200 / 650",objectFit:"cover",borderRadius:"4px",}} 
                src="/images/基礎框架教學/基本資料庫建立/資料表建立方法/資料表備份轉移/資料表備份轉移04.png" alt="" />
            </div>
            <p>可參考以下輸出設定</p>
            <table>
                <tbody>
                    <tr>
                        <td><strong>Format</strong></td>
                        <td>Plain	會輸出一個純文字 .sql 檔案，裡面是標準 SQL 語法（CREATE TABLE / INSERT），最容易在 Render 匯入。</td>
                    </tr>
                    <tr>
                    <td><strong>Compression</strong></td>
                    <td>留空（或選 None）	不壓縮，Render 匯入時不需額外解壓。</td>
                    </tr>
                    <tr>
                    <td><strong>Encoding</strong></td>
                    <td>UTF-8	通用且安全的文字編碼。</td>
                    </tr>
                    <tr>
                    <td><strong>Use SQL INSERT instead of COPY for rows</strong></td>
                    <td>建議勾選	讓資料以 INSERT 方式寫入，比 COPY 更通用（尤其 Render 匯入時更穩）。</td>
                    </tr>
                    <tr>
                    <td><strong>Do not backup privileges (GRANT/REVOKE)</strong></td>
                    <td>建議勾選	不匯出使用者權限，避免 Render 無法執行。</td>
                    </tr>
                    <tr>
                    <td><strong>Discard objects owner</strong></td>
                    <td>建議勾選	匯出時不包含「擁有者資訊」，可避免不同帳號導致的權限錯誤。</td>
                    </tr>
                    <tr>
                    <td><strong>Add drop database statement</strong></td>
                    <td>建議不勾選	Render 無法允許 DROP DATABASE 指令。</td>
                    </tr>
                    <tr>
                    <td><strong>Add create database statement</strong></td>
                    <td>建議不勾選  同上，Render 無法建立新的 DB。</td>
                    </tr>
                    <tr>
                    <td><strong>Output folder</strong></td>
                    <td>選你電腦可存取的資料夾，例如：C:\Users\你的名字\Documents	匯出檔會存這裡。</td>
                    </tr>
                    <tr>
                    <td><strong>File name pattern</strong></td>
                    <td>comebuy_backup.sql（可自行命名）</td>
                    </tr>
                </tbody>
            </table>
            <div>
                <img className="mt-12 mb-12" style={{width:"100%",objectFit:"cover",borderRadius:"4px",}} 
                src="/images/基礎框架教學/基本資料庫建立/資料表建立方法/資料表備份轉移/資料表備份轉移05.png" alt="" />
            </div>
            <p>設定完成後按下start便會開始輸出</p>
            <p>完成以後不會自動關閉需要手動案cancel</p>
            <div>
                <img className="mt-12 mb-12" style={{width:"100%",objectFit:"cover",borderRadius:"4px",}} 
                src="/images/基礎框架教學/基本資料庫建立/資料表建立方法/資料表備份轉移/資料表備份轉移06.png" alt="" />
            </div>
            <p>接著在新建的資料庫中開啟SQL腳本</p>
            <div>
                <img className="mt-12 mb-12" style={{width:"100%",objectFit:"cover",borderRadius:"4px",}} 
                src="/images/基礎框架教學/基本資料庫建立/資料表建立方法/資料表備份轉移/資料表備份轉移07.png" alt="" />
            </div>
            <p>接著將輸出的資料庫檔案(黃色箭頭)</p>
            <p>直接拖拽進SQL腳本中(紅色箭頭)</p>
            <div>
                <img className="mt-12 mb-12" style={{width:"100%",objectFit:"cover",borderRadius:"4px",}} 
                src="/images/基礎框架教學/基本資料庫建立/資料表建立方法/資料表備份轉移/資料表備份轉移08.png" alt="" />
            </div>
            <p>接著點選"執行SQL腳本"</p>
            <div>
                <img className="mt-12 mb-12" style={{width:"100%",objectFit:"cover",borderRadius:"4px",}} 
                src="/images/基礎框架教學/基本資料庫建立/資料表建立方法/資料表備份轉移/資料表備份轉移09.png" alt="" />
            </div>
            <p>會出現以下警示</p>
            <p>意思是:「你要執行的 SQL 檔太大，如果每一條語句都把查詢結果顯示出來，會非常慢。是否要關閉顯示每條語句結果的功能來加快執行速度？」</p>
            <p>點選"YES"</p>
            <p>如果勾選「Don’t show again for this editor...」表示之後執行大型 SQL 檔時不再詢問</p>
            <div>
                <img className="mt-12 mb-12" style={{width:"100%",objectFit:"cover",borderRadius:"4px",}} 
                src="/images/基礎框架教學/基本資料庫建立/資料表建立方法/資料表備份轉移/資料表備份轉移10.png" alt="" />
            </div>
            <p>如果出現以下錯誤</p>
            <p>意思是Render 的資料庫本來就有預設的 public schema，所以再建一次就報錯。</p>
            <p>解法：在 DBeaver 的錯誤對話框，按 Skip all，讓腳本略過 CREATE SCHEMA public，後續的 CREATE TABLE / INSERT / ALTER 仍會照常執行。</p>
            <div>
                <img className="mt-12 mb-12" style={{width:"100%",objectFit:"cover",borderRadius:"4px",}} 
                src="/images/基礎框架教學/基本資料庫建立/資料表建立方法/資料表備份轉移/資料表備份轉移11.png" alt="" />
            </div>
            <div>
                <img className="mt-12 mb-12" style={{width:"100%",objectFit:"cover",borderRadius:"4px",}} 
                src="/images/基礎框架教學/基本資料庫建立/資料表建立方法/資料表備份轉移/資料表備份轉移12.png" alt="" />
            </div>
            <p>執行完成以後</p>
            <p>可在執行以下內容確保資料庫資料與使用者資料再次進行綁定確認</p>
            <p>執行內容如下:</p>
            <p><strong>CREATE SCHEMA IF NOT EXISTS public AUTHORIZATION "comebuy_admin";</strong></p>
            <p><strong>GRANT USAGE, CREATE ON SCHEMA public TO "comebuy_admin";</strong></p>
            <p><strong>GRANT ALL ON SCHEMA public TO "comebuy_admin";</strong></p>
            <p><strong>SET search_path = public;</strong></p>
            <p><strong>ALTER ROLE "comebuy_admin" IN DATABASE comebuydatabase SET search_path = public;</strong></p>
            <p><strong>CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;</strong></p>
            <hr />
            <p><strong>指令說明</strong></p>
            <br />
            <p><strong>CREATE SCHEMA IF NOT EXISTS public AUTHORIZATION "comebuy_admin";</strong></p>
            <p>解釋說明:</p>
            <p>資料庫裡建立一個名稱為 public 的綱要群</p>
            <p>IF NOT EXISTS：如果已經有 public 了，就不會報錯，也不會變更現有設定。</p>
            <p>AUTHORIZATION "comebuy_admin"：把這個 綱要群 的擁有者（owner）指定為 "comebuy_admin"。</p>
            <br />
            <p><strong>GRANT USAGE, CREATE ON SCHEMA public TO "comebuy_admin";</strong></p>
            <p><strong>GRANT ALL ON SCHEMA public TO "comebuy_admin";</strong></p>
            <p>解釋說明:</p>
            <p>給 "comebuy_admin" 兩種 schema 層級權限</p>
            <p>USAGE：允許進入綱要群的資格</p>
            <p>CREATE：允許在這個 綱要群 建立物件（建表、建 function 等）。</p>
            <p>把 public schema 的所有 schema 權限都授權給 comebuy_admin</p>
            <br />
            <p><strong>SET search_path = public;</strong></p>
            <p>解釋說明:</p>
            <p>預設搜尋public 這個綱要群</p>
            <br />
            <p><strong>ALTER ROLE "comebuy_admin" IN DATABASE comebuydatabase SET search_path = public;</strong></p>
            <p>解釋說明:</p>
            <p>格式:ALTER ROLE "角色名稱" IN DATABASE 資料庫名稱 SET 參數名稱 = 值;</p>
            <p>永久設定：當這個使用者(comebuy_admin)登入該資料庫時，自動套用這個設定。</p>
            <br />
            <p><strong>CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;</strong></p>
            <p>在public這個綱要群安裝一個名為citext的擴充套件(extension)</p>
            <p>如果已安裝就跳過、不報錯</p>
            <div>
                <img className="mt-12 mb-12" style={{width:"100%",objectFit:"cover",borderRadius:"4px",}} 
                src="/images/基礎框架教學/基本資料庫建立/資料表建立方法/資料表備份轉移/資料表備份轉移13.png" alt="" />
            </div>
            <br />
            <p>
                當資料庫上傳伺服器後基本上都是斷開連接的<br />
                因此要對伺服器端進行設定<br />
                設定內容請看伺服器端介紹
                首先是伺服器與資料庫的連接
            </p>
        </div>
    </div>
  );
}