import React from 'react';
import { BarsCont, TaskList } from '../../containers';
import './bars.css';
const Bars = () => {
  return (
    <div>
    <TaskList/>
    <div className="background-color">
      <BarsCont/>
    </div>
    </div>
  )
}

export default Bars