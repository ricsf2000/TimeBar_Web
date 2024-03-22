import React, { useState, useContext } from 'react';
import { UserContext } from '../../UserContext';
import './timeAvailable.css';
function TimeAvailable() {
  const { timeAvailable, updateTimeAvailable } = useContext(UserContext);
  const [disableInputs, setDisableInputs] = useState(false);
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  
  const handleSetTime = () => {
    const hoursInt = parseInt(hours);
    const minutesInt = parseInt(minutes);
    updateTimeAvailable(hoursInt, minutesInt);
    setDisableInputs(true);
  };

  const handleUndo = () => {
    setDisableInputs(false);
  };

  return(
    <div className="time__header section__margin">
    <div className="time-content">
      <h3>Time Available: </h3>
      <div className="time-content__input">
        <input type="number" inputMode="numeric" pattern="[0-9]*" placeholder="Hours" value={hours} disabled={disableInputs} onChange={(e) => setHours(e.target.value)}/>
        <input className="minutes__time-content__input" type="number" inputMode="numeric" pattern="[0-9]*" placeholder="Minutes" value={minutes} disabled={disableInputs} onChange={(e) => setMinutes(e.target.value)}/>
        {disableInputs ? (<button onClick={handleUndo}>Undo</button>) : (<button onClick={() => handleSetTime()}>Set Time</button>)}
      </div>
    </div>
  </div>
  );
}

export default TimeAvailable
