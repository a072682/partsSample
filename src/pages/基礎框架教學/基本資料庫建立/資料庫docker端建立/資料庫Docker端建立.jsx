
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import dedent from 'dedent';//去除多餘空白保持縮排格式
import './_docker端資料庫建立.scss';//引入指定樣式


export default function 資料庫Docker端建立() {

  return (
    <div className="container">
        <div className="docker端資料庫建立">
            <h4>docker端資料庫建立設定</h4>
            <p>先建立專案伺服器資料夾</p>
            <p>進入資料夾後開啟終端機</p>
            <h5>下載 postgres 映像檔</h5>
            <pre className="language-html m-0 p-16">
                <code className="language-html">
                {   
                    dedent(`
                        docker pull postgres:16
                    `)   
                }       
                </code>
            </pre>
            <p>映像檔名稱為postgres,16為版本</p>
            <p>此映像檔為官方提供</p>
            <p>postgres為官方名稱並非自己取名</p>
            <p>下載映像檔的目的是讓docker可以運行資料庫的環境與個人檔案無關</p>
            <h5>建立PostgreSQL資料庫容器</h5>
            <pre className="language-html m-0 p-16">
                <code className="language-html">
                {   
                    dedent(`
                        docker run --name databaseconteiner -e POSTGRES_DB=databasename -e POSTGRES_USER=username -e POSTGRES_PASSWORD=xxx -p 5433:5432 -d postgres:16
                    `)   
                }       
                </code>
            </pre>
            <p>指令說明</p>
            <p>--name databaseconteiner</p>
            <p>容器的名字</p>
            <p>-e POSTGRES_DB=databasename</p>
            <p>啟動時自動建立一個資料庫，名字就是 databasename</p>
            <p>-e POSTGRES_USER=username</p>
            <p>PostgreSQL 的登入帳號</p>
            <p>-e POSTGRES_PASSWORD=xxx</p>
            <p>這個帳號的密碼</p>
            <p>-p 5433:5432</p>
            <p>把你本機的 5433 port 映射到容器裡的 5432 port</p>
            <p>-d postgres:16</p>
            <p>使用 postgres:16 映像檔</p>
            <p>建立完成以後使用指令確認是否運行</p>
            <pre className="language-html m-0 p-16">
                <code className="language-html">
                {   
                    dedent(`
                        docker ps
                    `)   
                }       
                </code>
            </pre>
            <h5 className='mb-12 mt-12'>桌面板Docker確認</h5>
            <p>從images中可以確認映像檔的內容</p>
            <p>由於官方指定映像檔名稱為postgres</p>
            <p>所以可以看到postgres名稱的印象檔</p>
            <img    className='mb-12' 
                    style={{width:"100%",objectFit:"cover",borderRadius:"4px",}} 
                    src="/images/基礎框架教學/基本資料庫建立/資料庫Docker端建立/dockerServer01.png" alt="" />
            <p>從Containers中可以確認容器的名稱</p>
            <img    className='mb-12' 
                    style={{width:"100%",objectFit:"cover",borderRadius:"4px",}} 
                    src="/images/基礎框架教學/基本資料庫建立/資料庫Docker端建立/dockerServer02.png" alt="" />
        </div>
    </div>
  );
}