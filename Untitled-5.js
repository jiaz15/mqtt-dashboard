// MQTT连接管理.js
const options = {
  clean: true,
  connectTimeout: 4000,
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
};

export function connect(client) {
  return mqtt.connect('ws://your-broker:8083/mqtt', options);
}