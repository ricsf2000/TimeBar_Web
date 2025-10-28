import React, { useContext } from 'react';
import { UserContext } from '../../UserContext';
import TimeInput from '../../components/timeInput/TimeInput';

function BreakTimeAvailable() {
  const { breakTimeAvailable, setBreakTimeAvailable } = useContext(UserContext);

  const handleTimeChange = (newTime) => {
    if (setBreakTimeAvailable && typeof setBreakTimeAvailable === 'function') {
      setBreakTimeAvailable(newTime);
    } else {
      console.error('setBreakTimeAvailable is not a function in UserContext');
    }
  };

  return (
    <TimeInput 
      label="Break Time:" 
      value={breakTimeAvailable} 
      onChange={handleTimeChange}
    />
  );
}

export default BreakTimeAvailable;