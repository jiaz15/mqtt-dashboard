// UI元素权限控制.jsx
import { usePermission } from '../hooks/usePermission';

export default function TopicManagement() {
  const canPublish = usePermission('mqtt.publish');
  
  return (
    <div>
      {canPublish && (
        <Button type="primary">发布消息</Button>
      )}
    </div>
  );
}