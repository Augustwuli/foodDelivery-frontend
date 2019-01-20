import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import '@/style/style.scss'
import SiteIndex from '@/page/site/index'
import Home from '@/coms/store/home'
import Store from '@/coms/store/store'
import Order from '@/coms/store/order'

export default class App extends Component {
  render () {
    return (
      <Router basename="/">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/store' component={Store} />
          <Route path='/order' component={Order} />
        </Switch>
      </Router>
    )
  }
}