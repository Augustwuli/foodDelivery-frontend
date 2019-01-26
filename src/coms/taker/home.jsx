import React, { Component } from 'react'
import BasicLayout from '@/page/site/taker';
import {Table} from 'antd'
import { Link } from 'react-router-dom'
import Api from '@/tool/api.js'

export default class Thome extends Component {
  constructor (props) {
    super(props)
    this.state = {
      columns: [{
        title: '订单编号',
        dataIndex: 'id',
        key: 'id',
        render: text => <a href="javascript:;">{text}</a>,
      }, {
        title: '派送地址',
        dataIndex: 'address',
        key: 'address',
      },{
        title: '联系电话',
        dataIndex: 'order_phone',
        key: 'order_phone',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Link to={
              {
                pathname: '/taker/detail',
                state: {
                  id: record.id
                }
              }
            }>查看详情</Link>
          </span>
        ),
      }],
      dataSource: []
    }
  }

  componentDidMount () {
    this.getData()
  }

  getData () {
    Api.get(`orders/wait`, null, r => {
      this.setState({
        dataSource: r.data.orders
      },function (){
        console.log(this.state.dataSource)
      })
    })
  }

  render () {
    return (
      <BasicLayout>
        <div className="title">任务列表</div>
        <Table dataSource={this.state.dataSource} columns={this.state.columns} rowKey="id"/>
      </BasicLayout>
    )
  }
}