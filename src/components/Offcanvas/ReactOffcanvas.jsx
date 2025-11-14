import { useState } from 'react';
import './ReactOffcanvas.css';

export default function ReactOffcanvas() {
  const [show, setShow] = useState(false);

  return (
    <div className="container mt-5 text-center react-offcanvas">
      <button className="btn btn-success" onClick={() => setShow(true)}>
        打開自訂 Offcanvas
      </button>

      {show && (
        <>
          <div className="offcanvas-backdrop" onClick={() => setShow(false)}></div>

          <div className="offcanvas-panel">
            <div className="offcanvas-header d-flex justify-content-between align-items-center">
              <h5>自訂 Offcanvas</h5>
              <button className="btn-close" onClick={() => setShow(false)}></button>
            </div>
            <div className="offcanvas-body">
              <p>這是 React 控制的 Offcanvas。</p>
              <p>你可以完全自訂內容與觸發邏輯。</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
