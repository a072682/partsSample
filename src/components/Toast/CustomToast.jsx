import { useState } from 'react';
import './CustomToast.css';

export default function CustomToast() {
  const [show, setShow] = useState(false);

  const handleShowToast = () => {
    setShow(true);
    setTimeout(() => setShow(false), 3000); // 3 秒後自動消失
  };

  return (
    <div className="text-center mt-5">
      <h4 className="mb-4">React 客製 Toast（整合版）</h4>
      <button className="btn btn-warning mb-3" onClick={handleShowToast}>
        顯示 Toast
      </button>

      {show && (
        <div className="custom-toast">
          資料新增成功！
        </div>
      )}
    </div>
  );
}
