import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../UserContext';
import './barsCont.css';
import ProgressBars from '../../components/progressBars/ProgressBars';
import moment from 'moment';

const BarsCont = () => {
  const { inputTaskData, timeAvailable, tasks, setTimeAvailable } = useContext(UserContext);
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

  return (
    <div className='Bars section__margin section__padding'>
      <p>Time Elapsed: </p>
      <ProgressBars bgcolor={"var(--color-bar1)"} completed={completedTime}  />
      <p>Task Progress:</p>
      <ProgressBars bgcolor={"var(--color-bar2)"} completed={completedTasks} />
    </div>
  )
}

export default BarsCont;