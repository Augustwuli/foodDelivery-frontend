import React, { Component } from 'react'
import BasicLayout from '@/page/site/store';
import { Button ,Table } from 'antd'
import Api from '@/tool/api.js'
import { Link } from 'react-router-dom'

export default class Order extends Component {
  constructor (props) {
    super(props)
    this.state = {
      columns: [{
        title: '订单编号',
        dataIndex: 'id',
        key: 'id',
        render: text => <a href="javascript:;">{text}</a>,
      }, {
        title: '派送员',
        dataIndex: 'takers.taker_name',
        key: 'takers.taker_name',
      }, {
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
        key: 'statu',
        render: statu => (
          <span>
          {statu ===0 ? '等待配送': statu===1? '正在配送':'配送完成'}
          </span>
        ),
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            {record.statu === 0?<Link to={
              {
                pathname: '/store/editorder',
                state: {
                  id: record.id
                }
              }
            }>修改</Link>:<Link to={
              {
                pathname: '/store/detail',
                state: {
                  id: record.id
                }
              }
            }>查看详情</Link>}
          </span>
        ),
      }],
      dataSource: []
    }
  }

  componentDidMount () {
    this.getData()
  }

  getData =()=> {
    let storeId = sessionStorage.getItem('storeId')
    Api.get(`orders/list/${storeId}`, null, r => {
      console.log(r)
      this.setState({
        dataSource: r.data.orders
      },function (){
        console.log(this.state.dataSource)
      })
    })
  }
  
  doing =()=> {
    let statu = 1;
    let storeId = sessionStorage.getItem('storeId');
    Api.get(`orders/list/${storeId}/${statu}`, null, r => {
      this.setState({
        dataSource: r.data.orders
      },function (){
        console.log(this.state.dataSource)
      })
    })
  }

  done =()=> {
    let statu = 2;
    let storeId = sessionStorage.getItem('storeId');
    Api.get(`orders/list/${storeId}/${statu}`, null, r => {
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
        <Link to="/store/addorder">
          <Button icon="plus" style={{margin: '20px 0'}}>添加订单</Button>
        </Link>
        <div className="order-btn">
          <Button type="primary" onClick={this.getData}>全部</Button>
          <Button onClick={this.doing}>正在派送</Button>
          <Button onClick={this.done}>完成派送</Button>
        </div>
        <Table dataSource={this.state.dataSource} columns={this.state.columns} rowKey="id"/>
      </BasicLayout>
    )
  }
}