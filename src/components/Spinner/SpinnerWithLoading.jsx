import { useState } from 'react';

export default function SpinnerWithLoading() {
  const [loading, setLoading] = useState(false);

  const handleLoad = () => {
    setLoading(true);

    // 模擬 API 載入中（3 秒後關閉）
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="container mt-5 text-center">
      <h4 className="mb-3">React 控制 Spinner</h4>

      <button className="btn btn-primary mb-3" onClick={handleLoad} disabled={loading}>
        {loading ? '載入中...' : '載入資料'}
      </button>

      {loading && (
        <div className="spinner-border text-primary mt-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  );
}
