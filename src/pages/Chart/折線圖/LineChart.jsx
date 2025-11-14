


import { Line } from "react-chartjs-2";

export default function LineChart() {

    //#region
    //#endregion

    //#region 折線圖設定
    const data03 = {
        labels: ["12/1", "12/2", "12/3", "12/4", "12/5", "12/6", "12/7", "12/8", "12/9"],
        datasets: [
            {
                label: "人次",
                data: [120, 300, 280, 190, 420, 210, 250, 180, 400],
                // 線條樣式
                borderColor: "#800020",      
                // 線條顏色
                borderWidth: 2,              
                // 線條粗細
                tension: 0,                
                // 線條彎曲程度 (0=折線，1=貝茲曲線很圓滑)
                borderDash: [9, 1],          // 線條虛線樣式 [實線長度, 空格長度]
                // borderDashOffset: 2,       // 虛線偏移量

                // 點樣式
                pointBackgroundColor: "#fff", // 點的填色
                pointBorderColor: "#800020",  // 點邊框顏色
                pointBorderWidth: 2,          // 點邊框粗細
                pointRadius: 1,               // 點半徑 (預設 3)
                pointHoverRadius: 8,          // 滑過點的大小
                pointStyle: "circle",         // 點樣式 ('circle', 'rect', 'triangle', 'cross'...)

                // 填色區域
                fill: true,                   // 是否填滿線下方區域
                backgroundColor: "rgba(128,0,32,0.1)", // 填色顏色（透明紅色）

                // 動畫
                hoverBorderWidth: 2,          // 滑過時原點外框線條變粗
            },
        ],
    };

    const options03 = {
        responsive: true, // 隨容器大小縮放
        plugins: {
            legend: {
                position: "top",             
                // 圖例位置 ('top' | 'left' | 'bottom' | 'right')
            },
            title: {
                display: true,
                text: "每日人次統計",
                font: { size: 16, weight: "bold" },
                padding: { top: 10, bottom: 20 },
            },
            tooltip: {
                mode: "index",               
                // 同一 x 軸顯示多組數據
                intersect: false,            
                // 游標不必完全碰到點
                callbacks: {
                    label: (ctx) => `${ctx.dataset.label}: ${ctx.raw} 人`, // 自訂提示文字
                },
            },
        },
        // 座標軸設定
        scales: {
            x: {
                grid: { 
                    display: true,
                    // X 軸網格線是否顯示
                    color: "rgba(0, 68, 255, 0.3)", 
                    // X 軸網格線顏色
                },    
                
                ticks: { maxRotation: 0 },   
                // X 軸文字水平顯示
            },
            y: {
                beginAtZero: true,           
                // Y 軸從 0 開始
                min: 0,                      
                // 最小值
                max: 500,                    
                // 最大值（強制上限）
                ticks: {
                    stepSize: 100,             
                    // 每格間距
                },
                grid: {
                    display: true,
                    // y 軸網格線是否顯示
                    color: "#0044ffff",             
                    // 網格線顏色
                },
            },
        },
    };
    //#endregion

    return (
        <>
            <h4>折線圖</h4>
            {/* ✅ 加 key 避免 Canvas 重複使用 */}
            <Line data={data03} options={options03} />
        </>      
    );
}
