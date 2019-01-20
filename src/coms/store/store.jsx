import React, { Component } from 'react'
import BasicLayout from '@/page/site/index';
import { Input, Button } from 'antd'

export default class Store extends Component {
  componentDidMount () {
    this.initMap()
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
      str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
      document.getElementById("searchResultPanel").innerHTML = str;
    });
    let myValue;
    ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
      let _value = e.item.value;
        myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        document.getElementById("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
        map.clearOverlays();    //清除地图上所有覆盖物
        function myFun(){
          var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
          map.centerAndZoom(pp, 18);
          map.addOverlay(new BMap.Marker(pp));    //添加标注
        }
        var local = new BMap.LocalSearch(map, { //智能搜索
          onSearchComplete: myFun
        });
        local.search(myValue);
      });
  }

  render () {
    return (
      <BasicLayout>
        <Input.Group className="store">
            <div className="store-info">
              <label>店铺名称</label>
              <Input placeholder="请输入商家名称" style={{width: '240px'}}/>
            </div>
            <div className="store-info">
              <label>联系电话</label>
              <Input placeholder="请输入联系电话" style={{width: '240px'}}/>
            </div>
            <div className="store-info">
              <label>商家地址</label>
              <Input id="address" placeholder="请输入商家地址" style={{width: '240px'}}/>
            </div>
            <div id="container" style={{width: '400px', height: '300px'}}></div> 
            <div id="searchResultPanel" style={{border: '1px solid #C0C0C0', width: '150px', height: 'auto', display: 'none'}}></div>
          </Input.Group>
          <Button style={{margin: '20px 0 20px 40px', width: '120px'}}>保存</Button>
      </BasicLayout>
    )
  }
}