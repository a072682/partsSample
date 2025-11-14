export default function BootstrapBreadcrumb() {
    return (
      <nav aria-label="breadcrumb" className="container mt-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">首頁</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">產品列表</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            詳細頁
          </li>
        </ol>
      </nav>
    );
  }
  