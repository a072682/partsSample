import { useEffect } from 'react';
import * as bootstrap from 'bootstrap';

export default function BootstrapPopover() {
  useEffect(() => {
    // 初始化所有 data-bs-toggle="popover" 的元件
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    popoverTriggerList.forEach(el => {
      new bootstrap.Popover(el);
    });
  }, []);

  return (
    <div className="container mt-5 text-center">
      <h4 className="mb-3">Bootstrap Popover 範例</h4>

      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="popover"
        data-bs-placement="right"
        title="Popover 標題"
        data-bs-content="這是一段來自 Popover 的說明文字，可顯示更多資訊！"
      >
        點擊顯示 Popover
      </button>
    </div>
  );
}
