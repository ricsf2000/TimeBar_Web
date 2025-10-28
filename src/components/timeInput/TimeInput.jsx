import React from 'react';
import './timeInput.css';

function TimeInput({ label, value, onChange, className = "" }) {
  const hours = Array.isArray(value) ? value[0] : 0;
  const minutes = Array.isArray(value) ? value[1] : 0;

  const handleHoursChange = (e) => {
    const newHours = Math.min(23, Math.max(0, parseInt(e.target.value) || 0));
    onChange([newHours, minutes]);
  };

  const handleMinutesChange = (e) => {
    const newMinutes = Math.min(59, Math.max(0, parseInt(e.target.value) || 0));
    onChange([hours, newMinutes]);
  };

  return (
    <div className={`time-input-container ${className}`}>
      <div className="time-content">
        <h3>{label}</h3>
        <div className="time-content__input">
          <input 
            className="time-input hours-input"
            type="number" 
            inputMode="numeric" 
            value={hours.toString().padStart(2, '0')} 
            onChange={handleHoursChange}
            max="23"
            min="0"
          />
          <span className="time-separator">:</span>
          <input 
            className="time-input minutes-input"
            type="number" 
            inputMode="numeric" 
            value={minutes.toString().padStart(2, '0')} 
            onChange={handleMinutesChange}
            max="59"
            min="0"
          />
        </div>
      </div>
    </div>
  );
}

export default TimeInput;