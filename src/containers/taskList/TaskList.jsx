import React, { useContext } from 'react';
import { UserContext } from '../../UserContext';
import './taskList.css';
import Sliders from '../../components/sliders/Sliders';


const TaskList = () => {
  const { inputTaskData, tasks, setTasks} = useContext(UserContext);

  const handleCompletionChange = (taskId, newValue) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completionStatus: newValue } : task);
    setTasks(updatedTasks);
  };

  const tasksCompleted = tasks.filter(task => task.completionStatus === 100).length;

  return (
    <div className="taskList section__margin">
      <h1>TimeBar</h1>
      <div className='tasks__header'>
        <h3>Task Completion ({tasksCompleted}/{tasks.length})</h3>
      </div>
      {tasks.map(task => (
        <div className='tasks__header' key={task.id}>
          <p>{inputTaskData[task.id]}</p>
          <Sliders taskId={task.id} completionStatus={task.completionStatus} onChange={handleCompletionChange} />
        </div>
      ))}
      <div className="spacing" />
    </div>
  )
}

export default TaskList;