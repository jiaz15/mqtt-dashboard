// 权限Hook.js
import { useSelector } from 'react-redux';

export function usePermission(permission) {
  const { role } = useSelector(state => state.auth);
  // 根据角色检查权限
}