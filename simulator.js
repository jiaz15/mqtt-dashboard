const mqtt = require('mqtt');

// MQTT Broker 配置
const brokerUrl = 'ws://10.241.70.225:9001';
const topic = 'device/data';

// 建立 MQTT 连接
const client = mqtt.connect(brokerUrl, {
  clientId: 'simulator_' + Math.random().toString(16).substr(2, 8),
  clean: true,
  connectTimeout: 4000
});

client.on('connect', () => {
  console.log('✅ 已连接到 MQTT Broker，开始发送模拟数据...');

  // 每秒发送一条模拟数据
  setInterval(() => {
    const data = generateSensorData();
    client.publish(topic, JSON.stringify(data));
    console.log('📤 发送数据:', data);
  }, 1000);
});

// 生成模拟农业传感器数据
function generateSensorData() {
  const temperature = +(20 + Math.random() * 10).toFixed(2); // 20~30℃
  const humidity = +(50 + Math.random() * 20).toFixed(2);    // 50%~70%
  const soilMoisture = +(20 + Math.random() * 30).toFixed(2); // 20%~50%
  const irrigationNeeded = soilMoisture < 30; // 土壤湿度低于 30% 触发灌溉

  return {
    deviceId: 'sensor-001',
    timestamp: Date.now(),
    deviceType: 'soilSensor',
    location: 'field-A',
    temperature,
    humidity,
    soilMoisture,
    irrigationNeeded
  };
}

client.on('error', (err) => {
  console.error('❌ 连接失败:', err.message);
});
