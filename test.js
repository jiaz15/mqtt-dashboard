import mqtt from 'mqtt'

// 连接你的 broker
const client = mqtt.connect('ws://10.241.70.225:9001')  // 如果用 websockets

client.on('connect', () => {
  console.log('已连接 MQTT broker')
  client.subscribe('test/topic', (err) => {
    if (!err) {
      console.log('已订阅 test/topic')
    }
  })

  // 可选：每 5 秒发一条测试消息
  setInterval(() => {
    client.publish('test/topic', 'Hello from 模拟器')
  }, 5000)
})

client.on('message', (topic, message) => {
  console.log(`收到消息：${topic} - ${message.toString()}`)
})
