

export default function BootstrapNavbar() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <a className="navbar-brand" href="#">MySite</a>
  
        {/* 漢堡選單按鈕 */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
  
        {/* 展開區塊 */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* 左側導覽選單 */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="#">首頁</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">關於我們</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">聯絡</a>
            </li>
          </ul>
  
          {/* 右側搜尋列 */}
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="搜尋..."
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              搜尋
            </button>
          </form>
        </div>
      </nav>
    );
  }

  
  