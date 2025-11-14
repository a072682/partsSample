import { useState } from 'react';
import './CustomDropdown.css';

export default function CustomDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('請選擇');

  const options = ['選項一', '選項二', '選項三'];

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
  };

  return (
    <div className="custom-dropdown">
      <button
        className="dropdown-toggle-btn"
        onClick={() => setOpen(!open)}
      >
        {selected} <span className="arrow">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <ul className="dropdown-list">
          {options.map((option, index) => (
            <li key={index} onClick={() => handleSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
