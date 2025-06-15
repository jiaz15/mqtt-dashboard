const express = require('express');
const router = express.Router();
const { InfluxDB } = require('@influxdata/influxdb-client');
require('dotenv').config();

const influxDB = new InfluxDB({ url: process.env.INFLUX_URL, token: process.env.INFLUX_TOKEN });
const queryApi = influxDB.getQueryApi(process.env.INFLUX_ORG);

router.get('/', async (req, res) => {
    const fluxQuery = `
        from(bucket: "${process.env.INFLUX_BUCKET}")
            |> range(start: -1d)
            |> filter(fn: (r) => r._measurement == "iot_data")
    `;

    let result = [];

    try {
        for await (const { values, tableMeta } of queryApi.iterateRows(fluxQuery)) {
            const o = tableMeta.toObject(values);
            result.push(o);
        }
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
