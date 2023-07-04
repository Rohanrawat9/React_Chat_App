import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Register,Login,Chat,SetAvatar} from './pages'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/setAvatar" element={<SetAvatar/>} />
        <Route path="/" element={<Chat/>} />
      </Routes>
    </Router>
  )
}

export default App