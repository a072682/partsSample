
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import dedent from 'dedent';//去除多餘空白保持縮排格式
import './_本地端資料庫建立.scss';//引入指定樣式


export default function 本地端資料庫建立() {

    

  return (
    <div className="container">
        <div className="本地端資料庫建立">
            <h4>資料庫本地端建立設定</h4>
            <pre className="language-html m-0 p-16">
              <code className="language-html">
                {   dedent(`psql -U postgres //postgres是預設帳號`)   }       
              </code>
            </pre>
            <p>建立資料庫</p>
            <pre className="language-html m-0 p-16">
              <code className="language-html">
                {   dedent(`CREATE DATABASE xxx(資料庫名稱); 
                            //andyTest為資料庫名稱如果沒有用""包覆則都會轉為小寫儲存也就是存成了andytest
                            //執行過後會看到以下訊息
                            CREATE DATABASE`)   }       
              </code>
            </pre>
            <p>進入資料庫</p>
            <pre className="language-html m-0 p-16">
              <code className="language-html">
                {   dedent(`\\c xxx(資料庫名稱)`)   
                }       
              </code>
            </pre>
            <p>若能進入成功則資料庫建立完成</p>
            <h5 className='mb-12 mt-12'>與DBeaver連接</h5>
            <p>其順序為</p>
            <p>點選資料庫</p>
            <p>新建連接</p>
            <img    className='mb-12' 
                    style={{width:"100%",aspectRatio:"700 / 650",objectFit:"cover",borderRadius:"4px",}} 
                    src="/images/database/database-1.png" alt="" />
            <p>點選使用的資料庫語言(這邊選PostgreSQL)</p>
            <img    className='mb-12' 
                    style={{width:"100%",aspectRatio:"700 / 650",objectFit:"cover",borderRadius:"4px",}} 
                    src="/images/database/database-2.png" alt="" />
            <p>填寫連線設定</p>
            <img    className='mb-12' 
                    style={{width:"100%",aspectRatio:"700 / 650",objectFit:"cover",borderRadius:"4px",}} 
                    src="/images/database/database-3.png" alt="" />
            <h5>連線設定</h5>
            <pre className="language-html m-0 p-16">
                <code className="language-html">
                {   
                    dedent(`
                        Host:localhost(預設為localhost，通常不會動)
                        Database:創立的資料庫的名稱
                        Port:5432(預設為5432)
                        Username:創建資料庫的帳號，預設為postgres)
                        Password:帳號的密碼
                    `)   
                }       
                </code>
            </pre>
            <p>測試連線-如成功則點選Finish即可</p>
            <h5 className='mb-12 mt-12'>小提醒</h5>
            <p>
                如果無法進入資料庫則可以使用\l查詢資料庫總列表確認是不是資料庫名稱錯誤<br />
                查詢完後按q可以跳出搜尋模式<br />
                正常退出資料庫模式指令為\q<br />
                轉換資料庫的指令為:\c 目標資料庫名稱<br />
                如果需要將多餘的資料庫刪除可執行以下指令<br />
                DROP DATABASE 資料庫名稱;<br />
                如果需要將多餘的資料表刪除可執行以下指令<br />
                DROP TABLE 資料表名稱;<br />
                刪除時需要先進入對應的資料庫<br />
                假如資料庫為A資料表為B則需要先進入A在執行刪除指令<br />
                進入指令狀態以後要貼上不能按CTRL+V 要按右鍵<br />
                CTRL+V功能會變成中斷目前輸入<br />
            </p>
        </div>
    </div>
  );
}