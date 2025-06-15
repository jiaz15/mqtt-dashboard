const mqtt = require('mqtt');
const { InfluxDB, Point } = require('@influxdata/influxdb-client');
require('dotenv').config();

const client = mqtt.connect('ws://localhost:9001');
const influxDB = new InfluxDB({ url: process.env.INFLUX_URL, token: process.env.INFLUX_TOKEN });
const writeApi = influxDB.getWriteApi(process.env.INFLUX_ORG, process.env.INFLUX_BUCKET);

client.on('connect', () => {
    console.log('Connected to MQTT broker');
    client.subscribe('device/data');
});

client.on('message', (topic, message) => {
    const data = JSON.parse(message.toString());
    const point = new Point('iot_data')
        .tag('deviceId', data.deviceId)
        .stringField('deviceType', data.deviceType)
        .stringField('location', data.location)
        .floatField('temperature', data.temperature)
        .floatField('humidity', data.humidity)
        .floatField('soilMoisture', data.soilMoisture)
        .booleanField('irrigationNeeded', data.irrigationNeeded)
        .timestamp(new Date(data.timestamp));

    writeApi.writePoint(point);
});
