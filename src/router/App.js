import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import '@/style/style.scss'
import Home from '@/coms/store/home'
import Store from '@/coms/store/store'
import Order from '@/coms/store/order'
import AddOrder from '@/coms/store/addOrder'
import EditOrder from '@/coms/store/editOrder'
import Detail from '@/coms/store/detail'
import Login from '@/page/site/login'
import Thome from '@/coms/taker/home'
import Taker from '@/coms/taker/taker'
import Torder from '@/coms/taker/order'
import TDetail from '@/coms/taker/detail'

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
          <Route path='/store/editorder' component={EditOrder} />
          <Route path='/store/detail' component={Detail}/>
          <Route path='/taker/home' component={Thome} />
          <Route path='/taker/taker' component={Taker} />
          <Route path='/taker/order' component={Torder} />
          <Route path='/taker/detail' component={TDetail}/>
        </Switch>
      </Router>
    )
  }
}