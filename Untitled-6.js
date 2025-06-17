// 路由守卫组件.js
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, requiredRole }) {
  const { role } = useSelector(state => state.auth);
  
  if (!hasPermission(role, requiredRole)) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

function hasPermission(userRole, requiredRole) {
  // 实现角色权限检查逻辑
}