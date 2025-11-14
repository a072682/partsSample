export default function BootstrapProgress() {
    return (
      <div className="container mt-5">
        <h4 className="mb-3">Bootstrap 5 Progress Bar</h4>
  
        {/* 單一進度條 */}
        <div className="progress mb-3">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: '60%' }}
            aria-valuenow="60"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            60%
          </div>
        </div>
  
        {/* 多段進度條 */}
        <div className="progress">
          <div
            className="progress-bar bg-success"
            style={{ width: '40%' }}
          >
            完成
          </div>
          <div
            className="progress-bar bg-warning"
            style={{ width: '30%' }}
          >
            處理中
          </div>
          <div
            className="progress-bar bg-danger"
            style={{ width: '30%' }}
          >
            失敗
          </div>
        </div>
      </div>
    );
  }
  