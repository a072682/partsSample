import { useState } from 'react';
import './CustomTooltip.css';

export default function CustomTooltip() {
  const [show, setShow] = useState(false);

  return (
    <div className="tooltip-container mt-5 text-center">
      <h4 className="mb-3">React 自製 Tooltip</h4>
      <div
        className="tooltip-wrapper"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <button className="custom-btn">滑鼠懸停顯示提示</button>
        {show && <div className="custom-tooltip">這是自訂提示內容</div>}
      </div>
    </div>
  );
}
