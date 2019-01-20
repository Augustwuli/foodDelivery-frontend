import React, { Component } from 'react'
import {Menu, Icon, Layout, Input} from 'antd'
import 'antd/dist/antd.css'

const { Header, Footer, Sider, Content } = Layout;
export default class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
  }

  render () {
    return (
      <Layout>
        <Sider style={{overflow: 'auto', height: '100vh', position: 'fixed', left: 0,}}>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
            <Menu.Item key="1">
              <Icon type="home" />
              <span className="nav-text">首页</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="user" />
              <span className="nav-text">商家信息</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="profile" />
              <span className="nav-text">订单信息</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
        <Header style={{ background: '#fff', padding: 0 ,textAlign: 'center',fontSize:'30px'}}>送餐系统</Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
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
              <Input placeholder="请输入商家地址" style={{width: '240px'}}/>
            </div>
          </Input.Group>
          </div>
        </Content>
      </Layout>
      </Layout>
    )
  }
}