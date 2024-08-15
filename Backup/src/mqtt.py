import paho.mqtt.client as mqtt
import time

# MQTT broker settings
broker = "broker.hivemq.com"
port = 1883

# Topics
topics = {
    "totalPower": 123.4,
    "kw": 56.7,
    "kva": 89.0,
    "powerFactor": 0.95,
    "frequency": 50.0
}

def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))

def publish_messages(client):
    for topic, value in topics.items():
        client.publish(topic, value)
        print(f"Published {value} to topic {topic}")

client = mqtt.Client()
client.on_connect = on_connect

client.connect(broker, port, 60)

client.loop_start()
publish_messages(client)
client.loop_stop()

client.disconnect()
