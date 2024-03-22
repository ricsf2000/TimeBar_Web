import React from 'react'
import { Table, TimeAvailable, Title } from '../../containers';
import './tasks.css';

const App = () => {
  return (
    <div className="Tasks">
      <Title />
      <TimeAvailable />
      <Table />
    </div>
  )
}

export default App
