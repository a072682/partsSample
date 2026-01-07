import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import dedent from 'dedent';//去除多餘空白保持縮排格式
import './_NextBasic.scss';



export default function NextBasic() {
  return (
    <div className="container">
        <div className='row'>
            <div className='col'>
                <h3>基礎Next架構和創建流程</h3>
                <br />
                <p>首先是安裝套件</p>
                <p className='fw-bold'>npx create-next-app@latest</p>
                <div className='imgBox my-24'>
                    <img className='imgSet2' src="/images/基礎框架教學/NextBasic/NextBasic01.png" alt="" />    
                </div>
                <p>選擇套件選項</p>
                <div className='imgBox my-24'>
                    <img className='imgSet2' src="/images/基礎框架教學/NextBasic/NextBasic02.png" alt="" />    
                </div>
                <p className='fw-bold fs-20'>
                    Need to install the following packages:
                    create-next-app@16.0.7
                    Ok to proceed? (y)
                </p>
                <p className='fw-bold fs-16'>是否允許下載create-next-app這個套件(選y)</p>
                <br />
                <p className='fw-bold fs-20'>
                    Would you like to use the recommended Next.js defaults?	
                </p>
                <p className='fw-bold fs-16'>「是否要使用官方預設的 Next.js 設定？」(選no)</p>
                <p className='fw-bold fs-16'>（包含 TypeScript、ESLint、Tailwind、App Router、Turbopack）</p>
                <br />
                <p className='fw-bold fs-20'>Would you like to use TypeScript?</p>
                <p className='fw-bold fs-16'>要不要用 TypeScript。選 No</p>
                <br />
                <p className='fw-bold fs-20'>Which linter would you like to use?</p>
                <p className='fw-bold fs-16'>程式碼規範檢查工具。選 ESLint 就好</p>
                <br />
                <p className='fw-bold fs-20'>Would you like to use React Compiler?</p>
                <p className='fw-bold fs-16'>新的實驗優化編譯器（自動記憶化等）穩定優先選 No。</p>
                <br />
                <p className='fw-bold fs-20'>Tailwind CSS?</p>
                <p className='fw-bold fs-16'>是否要使用Tailwind? 選 No。</p>
                <br />
                <p className='fw-bold fs-20'>Use src/ directory?</p>
                <p className='fw-bold fs-16'>要不要建立src根目錄？選 Yes。</p>
                <br />
                <p className='fw-bold fs-20'>Use App Router?</p>
                <p className='fw-bold fs-16'>要不要使用新版 Next.js 的「App Router」系統？選 Yes。</p>
                <br />
                <p className='fw-bold fs-20'>Import alias? </p>
                <p className='fw-bold fs-16'>是否要保持預設Import（保持預設 @/*）?選 Yes。</p>
                <br />
                <p className='fw-bold fs-20'>What import alias would you like configured?</p>
                <p className='fw-bold fs-16'>希望 Next.js 幫你設定什麼路徑別名?(直接預設按Enter)</p>
                <br />
                <p className='fw-bold fs-20'>創建完成後的初始架構</p>
                <div className='imgBox my-24'>
                    <img className='imgSet2' src="/images/基礎框架教學/NextBasic/NextBasic03.png" alt="" />    
                </div>
                <br />
                <p className='fw-bold fs-16'>layout.js(可改為jsx)負責全站框架（取代 App.jsx/main.jsx/index.html/FrontLayout.jsx）</p>
                <p>初始內容</p>
                <div className='imgBox my-24'>
                    <img className='imgSet2' src="/images/基礎框架教學/NextBasic/NextBasic04.png" alt="" />    
                </div>
                <p>清除後的內容</p>
                <div className='imgBox my-24'>
                    <img className='imgSet2' src="/images/基礎框架教學/NextBasic/NextBasic05.png" alt="" />    
                </div>
                <p className='fw-bold fs-16'>page.jsx為整個路由的首頁</p>
                <p>初始內容</p>
                <div className='imgBox my-24'>
                    <img className='imgSet2' src="/images/基礎框架教學/NextBasic/NextBasic06.png" alt="" />    
                </div>
                <p>清除後的內容</p>
                <div className='imgBox my-24'>
                    <img className='imgSet2' src="/images/基礎框架教學/NextBasic/NextBasic07.png" alt="" />    
                </div>
                <p className='fw-bold fs-16'>globals.scss作用為全域式樣式內容可留可不留</p>
                <br />
                <p>將多餘的結構刪除後的架構</p>
                <div className='imgBox my-24'>
                    <img className='imgSet2' src="/images/基礎框架教學/NextBasic/NextBasic08.png" alt="" />    
                </div>
                <br />
                <p className='fw-bold fs-20'>以下為客製化環境架設</p>
                <br />
                <p >安裝scss</p>
                <p>安裝bs5套件</p>
                <p>安裝react-bootstrap套件</p>
                <p>引入GOOGLE ICON</p>
                <p></p>

                <pre className="language-html m-0 p-16">
                    <code className="language-html">
                        {   dedent(`專案資料夾/
                                        ├── .next //套件存儲位置，系統自動新增，此位置不會使用
                                        ├── node_modules //套件存儲位置，系統自動新增，此位置不會使用
                                        ├── public/
                                        │       └── images/
                                       
                                        ├── src/
                                        │    ├── app/
                                        │    ├── apiData/
                                        components
                                        dataBase
                                        scssData
                                        singlePages
                                        store
                                        ├── .env
                                        ├── .gitignore
                                        eslint.config.mjs
                                        jsconfig.json
                                        next.config.mjs
                                        package-lock.json
                                        └── package.json
                                        README.md
                                        `)   
                        }       
                    </code>
                </pre>
            </div>
        </div>
    </div>
  );
}





