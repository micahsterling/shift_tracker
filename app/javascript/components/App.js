import React from 'react'
import {Route, Switch} from 'react-router-dom'

const App = () => {
  return (
  <Switch>
    <Route exact path="/" component={Organizations} />
    <Route exact path="organization/:slug" component={Organizations} />
  </Switch>
  )
}

export default App