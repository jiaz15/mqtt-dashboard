//UI设计.js
import { Form, Input, Button, notification } from 'antd';

export default function Login() {
  const onFinish = (values) => {
    // 调用认证API
    axios.post('/api/auth/login', values)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        // 跳转到主页
      });
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item name="username" rules={[{ required: true }]}>
        <Input placeholder="用户名" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true }]}>
        <Input.Password placeholder="密码" />
      </Form.Item>
      <Button type="primary" htmlType="submit">登录</Button>
    </Form>
  );
}