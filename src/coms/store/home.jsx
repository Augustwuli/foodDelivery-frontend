import React, { Component } from 'react'
import BasicLayout from '@/page/site/store';
import { Button } from 'antd'
import { Link } from 'react-router-dom'

export default class Home extends Component {
  render () {
    return (
      <BasicLayout>
        <Link to="/store/addorder">
          <Button icon="plus" size="large" style={{margin: '100px 0'}}>添加派送订单</Button>
        </Link>
      </BasicLayout>
    )
  }
}