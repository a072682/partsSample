


import { Accordion } from 'react-bootstrap';
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援

import dedent from 'dedent';//去除多餘空白保持縮排格式


export default function DonutChartText() {

    //#region
    //#endregion

    return (
        <>
            <h4>圓環圖說明</h4>
            <Accordion defaultActiveKey="" className="defaultReactAccordionContent mt-24 mb-24">
            {/* 不打開任何一個	<Accordion defaultActiveKey=""> */}
                <Accordion.Item eventKey="0" className="defaultReactAccordionItem">
                    <Accordion.Header className="defaultReactAccordionHeader">
                        程式碼說明
                    </Accordion.Header>
                    <Accordion.Body className="defaultReactAccordionBody p-0">
                        
                        <pre className="language-html m-0 p-16">
                            <div>HTML</div>
                            <code className="language-html">
                                {
                                    dedent(
                                        `
                                        import { Doughnut} from "react-chartjs-2";//宣告元件
                                        
                                        
                                        // 設定檔放置於return上方
                                        // 圓環圖設定
                                        const data01 = {
                                            labels: ["一般會員", "VIP會員", "供應商"],
                                            //每個資料的名稱（文字標籤）
                                            datasets: [
                                                {
                                                    data: [60, 15, 25],
                                                    //引入的資料的數值
                                                    backgroundColor: ["#3c0080ff", "#1900ffff", "#c0f0ffff"],
                                                    //圓環/小色塊的顏色
                                                    borderColor: ["#000000ff", "#ffee00ff", "#ff0048ff"],    
                                                    //圓環/小色塊外框顏色
                                                    borderWidth: 5,                                     
                                                    //圓環/小色塊外框寬度（數字=px）

                                                    // （hover 狀態）
                                                    hoverBackgroundColor: ["#ffd900ff", "#2600ffff", "#ff003cff"], 
                                                    // 圓環的顏色（hover 狀態）
                                                    hoverBorderColor: ["#ff003cff", "#00a2ffff", "#33ff00ff"],     
                                                    // 圓環外框顏色（hover 狀態）
                                                    hoverOffset: 20,        
                                                    // 滑過時扇形外推距離（像是浮出來的感覺，單位=px）

                                                    // 圓環的「中空比例」
                                                    cutout: "55%",         
                                                    // 0=圓餅，越大中空越大。字串百分比或數字(px)皆可

                                                    // 扇形之間的間距（僅部分情境支援，Chart.js 4+ 有效）
                                                    spacing: 0,            
                                                    // 扇形彼此保留的縫隙（px）
                                                },
                                            ],
                                        };
                                        //labels的數量跟data的數量為相等的這樣才能互相對應包含後面的backgroundColor的是對應labels的數量
                                        
                                        // ====== 外觀/互動 options ======
                                        const options01 = {
                                            // 響應式設定
                                            responsive: true,          
                                            // 跟著容器大小自適應
                                            maintainAspectRatio: true,
                                            // 取消固定比例（常用在高度要撐滿卡片時）

                                            // 版面留白
                                            layout: {
                                                padding: 0,              
                                                //整個版面的padding（px）
                                            },

                                            // 動畫
                                            animation: {
                                                duration: 600,           
                                                // 初次與更新動畫時間（ms）
                                                easing: "easeOutQuart",  
                                                // 動畫曲線
                                            },

                                            // 圖表插件（圖例、提示、標題...）
                                            plugins: {
                                                // 圖例（右側的小色塊 + 文字
                                                legend: {
                                                    display: true,         
                                                    // 是否顯示圖例
                                                    position: "right",
                                                    //顯示位置(主要)
                                                    // 'top' | 'bottom' | 'left' | 'right'
                                                    align: "center",   
                                                    //顯示位置(次要)
                                                    // 在 top/bottom 時可用 'start' | 'center' | 'end'
                                                    labels: {
                                                        boxWidth: 15,      
                                                        //小色塊寬度  
                                                        boxHeight: 15,       
                                                        //小色塊高度
                                                        padding: 10,      
                                                        // 單個圖例項目的內距(不算外框)
                                                        usePointStyle: false,
                                                        // true 會用圓點/方塊圖示
                                                        // color: "#333",     
                                                        // // 圖例文字顏色（不寫就跟隨 CSS）
                                                        // font: { size: 12, weight: "500" }, 
                                                        // // 圖例文字字型
                                                    },
                                                },
                                                // 提示（滑過扇形的浮層）
                                                tooltip: {
                                                    enabled: true,         
                                                    // 滑鼠在圓環時是否啟用提示
                                                    intersect: true,       
                                                    // 游標需進入元素才觸發
                                                    callbacks: {
                                                    // 自訂每一列的文字內容（例如顯示「數值 + 百分比」）
                                                        label: (ctx) => {
                                                            const dataset = ctx.dataset;                     
                                                            // 目前這組 dataset
                                                            const total = dataset.data.reduce((a, b) => a + b, 0); 
                                                            // 全部加總
                                                            const value = ctx.raw;                           
                                                            // 目前這一塊的值
                                                            const pct = ((value / total) * 100).toFixed(1);  
                                                            // 百分比(到小數1位)
                                                            return \`\${ctx.label}: \${value} 人（\${pct}%）\`;   
                                                            // 顯示的字串
                                                        },
                                                    },
                                                    // backgroundColor: "rgba(0,0,0,0.8)",               
                                                    // // 提示框背景色
                                                    // titleColor: "#fff", bodyColor: "#fff",            
                                                    // // 提示文字顏色
                                                    // padding: 10,                                       
                                                    // // 提示框內距
                                                },
                                                // 標題（可選）
                                                title: {
                                                    display: true,          
                                                    // 顯示標題
                                                    text: "會員統計",       
                                                    // 標題文字
                                                    padding: { top: 4, bottom: 20 }, 
                                                    // 與圖表的距離
                                                    // color: "#222",
                                                    // font: { size: 16, weight: "600" },
                                                },
                                            },
                                        };
    

                                        // 元件本體
                                        // 放置於return下方
                                        <Doughnut data={data01} options={options01} />
                                        `
                                    )
                                }       
                            </code>
                        </pre>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>      
    );
}
