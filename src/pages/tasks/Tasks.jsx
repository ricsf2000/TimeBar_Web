import React from 'react'
import { Table, TimeAvailable, Title, BreakTimeAvailable } from '../../containers';
import SubmitButton from '../../components/submitButton/SubmitButton';
import './tasks.css';

const App = () => {
  return (
    <div className="Tasks">
      <Title />
      <div className="tasks-layout">
        <div className="tasks-left">
          <TimeAvailable />
          <BreakTimeAvailable />
        </div>
        <div className="tasks-right">
          <Table />
        </div>
      </div>
      <SubmitButton />
    </div>
  )
}

export default App
