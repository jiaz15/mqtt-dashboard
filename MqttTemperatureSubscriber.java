import org.eclipse.paho.client.mqttv3.*;

public class MqttTemperatureSubscriber {

    private static final String BROKER = "tcp://broker.emqx.io:1883";
    private static final String TOPIC = "test/telemetry";
    private static final String CLIENT_ID = "JavaSubscriber_" + System.currentTimeMillis();

    public static void main(String[] args) {
        try {
            MqttClient client = new MqttClient(BROKER, CLIENT_ID, null);

            MqttConnectOptions options = new MqttConnectOptions();
            options.setCleanSession(true);

            client.connect(options);
            System.out.println("Connected to MQTT Broker");

            client.subscribe(TOPIC, (topic, message) -> {
                String payload = new String(message.getPayload());
                System.out.println("Received: " + payload);

                // 此处可以改为推送给前端：WebSocket/数据库/HTTP接口等
                // sendToFrontend(payload);
            });

        } catch (MqttException e) {
            e.printStackTrace();
        }
    }
}