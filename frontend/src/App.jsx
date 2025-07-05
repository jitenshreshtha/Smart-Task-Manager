import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import Registerpage from './pages/Registerpage'
import Loginpage from './pages/Loginpage'

function App() {
  

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/register' element={<Registerpage />} />
        <Route path='/login' element={<Loginpage />} />
      </Routes>
    </Router>
     
    </>
  )
}

export default App
