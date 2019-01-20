import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import '@/style/style.scss'
import SiteIndex from '@/page/site/store'
import Home from '@/coms/store/home'
import Store from '@/coms/store/store'
import Order from '@/coms/store/order'
import AddOrder from '@/coms/store/addOrder'
import Login from '@/page/site/login'

export default class App extends Component {
  render () {
    return (
      <Router basename="/">
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/store/home' component={Home} />
          <Route path='/store/store' component={Store} />
          <Route path='/store/order' component={Order} />
          <Route path='/store/addorder' component={AddOrder} />
        </Switch>
      </Router>
    )
  }
}