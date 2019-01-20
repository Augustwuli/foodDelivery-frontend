import React, { Component } from 'react'
import BasicLayout from '@/page/site/store';
import { Button ,Table ,Divider } from 'antd'

export default class Order extends Component {
  constructor (props) {
    super(props)
    this.state = {
      columns: [{
        title: '订单编号',
        dataIndex: 'number',
        key: 'number',
        render: text => <a href="javascript:;">{text}</a>,
      }, {
        title: '派送员',
        dataIndex: 'taker',
        key: 'taker',
      }, {
        title: '派送地址',
        dataIndex: 'address',
        key: 'address',
      },{
        title: '联系电话',
        dataIndex: 'phone',
        key: 'phone',
      },{
        title: '状态',
        dataIndex: 'state',
        key: 'state'
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="javascript:;">查看详情</a>
            <Divider type="vertical" />
            <a href="javascript:;">修改</a>
          </span>
        ),
      }],
      dataSource: [{
        key: '1',
        taker: 'John Brown',
        number: 32,
        phone: '123456',
        address: 'New York No. 1 Lake Park',
        state: '1'
      }, {
        key: '2',
        taker: 'Jim Green',
        number: 42,
        phone: '123456',
        address: 'London No. 1 Lake Park',
        state: '1'
      }, {
        key: '3',
        taker: 'Joe Black',
        number: 32,
        phone: '123456',
        address: 'Sidney No. 1 Lake Park',
        state: '1'
      }]
    }
  }

  render () {
    return (
      <BasicLayout>
        <Button icon="plus" style={{margin: '20px 0'}}>添加订单</Button>
        <div className="order-btn">
          <Button type="primary">全部</Button>
          <Button>正在派送</Button>
          <Button>完成派送</Button>
        </div>
        <Table dataSource={this.state.dataSource} columns={this.state.columns} />
      </BasicLayout>
    )
  }
}