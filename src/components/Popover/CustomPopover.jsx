import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './CustomPopover.css';

export default function CustomPopover({ triggerText, children }) {
  const [visible, setVisible] = useState(false);
  const buttonRef = useRef(null);
  const popoverRef = useRef(null);

  const togglePopover = () => {
    setVisible(!visible);
  };

  const handleClickOutside = (e) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(e.target) &&
      !buttonRef.current.contains(e.target)
    ) {
      setVisible(false);
    }
  };

  useEffect(() => {
    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible]);

  return (
    <>
      <button ref={buttonRef} className="custom-popover-button" onClick={togglePopover}>
        {triggerText}
      </button>

      {visible &&
        createPortal(
          <div
            ref={popoverRef}
            className="custom-popover"
            style={getPosition(buttonRef)}
          >
            {children}
          </div>,
          document.body
        )}
    </>
  );
}

// 取得 Popover 要出現的位置
function getPosition(buttonRef) {
  if (!buttonRef.current) return {};
  const rect = buttonRef.current.getBoundingClientRect();
  return {
    top: rect.bottom + 10 + window.scrollY,
    left: rect.left + window.scrollX,
  };
}
