export default function BootstrapSpinner() {
    return (
      <div className="container mt-5 text-center">
        <h4 className="mb-4">Bootstrap Spinner</h4>
  
        {/* 旋轉圈圈型 */}
        <div className="spinner-border text-primary me-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
  
        {/* 成長條型 */}
        <div className="spinner-grow text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  