import React, { Component } from 'react'
import BasicLayout from '@/page/site/store';
import { Input ,Button} from 'antd'
import Api from '@/tool/api.js'

export default class Detail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      orderId: props.location.state.id,
      name: '',
      phone: '',
      address: '',
      takerName: '',
      takerPhone: ''
    }
  }

  componentWillMount () {
    this.getData()
  }
  
  getData () {
    let orderId = this.state.orderId;
    Api.get(`orders/orderinfo/${orderId}`, null, r => {
      this.setState({
        name: r.data.name,
        phone: r.data.phone,
        address: r.data.address,
        takerName: r.data.takerName,
        takerPhone: r.data.takerPhone
      },function(){
        console.log('getdata'+this.state)
      })
    })
  }

  render () {
    return (
      <BasicLayout>
       <Input.Group className="store">
          <div className="store-info">
            <label>收货人</label>
            <span>{this.state.name}</span>
          </div>
          <div className="store-info">
            <label>收货人联系电话</label>
            <span>{this.state.phone}</span>
          </div>
          <div className="store-info">
            <label>收货地址</label>
            <span>{this.state.address}</span>
          </div>
          <div className="store-info">
            <label>派送员姓名</label>
            <span>{this.state.takerName}</span>
          </div>
          <div className="store-info">
            <label>派送员联系电话</label>
            <span>{this.state.takerPhone}</span>
          </div>
          </Input.Group>
      </BasicLayout>
    )
  }
}