import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../UserContext';
import './barsCont.css';
import ProgressBars from '../../components/progressBars/ProgressBars';
import moment from 'moment';

const BarsCont = () => {
  const { 
    inputTaskData, 
    timeAvailable, 
    tasks, 
    setTimeAvailable,
    isBreak,
    setIsBreak,
    breakStartTime,
    setBreakStartTime,
    totalBreakTime,
    setTotalBreakTime,
    breakTimeAvailable,
    breakPeriods,
    setBreakPeriods
  } = useContext(UserContext);

  const [startTime, setStartTime] = useState(() => {
    const savedStartTime = localStorage.getItem('startTime');
    return savedStartTime ? moment(savedStartTime) : moment();
  });

  const [currentTime, setCurrentTime] = useState(() => {
    const savedCurrentTime = localStorage.getItem('currentTime');
    return savedCurrentTime ? moment(savedCurrentTime) : moment();
  });

  const [completedTime, setCompletedTime] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);

  const getCurrentBreakPeriod = () => {
    if (isBreak && breakStartTime) {
      const totalTimeInSeconds = timeAvailable[0] * 3600 + timeAvailable[1] * 60;
      const breakStartPercentage = ((breakStartTime - startTime.valueOf()) / (totalTimeInSeconds * 1000)) * 100;
      const currentTime = moment().valueOf();
      const breakDurationPercentage = ((currentTime - breakStartTime) / (totalTimeInSeconds * 1000)) * 100;
      
      return [{
        start: breakStartPercentage,
        duration: breakDurationPercentage
      }];
    }
    return [];
  };

  const handleBreakToggle = () => {
    if (!isBreak) {
      // Starting a break
      setIsBreak(true);
      setBreakStartTime(moment().valueOf());
    } else {
      // Ending a break - calculate the period
      const totalTimeInSeconds = timeAvailable[0] * 3600 + timeAvailable[1] * 60;
      const breakStartPercentage = ((breakStartTime - startTime.valueOf()) / (totalTimeInSeconds * 1000)) * 100;
      const breakDurationPercentage = ((moment().valueOf() - breakStartTime) / (totalTimeInSeconds * 1000)) * 100;
  
      setBreakPeriods(prev => [...prev, {
        start: breakStartPercentage,
        duration: breakDurationPercentage
      }]);
      
      setIsBreak(false);
      if (breakStartTime) {
        const breakDuration = moment().valueOf() - breakStartTime;
        setTotalBreakTime(prev => prev + breakDuration);
      }
      setBreakStartTime(null);
    }
  };


  useEffect(() => {
    if (!localStorage.getItem('startTime')) {
      localStorage.setItem('startTime', startTime.toISOString());
    }

    if (!Array.isArray(timeAvailable) || timeAvailable.length !== 2 || 
        (timeAvailable[0] === 0 && timeAvailable[1] === 0)) {
      console.log('Setting initial timeAvailable to [0, 0]');
      setTimeAvailable([0, 0]);
    }

    const timer = setInterval(() => {
      const newCurrentTime = moment();
      setCurrentTime(newCurrentTime);
      localStorage.setItem('currentTime', newCurrentTime.toISOString());
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime, timeAvailable, setTimeAvailable]);

  const getTotalBreakSeconds = () => {
    let total = totalBreakTime / 1000; 
    if (isBreak && breakStartTime) {
      total += (moment().valueOf() - breakStartTime) / 1000;
    }
    return total;
  };

  const getAllowedBreakSeconds = () => {
    return (breakTimeAvailable[0] * 3600 + breakTimeAvailable[1] * 60);
  };

  useEffect(() => {
    const elapsedTimeInSeconds = currentTime.diff(startTime, 'seconds');
    const totalTimeInSeconds = timeAvailable[0] * 3600 + timeAvailable[1] * 60;
    const calculatedProgress = totalTimeInSeconds > 0 ? (elapsedTimeInSeconds / totalTimeInSeconds) * 100 : 0;
    setCompletedTime(calculatedProgress);
  }, [currentTime, startTime, timeAvailable]);

  useEffect(() => {
    console.log('InputTaskData:', inputTaskData);
    console.log('Tasks:', tasks);

    if (Array.isArray(inputTaskData) && Array.isArray(tasks) && inputTaskData.length === tasks.length) {
      let totalTimeAllotted = 0;
      let totalCompletedTime = 0;

      inputTaskData.forEach((task, index) => {
        const timeNeeded = task[1];
        const completionStatus = tasks[index].completionStatus;

        totalTimeAllotted += timeNeeded;
        totalCompletedTime += (timeNeeded * completionStatus / 100);
      });

      const calculatedProgress = totalTimeAllotted > 0 ? (totalCompletedTime / totalTimeAllotted) * 100 : 0;
      setCompletedTasks(calculatedProgress);
    } else {
      console.error('Mismatch between inputTaskData and tasks:', { inputTaskData, tasks });
      setCompletedTasks(0);
    }
  }, [inputTaskData, tasks]);

  const formatTimeNumeric = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const formatTimeWritten = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
  };
  
  return (
    <div className='bars-container'>
      <div className='break-control'>
        <button 
          onClick={handleBreakToggle}
          className={`break-button ${isBreak ? 'break-active' : ''}`}
        >
          {isBreak ? 'End Break' : 'Start Break'}
        </button>
        <span className={`break-time ${getTotalBreakSeconds() > getAllowedBreakSeconds() ? 'break-time-exceeded' : ''}`}>
          Break Time: {formatTimeWritten(getTotalBreakSeconds())} ({formatTimeNumeric(getAllowedBreakSeconds() - getTotalBreakSeconds())} remaining)
        </span>
      </div>
      <p>Time Elapsed: </p>
      <ProgressBars 
        bgcolor={"var(--color-bar1)"} 
        completed={completedTime}
        breakPeriods={[...breakPeriods, ...getCurrentBreakPeriod()]}
      />
      <p>Task Progress:</p>
      <ProgressBars 
        bgcolor={"var(--color-bar2)"} 
        completed={completedTasks} 
        breakTime={false}
      />
    </div>
  )
}

export default BarsCont;