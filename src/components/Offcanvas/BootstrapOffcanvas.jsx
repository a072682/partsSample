export default function BootstrapOffcanvas() {
    return (
      <div className="container mt-5 text-center">
        <button
          className="btn btn-primary"
          data-bs-toggle="offcanvas"
          data-bs-target="#demoOffcanvas"
          aria-controls="demoOffcanvas"
        >
          打開側邊選單
        </button>
  
        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="demoOffcanvas"
          aria-labelledby="offcanvasLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasLabel">側邊抽屜</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <p>這是 Bootstrap 的 Offcanvas 側邊欄。</p>
            <p>可放選單、購物車、表單等。</p>
          </div>
        </div>
      </div>
    );
  }
  