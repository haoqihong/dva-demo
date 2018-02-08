import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './Users.css';
import UserList from '../components/Users/Users';
import { Button, Modal, Input } from 'antd';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      creatVal: {
        name: '',
        email: '',
        website: '',
      }
    }
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  changeModel = (e) => {
    this.setState({
      creatVal: {
        ...this.state.creatVal,
        [e.target.name]: e.target.value
      }
    })
  }
  create = () => {
    this.props.dispatch({
      type: 'users/create',
      payload: {
        values: {
          ...this.state.creatVal
        }
      }
    })
  }
  render() {
    let { list } = this.props;
    let { name, email, website } = this.state.creatVal;
    return (
      <div className={styles.normal}>
        <Button type="primary" onClick={this.showModal}>添加数据</Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.create}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
          Name: <Input placeholder="用户名" name="name" value={name} onChange={(e) => this.changeModel(e)} />
          Email:<Input placeholder="邮箱" name="email" value={email} onChange={(e) => this.changeModel(e)} />
          Website: <Input placeholder="网站" name="website" value={website} onChange={(e) => this.changeModel(e)} />
          {name + '+' + email + '+' + website}
        </Modal>
        <UserList list={list} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    list: state.users.list
  };
}

export default connect(mapStateToProps)(Users);
