function validateMessage(json) {
  const requiredFields = ['deviceId', 'timestamp', 'deviceType', 'location', 'temperature', 'humidity', 'soilMoisture', 'irrigationNeeded'];

  for (const field of requiredFields) {
    if (!(field in json)) return false;
  }

  if (typeof json.temperature !== 'number' || typeof json.humidity !== 'number') return false;
  return true;
}

module.exports = { validateMessage };
