const mqtt = require('mqtt');

const options = {
  reconnectPeriod: 2000,
  connectTimeout: 5000,
};

const client = mqtt.connect('ws://10.241.70.225:9001', options);

client.on('connect', () => {
  console.log('✅ 已连接 MQTT Broker');
  client.subscribe('device/data', (err) => {
    if (!err) {
      console.log('✅ 已订阅 topic: device/data');
    }
  });
});

client.on('reconnect', () => {
  console.log('🔄 正在尝试重连...');
});

client.on('close', () => {
  console.log('❌ 连接已断开');
});

client.on('error', (err) => {
  console.error('🚨 连接出错：', err.message);
});

client.on('message', (topic, message) => {
  console.log(`📩 收到消息（${topic}）: ${message.toString()}`);
});
