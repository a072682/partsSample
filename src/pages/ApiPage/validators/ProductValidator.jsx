
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援

import dedent from 'dedent';//去除多餘空白保持縮排格式

export default function ProductValidator() {
  return (
    <div className="container">
      <h3>產品資料判定方式(joi)</h3>
      <pre className="language-html m-0 p-16">
            <code className="language-html">
            {   
                dedent(
                        `
                            //設定資料的判定方式
                        const Joi = require('joi');
                            //joi的判定規則

                            //產品資料的判定方式
                        const productSchema = Joi.object({
                            //Joi是驗證 JSON 格式的物件是否符合指定規則
                            //Joi.object是建立一個「物件型別」的驗證規則代表希望驗證的是一個 JSON 物件（也就是 req.body 傳來的資料
                            //name必須是字串型別string()以及最少1 個字元min(1)且為必填required()若有錯誤則輸出設定的資料messages({})
                        name: Joi.string().min(1).required().messages({
                            'any.required': '產品名稱為必填', // 沒有這個欄位時顯示
                            'string.empty': '產品名稱不能為空', // 是空字串 "" 時顯示
                        }),
                            //price必須是數字型別number()以及為正數positive()且為必填required()若有錯誤則輸出設定的資料messages({})
                        price: Joi.number().positive().required().messages({
                            'any.required': '價格為必填',
                            'number.base': '價格必須是數字', // 傳入非數字（如 "abc"）時
                            'number.positive': '價格必須大於 0',
                        }),
                            //description必須是字串型別string()可以接受''或null且非必填欄位
                        description: Joi.string().allow('', null), // 可為空
                            //image_url必須是字串型別string()可以接受''或null且非必填欄位
                        image_url: Joi.string().uri().allow('', null), // 可為空、允許 URL 格式
                        });
                            //當傳送資料錯誤（例如價格是文字）
                            // {
                            //   "error": "資料格式錯誤",
                            //   "messages": [
                            //     "價格必須是數字",
                            //     "價格為必填"
                            //   ]
                            // }
                        module.exports = {
                        productSchema,
                        };

                            // 這些是 Joi 內建的格式（錯誤代號）
                            // 下面是一些常見類型與其對應的內建錯誤代號：

                            // 🔤 字串類型 Joi.string()
                            // 錯誤代號	意義說明
                            // string.base	值不是字串型別
                            // string.empty	是空字串 ''
                            // string.min	字串太短
                            // string.max	字串太長
                            // string.pattern.base	沒有符合正規表達式的格式
                            // any.required	欄位是必要但未提供

                            // 🔢 數字類型 Joi.number()
                            // 錯誤代號	意義說明
                            // number.base	值不是數字型別
                            // number.min	數字小於允許的最小值
                            // number.max	數字大於允許的最大值
                            // number.positive	數字不是正數（> 0）
                            // number.integer	數字不是整數

                            // ✅ 一般通用類型 Joi.any()
                            // 錯誤代號	意義說明
                            // any.required	欄位是必填但沒提供
                            // any.only	值不在允許的 enum 列表中
                            // any.invalid	值是明確被禁止的
                        `
                )   
            }       
            </code>
        </pre>
    </div>
  );
}
