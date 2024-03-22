import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [inputTaskData, setTaskData] = useState([]);
  const [timeAvailable, setTimeAvailable] = useState([0, 0]); // Initial time available is 0 hours and 0 minutes
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Update tasks whenever inputTaskData changes
    setTasks(inputTaskData.map((task, index) => ({ id: index, completionStatus: 0 })));
  }, [inputTaskData]);

  const addTaskData = (description, timeNeeded) => {
    const newRow = [description, timeNeeded];
    setTaskData([...inputTaskData, newRow]);
  };

  const removeTaskData = (index) => {
    const updatedTaskData = [...inputTaskData];
    updatedTaskData.splice(index, 1);
    setTaskData(updatedTaskData);
  };

  const updateTimeAvailable = (hours, minutes) => {
    setTimeAvailable([hours, minutes]);
  };

  return (
    <UserContext.Provider value={{ inputTaskData, timeAvailable, addTaskData, removeTaskData, setTimeAvailable, updateTimeAvailable, tasks, setTasks }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
