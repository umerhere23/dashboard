import paho.mqtt.client as mqtt
import sqlite3
import json
import time


broker = "broker.hivemq.com"
port = 1883


db_file = 'energy_data.db'

def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))

def fetch_data():
    conn = sqlite3.connect(db_file)
    cursor = conn.cursor()
    cursor.execute("SELECT totalPower, kw, kva, powerFactor, frequency FROM energy_data WHERE id=1")
    row = cursor.fetchone()
    conn.close()
    return {
        "totalPower": row[0],
        "kw": row[1],
        "kva": row[2],
        "powerFactor": row[3],
        "frequency": row[4]
    }

def publish_messages(client):
    data = fetch_data()
    json_data = json.dumps(data)
    client.publish("energyData", json_data)
    print(f"Published {json_data} to topic energyData")


client = mqtt.Client()
client.on_connect = on_connect

client.connect(broker, port, 60)


client.loop_start()
while True:
    publish_messages(client)
    time.sleep(5)  
client.loop_stop()

client.disconnect()
