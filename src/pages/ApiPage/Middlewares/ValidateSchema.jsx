
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援

import dedent from 'dedent';//去除多餘空白保持縮排格式

export default function ValidateSchema() {
  return (
    <div className="container">
      <h3>輸入並驗證規則</h3>
      <pre className="language-html m-0 p-16">
            <code className="language-html">
            {   
                dedent(
                        `
                        //此函式作用為輸入指定規則(schema)並驗證其規則(schema)

                        module.exports = (schema) => {
                                //module.exports = 將這個函式匯出，讓別的地方可以 require() 使用它
                                //為何不取固定名稱是因為慣用寫法可以隨著外部呼叫而取名
                                //const aa = require('../middlewares/validateSchema'); 這樣叫做aa
                                //const bb = require('../middlewares/validateSchema'); 這樣叫做bb
                                //根據外部呼叫決定名稱
                                //(schema) => {} 接收一個 schema參數，回傳一個 middleware 函式。可以是任何名稱
                            return (req, res, next) => {
                                    //middleware 的標準格式，接收三個參數
                                    // req：請求物件
                                    // res：回應物件
                                    // next：讓請求「繼續往下個 middleware 或 controller 執行」的函數
                                const { error } = schema.validate(req.body, { abortEarly: false });
                                    //const { error } 只取出 error 屬性（如果驗證成功，error 是 undefined；如果失敗，error 是一個詳細物件）
                                    //schema.validate(...) 這是 Joi 的主要函式，用來驗證 req.body 是否符合 schema 規則。
                                    //.validate是Joi 提供的方法 格式為.validate(要驗證的資料, 選項)
                                    //選項是指預設的回傳第一個錯誤或回傳所有錯誤如下說明
                                    //所以是要驗證req.body(輸入的資料)，
                                    //{ abortEarly: false } 設定 Joi 不要只抓第一個錯誤，而是抓所有錯誤。
                                    //Joi 的選項之一
                                    //abortEarly: true（預設）：只回傳第一個錯誤，就終止驗證
                                    //abortEarly: false：即使有多個錯誤，也會全部驗證完，並回傳所有錯誤
                                if (error) {
                                    const errors = error.details.map((detail) => detail.message);
                                    return res.status(400).json({ errors });
                                }

                                next(); // 若驗證通過，繼續下一個 middleware 或 controller
                            };
                        };
                        `
                )   
            }       
            </code>
        </pre>
    </div>
  );
}
