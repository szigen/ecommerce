import React from 'react';

function Dropdown({ options, value, onChange, className }) {
  return (
    <select value={value} onChange={onChange} className={`p-2 border rounded ${className}`}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;