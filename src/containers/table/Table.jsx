import Add from '../../components/add/Add';
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../UserContext';
import './table.css';

function DynamicTable() {
  const { 
    inputTaskData, 
    setTaskData,
    timeAvailable
  } = useContext(UserContext);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [description, setDescription] = useState('');
  const [timeAllotted, setTimeAllotted] = useState('');
  const [timeAllottedError, setTimeAllottedError] = useState(false);

  useEffect(() => {
    if (inputTaskData.length === 0) {
      setTaskData([['Add a task!', 0]]);
    }
  }, [inputTaskData, setTaskData]);

  const calculatePercentRemaining = () => {
    return 100 - inputTaskData.reduce((total, row) => total + parseInt(row[1]), 0);
  };

  const calculateTimeForPercent = (percent) => {
    const totalMinutes = timeAvailable[0] * 60 + timeAvailable[1];
    const allocatedMinutes = Math.round((percent / 100) * totalMinutes);
    
    const hours = Math.floor(allocatedMinutes / 60);
    const minutes = allocatedMinutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  const handleAddRow = () => {
    if (!description.trim() || !timeAllotted.trim() || parseInt(timeAllotted) === 0) {
      return;
    }

    const percentRemaining = calculatePercentRemaining();
    if (parseInt(timeAllotted) > percentRemaining) {
      setTimeAllottedError(true);
      return;
    }

    setTimeAllottedError(false);
    const newRow = [description, parseInt(timeAllotted)];
    
    if (inputTaskData.length === 1 && inputTaskData[0][0] === 'Add a task!' && inputTaskData[0][1] === 0) {
      setTaskData([newRow]);
    } else {
      setTaskData([...inputTaskData, newRow]);
    }

    setButtonPopup(false);
    setDescription('');
    setTimeAllotted('');
  };

  const handleDeleteRow = (index) => {
    const updatedData = inputTaskData.filter((_, i) => i !== index);
    if (updatedData.length === 0) {
      setTaskData([['Add a task!', 0]]);
    } else {
      setTaskData(updatedData);
    }
  };


  return (
    <div>
      <div className="table-content">
        <h3 className="table-header">Tasks:</h3>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Time Allotted</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {inputTaskData.map((row, index) => (
              <tr key={index}>
                <td>{row[0]}</td>
                <td>{row[1]}%</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDeleteRow(index)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="Add-Submit">
        <div className="Add centered-add">
          <button onClick={() => setButtonPopup(true)}>Add Task</button>
          <Add trigger={buttonPopup} setTrigger={setButtonPopup}>
            <h1>Adding Task</h1>
            <input
              type="text"
              placeholder="Write a description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <p>% of Time Needed (Percent Remaining: <b>{calculatePercentRemaining()}%</b>): </p>
            <div className="Add-time__input">
              <input
                className={timeAllottedError ? 'error-input' : 'normal-input'}
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                value={timeAllotted}
                onChange={(e) => setTimeAllotted(e.target.value)}
              />
              <p>%</p>
              <span className="time-arrow">→</span>
              <p className="time-display">{timeAllotted ? calculateTimeForPercent(parseInt(timeAllotted) || 0) : '0m'}</p>
            </div>
            {timeAllottedError && <p className='errorMessage'>Time needed exceeds percent remaining!</p>}
            <button className="close" onClick={handleAddRow}>Save</button>
          </Add>
        </div>
      </div>
    </div>
  );
}

export default DynamicTable;