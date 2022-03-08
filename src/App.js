import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Layout from './pages/layout'
import Login from './pages/login'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='login' element={<Login/>}/>
        <Route path="admin/*" element={<Layout/>}/>
      </Routes>
    </Router>
  )
}

export default App