import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Organizations from './Organizations/Organization'
import Organization from './Organization/Organization'

const App = () => {
  return (
  <Routes>
    <Route exact path="/" element={<Organizations />} /> 
    <Route exact path="/organization/:slug" element={<Organization />} />
  </Routes>
  )
}

export default App