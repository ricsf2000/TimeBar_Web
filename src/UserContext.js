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

  const [breakTimeAvailable, setBreakTimeAvailable] = useState(() => {
    const savedBreakTimeAvailable = localStorage.getItem('breakTimeAvailable');
    return savedBreakTimeAvailable ? JSON.parse(savedBreakTimeAvailable) : [0, 0];
  });

  const [isBreak, setIsBreak] = useState(() => {
    const savedIsBreak = localStorage.getItem('isBreak');
    return savedIsBreak ? JSON.parse(savedIsBreak) : false;
  });

  const [breakStartTime, setBreakStartTime] = useState(() => {
    const savedBreakStartTime = localStorage.getItem('breakStartTime');
    return savedBreakStartTime ? JSON.parse(savedBreakStartTime) : null;
  });

  const [totalBreakTime, setTotalBreakTime] = useState(() => {
    const savedTotalBreakTime = localStorage.getItem('totalBreakTime');
    return savedTotalBreakTime ? JSON.parse(savedTotalBreakTime) : 0;
  });

  const [breakPeriods, setBreakPeriods] = useState(() => {
    const savedBreakPeriods = localStorage.getItem('breakPeriods');
    return savedBreakPeriods ? JSON.parse(savedBreakPeriods) : [];
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

  useEffect(() => {
    localStorage.setItem('breakPeriods', JSON.stringify(breakPeriods));
  }, [breakPeriods]);

  useEffect(() => {
    localStorage.setItem('breakTimeAvailable', JSON.stringify(breakTimeAvailable));
  }, [breakTimeAvailable]);

  useEffect(() => {
    localStorage.setItem('isBreak', JSON.stringify(isBreak));
  }, [isBreak]);

  useEffect(() => {
    localStorage.setItem('breakStartTime', JSON.stringify(breakStartTime));
  }, [breakStartTime]);

  useEffect(() => {
    localStorage.setItem('totalBreakTime', JSON.stringify(totalBreakTime));
  }, [totalBreakTime]);

  useEffect(() => {
    let interval;
    if (isBreak && breakStartTime) {
      interval = setInterval(() => {
        const currentTime = Date.now();
        const currentBreakDuration = currentTime - breakStartTime;
        setTotalBreakTime(prevTotal => prevTotal + 1000); 
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBreak, breakStartTime]);

  return (
    <UserContext.Provider 
      value={{ 
        inputTaskData, 
        timeAvailable, 
        setTaskData, 
        setTimeAvailable, 
        tasks, 
        setTasks,
        breakTimeAvailable,
        setBreakTimeAvailable,
        isBreak,
        setIsBreak,
        breakStartTime,
        setBreakStartTime,
        totalBreakTime,
        setTotalBreakTime,
        breakPeriods,        
        setBreakPeriods       
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };