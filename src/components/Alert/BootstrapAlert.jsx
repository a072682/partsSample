import { useRef } from 'react';

export default function BootstrapAlert() {
  const alertRef = useRef(null);

  const handleShowAlert = () => {
    const el = alertRef.current;
    if (!el) return;

    el.classList.add('show');
    el.classList.remove('d-none');
  };

  return (
    <div className="container mt-5 text-center">
      <h4 className="mb-3">Bootstrap Alert（需手動關閉）</h4>

      <button className="btn btn-danger mb-3" onClick={handleShowAlert}>
        顯示警告訊息
      </button>

      <div
        ref={alertRef}
        className="alert alert-warning alert-dismissible fade d-none"
        role="alert"
      >
        <strong>注意！</strong> 發生問題，請檢查操作。
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={() => {
            alertRef.current.classList.remove('show');
            alertRef.current.classList.add('d-none');
          }}
        ></button>
      </div>
    </div>
  );
}
