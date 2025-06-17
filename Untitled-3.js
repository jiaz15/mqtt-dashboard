// 模拟API响应.js

export const mockLogin = (credentials) => {
  if (credentials.username === 'admin' && credentials.password === '123456') {
    return Promise.resolve({
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    });
  }
  return Promise.reject(new Error('认证失败'));
};