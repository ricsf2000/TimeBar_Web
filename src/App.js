import React from 'react'
import { BrowserRouter as Router, Routes,  Route } from 'react-router-dom'
import { UserProvider } from './UserContext';
import Tasks from './pages/tasks/Tasks';
import Bars from './pages/bars/Bars';
import './App.css';

const App = () => {
  return (
    <UserProvider>
      <div className="App">
      <Router>
        <Routes>
          <Route index element={<Tasks/>} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/bars" element={<Bars />} />
        </Routes>
      </Router>
    </div>
    </UserProvider>
  )
}

export default App
