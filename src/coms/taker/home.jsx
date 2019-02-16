import React, { Component } from 'react'
import BasicLayout from '@/page/site/taker';
import {Table, Button} from 'antd'
import { Link } from 'react-router-dom'
import Api from '@/tool/api.js'

export default class Thome extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      columns: [{
        title: '订单编号',
        dataIndex: 'id',
        key: 'id',
        render: text => <a href="javascript:;">{text}</a>,
      }, {
        title: '派送地址',
        dataIndex: 'address',
        key: 'address',
      }, {
        title: '取货地址',
        dataIndex: 'stores.address',
        key: 'stores.address',
      },
      {
        title: '联系电话',
        dataIndex: 'order_phone',
        key: 'order_phone',
      },
      {
        title: '发布时间',
        dataIndex: 'created_at',
        key: 'created_at',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Link to={
              {
                pathname: '/taker/detail',
                state: {
                  id: record.id,
                  display: true
                }
              }
            }>查看详情</Link>
          </span>
        ),
      }],
      dataSource: []
    }
  }

  componentDidMount () {
    this.getData()
  }

  getData () {
    Api.get(`orders/wait`, null, r => {
      this.setState({
        dataSource: r.data.orders
      },function (){
        console.log(this.state.dataSource)
      })
    })
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 500);
  }

  render () {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <BasicLayout>
        <div className="title">订单列表</div>
        <div style={{marginBottom: 20}}>
          <Button
              type="primary"
              disabled={!hasSelected}
              loading={loading}
            >
            查看路线
          </Button>
          <Button
              type="primary"
              onClick={this.start}
              disabled={!hasSelected}
              loading={loading}
              style={{marginLeft: 20}}
            >
            重置
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `共选 ${selectedRowKeys.length} 项` : ''}
          </span>
        </div>
        <Table rowSelection={rowSelection} dataSource={this.state.dataSource} columns={this.state.columns} rowKey="id"/>
      </BasicLayout>
    )
  }
}