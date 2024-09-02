import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [inputTaskData, setTaskData] = useState(() => {
    const savedTaskData = localStorage.getItem('inputTaskData');
    return savedTaskData ? JSON.parse(savedTaskData) : [];
  });

  const [timeAvailable, setTimeAvailable] = useState(() => {
    const savedTimeAvailable = localStorage.getItem('timeAvailable');
    return savedTimeAvailable ? JSON.parse(savedTimeAvailable) : [0, 0];
  });

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks
      ? JSON.parse(savedTasks)
      : inputTaskData.map((task, index) => ({ id: index, completionStatus: 0 }));
  });

  useEffect(() => {
    localStorage.setItem('inputTaskData', JSON.stringify(inputTaskData));
  }, [inputTaskData]);

  useEffect(() => {
    localStorage.setItem('timeAvailable', JSON.stringify(timeAvailable));
  }, [timeAvailable]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <UserContext.Provider value={{ inputTaskData, timeAvailable, setTaskData, setTimeAvailable, tasks, setTasks }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
