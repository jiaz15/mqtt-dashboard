import paho.mqtt.client as mqtt
import time
import random

# MQTT Configuration
BROKER = "localhost"
PORT = 1883
KEEPALIVE = 60

# Topics
SENSOR_MOISTURE_TOPIC = "sensor/fieldA/moisture"
SENSOR_TEMP_TOPIC = "sensor/fieldA/temperature"
PUMP_CONTROL_TOPIC = "actuator/pumpA/control"

# Sensor simulator class
class SensorSimulator:
    def __init__(self, client):
        self.client = client
        self.moisture = 50.0  # Initial moisture level (%)
        self.temperature = 25.0  # Initial temperature (°C)
        
    def publish_sensor_data(self):
        # Simulate moisture reduction (evaporation)
        self.moisture = max(20.0, self.moisture - random.uniform(1.0, 3.0))
        
        # Simulate temperature fluctuation
        self.temperature = min(35.0, max(15.0, self.temperature + random.uniform(-1.0, 1.0)))
        
        # Publish sensor readings
        self.client.publish(SENSOR_MOISTURE_TOPIC, f"{self.moisture:.1f}")
        self.client.publish(SENSOR_TEMP_TOPIC, f"{self.temperature:.1f}")
        
        print(f"[SENSOR] Published: {SENSOR_MOISTURE_TOPIC} = {self.moisture:.1f}%")
        print(f"[SENSOR] Published: {SENSOR_TEMP_TOPIC} = {self.temperature:.1f}°C")

# Irrigation controller class
class IrrigationController:
    def __init__(self, client):
        self.client = client
        self.pump_status = "OFF"
        self.moisture_threshold = 30.0  # Irrigation threshold (%)
        
    def on_message(self, client, userdata, msg):
        if msg.topic == SENSOR_MOISTURE_TOPIC:
            moisture = float(msg.payload.decode())
            
            # Irrigation decision logic
            if moisture < self.moisture_threshold and self.pump_status == "OFF":
                self.activate_pump()
            elif moisture >= self.moisture_threshold + 5 and self.pump_status == "ON":
                self.deactivate_pump()
                
    def activate_pump(self):
        self.pump_status = "ON"
        self.client.publish(PUMP_CONTROL_TOPIC, "ON", qos=2)
        print(f"[CONTROLLER] Pump activated (Moisture: {self.moisture_threshold}%)")
        
    def deactivate_pump(self):
        self.pump_status = "OFF"
        self.client.publish(PUMP_CONTROL_TOPIC, "OFF", qos=2)
        print(f"[CONTROLLER] Pump deactivated (Moisture: {self.moisture_threshold + 5}%)")

# Main execution
if __name__ == "__main__":
    # Initialize MQTT client
    client = mqtt.Client("Irrigation_Dashboard")
    
    # Initialize components
    sensors = SensorSimulator(client)
    controller = IrrigationController(client)
    
    # Set message callback
    client.on_message = controller.on_message
    
    # Connect and subscribe
    client.connect(BROKER, PORT, KEEPALIVE)
    client.subscribe(SENSOR_MOISTURE_TOPIC)
    client.loop_start()
    
    try:
        # Simulate continuous sensor data collection
        while True:
            sensors.publish_sensor_data()
            time.sleep(5)  # Publish every 5 seconds
    except KeyboardInterrupt:
        print("\nSimulation stopped by user")
    finally:
        # Ensure proper cleanup
        controller.deactivate_pump()
        client.loop_stop()
        client.disconnect()    
