import React, { Component } from 'react'
import BasicLayout from '@/page/site/taker';
import { Input, Button, Form,} from 'antd'
import Api from '@/tool/api.js'
let takerId = 0;

export default class Taker extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      phone: '',
      statu: 0
    }
  }

  componentWillMount () {
    takerId = sessionStorage.getItem('takerId');
    this.getData()
  }

  componentWillUnmount () {
    sessionStorage.setItem('takerId', takerId)
  }

  getData () {
    let takerId = sessionStorage.getItem('takerId')
    Api.get(`takers/info/${takerId}`, null, r => {
      this.setState({
        name: r.data.name,
        phone: r.data.phone,
        statu: r.statu,
      },function(){
        sessionStorage.setItem('takerId',r.data.userId)
        console.log('getdata'+this.state.name,this.state.phone)
      })
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.takerId = takerId;
        console.log(values)
        this.submit(values);
      }
    });
  }

  submit (params) {
    Api.post('takers/save', params, r => {
      console.log(r)
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    return (
      <BasicLayout>
        <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item 
          label="姓名"
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入您的姓名！' }],
            initialValue: this.state.name
          })(
            <Input style={{width: '240px'}}/>
          )}
        </Form.Item>
        <Form.Item
          label="联系电话"
        >
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入您的联系电话' }],
            initialValue: this.state.phone
          })(
            <Input style={{width: '240px'}}/>
          )}
        </Form.Item>
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
Taker = Form.create()(Taker);