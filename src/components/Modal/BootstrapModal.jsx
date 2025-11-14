export default function BootstrapModal() {
    return (
      <div className="container mt-5">
        <h4>Bootstrap 5 Modal 範例</h4>
        {/* 觸發按鈕 */}
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#myModal"
        >
          開啟彈窗
        </button>
  
        {/* Modal 結構 */}
        <div
          className="modal fade"
          id="myModal"
          tabIndex="-1"
          aria-labelledby="modalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modalLabel">彈窗標題</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                這是彈跳視窗的內容，你可以放表單、圖片、文字。
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
                <button className="btn btn-primary">儲存</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  