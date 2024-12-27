import React from 'react'
import { Table, TimeAvailable, Title, BreakTimeAvailable } from '../../containers';
import './tasks.css';

const App = () => {
  return (
    <div className="Tasks">
      <Title />
      <TimeAvailable />
      <BreakTimeAvailable />
      <Table />
    </div>
  )
}

export default App
