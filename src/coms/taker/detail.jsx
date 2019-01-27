import React, { Component } from 'react'
import BasicLayout from '@/page/site/taker';
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
      storeName: '',
      storePhone: '',
      storeAddress: ''
    }
  }

  componentWillMount () {
    this.getData()
  }

  getData () {
    let orderId = this.state.orderId;
    Api.get(`orders/takerinfo/${orderId}`, null, r => {
      console.log(r)
      this.setState({
        name: r.data.name,
        phone: r.data.phone,
        address: r.data.address,
        storeName: r.data.storeName,
        storePhone: r.data.storePhone,
        storeAddress: r.data.storeAddress,
        statu: r.statu,
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
            <label>商家</label>
            <span>{this.state.storeName}</span>
          </div>
          <div className="store-info">
            <label>商家联系电话</label>
            <span>{this.state.storePhone}</span>
          </div>
          <div className="store-info">
            <label>商家地址</label>
            <span>{this.state.storeAddress}</span>
          </div>
          <div id="container" style={{width: '400px', height: '300px'}}></div> 
          <div id="searchResultPanel" style={{border: '1px solid #C0C0C0', width: '150px', height: 'auto', display: 'none'}}></div>
          </Input.Group>
          <Button style={{width: '120px'}} type="primary">接受该任务</Button>
      </BasicLayout>
    )
  }
}