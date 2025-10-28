import React, { useState, useContext } from 'react';
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom';
import './submitButton.css';

function SubmitButton() {
  const { 
    inputTaskData, 
    timeAvailable,
    setIsBreak,
    setBreakStartTime,
    setTotalBreakTime,
    setBreakPeriods 
  } = useContext(UserContext);
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = () => {
    setSubmitError('');
  
    const totalPercentage = inputTaskData.reduce((total, row) => total + parseInt(row[1]), 0);
    if (totalPercentage !== 100) {
      setSubmitError(`Task percentages must add up to 100%. Current total: ${totalPercentage}%`);
      return;
    }
  
    const totalTimeAvailable = timeAvailable[0] * 60 + timeAvailable[1]; 
    if (totalTimeAvailable <= 0) {
      setSubmitError('Time available must be greater than 0 minutes.');
      return;
    }
  
    localStorage.removeItem('startTime');
    localStorage.removeItem('currentTime');
    localStorage.removeItem('isBreak');
    localStorage.removeItem('breakStartTime');
    localStorage.removeItem('totalBreakTime');
    localStorage.removeItem('breakPeriods');  
  
    setIsBreak(false);
    setBreakStartTime(null);
    setTotalBreakTime(0);
    setBreakPeriods([]); 
  
    navigate('/bars');
  };

  return (
    <div className="submit-container">
      {submitError && (
        <div className="submit-error-message">
          {submitError}
        </div>
      )}
      <button className="submit-button" type="button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default SubmitButton;