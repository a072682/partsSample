


import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援

import dedent from 'dedent';//去除多餘空白保持縮排格式

export default function PreCodePage() {
  return (
    <div className="container">
        <div className="title-box">
            <h2>Pre/Code樣式引入 & 設定</h2>
        </div>
        <p>首先需要先安裝套件</p>
        <pre className="language-html m-0 p-16">
            <code className="language-html">
            {   dedent(`npm install prismjs //模擬程式軟體的背景樣式套件
                        npm install dedent //移除多行字串中多餘的空白，保持格式整齊`)   }       
            </code>
        </pre>
        <p>並且引入以下樣式</p>
        <pre className="language-html m-0 p-16">
            <code className="language-html">
            {   
                dedent
                (
                        `
                        import 'prismjs/themes/prism-tomorrow.css'; 
                        // 主題樣式，決定程式碼區塊的顏色風格（例如字體顏色、背景色、關鍵字顏色）。
                        import Prism from 'prismjs';                
                        // 核心程式這只是核心，不會自動支援所有語言，要額外引入語言模組
                        import 'prismjs/components/prism-jsx';      
                        // 讓 Prism.js 能正確解析 JSX
                        import 'prismjs/components/prism-markup';   
                        // 讓 Prism.js 能正確解析 HTML / XML / SVG 這類標記語言
                        import dedent from 'dedent';                
                        // 去除多餘空白保持縮排格式
                        `
                )   
            }       
            </code>
        </pre>
        <p>使用方式</p>
        <pre className="language-html m-0 p-16">
            <code className="language-html">
            {   
                dedent
                (
                        `
                        <pre className="language-html">//最外框
                            <code className="language-html">//用來顯示電腦程式碼或程式碼片段。
                            {   
                                dedent//移除內容多餘的空白
                                (
                                    \`輸入內容\`
                                )   
                            }       
                            </code>
                        </pre>
                        `
                )   
            }       
            </code>
        </pre>
    </div>
  );
}