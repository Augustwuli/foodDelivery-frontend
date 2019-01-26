import React, { Component } from 'react'
import BasicLayout from '@/page/site/taker';
import { Button ,Table } from 'antd'
import Api from '@/tool/api.js'
import { Link } from 'react-router-dom'

export default class Torder extends Component {
  constructor (props) {
    super(props)
    this.state = {
      columns: [{
        title: '订单编号',
        dataIndex: 'id',
        key: 'id',
        render: text => <a href="javascript:;">{text}</a>,
      },{
        title: '派送地址',
        dataIndex: 'address',
        key: 'address',
      },{
        title: '联系电话',
        dataIndex: 'order_phone',
        key: 'order_phone',
      },{
        title: '状态',
        dataIndex: 'statu',
        key: 'statu'
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Link to={
              {
                pathname: '/store/editorder',
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
    let takerId = sessionStorage.getItem('takerId')
    Api.get(`orders/taker/${takerId}`, null, r => {
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
        <div className="order-btn">
          <Button type="primary">全部</Button>
          <Button>正在派送</Button>
          <Button>完成派送</Button>
        </div>
        <Table dataSource={this.state.dataSource} columns={this.state.columns} rowKey="id"/>
      </BasicLayout>
    )
  }
}