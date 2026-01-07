
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援

import dedent from 'dedent';//去除多餘空白保持縮排格式


export default function 資料表建立終端機版() {

  return (
    <div className="container">
        <h4>資料表建立設定</h4>
        <p>在分析資料表完成以後給予GPT以下提示詞</p>
        <p>在使用GPT給予的指令建立資料表即可</p>
        <pre className="language-html m-0 p-16">
              <code className="language-html">
                {   
                    dedent
                    (`
                        請根據以下 JSON schema，產生 PostgreSQL 的 CREATE TABLE SQL 語句。
                        規則：
                        1. 使用 BIGINT IDENTITY 作為主鍵
                        2. 外鍵請正確產生 REFERENCES 與 ON DELETE CASCADE（如有指定）
                        3. NOT NULL 與 UNIQUE 請依 constraints 產生
                        4. defaultValue 若為 now() 請直接使用
                        5. indexed = true 的欄位，請額外產生 CREATE INDEX 語句
                        6. 請只輸出 SQL，不要附加說明文字
                        JSON schema 如下：
                        <貼上 JSON>
                    `)   
                }       
              </code>
        </pre>
        <br />
        <h5>範例</h5>
        <div className='imgBox'>
            <img    className="imgSet" 
                    src="/images/基礎框架教學/基本資料庫建立/資料表建立方法/資料表建立終端機/資料表終端機01.png" 
                    alt="" />
        </div>
        <p>以這個資料表為範例</p>
        <p>經過分析後可以得到以下明細表</p>
        <div className='imgBox'>
            <img    className="imgSet" 
                    src="/images/基礎框架教學/基本資料庫建立/資料表建立方法/資料表建立終端機/資料表終端機02.png" 
                    alt="" />
        </div>
        <p>以及JSON內容</p>
        <pre className="language-html m-0 p-16">
              <code className="language-html">
                {   
                    dedent
                    (`
                        {
                          "meta": {
                            "db": "postgresql",
                            "version": "16",
                            "charset": "utf8"
                          },
                          "tableName": "images",
                          "columns": [
                            {
                              "name": "id",
                              "type": "BIGINT",
                              "isForeignKey": false,
                              "foreignKeyRef": null,
                              "onDeleteCascade": false,
                              "defaultValue": "",
                              "constraints": {
                                "notNull": true,
                                "unique": true
                              },
                              "indexed": true,
                              "description": "主鍵"
                            },
                            {
                              "name": "article_id",
                              "type": "BIGINT",
                              "isForeignKey": true,
                              "foreignKeyRef": "articles_id",
                              "onDeleteCascade": true,
                              "defaultValue": "",
                              "constraints": {
                                "notNull": true,
                                "unique": false
                              },
                              "indexed": true,
                              "description": "外鍵"
                            },
                            {
                              "name": "cloud_id",
                              "type": "TEXT",
                              "isForeignKey": false,
                              "foreignKeyRef": "",
                              "onDeleteCascade": false,
                              "defaultValue": "",
                              "constraints": {
                                "notNull": true,
                                "unique": false
                              },
                              "indexed": true,
                              "description": "圖片id"
                            },
                            {
                              "name": "image_url",
                              "type": "TEXT",
                              "isForeignKey": false,
                              "foreignKeyRef": null,
                              "onDeleteCascade": false,
                              "defaultValue": "",
                              "constraints": {
                                "notNull": false,
                                "unique": false
                              },
                              "indexed": false,
                              "description": "圖片網址"
                            },
                            {
                              "name": "created_at",
                              "type": "TIMESTAMPTZ",
                              "isForeignKey": false,
                              "foreignKeyRef": null,
                              "onDeleteCascade": false,
                              "defaultValue": "now()",
                              "constraints": {
                                "notNull": true,
                                "unique": false
                              },
                              "indexed": false,
                              "description": "創立時間"
                            }
                          ]
                        }
                    `)   
                }       
              </code>
        </pre>
        <p>給予GPT後可以得到建立資料表的指令</p>
        <pre className="language-html m-0 p-16">
              <code className="language-html">
                {   
                    dedent
                    (`
                        CREATE TABLE images (
                          id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY UNIQUE NOT NULL,
                          article_id BIGINT NOT NULL,
                          cloud_id TEXT NOT NULL,
                          image_url TEXT,
                          created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
                          CONSTRAINT fk_images_article
                            FOREIGN KEY (article_id)
                            REFERENCES articles(id)
                            ON DELETE CASCADE
                        );

                        CREATE INDEX idx_images_id ON images (id);
                        CREATE INDEX idx_images_article_id ON images (article_id);
                        CREATE INDEX idx_images_cloud_id ON images (cloud_id);
                    `)   
                }       
              </code>
        </pre>
    </div>
  );
}