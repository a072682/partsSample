


import { Bar } from "react-chartjs-2";


export default function BarChart() {

    //#region
    //#endregion

    //#region 長條圖設定
    const data02 = {
        labels: ["12/23(一)", "12/24(二)", "12/25(三)", "12/26(四)", "12/27(五)"],
        datasets: [
            {
                label: "訂單數",
                data: [38, 57, 26, 88, 5],
                backgroundColor: ["#3c0080ff", "#1900ffff", "#c0f0ffff","#800020","#800020",],
                borderRadius: 5,         
                // 長條四角圓角
                barPercentage: 0.5,      
                // 每根長條的寬度比例（0~1）
                // 在categoryPercentage的前提下的寬度比例
                categoryPercentage: 1, 
                // 每組（類別）的整體寬度比例(1為全滿)
            },
        ],
    };

    const options02 = {
        responsive: true, // 隨容器大小縮放
        plugins: {
            legend: {
                display: false, // 不顯示圖例
            },

            tooltip: {
                callbacks: {
                    label: (ctx) => `訂單數: ${ctx.raw} 筆`, // 自訂提示文字
                },
            },

            title: {
                display: true,
                text: "每日訂單統計",
                font: { size: 16, weight: "bold" },
                padding: { top: 10, bottom: 20 },
            },
        },
        // 🔑 控制座標軸與長條圖外觀
        scales: {
            x: {
            // X 軸（水平軸，顯示日期）
                grid: {
                    display: true,        
                    // 是否顯示網格線
                    color: "#ff0000ff",
                    // 網格線顏色
                },
                ticks: {
                    font: { size: 12 },    
                    // 標籤字型
                    maxRotation: 0,        
                    // 文字角度，0=水平
                },
                // barPercentage / categoryPercentage 控制條的寬度
                // barPercentage 越小 → 每根條更細
                // categoryPercentage 控制「群組寬度佔整體比例」
                stacked: false,          // 多資料集時，是否堆疊
            },
            y: {
                // Y 軸（垂直軸，顯示數值）
                beginAtZero: true,       
                // 是否從 0 開始
                max: 100,                
                // 上限數值（例如固定到 100）
                ticks: {
                    stepSize: 20,          
                    // 每格的間距
                },
                grid: {
                    color: "#ff0000ff",         
                    // 網格線顏色
                },
            },
        },
    };
    //#endregion

    return (
        <>
            <h4>長條圖</h4>
            {/* ✅ 加 key 避免 Canvas 重複使用 */}
            <Bar data={data02} options={options02} />
        </>      
    );
}
