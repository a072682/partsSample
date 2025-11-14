import './StepProgressBar.css';

export default function StepProgressBar({ steps = [], currentStep = 1, direction = 'horizontal' }) {
  return (
    <div className={`step-container ${direction}`}>
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;

        return (
          <div className={`step-item ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`} key={index}>
            <div className="step-circle">{stepNumber}
                {index < steps.length - 1 && <div className="step-line" />}
            </div>
            <div className="step-label">{label}</div>
            
          </div>
        );
      })}
    </div>
  );
}
