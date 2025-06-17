
const mqtt = require('mqtt');
const fs = require('fs');
const path = require('path');

// 配置参数
const config = {
  brokerUrl: 'ws://10.241.70.225:9001',  // MQTT代理服务器地址
  topic: 'device/data',                  // 发布主题
  interval: 1000,                        // 发送间隔(毫秒)
  minTemperature: 20,                    // 最低温度(℃)
  maxTemperature: 30,                    // 最高温度(℃)
  minHumidity: 50,                       // 最低湿度(%)
  maxHumidity: 70,                       // 最高湿度(%)
  minSoilMoisture: 20,                   // 最低土壤湿度(%)
  maxSoilMoisture: 50                    // 最高土壤湿度(%)
};

// 设备类型配置
const deviceTypes = {
  soilSensor: {
    name: "土壤传感器",
    fields: ["temperature", "humidity", "soilMoisture", "irrigationNeeded"]
  },
  airSensor: {
    name: "空气传感器", 
    fields: ["temperature", "humidity", "airQuality"]
  },
  waterSensor: {
    name: "水质传感器",
    fields: ["phValue", "turbidity", "dissolvedOxygen"]
  }
};

// 位置配置
const locations = [
  { id: "field-A", name: "A号农田" },
  { id: "field-B", name: "B号农田" },
  { id: "greenhouse-1", name: "1号温室" }
];

// 创建MQTT客户端
const client = mqtt.connect(config.brokerUrl, {
  clientId: 'simulator_' + Math.random().toString(16).substr(2, 8),
  clean: true,
  connectTimeout: 4000
});

// 连接成功回调
client.on('connect', () => {
  console.log('✅ 已连接到 MQTT Broker，开始发送模拟数据...');
  
  setInterval(() => {
    // 随机选择设备类型和位置
    const deviceTypeKeys = Object.keys(deviceTypes);
    const randomType = deviceTypeKeys[Math.floor(Math.random() * deviceTypeKeys.length)];
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    
    const data = generateSensorData(randomType, randomLocation.id);
    client.publish(config.topic, JSON.stringify(data));
    console.log(`📤 发送 ${deviceTypes[randomType].name} 数据:`, data);
  }, config.interval);
});

// 生成传感器数据
function generateSensorData(deviceType, location) {
  const baseData = {
    deviceId: `${deviceType}-${Math.floor(1000 + Math.random() * 9000)}`,
    timestamp: Date.now(),
    deviceType: deviceType,
    location: location,
    status: Math.random() > 0.1 ? "normal" : "warning" // 10%概率产生警告状态
  };

  // 根据设备类型添加特定字段
  switch(deviceType) {
    case 'soilSensor':
      Object.assign(baseData, {
        temperature: getRandom(config.minTemperature, config.maxTemperature),
        humidity: getRandom(config.minHumidity, config.maxHumidity),
        soilMoisture: getRandom(config.minSoilMoisture, config.maxSoilMoisture),
        irrigationNeeded: Math.random() > 0.7 // 30%概率需要灌溉
      });
      break;
      
    case 'airSensor':
      Object.assign(baseData, {
        temperature: getRandom(config.minTemperature - 5, config.maxTemperature - 5),
        humidity: getRandom(config.minHumidity - 10, config.maxHumidity - 10),
        airQuality: getRandom(0, 100) > 80 ? "poor" : "good" // AQI模拟
      });
      break;
      
    case 'waterSensor':
      Object.assign(baseData, {
        phValue: getRandom(6.5, 7.5),
        turbidity: getRandom(0, 10),
        dissolvedOxygen: getRandom(5, 12)
      });
      break;
  }
  
  return baseData;
}

// 辅助函数：生成指定范围的随机数
function getRandom(min, max, fixed = 2) {
  return parseFloat((min + Math.random() * (max - min)).toFixed(fixed));
}

// 错误处理
client.on('error', (err) => {
  console.error('❌ 连接失败:', err.message);
});

// 断开连接处理
client.on('close', () => {
  console.log('⚠️ 连接已断开，尝试重新连接...');
});