import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../UserContext';
import './timeAvailable.css';

function TimeAvailable() {
  const { timeAvailable, setTimeAvailable } = useContext(UserContext);
  const [disableInputs, setDisableInputs] = useState(false);
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');

  useEffect(() => {
    if (Array.isArray(timeAvailable) && timeAvailable.length === 2) {
      setHours(timeAvailable[0].toString());
      setMinutes(timeAvailable[1].toString());
    } else {
      console.error('Invalid timeAvailable format:', timeAvailable);
    }
  }, [timeAvailable]);

  const handleSetTime = () => {
    const hoursInt = parseInt(hours) || 0;
    const minutesInt = parseInt(minutes) || 0;
    
    if (setTimeAvailable && typeof setTimeAvailable === 'function') {
      setTimeAvailable([hoursInt, minutesInt]);
      setDisableInputs(true);
    } else {
      console.error('setTimeAvailable is not a function in UserContext');
    }
  };

  const handleUndo = () => {
    setDisableInputs(false);
  };

  return(
    <div className="time__header section__margin">
      <div className="time-content">
        <h3>Time Available: </h3>
        <div className="time-content__input">
          <input 
            type="number" 
            inputMode="numeric" 
            pattern="[0-9]*" 
            placeholder="Hours" 
            value={hours} 
            disabled={disableInputs} 
            onChange={(e) => setHours(e.target.value)}
          />
          <input 
            className="minutes__time-content__input" 
            type="number" 
            inputMode="numeric" 
            pattern="[0-9]*" 
            placeholder="Minutes" 
            value={minutes} 
            disabled={disableInputs} 
            onChange={(e) => setMinutes(e.target.value)}
          />
          {disableInputs ? (
            <button onClick={handleUndo}>Undo</button>
          ) : (
            <button onClick={handleSetTime}>Set Time</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TimeAvailable;