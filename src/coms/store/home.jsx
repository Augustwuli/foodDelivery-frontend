import React, { Component } from 'react'
import BasicLayout from '@/page/site/index';
import { Button } from 'antd'

export default class Home extends Component {
  render () {
    return (
      <BasicLayout>
        <Button icon="plus" size="large" style={{margin: '100px 0'}}>添加派送订单</Button>
      </BasicLayout>
    )
  }
}