import React, { Component } from 'react'
import BasicLayout from '@/page/site/taker';
import { Button ,Table, Divider, Modal} from 'antd'
import Api from '@/tool/api.js'
import { Link } from 'react-router-dom'

export default class Torder extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      orderId: 0,
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
        key: 'statu',
        render: statu => (
          <span>
          {statu===1?'正在配送':'配送完成'}
          </span>
        ),
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
                  id: record.id,
                  display: false
                }
              }
            }>查看详情</Link>
            <Divider type="vertical"/>
            {record.statu ===1?<a href="javascript:;"  onClick={() =>this.showModal(record.id)}>确认收货</a>:''}
            </span>
        ),
      }],
      dataSource: []
    }
  }

  showConfirm = (e) => {
    let params = {
      orderId: e
    }
    Api.post(`orders/sure`, params, r =>{
      if(r.success === true) {
        this.hideModal()
      }
    }
  )
  }

  showModal = (e) => {
    this.setState({
      visible: true,
      orderId: e
    });
  }

  hideModal = () => {
    this.setState({
      visible: false,
    });
  }

  componentDidMount () {
    this.getData()
  }

  getData =()=> {
    let takerId = sessionStorage.getItem('takerId');
    Api.get(`orders/taker/${takerId}`, null, r => {
      this.setState({
        dataSource: r.data.orders
      },function (){
        console.log(this.state.dataSource)
      })
    })
  }

  doing =()=> {
    let statu = 1;
    let takerId = sessionStorage.getItem('takerId');
    Api.get(`orders/taker/${takerId}/${statu}`, null, r => {
      this.setState({
        dataSource: r.data.orders
      },function (){
        console.log(this.state.dataSource)
      })
    })
  }

  done =()=> {
    let statu = 2;
    let takerId = sessionStorage.getItem('takerId');
    Api.get(`orders/taker/${takerId}/${statu}`, null, r => {
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
          <Button type="primary" onClick={this.getData}>全部</Button>
          <Button onClick={this.doing}>正在派送</Button>
          <Button onClick={this.done}>完成派送</Button>
        </div>
        <Table dataSource={this.state.dataSource} columns={this.state.columns} rowKey="id"/>
        <Modal
          title="提示"
          visible={this.state.visible}
          onOk={()=>this.showConfirm(this.state.orderId)}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
        >
          <p>你是否已经将订单送至目的地</p>
        </Modal>
      </BasicLayout>
    )
  }
}