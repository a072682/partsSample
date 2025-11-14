export default function BootstrapPagination() {
  return (
    <nav className="container mt-4">
      <ul className="pagination justify-content-center">
        <li className="page-item disabled">
          <a className="page-link">上一頁</a>
        </li>
        <li className="page-item active">
          <a className="page-link">1</a>
        </li>
        <li className="page-item">
          <a className="page-link">2</a>
        </li>
        <li className="page-item">
          <a className="page-link">3</a>
        </li>
        <li className="page-item">
          <a className="page-link">下一頁</a>
        </li>
      </ul>
    </nav>
  );
}
