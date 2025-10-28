import React from 'react';
import { BarsCont, TaskList } from '../../containers';
import './bars.css';

const Bars = () => {
  return (
    <div className="Bars">
      <div className="bars-layout">
        <TaskList/>
        <BarsCont/>
      </div>
    </div>
  )
}

export default Bars