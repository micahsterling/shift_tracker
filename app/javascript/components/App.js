import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Shifts from './Shifts'
import User from './User'
import Organizations from './Organizations/Organizations'
// import Organization from './Organization/Organization'

const App = () => {
  return (
  <Routes>
    <Route exact path="/" element={<User />} /> 
    <Route exact path="/organizations" element={<Organizations />} /> 
    <Route exact path="/organizations/:slug" element={<Shifts />} />
  </Routes>
  )
}

export default App