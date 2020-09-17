import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Login from './componenets/Login'
import Dashborad from './componenets/Dashboard'
import Session from './componenets/Session'
import Privacy from './componenets/Privacy'
import Terms from './componenets/Terms.js'
import Error from './componenets/Error'
import CombinedContextProvider from './context/CombinedContext'
import { CssBaseline } from '@material-ui/core'

function App() {

  return (
    <CombinedContextProvider>
      <div className="App">
        <CssBaseline />
        <Router>
          <Switch>
            <Route path='/' exact component={Login}/>
            <Route path='/dashboard' component={Dashborad} />
            <Route path='/session/:id' component={Session} />
            <Route path='/privacy' component={Privacy} />
            <Route path='/terms-and-conditions' component={Terms} />
            <Route component={Error} />
          </Switch>
        </Router>
      </div>
    </CombinedContextProvider>
  )
}

export default App
