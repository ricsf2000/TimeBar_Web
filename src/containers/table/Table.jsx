import Add from '../../components/add/Add';
import React, { useState, useContext } from 'react';
import { UserContext } from '../../UserContext';
import { useNavigate} from 'react-router-dom';
import './table.css';

function DynamicTable() {
  const { addTaskData, removeTaskData } = useContext(UserContext);
  const navigate = useNavigate();
  const [buttonPopup, setButtonPopup] = useState();
  const [tableData, setTableData] = useState([['Add a task!', '0%']]);
  const [description, setDescription] = useState('');
  const [timeAllotted, setTimeAllotted] = useState('');
  const [percentRemaining, setPercentRemaining] = useState(100);
  const [timeAllottedError, setTimeAllottedError] = useState(false);

  const updatePercent = (newPercent) => {
    setPercentRemaining(newPercent);
  }

  const calculateSum = (data) => {
    return 100 - (data.reduce((total, row) => total + parseInt(row[1].replace('%','')), 0));
  };

  const handleAddRow = (description, timeNeeded) => {
    if (parseInt(timeNeeded) > percentRemaining) {
      setTimeAllottedError(true);
      return;
    }
    setTimeAllottedError(false);
    if (!description.trim() || (!timeNeeded.trim() || (parseInt(timeNeeded) === 0))) {
      return;
    }
    const newRow = [description, timeNeeded + '%'];
    if (tableData.length === 1 && tableData[0][0] === 'Add a task!' && tableData[0][1] === '0%') {
      // Remove the sample row if it exists
      setTableData([newRow]);
      addTaskData(description, timeNeeded, 0);
      setButtonPopup(false); // Close the popup after adding a row
      setDescription('');
      setTimeAllotted('');
      updatePercent(calculateSum([...tableData, newRow]));
      return;
    }
    setTableData([...tableData, newRow]);
    addTaskData(description, timeNeeded);
    setButtonPopup(false); // Close the popup after adding a row
    setDescription('');
    setTimeAllotted('');
    updatePercent(calculateSum([...tableData, newRow]));
  };

  const handleDeleteRow = (index) => {
    removeTaskData(index);
    const updatedData = [...tableData];
    updatedData.splice(index, 1);
    setTableData(updatedData);
    updatePercent(calculateSum(updatedData));
    if (updatedData.length === 0) {
      const newRow = ['Add a task!', '0%'];
      setTableData([newRow]);
    } else {
      setTableData(updatedData);
    }
  };
  
  const handleSubmit = () => {
    navigate('/bars');
  };

  return (
    <div>
    <div className="table-content section__margin">
      {/* Table to display the data */}
      <div className="table-content">
      <table updatePercent={updatePercent} >
        <thead>
          <tr>
            <th >Description</th>
            <th >Time Allotted</th>
            <th> </th>
          </tr>
        </thead>
        <tbody >
          {tableData.map((row,index) => (
            <tr key={index}>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
            <td> <button onClick={() => handleDeleteRow(index)}>X</button></td>
            </tr> 
          ))}
        </tbody>
      </table>
      </div>
    </div>
    <div className="Add-Submit">
    <div className="Add section__margin">
    <button onClick={() => setButtonPopup(true)}>Add Task</button>
    <Add trigger={buttonPopup} setTrigger={setButtonPopup}>
      <h1>Adding Task</h1>
      <input type="text" placeholder="Write a description" value={description} onChange={(e) => setDescription(e.target.value)}/>
      <p>% of Time Needed ( Percent Remaining: <b>{percentRemaining}%</b> ): </p>
      <div className="Add-time__input">
        <input className={timeAllottedError ? 'error-input' : 'normal-input'} type="number" inputMode="numeric" pattern="[0-9]*" value={timeAllotted} onChange={(e) => setTimeAllotted(e.target.value)}/>
        <p>%</p>
      </div>
      {timeAllottedError ? <p className='errorMessage'>Time needed exceeds percent remaining!</p> : <p></p>}
      <button className="close" onClick={() => handleAddRow(description, timeAllotted)}>Save</button>
    </Add>
  </div>
    <div className="submit section__margin">
      <button type="button" onClick={handleSubmit} >Submit</button>
    </div>
    </div>
  </div>
  );
}

export default DynamicTable;
