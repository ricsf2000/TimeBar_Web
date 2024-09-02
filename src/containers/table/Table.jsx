import Add from '../../components/add/Add';
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom';
import './table.css';

function DynamicTable() {
  const { inputTaskData, setTaskData, timeAvailable, setTimeAvailable } = useContext(UserContext);
  const navigate = useNavigate();
  const [buttonPopup, setButtonPopup] = useState(false);
  const [description, setDescription] = useState('');
  const [timeAllotted, setTimeAllotted] = useState('');
  const [timeAllottedError, setTimeAllottedError] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (inputTaskData.length === 0) {
      setTaskData([['Add a task!', 0]]);
    }
  }, [inputTaskData, setTaskData]);

  const calculatePercentRemaining = () => {
    return 100 - inputTaskData.reduce((total, row) => total + parseInt(row[1]), 0);
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

    navigate('/bars');
  };

  return (
    <div>
      {submitError && (
        <div className="error-message" style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '10px',
          marginBottom: '15px',
          borderRadius: '5px',
          textAlign: 'center'
        }}>
          {submitError}
        </div>
      )}
      <div className="table-content section__margin">
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
                  <button onClick={() => handleDeleteRow(index)}>X</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="Add-Submit">
        <div className="Add section__margin">
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
            </div>
            {timeAllottedError && <p className='errorMessage'>Time needed exceeds percent remaining!</p>}
            <button className="close" onClick={handleAddRow}>Save</button>
          </Add>
        </div>
        <div className="submit section__margin">
          <button type="button" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default DynamicTable;