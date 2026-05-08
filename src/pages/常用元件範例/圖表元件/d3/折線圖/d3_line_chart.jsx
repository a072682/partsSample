


import * as d3 from "d3";
import { useEffect, useRef } from "react";


export default function D3LineChart() {

    //#region
    //#endregion

    const LineRef = useRef(null);

    //#region 折線圖
        useEffect(() => {
            // ---- 基本設定 ----
            const width = 480;
            const height = 280;
            const margin = { top: 30, right: 20, bottom: 40, left: 40 };

            // ---- 資料 ----
            const labels = ["12/1", "12/2", "12/3", "12/4", "12/5", "12/6", "12/7", "12/8", "12/9"];
            const values = [120, 300, 280, 190, 420, 210, 250, 180, 400];

            // ---- 清空重畫 ----
            d3.select(LineRef.current).selectAll("*").remove();

            // ---- SVG & group ----
            const svg = d3.select(LineRef.current).attr("viewBox", `0 0 ${width} ${height}`);
            //設定整體畫布
            const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
            //設定圖表空間

            const innerW = width - margin.left - margin.right;
            const innerH = height - margin.top - margin.bottom;

            // ---- 尺度 ----
            const x = d3.scalePoint().domain(labels).range([0, innerW]); // 文字刻度用 scalePoint
            //由上到下
            const y = d3.scaleLinear().domain([0, 500]).range([innerH, 0]); // 上限 500（可改）
            //由右到左
            const xtest = d3
            .scaleLinear()
            //比例尺 作用:輸入數字 → 按比例換算 → 得到對應的畫布座標。
            .domain([0, 800])
            // 輸入範圍（資料的最小值~最大值且為陣列）
            .range([0, innerW])
            // 輸出範圍（對應到 SVG 畫布上的像素範圍）
            // 上限 100（可改）

            // ---- 座標軸 ----
            g.append("g")
            .attr("transform", `translate(0,${innerH})`)
            .call(d3.axisBottom(x).tickSizeOuter(0));
            //x軸坐標軸

            g.append("g").call(d3.axisLeft(y).ticks(5)); // 每格 100（0~500）
            //y軸坐標軸

            // ---- 網格線（水平）----
            g.append("g")
            .attr("stroke", "rgba(76, 0, 255, 0.5)")
            .selectAll("line")
            .data(y.ticks(5))
            .join("line")
            .attr("x1", 0)
            .attr("x2", innerW)
            .attr("y1", (d) => y(d))
            .attr("y2", (d) => y(d));

            // ---- 網格線（垂直）----
            g.append("g")
            .attr("stroke", "#ff0000ff")
            .selectAll("line")
            .data(xtest.ticks(8))
            //分隔線數量
            .join("line")
            .attr("x1", d => xtest(d)) // x 軸每個 bar 的中心
            .attr("x2", d => xtest(d))
            .attr("y1", 0)
            .attr("y2", innerH);

            // ---- line 產生器 ----
            const line = d3
            .line()
            .x((_, i) => x(labels[i]))
            .y((d) => y(d))
            .curve(d3.curveCardinal.tension(0.3)); 
            // 平滑度（0~1）

            // ---- area（填色區域，可選）----
            const area = d3
            .area()
            .x((_, i) => x(labels[i]))
            .y0(innerH)
            .y1((d) => y(d))
            .curve(d3.curveCardinal.tension(0.3));

            // ---- 畫填色 ----
            g.append("path")
            .datum(values)
            .attr("d", area)
            .attr("fill", "rgba(128,0,32,0.12)");

            // ---- 畫線 ----
            g.append("path")
            .datum(values)
            .attr("d", line)
            .attr("fill", "none")
            .attr("stroke", "#800020")
            //取線顏色
            .attr("stroke-width", 5)
            //取線粗細
            .attr("stroke-dasharray", "1,0"); 
            // 改成 "5,5" 可變虛線
            // 意思為 5px的實線 在畫 5px的虛線
            //0~10 越接近1 細線數量越多

            // ---- 畫點 ----
            g.selectAll("circle")
            .data(values)
            .join("circle")
            .attr("cx", (_, i) => x(labels[i]))
            .attr("cy", (d) => y(d))
            .attr("r", 4)
            //圓心半徑
            .attr("fill", "#ffffffff")
            //圓心顏色
            .attr("stroke", "#800020")
            //圓環顏色
            .attr("stroke-width", 2)
            //圓圈邊緣寬度
            .on("mouseenter", function () {
                d3.select(this).transition().duration(120).attr("r", 7);
            })
            .on("mouseleave", function () {
                d3.select(this).transition().duration(120).attr("r", 4);
            });

            // ---- 標題（可選）----
            svg
            .append("text")
            .attr("x", margin.left)
            .attr("y", 20)
            .attr("font-weight", 700)
            .text("每日人次統計");
        }, []);
    //#endregion

    return (
        <>
            <h4>折線圖</h4>
            <svg
                ref={LineRef}
                style={{ width: "100%", height: "auto" }}
                preserveAspectRatio="xMidYMid meet" // ← 新增：等比縮放並置中，配合 viewBox 做響應式
            />
        </>      
    );
}
