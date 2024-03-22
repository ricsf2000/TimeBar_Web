import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../UserContext';
import './barsCont.css';
import ProgressBars from '../../components/progressBars/ProgressBars';
import moment from 'moment';

const BarsCont = () => {
  const { inputTaskData, timeAvailable, tasks } = useContext(UserContext);
  const [startTime] = useState(moment());
  const [currentTime, setCurrentTime] = useState(moment());
  const [completed, setCompleted] = useState(0);
  const [completedTime, setCompletedTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => { setCurrentTime(moment())}, 1000); 
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const elapsedTimeInSeconds = currentTime.diff(startTime, 'seconds');
    const totalTimeInSeconds = timeAvailable[0] * 3600 + timeAvailable[1] * 60;
    const calculatedProgress = (elapsedTimeInSeconds / totalTimeInSeconds) * 100;
    setCompletedTime(calculatedProgress);
  }, [currentTime, startTime, timeAvailable]);

  useEffect(() => {
    let totalProgress = 0;
    inputTaskData.forEach((task, index) => {
      const { completionStatus } = tasks[index];
      const [description, timeNeeded] = task;
  
      const taskProgress = timeNeeded * (completionStatus/100); // Calculate progress based on completion status
      totalProgress += taskProgress;
    });
  
    setCompleted(totalProgress);
  }, [inputTaskData, tasks]);

  return (
    <div className='Bars section__margin section__padding'>
      <p>Time Elapsed: </p>
      <ProgressBars bgcolor={"var(--color-bar1)"} completed={completedTime} />
      <p>Progress:</p>
      <ProgressBars bgcolor={"var(--color-bar2)"} completed={completed} />
    </div>
  )
}

export default BarsCont;
