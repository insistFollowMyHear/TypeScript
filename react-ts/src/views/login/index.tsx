import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';
import request from '../../request';
import qs from 'qs';
import './style.css'

const onFinish = (values: any, changeLoginStatus: Function) => {
  request.post('/api/login', qs.stringify({
    password: values.password
  }), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(res => {
    const data: Boolean = res.data;
    if (data) {
      changeLoginStatus(true)
    } else {
      message.error('登录失败')
    }
  });
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  password?: string;
};

class LoginForm extends Component {
  state = {
    isLogin: false
  }

  changeLoginStatus = (status: Boolean) => {
    this.setState({
      isLogin: status
    })
  }

  render(): React.ReactNode {
    const { isLogin } = this.state

    return isLogin ? <Navigate to={'/'} /> : (
      <div className='login-page'>
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={ (e) => onFinish(e, this.changeLoginStatus) }
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelAlign="left"
        >
          <Form.Item<FieldType>
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
            <Button type="primary" htmlType="submit"  style={{"marginTop": "10px"}}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default LoginForm;