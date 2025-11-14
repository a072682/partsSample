import './_InputGroupExample.scss';

export default function InputGroupExample() {
    return (
      <div className="container mt-4">
        <h4 className="mb-4">輸入框組 Input Group 範例</h4>
  
        {/* 帳號欄位：@符號 */}
        <div className="mb-3">
          <label className="form-label">帳號</label>
          <div className="input-group">
            <span className="input-group-text">@</span>
            <input type="text" className="form-control" placeholder="username" />
          </div>
        </div>
  
        {/* 電話欄位：icon（使用 emoji） */}
        <div className="mb-3">
          <label className="form-label">手機號碼</label>
          <div className="input-group">
            <input type="text" className="form-control" placeholder="09xx-xxx-xxx" />
            <span className="input-group-text">📱</span>
          </div>
        </div>
  
        {/* 金額欄位：$符號 */}
        <div className="mb-3">
          <label className="form-label">金額</label>
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input type="number" className="form-control" placeholder="輸入金額" />
          </div>
        </div>
  
        {/* Email欄位：.com 結尾 */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <div className="input-group">
            <input type="text" className="form-control" placeholder="yourname" />
            <span className="input-group-text">@mail.com</span>
          </div>
        </div>
  
        {/* 密碼欄位：顯示密碼按鈕 */}
        <div className="mb-3">
          <label className="form-label">密碼</label>
          <div className="input-group">
            <input type="password" className="form-control" placeholder="輸入密碼" />
            <button className="btn btn-outline-secondary" type="button">
              顯示密碼
            </button>
          </div>
        </div>

        {/* css訂製input */}
        <div className="input-wrapper">
            <label htmlFor="custom-input" className="input-label">帳號</label>
            <input
                type="text"
                id="custom-input"
                className="custom-input"
                placeholder="請輸入帳號名稱"
            />
        </div>
      </div>
    );
  }
  