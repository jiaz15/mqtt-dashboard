const { validateMessage } = require('./message-validator');

test('Valid message should pass', () => {
  const msg = {
    deviceId: "sensor-001",
    timestamp: 1687023456000,
    deviceType: "soilSensor",
    location: "field-A",
    temperature: 25.3,
    humidity: 60,
    soilMoisture: 32.5,
    irrigationNeeded: true
  };
  expect(validateMessage(msg)).toBe(true);
});

test('Missing field should fail', () => {
  const msg = {
    deviceId: "sensor-001",
    timestamp: 1687023456000,
    deviceType: "soilSensor",
    location: "field-A",
    temperature: 25.3,
    humidity: 60
  };
  expect(validateMessage(msg)).toBe(false);
});

test('Wrong type should fail', () => {
  const msg = {
    deviceId: "sensor-001",
    timestamp: 1687023456000,
    deviceType: "soilSensor",
    location: "field-A",
    temperature: "25.3",
    humidity: 60,
    soilMoisture: 32.5,
    irrigationNeeded: true
  };
  expect(validateMessage(msg)).toBe(false);
});
