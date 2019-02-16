import React, { Component } from 'react'
import BasicLayout from '@/page/site/taker';
import { Input ,Button} from 'antd'
import Api from '@/tool/api.js'

export default class TDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      disabled: false,
      display: props.location.state.display,
      orderId: props.location.state.id,
      name: '',
      phone: '',
      address: '',
      storeName: '',
      storePhone: '',
      storeAddress: '',
      olongitude: 119.302,
      olatitude: 26.080,
      slongitude: 119.302,
      slatitude: 26.080,
      disOtoS: 0,
      disPtoS: 0
    }
  }

  componentWillMount () {
    this.getData()
  }

  componentDidMount () {
    
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
        slongitude: r.data.slongitude,
        slatitude: r.data.slatitude,
        olongitude: r.data.olongitude,
        olatitude: r.data.olatitude,
        statu: r.statu,
      },function(){
        console.log('getdata'+this.state)
        this.initMap()
      })
    })
  }

  initMap () {
    const { BMap } = window; 
    let map = new BMap.Map("container"); // 创建地图实例  
    let point = new BMap.Point(119.217879, 26.026506); // 创建点坐标  
    map.addOverlay(new BMap.Marker(point)); 
    // let geolocation = new BMap.Geolocation();
    // geolocation.getCurrentPosition(function(r){
    //   if(this.getStatus() == 0){
    //     point = r.point;
    //     let mk = new BMap.Marker(r.point);
    //     map.addOverlay(mk);
    //     map.panTo(r.point);
    //   }
    //   else {
    //     alert('failed'+this.getStatus());
    //   }        
    // },{enableHighAccuracy: true})
    map.centerAndZoom(point, 14); // 初始化地图，设置中心点坐标和地图级别  
    map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
    /**
     * 设置商家，订单和派送员的位置信息
     */
    let orderIcon = new BMap.Icon("../images/order.png", new BMap.Size(50,50));
    let storeIcon = new BMap.Icon("../images/store.png", new BMap.Size(50,50));
    

    let order = new BMap.Point(this.state.olongitude, this.state.olatitude);
    let store = new BMap.Point(this.state.slongitude, this.state.slatitude);

    let orderMarker = new BMap.Marker(order, {icon:orderIcon});  // 创建标注
    map.addOverlay(orderMarker); 
    var polyline = new BMap.Polyline([
      order,
      store,
      point
    ], {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5});   //创建折线
    let disOtoS = ((map.getDistance(order,store))/1000).toFixed(2);
    let disPtoS = ((map.getDistance(point,store))/1000).toFixed(2);
    this.setState({
      disOtoS: disOtoS,
      disPtoS: disPtoS 
    },function(){
      console.log('getdata'+this.state)
    })
    map.addOverlay(polyline); 
    let storeMarker = new BMap.Marker(store, {icon:storeIcon});  // 创建标注
    map.addOverlay(storeMarker); 
  }
  /**
   * 需要以accept = () =>这种格式写函数，不然用不了this.setState
   */

  accept = () => {
    this.setState({
      disabled: true
    },function(){
      console.log('getdata'+this.state)
    })
    let takerId = sessionStorage.getItem('takerId');
    let params = {
      orderId: this.state.orderId,
      takerId: takerId
    }
    console.log(`params:${params.orderId}+${params,takerId}`)
    Api.post(`orders/accept`, params, r =>{
        console.log(r)
      }
    )
  }

  render () {
    let { disOtoS, disPtoS , display, disabled} = this.state;
    let dom = null;
    let buttonDom = null;
    if(disOtoS !==0 && disPtoS !==0 ){
      dom = <div style={{marginTop: '20px'}}>
        <p>您到店家的距离为：{disPtoS}km</p>
        <p>店家到收货地址距离为：{disOtoS}km</p>
      </div>;
    }
    if(display === true){
      buttonDom = <Button style={{width: '120px'}} type="primary" onClick={this.accept} disabled={disabled} >接受该订单</Button>;
    }
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
          <div id="searchResultPanel" style={{border: '1px solid #C0C0C0', width: '150px', height: 'auto', display: 'none'}}></div>
          </Input.Group>
          {buttonDom}
          {dom}
          <div id="container" style={{width: '800px', height: '500px', marginLeft: '200px',marginTop: '20px'}}></div> 
      </BasicLayout>
    )
  }
}