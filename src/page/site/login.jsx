import React, { Component } from 'react'
import {Form, Icon, Input, Button, Radio, Alert} from 'antd'
import 'antd/dist/antd.css'
import Api from '@/tool/api.js'

export default class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {},
      toast: false,
      statu: 0,
      messgae: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.Login(values);
      }
    });
  }

  Login (params) {
    Api.post('users/login', params, r => {
      this.setState({
        message: r.message,
        toast: true,
        statu: r.statu
      },function(){
        console.log('getdata'+this.state.message,this.state.toast,this.state.statu)
      })
      setTimeout(()=>{
        this.setState({
          toast: false,
        },function(){
          console.log('getdata'+this.state.toast)
        })
        if(r.statu === 1) {
          sessionStorage.setItem('storeId', r.data.userId)
          if(params.type === '1'){
            this.props.history.push("/store/home");
          }else if(params.type === '2'){
            sessionStorage.setItem('takerId', r.data.userId)
            this.props.history.push("/taker/home");
          }
        }
      },1000);
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    let { toast ,message,statu } = this.state;
    let dom = null;
    if (toast) {
      dom = <Alert className="toast" message={message} type={statu===1?'success':'error'} />
    }
    return (
      <div className="login-page">
        {dom}
        <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('type')(
            <Radio.Group>
              <Radio value="1">商家</Radio>
              <Radio value="2">派送员</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
      </div>
    )
  }
}
Login = Form.create()(Login);