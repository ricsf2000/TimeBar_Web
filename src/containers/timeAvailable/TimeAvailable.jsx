import React, { useContext } from 'react';
import { UserContext } from '../../UserContext';
import TimeInput from '../../components/timeInput/TimeInput';

function TimeAvailable() {
  const { timeAvailable, setTimeAvailable } = useContext(UserContext);

  const handleTimeChange = (newTime) => {
    if (setTimeAvailable && typeof setTimeAvailable === 'function') {
      setTimeAvailable(newTime);
    } else {
      console.error('setTimeAvailable is not a function in UserContext');
    }
  };

  return (
    <TimeInput 
      label="Time Available:" 
      value={timeAvailable} 
      onChange={handleTimeChange}
    />
  );
}

export default TimeAvailable;