import './CustomCard.css';

export default function CustomCard() {
  return (
    <div className="custom-card-with-decor">
      {/* 左側裝飾（定位） */}
      <div className="circle top-left"></div>
      <div className="circle center-left"></div>
      <div className="circle bottom-left"></div>

      {/* 右側裝飾（背景圓圖） */}
      <div className="circle-img top-right"></div>
      <div className="circle-img center-right"></div>
      <div className="circle-img bottom-right"></div>

      <div className="custom-card-body">
        <h3 className="custom-card-title">卡片標題</h3>
        <p className="custom-card-text">
          這張卡片展示了圖片圓形裝飾，保留位置與圓形樣式。
        </p>
        <button className="custom-card-btn">了解更多</button>
      </div>
    </div>
  );
}
