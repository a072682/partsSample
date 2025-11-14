import { useState } from 'react';

export default function ProgressWithControl() {
  const [progress, setProgress] = useState(0);

  const handleIncrease = () => {
    setProgress((prev) => Math.min(prev + 10, 100));
  };

  const handleReset = () => {
    setProgress(0);
  };

  return (
    <div className="container mt-5">
      <h4 className="mb-3">React 控制 Progress Bar</h4>

      <div className="progr ess mb-3">
        <div
          className="progress-bar progress-bar-striped progress-bar-animated bg-info"
          role="progressbar"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {progress}%
        </div>
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-primary" onClick={handleIncrease}>
          +10%
        </button>
        <button className="btn btn-secondary" onClick={handleReset}>
          重設
        </button>
      </div>
    </div>
  );
}
