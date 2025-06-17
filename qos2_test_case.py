import paho.mqtt.client as mqtt
import time

# Configuration
BROKER = "localhost"
PORT = 1883
TOPIC = "test/qos2"

# Test variables
messages_received = []

# Callback for message reception
def on_message(client, userdata, msg):
    messages_received.append(msg.payload.decode())
    print(f"[RECEIVED] {msg.topic}: {msg.payload.decode()}")

# Initialize MQTT client
client = mqtt.Client("QoS2_Tester")
client.on_message = on_message

# Connect to broker and subscribe
client.connect(BROKER, PORT)
client.subscribe(TOPIC, qos=2)
client.loop_start()

# Publish test message with QoS 2
client.publish(TOPIC, "qos2_validation", qos=2)
print(f"[PUBLISH] Sent QoS 2 message to {TOPIC}")

# Allow time for message delivery
time.sleep(5)

# Cleanup
client.loop_stop()
client.disconnect()

# Verify test result
assert len(messages_received) == 1, "QoS 2 delivery failed (expected exactly 1 message)"
print("[TEST PASSED] QoS 2 exactly-once delivery confirmed")    
