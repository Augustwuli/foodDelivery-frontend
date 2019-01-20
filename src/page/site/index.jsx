import React, { Component } from 'react'
import {Menu, Icon, Layout, Input, Button} from 'antd'
import 'antd/dist/antd.css'
import { Link } from 'react-router-dom'

const { Header, Sider, Content } = Layout;
export default class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    // this.initMap()
  }

  render () {
    return (
      <Layout>
        <Sider style={{overflow: 'auto', height: '100vh', position: 'fixed', left: 0,}}>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
            <Menu.Item key="1">
              <Link to="/">
                <Icon type="home" />
                <span className="nav-text">首页</span>
              </Link> 
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/store">
                <Icon type="user" />
                <span className="nav-text">商家信息</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/order">
                <Icon type="profile" />
                <span className="nav-text">订单信息</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
        <Header style={{ background: '#fff', padding: 0 ,textAlign: 'center',fontSize:'30px'}}>送餐系统【商家端】</Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
          {this.props.children}
          </div>
        </Content>
      </Layout>
      </Layout>
    )
  }
}