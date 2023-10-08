import React from 'react';
import { Button, Form, Input } from 'antd';

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  password?: string;
};

const LoginForm: React.FC = () => (
  <div className='login-page'>
    <Form
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
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
);

export default LoginForm;