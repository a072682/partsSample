


import * as d3 from "d3";
import { useEffect, useRef } from "react";


export default function D3BarChart() {

    //#region
    //#endregion

    const BarRef = useRef(null);

    //#region 長條圖
        useEffect(() => {
            // ---- 基本設定 ----
            const width = 420; //整體元件最低寬度
            const height = 260; // 整體元件最低高度
            const margin = { top: 30, right: 20, bottom: 40, left: 40 };

            // ---- 資料 ----
            const labels = ["12/23(一)", "12/24(二)", "12/25(三)", "12/26(四)", "12/27(五)"];
            const values = [38, 57, 26, 88, 5];

            // ---- 清空重畫 ----
            d3.select(BarRef.current).selectAll("*").remove();

            // ---- SVG & group ----
            const svg = d3
            .select(BarRef.current)
            .attr("viewBox", `0 0 ${width} ${height}`);

            const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

            const innerW = width - margin.left - margin.right;
            const innerH = height - margin.top - margin.bottom;

            // ---- X / Y 尺度 ----
            const xWidth = 0.2;
            //控制寬度(0 - 1)1為無粗度 0為最粗
            const x = d3
            .scaleBand()
            //「把一堆分類項目，對應到一條軸線上的一格一格位置」
            //如果domain輸入的範圍資料是一筆一筆的資料則使用scaleBand
            //
            .domain(labels)
            // 輸入範圍如 ["12/23","12/24","12/25"...]
            .range([0, innerW])
            // 在畫布上佔據的範圍
            .paddingInner(xWidth)
            // 只調整柱與柱之間
            .paddingOuter(xWidth/2)
            // 外側不留空
            .align(0.5);
            // padding 控制寬度(0 - 1)
            // padding越高長條越細

            const xtest = d3
            .scaleLinear()
            //比例尺 作用:輸入數字 → 按比例換算 → 得到對應的畫布座標。
            .domain([0, 100])
            // 輸入範圍（資料的最小值~最大值且為陣列）
            .range([0, innerW])
            // 輸出範圍（對應到 SVG 畫布上的像素範圍）
            // 上限 100（可改）

            const y = d3
            .scaleLinear()
            //如果domain輸入的範圍資料是連續的數字則使用scaleLinear
            //比例尺 作用:輸入數字 → 按比例換算 → 得到對應的畫布座標。
            .domain([0, 100])
            // 輸入範圍（資料的最小值~最大值）
            .range([innerH, 0]); 
            // 輸出範圍（對應到 SVG 畫布上的像素範圍）
            // 上限 100（可改）

            // ---- 座標軸 ----
            g.append("g")
            .attr("transform", `translate(0,${innerH})`)
            .call(d3.axisBottom(x).tickSizeOuter(5));
            //我要一個在底部的座標軸，依據比例尺 x 來生成
            //tickSizeOuter() 是設定「最外側刻度線」的長度。
            //也就是x軸 左右側邊緣的兩條刻度線


            g.append("g").call(d3.axisLeft(y).ticks(5)); // 每格 20（因為 0~100）
            //新增一個 <g> 群組元素
            //如果要畫軸則使用.call 
            //axisLeft(y)在 左邊 畫 y 軸，包含刻度線 + 刻度文字。
            //.ticks(5)分成 5 段
            //左側數字刻度

            // ---- 網格線（水平）----
            g.append("g")
            .attr("stroke", "#2f00ffff")
            //網格線顏色
            .selectAll("line")
            .data(y.ticks(5))
            //搭配.domain使用
            //根據 domain 的範圍（這裡是 0~100），自動產生「適合」的刻度。
            //分隔線數量
            .join("line")
            .attr("x1", 0)
            // 線段左端的 x 座標
            .attr("x2", innerW)
            // 線段右端的 x 座標
            .attr("y1", (d) => y(d))
            //畫線
            .attr("y2", (d) => y(d));

            // ---- 網格線（垂直）----
            g.append("g")
            .attr("stroke", "#ff0000ff")
            .selectAll("line")
            .data(xtest.ticks(10))
            //分隔線數量
            .join("line")
            .attr("x1", d => xtest(d)) // x 軸每個 bar 的中心
            .attr("x2", d => xtest(d))
            .attr("y1", 0)
            .attr("y2", innerH);

            // ---- 長條 ----
            g.selectAll("rect")
            .data(values)
            .join("rect")
            .attr("x", (_, i) => x(labels[i]))
            .attr("y", (d) => y(d))
            .attr("width", x.bandwidth())
            //bandwidth()為scaleBand() 專屬方法
            //會根據scaleBand()的設定給出一個數字(寬度)
            .attr("height", (d) => innerH - y(d))
            .attr("rx", 6) 
            // 圓角
            .attr("fill", (d, i) => ["#3c0080ff", "#1900ffff", "#c0f0ffff", "#800020", "#800020"][i]);

            // ---- 標題（可選）----
            svg
            .append("text")
            .attr("x", margin.left)
            .attr("y", 20)
            .attr("font-weight", 700)
            .text("每日訂單統計");
        }, []);
    //#endregion

    return (
        <>
            <h4>長條圖</h4>
            <svg
                ref={BarRef}
                style={{ width: "100%", height: "auto" }}
                preserveAspectRatio="xMidYMid meet" // ← 新增：等比縮放並置中，配合 viewBox 做響應式
            />
        </>      
    );
}
