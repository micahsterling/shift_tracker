import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Organizations from './Organizations/Organization'
import Organization from './Organization/Organization'

const App = () => {
  return (
  <Switch>
    <Route exact path="/" component={Organizations} />
    <Route exact path="organization/:slug" component={Organization} />
  </Switch>
  )
}

export default App