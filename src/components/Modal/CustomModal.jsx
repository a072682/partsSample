import { useEffect, useState } from 'react';
import './CustomModal.css';

export default function CustomModal() {
  const [open, setOpen] = useState(false);

  // ⌨️ 按下 Esc 鍵關閉 modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    if (open) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div className="container mt-5 text-center">
      <h4>升級版客製 Modal</h4>
      <button className="btn btn-warning" onClick={() => setOpen(true)}>開啟彈窗</button>

      {open && (
        // 🛑 取消 onClick 觸發背景關閉
        <div className="custom-modal-backdrop">
          <div className="custom-modal">
            <h5>彈窗標題</h5>
            <p>這個彈窗不能點背景關閉，按下 Esc 可關閉。</p>
            <button className="btn btn-dark" onClick={() => setOpen(false)}>關閉</button>
          </div>
        </div>
      )}
    </div>
  );
}
