import React, { Component } from 'react'
import BasicLayout from '@/page/site/taker';
import { Input ,Button} from 'antd'
import Api from '@/tool/api.js'

export default class Detail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      orderId: props.location.state.id,
      phone: '',
      address: '',
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
        phone: r.data.phone,
        address: r.data.address,
        statu: r.statu,
      },function(){
        console.log('getdata'+this.state.address,this.state.phone)
      })
    })
  }

  render () {
    return (
      <BasicLayout>
       <Input.Group className="store">
          <div className="store-info">
            <label>联系电话</label>
            <span>{this.state.phone}</span>
          </div>
          <div className="store-info">
            <label>派送地址</label>
            <span>{this.state.address}</span>
          </div>
          <div id="container" style={{width: '400px', height: '300px'}}></div> 
          <div id="searchResultPanel" style={{border: '1px solid #C0C0C0', width: '150px', height: 'auto', display: 'none'}}></div>
          </Input.Group>
          <Button style={{width: '120px'}} type="primary">接受该任务</Button>
      </BasicLayout>
    )
  }
}