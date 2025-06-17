// 表单组件.js
import { useState } from 'react';
import mqtt from 'mqtt';

export default function TopicSimulator() {
  const [form] = Form.useForm();
  const [client, setClient] = useState(null);

  const handlePublish = (values) => {
    if (!client) return;
    
    client.publish(
      values.topic,
      values.payload,
      { qos: values.qos, retain: values.retain }
    );
  };

  return (
    <Form form={form} onFinish={handlePublish}>
      <Form.Item name="topic" rules={[{ required: true }]}>
        <Input placeholder="topic/to/publish" />
      </Form.Item>
      <Form.Item name="qos" initialValue={0}>
        <Select options={[
          { value: 0, label: 'QoS 0' },
          { value: 1, label: 'QoS 1' },
          { value: 2, label: 'QoS 2' }
        ]}/>
      </Form.Item>
      <Form.Item name="payload">
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item name="retain" valuePropName="checked">
        <Checkbox>Retain Message</Checkbox>
      </Form.Item>
      <Button type="primary" htmlType="submit">发布</Button>
    </Form>
  );
}