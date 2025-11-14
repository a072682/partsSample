import { useRef } from 'react';
import * as bootstrap from 'bootstrap';

export default function BootstrapToast() {
  const toastRef = useRef(null);

  const handleShowToast = () => {
    const toast = new bootstrap.Toast(toastRef.current);
    toast.show();
  };

  return (
    <div className="container mt-5 text-center">
      <h4 className="mb-4">Bootstrap Toast</h4>
      <button className="btn btn-primary mb-3" onClick={handleShowToast}>
        顯示 Toast
      </button>

      <div
        className="toast align-items-center text-white bg-success border-0"
        ref={toastRef}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        style={{ maxWidth: '300px', margin: '0 auto' }}
        data-bs-delay="2000"
      >
        <div className="d-flex">
          <div className="toast-body">成功通知！這是 Bootstrap 的 Toast。</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  );
}
