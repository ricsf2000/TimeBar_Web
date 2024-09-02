import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../UserContext';
import './taskList.css';
import Sliders from '../../components/sliders/Sliders';

const TaskList = () => {
  const { inputTaskData, tasks, setTasks } = useContext(UserContext);

  useEffect(() => {
    console.log('InputTaskData from UserContext:', inputTaskData);
    console.log('Tasks from UserContext:', tasks);
    
    const storedInputTaskData = JSON.parse(localStorage.getItem('inputTaskData') || '[]');
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    console.log('InputTaskData from localStorage:', storedInputTaskData);
    console.log('Tasks from localStorage:', storedTasks);

    if (inputTaskData.length !== tasks.length) {
      console.log('Mismatch detected. Synchronizing data...');
      const newTasks = inputTaskData.map((task, index) => {
        return tasks[index] || { id: index, completionStatus: 0 };
      });
      setTasks(newTasks);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
    }
  }, [inputTaskData, tasks, setTasks]);

  const handleCompletionChange = (taskId, newValue) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completionStatus: newValue } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  if (!Array.isArray(inputTaskData) || inputTaskData.length === 0) {
    return <div>No tasks available. Please add some tasks.</div>;
  }

  return (
    <div className="taskList section__margin">
      <h1>TimeBar</h1>
      <div className='tasks__header'>
        <h3>Task Completion ({tasks.filter(task => task.completionStatus === 100).length}/{tasks.length})</h3>
      </div>
      {inputTaskData.map((taskData, index) => {
        const task = tasks[index] || { id: index, completionStatus: 0 };
        return (
          <div className='tasks__header' key={task.id}>
            <p>{taskData[0]}</p>
            <Sliders 
              taskId={task.id} 
              completionStatus={task.completionStatus} 
              onChange={handleCompletionChange} 
            />
          </div>
        );
      })}
      <div className="spacing" />
    </div>
  );
};

export default TaskList;