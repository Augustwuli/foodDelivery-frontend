import React, { Component } from 'react'
import BasicLayout from '@/page/site/store';
import { Input, Button, Form,} from 'antd'
import Api from '@/tool/api.js'
let storeId = 0;
let longitude = '';
let latitude = '';

export default class Store extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      phone: '',
      address: '',
      longitude: '',
      latitude:'',
      statu: 0
    }
  }

  componentWillMount () {
    storeId = sessionStorage.getItem('storeId');
    this.getData()
  }

  componentDidMount () {
    this.initMap()
  }

  componentWillUnmount () {
    sessionStorage.setItem('storeId', storeId)
  }
  getData () {
    let storeId = sessionStorage.getItem('storeId')
    Api.get(`stores/info/${storeId}`, null, r => {
      this.setState({
        name: r.data.name,
        phone: r.data.phone,
        longitude: r.data.longitude,
        latitude: r.data.latitude,
        statu: r.statu,
        address: r.data.address
      },function(){
        sessionStorage.setItem('storeId',r.data.userId)
        console.log('getdata'+this.state.name,this.state.phone,this.state.longitude,this.state.latitude, this.state.address)
      })
    })
  }

  initMap () {
    const { BMap } = window; 
    let map = new BMap.Map("container"); // 创建地图实例  
    let point = new BMap.Point(119.302, 26.080); // 创建点坐标  
    map.centerAndZoom(point, 16); // 初始化地图，设置中心点坐标和地图级别  
    map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
    let ac = new BMap.Autocomplete(    //建立一个自动完成的对象
      {
        "input" : "address",
        "location" : map
    });
    document.getElementById("address").addEventListener("focus", function(){
      document.getElementById('container').style.display = 'block'
    });
    ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
      let str = "";
      let _value = e.fromitem.value;
      let value = "";
      if (e.fromitem.index > -1) {
        value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
      }    
      str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
      value = "";
      if (e.toitem.index > -1) {
        _value = e.toitem.value;
        value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
      }    
      // str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
      // document.getElementById("searchResultPanel").innerHTML = str;
    });
    let myValue;
    ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
      let _value = e.item.value;
        myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        document.getElementById("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
        map.clearOverlays();    //清除地图上所有覆盖物
        function myFun(){
          var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
          /**
           * 全局的经纬度
           */
          latitude = pp.lat;
          longitude = pp.lng;
          map.centerAndZoom(pp, 18);
          map.addOverlay(new BMap.Marker(pp));    //添加标注
        }
        var local = new BMap.LocalSearch(map, { //智能搜索
          onSearchComplete: myFun
        });
        local.search(myValue);
        console.log(local);
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.longitude = longitude.toString();
        values.latitude = latitude.toString();
        values.storeId = storeId;
        console.log(values)
        this.submit(values);
      }
    });
  }

  submit (params) {
    Api.post('stores/save', params, r => {
      console.log(r)
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    return (
      <BasicLayout>
        <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item 
          label="店铺名称"
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入店铺名称！' }],
            initialValue: this.state.name
          })(
            <Input style={{width: '240px'}}/>
          )}
        </Form.Item>
        <Form.Item
          label="联系电话"
        >
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入联系电话' }],
            initialValue: this.state.phone
          })(
            <Input style={{width: '240px'}}/>
          )}
        </Form.Item>
        <Form.Item
          label="店铺地址"
        >
          {getFieldDecorator('address', {
            rules: [{ required: true, message: '请输入店铺地址' }],
            initialValue: this.state.address
          })(
            <Input id="address" style={{width: '240px'}}/>
          )}
        </Form.Item>
        <div id="container" style={{width: '400px', height: '300px', marginLeft: '420px', display: 'none'}}></div> 
        <div id="searchResultPanel" style={{border: '1px solid #C0C0C0', width: '150px', height: 'auto', display: 'none'}}></div>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            保存
          </Button>
        </Form.Item>
      </Form>
      </BasicLayout>
    )
  }
}
Store = Form.create()(Store);