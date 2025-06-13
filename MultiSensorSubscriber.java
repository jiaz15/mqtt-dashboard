import org.eclipse.paho.client.mqttv3.*;
import org.json.JSONObject;

public class MultiSensorSubscriber {

    private static final String BROKER = "ws://10.241.70.225:9001";
    private static final String TOPIC = "device/data";
    private static final String CLIENT_ID = "JavaMultiSensorClient_" + System.currentTimeMillis();

    public static void main(String[] args) {
        try {
            MqttClient client = new MqttClient(BROKER, CLIENT_ID, null);

            MqttConnectOptions options = new MqttConnectOptions();
            options.setCleanSession(true);

            client.connect(options);
            System.out.println("Connected to MQTT Broker: " + BROKER);

            client.subscribe(TOPIC, (topic, message) -> {
                String payload = new String(message.getPayload());
                try {
                    JSONObject json = new JSONObject(payload);
                    String time = new java.text.SimpleDateFormat("HH:mm:ss").format(new java.util.Date(json.getLong("timestamp")));
                    double temperature = json.getDouble("temperature");
                    double humidity = json.getDouble("humidity");
                    double soilMoisture = json.getDouble("soilMoisture");

                    System.out.println("[" + time + "] Temp: " + temperature + " °C, Humidity: " + humidity + " %, Soil Moisture: " + soilMoisture + " %");
                } catch (Exception e) {
                    System.err.println("Invalid JSON message: " + payload);
                }
            });

        } catch (MqttException e) {
            e.printStackTrace();
        }
    }
}