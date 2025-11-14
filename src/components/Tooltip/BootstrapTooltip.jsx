import { useEffect } from 'react';
import * as bootstrap from 'bootstrap';

export default function BootstrapTooltip() {
  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((el) => new bootstrap.Tooltip(el));
  }, []);

  return (
    <div className="container text-center mt-5">
      <h4 className="mb-3">Bootstrap 5 Tooltip 範例</h4>
      <button
        type="button"
        className="btn btn-primary me-2"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="上方提示文字"
      >
        上方提示
      </button>

      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="tooltip"
        data-bs-placement="right"
        title="右邊提示文字"
      >
        右側提示
      </button>
    </div>
  );
}
