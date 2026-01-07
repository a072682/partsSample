
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援

import dedent from 'dedent';//去除多餘空白保持縮排格式


export default function 文章系統資料庫端() {

  return (
    <div className="container">
        <div className="content-box">
            <h4>文章系統資料庫端</h4>
            <h5>建立文章系統資料表</h5>
            <p>文章資料表</p>
            <pre className="language-html m-0 p-16">
              <code className="language-html">
                {   dedent(
                        `
                        CREATE TABLE articles (
                            id BIGINT PRIMARY KEY,
                            title VARCHAR(255) NOT NULL,
                            content TEXT NOT NULL,
                            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                        );
                        `
                    )   
                }       
              </code>
            </pre>
            <p>文章圖片資料表</p>
            <pre className="language-html m-0 p-16">
              <code className="language-html">
                {   dedent(
                        `
                        CREATE TABLE images (
                            id SERIAL PRIMARY KEY,
                            article_id INTEGER NOT NULL,
                            image_url TEXT,
                            cloud_id VARCHAR(255) NOT NULL,
                            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

                            CONSTRAINT fk_images_article
                                FOREIGN KEY (article_id)
                                REFERENCES articles(id)
                                ON DELETE CASCADE
                        );
                        `
                    )   
                }       
              </code>
            </pre>
            <p className='fw-bold fs-20'>首先在DBeaver資料庫中新建文章資料表</p>
            <div>
                <img src="/images/常用系統範例/文章系統/資料庫端/文章系統資料表01.png" alt="" />
            </div>
            <p className='fw-bold fs-20'>命名資料表名稱</p>
            <div>
                <img src="/images/常用系統範例/文章系統/資料庫端/文章系統資料表02.png" alt="" />
            </div>
            <p className='fw-bold fs-20'>建立資料表欄位</p>
            <div>
                <img src="/images/常用系統範例/文章系統/資料庫端/文章系統資料表03.png" alt="" />
            </div>
            <div>
                <img src="/images/常用系統範例/文章系統/資料庫端/文章系統資料表04.png" alt="" />
            </div>
            <div>
                <img src="/images/常用系統範例/文章系統/資料庫端/文章系統資料表05.png" alt="" />
            </div>
            <div>
                <img src="/images/常用系統範例/文章系統/資料庫端/文章系統資料表06.png" alt="" />
            </div>
            <div>
                <img src="/images/常用系統範例/文章系統/資料庫端/文章系統資料表07.png" alt="" />
            </div>
            <p className='fw-bold fs-20'>新建文章圖片資料表</p>
            <p className='fw-bold fs-20'>命名資料表名稱</p>
            <div>
                <img src="/images/常用系統範例/文章系統/資料庫端/文章系統資料表08.png" alt="" />
            </div>
            <p className='fw-bold fs-20'>建立資料表欄位</p>
            <div>
                <img src="/images/常用系統範例/文章系統/資料庫端/文章系統資料表09.png" alt="" />
            </div>
            <div>
                <img src="/images/常用系統範例/文章系統/資料庫端/文章系統資料表10.png" alt="" />
            </div>
            <div>
                <img src="/images/常用系統範例/文章系統/資料庫端/文章系統資料表11.png" alt="" />
            </div>
            <div>
                <img src="/images/常用系統範例/文章系統/資料庫端/文章系統資料表12.png" alt="" />
            </div>
            <div>
                <img src="/images/常用系統範例/文章系統/資料庫端/文章系統資料表13.png" alt="" />
            </div>
            <p className='fw-bold fs-20'>外鍵設定</p>
            <p>設定article_id欄位對應到articles資料表的id欄位</p>
            <p>並設定CASCADE</p>
            <p>效果是當文章刪除時對應的圖片也會刪除</p>
            <div>
                <img src="/images/常用系統範例/文章系統/資料庫端/文章系統資料表14.png" alt="" />
            </div>
            <div>
                <img src="/images/常用系統範例/文章系統/資料庫端/文章系統資料表15.png" alt="" />
            </div>
            <div>
                <img src="/images/常用系統範例/文章系統/資料庫端/文章系統資料表16.png" alt="" />
            </div>
            <p className='fw-bold fs-20'>結果資料表</p>
            <div>
                <img src="/images/常用系統範例/文章系統/資料庫端/文章系統資料表結果.png" alt="" />
            </div>
        </div>
    </div>
  );
}