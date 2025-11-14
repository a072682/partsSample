



export default function OriginalCard() {
    return (
      <div className="card" style={{ width: "18rem" }}>
        <img src="https://picsum.photos/300/200" className="card-img-top" alt="Card Image" />
        <div className="card-body">
          <h5 className="card-title">預設卡片標題</h5>
          <p className="card-text">
            這是一張使用 Bootstrap 5 樣式的預設卡片，你可以放圖片、文字與按鈕。
          </p>
          <a href="#" className="btn btn-primary">了解更多</a>
        </div>
      </div>
    );
  }
  