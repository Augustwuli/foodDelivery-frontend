import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import '@/style/style.scss'
import SiteIndex from '@/page/site/index'

export default class App extends Component {
  render () {
    return (
      <Router basename="/">
        <Switch>
          <Route exact path='/' component={SiteIndex} />
        </Switch>
      </Router>
    )
  }
}