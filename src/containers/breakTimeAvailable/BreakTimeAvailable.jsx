import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../UserContext';
import './timeAvailable.css'; 

function BreakTimeAvailable() {
  const { breakTimeAvailable, setBreakTimeAvailable } = useContext(UserContext);
  const [disableInputs, setDisableInputs] = useState(false);
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');

  useEffect(() => {
    if (Array.isArray(breakTimeAvailable) && breakTimeAvailable.length === 2) {
      setHours(breakTimeAvailable[0].toString());
      setMinutes(breakTimeAvailable[1].toString());
    } else {
      console.error('Invalid breakTimeAvailable format:', breakTimeAvailable);
    }
  }, [breakTimeAvailable]);

  const handleSetTime = () => {
    const hoursInt = parseInt(hours) || 0;
    const minutesInt = parseInt(minutes) || 0;
    
    if (setBreakTimeAvailable && typeof setBreakTimeAvailable === 'function') {
      setBreakTimeAvailable([hoursInt, minutesInt]);
      setDisableInputs(true);
    } else {
      console.error('setBreakTimeAvailable is not a function in UserContext');
    }
  };

  const handleUndo = () => {
    setDisableInputs(false);
  };

  return(
    <div className="time__header section__margin">
      <div className="time-content">
        <h3>Break Time Available: </h3>
        <div className="time-content__input">
          <input 
            className="input-base"
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
            <button className="button-base" id="break-time-button" onClick={handleUndo}>Undo</button>
          ) : (
            <button className="button-base" id="break-time-button" onClick={handleSetTime}>Set Break Time</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default BreakTimeAvailable;