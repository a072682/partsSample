


import { Accordion } from 'react-bootstrap';
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援

import dedent from 'dedent';//去除多餘空白保持縮排格式


export default function D3DonutChartText() {

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
                                        import * as d3 from "d3";//宣告元件
                                        
                                        
                                        // 設定檔放置於return上方
                                            const LineRef = useRef(null);

                                        //#region 圓環圖
                                            useEffect(() => {
                                                // ---- 基本設定 ----
                                                const width = 320;   // 這是 SVG 的「設計底圖尺寸」，不是實際像素；是整體寬度比例。
                                                const height = 200;  // 這是 SVG 的「設計底圖尺寸」，不是實際像素；是整體高度比例。
                                                const margin = 10;   // 圖形內縮一點點，讓邊界不貼邊。
                                                const legendReserve = 120; // 右邊預留給圖例的空間（類似右邊留白）。
                                                const effectiveWidth = width - legendReserve; // ← 新增：圓環可用寬度（整張 320 扣掉 legend 區）
                                                const radius = Math.min(effectiveWidth, height) / 2 - margin; // 圓的半徑，用有效寬與高度中較小者算一半再扣 margin，確保不超框。
                                                //圓型長寬等於90*(實際寬度/320)
                                                //Math.min取較小的數值
                                                const cutout = 0.55; // 中空比例(0=實心餅圖，0.55=55%中空)
                                    
                                                // ---- 資料 ----
                                                const labels = ["一般會員", "VIP會員", "供應商"];
                                                const values = [60, 15, 25];
                                                const colors = ["#800020", "#A52A2A", "#FFC0CB"];
                                    
                                                // ---- 清空重畫 ----
                                                d3.select(DonutRef.current).selectAll("*").remove();
                                                //d3要操作ref.current元素容器並選取容器內的所有東西最後進行刪除(初始化)
                                    
                                                //d3常用方法
                                                // d3.select() → 選取 DOM 元素
                                                // d3.selectAll() → 選取一組 DOM 元素
                                                // d3.scaleLinear() → 建立線性比例尺
                                                // d3.arc() → 建立圓弧生成器
                                                // d3.pie() → 建立圓餅圖的角度計算
                                                // d3.axisBottom() → 建立下方座標軸
                                    
                                                // ---- 建立 SVG 與群組 ----
                                                const svg = d3
                                                .select(DonutRef.current)
                                                //操作ref.current元素容器
                                                .attr("viewBox", \`0 0 \${width} \${height}\`)
                                                //viewBox="0 0 400 400" 代表「這個 SVG 的邏輯座標系統從 (0,0) 到 (400,400)」
                                                //viewBox為座標系統左上角座標 = (0,0)右下角座標 = (400,400)
                                                //語法：.attr("屬性名稱", "屬性值")是鏈式操作，可以一直接下去。
                                                //作用：設定（或取得）某個元素
                                                .append("g")
                                                //新增一個元素就像是<div>只是在這邊是<g>
                                                .attr("transform", \`translate(\${effectiveWidth / 2}, \${height / 2})\`); // ← 修改：圓環置中在「可用寬度」中間
                                                //在剛剛設定的g容器上設定translate({width / 2}, {height / 2})也就是正中間基準點
                                                //transform代表這個群組或空間要怎麼移動或改變大小
                                                //常用指令
                                                // translate(x, y) → 平移 (移動)
                                                // rotate(angle) → 旋轉
                                                // scale(x, y) → 縮放
                                                // skewX / skewY → 斜切
                                    
                                    
                                                // ---- pie layout：把 values 轉扇形角度 ----
                                                const pie = d3.pie().value((d) => d);
                                                //d3.pie()為D3 提供的圓餅圖產生器會幫你把一組數字資料（例如 [10, 20, 30]）轉換成「每個扇形應該佔多少角度」。
                                                //.value()效果為告訴.pie()如果有數值進來應該怎麼讀取
                                                //.value((d) => d) 告訴 pie 生成器(d) => d → 意思是「每筆資料就是它自己」。
                                                // 如果你的資料是 [10, 20, 30]，那就取 10、20、30。
                                                // 如果資料是物件 {name: 'A', value: 10}，你就會寫 .value(d => d.value)
                                                const arcs = pie(values); // 每個扇形含 startAngle/endAngle/index
                                                //pie(values);此時才是真正的將values的數值放入讓pie進行讀取
                                                //資料經過pie的轉換出來結果會像是
                                                // [
                                                //     {
                                                //         //第一筆資料
                                                //         data: 10,                // 原始資料
                                                //         value: 10,               // 數值
                                                //         startAngle: 0,           // 起始角度 (弧度制)
                                                //         endAngle: 1.047,         // 結束角度
                                                //         padAngle: 0,
                                                //         index: 0
                                                //     },
                                                //     {
                                                //         //第二筆資料
                                                //         data: 10,                // 原始資料
                                                //         value: 10,               // 數值
                                                //         startAngle: 0,           // 起始角度 (弧度制)
                                                //         endAngle: 1.047,         // 結束角度
                                                //         padAngle: 0,
                                                //         index: 0
                                                //     },
                                                // ]
                                                
                                    
                                                // ---- arc 產生器（內外半徑）----
                                                const arc = d3
                                                .arc()
                                                //圓弧產生器
                                                .innerRadius(radius * cutout) // 內半徑→中空
                                                //表示「圓弧內側」的半徑。如果設 0，就是實心的扇形。如果設 > 0，就是「甜甜圈圖 (donut chart)」，會中空。
                                                //其數值通常是一個 0~1 之間的數字
                                                .outerRadius(radius);         // 外半徑→圓厚度
                                                //表示「圓弧外側」的半徑，也就是整個圓餅的大小。
                                    
                                                // ---- 畫扇形 ----
                                                svg
                                                .selectAll("path")
                                                //選擇所有叫做path的元素
                                                .data(arcs)
                                                //綁定 arcs（pie(values) 的結果）
                                                //嘗試把 arcs 陣列裡的元素綁到 <path> 上
                                                //告訴 D3：「我有幾筆資料」。
                                                .join("path")
                                                //保證 DOM 元素數量跟資料數量一致
                                                .attr("d", arc)
                                                //創造名為d的DOM元素其內容為arc矩陣內的資料
                                                //d 屬性代表「這條路徑的繪製指令」
                                                //SVG path 的專用屬性
                                                .attr("fill", (d, i) => colors[i])
                                                //填充顏色
                                                .attr("stroke", (d, i) => d3.color(colors[i]).darker(0.6))
                                                //邊框顏色
                                                //stroke = SVG 的邊框顏色屬性
                                                //用原色再調暗一點 .darker(0.6)
                                                .attr("stroke-width", 2)
                                                //邊框寬度 2px
                                                .on("mouseenter", function () {
                                                    //監聽「滑鼠移入 (hover in)」事件。
                                                    // hover 外推感
                                                    d3.select(this)
                                                    //選擇this 代表目前滑鼠移入的那個 <path>準備修改它的屬性。
                                                    .transition()
                                                    //加上過渡動畫 (transition)。
                                                    .duration(150)
                                                    //動畫持續 150 毫秒
                                                    .attr("transform", (d) => {
                                                        //這邊的d讀取的是data(arcs)中的資料
                                                        const c = arc.centroid(d);
                                                        //.centroid會自動去找d內部的startAngle跟endAngle 並回報出一組[x, y]
                                                        //算出這個弧形的「幾何中心點座標」例如：[50, -30]。
                                                        const k = 8 / Math.hypot(c[0], c[1]); // 外推出去 8px
                                                        //算出弧形的中心點到原點的距離
                                                        return \`translate(\${c[0] * k}, \${c[1] * k})\`;
                                                    });
                                                })
                                                .on("mouseleave", function () {
                                                    //監聽「滑鼠移出 (hover out)」。
                                                    d3.select(this).transition().duration(150).attr("transform", null);
                                                    //選擇this 代表目前滑鼠移入的那個 <path>準備修改它的屬性。
                                                    //加上過渡動畫 (transition)。
                                                    //動畫持續 150 毫秒
                                                });
                                    
                                                // ---- 右側圖例 ----
                                                const rowH = 22; // ← 新增：legend 每列高度，用來做垂直置中計算
                                                const legendTop = height / 2 - (labels.length * rowH) / 2; // ← 新增：legend 垂直置中（解法 A）
                                                const legendLeft = effectiveWidth + 10; // ← 新增：legend 放在「有效寬度」右側，再留 20px 間距
                                    
                                                const legend = d3
                                                .select(DonutRef.current)
                                                //操作ref.current元素容器
                                                .append("g")
                                                //新增一個元素就像是<div>只是在這邊是<g>
                                                //新增一個 <g> 群組
                                                .attr("transform", \`translate(\${legendLeft}, \${legendTop})\`); // ← 修改：使用解法 A 的座標，避免與圓環重疊
                                                //在畫布右邊建立一個群組，用來放圖例方塊和文字。
                                    
                                                legend
                                                //這邊的legend
                                                .selectAll("rect")
                                                .data(labels)
                                                // 資料綁定labels
                                                .join("rect")
                                                //確保數量相同
                                                .attr("x", 0)
                                                // X 固定
                                                .attr("y", (_, i) => i * rowH) // ← 修改：改用 rowH 控制行高，與置中計算一致
                                                // Y 位置隨 i 不同往下排
                                                .attr("width", 12)
                                                // 寬 12px
                                                .attr("height", 12)
                                                // 高 12px
                                                .attr("rx", 2)
                                                // 邊角圓弧半徑（圓角矩形）
                                                .attr("fill", (_, i) => colors[i]);
                                                // 填色 = 對應的顏色
                                    
                                                legend
                                                .selectAll("text")
                                                .data(labels)
                                                // 資料綁定labels
                                                .join("text")
                                                //確保數量相同
                                                .attr("x", 18)
                                                // 文字在方塊右邊 (18px)
                                                .attr("y", (_, i) => i * rowH + 10) // ← 修改：同 rowH；+10 讓文字垂直居中
                                                // 跟矩形對齊，+10 讓文字垂直居中
                                                .attr("font-size", 12)
                                                // 字體大小
                                                .text((d, i) => \`\${d}：\${values[i]}人\`);
                                                //顯示文字
                                            }, []);
                                        //#endregion
    

                                        // 元件本體
                                        // 放置於return下方
                                        <svg
                                            ref={LineRef}
                                            style={{ width: "100%", height: "auto" }}
                                            preserveAspectRatio="xMidYMid meet" // ← 新增：等比縮放並置中，配合 viewBox 做響應式
                                        />
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
