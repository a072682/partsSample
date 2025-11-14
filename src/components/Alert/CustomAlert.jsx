import { useState } from 'react';
import './CustomAlert.css';

export default function CustomAlert() {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(true);
    setTimeout(() => setShow(false), 3000); // 3 秒後關閉
  };

  return (
    <div className="container mt-5 text-center">
      <h4 className="mb-3">React 客製 Alert（自動消失）</h4>
      <button className="btn btn-danger mb-3" onClick={handleClick}>
        顯示警告
      </button>

      {show && (
        <div className="custom-alert">
          <strong>錯誤！</strong> 操作失敗，請稍後再試。
        </div>
      )}
    </div>
  );
}
