// 权限定义.js
export const ROLES = {
  ADMIN: {
    routes: ['/dashboard', '/settings', '/topics'],
    mqtt: { publish: true, subscribe: true }
  },
  USER: {
    routes: ['/dashboard', '/topics'],
    mqtt: { publish: false, subscribe: true }
  },
  GUEST: {
    routes: ['/dashboard'],
    mqtt: { publish: false, subscribe: false }
  }
};