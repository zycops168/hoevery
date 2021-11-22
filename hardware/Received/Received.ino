#include <SPI.h>
#include <LoRa.h>
#include <ArduinoJson.h>
#include <WiFi.h>
#include <ESPmDNS.h>
#include <WiFiUdp.h>
#include <ArduinoOTA.h>
#include <WiFiManager.h>
#include <PubSubClient.h>

//define the pins used by the transceiver module
#define ss 5
#define rst 15
#define dio0 2
////////////////////////////////////////////////////////////////////////////////////////
unsigned long last_time = 0;
unsigned long period = 5000;
////////////////////////////////////////////////////////////////////////////////////////
TaskHandle_t Task1;
TaskHandle_t Task2;
const int buttonPin = 4;
int buttonState = 0;
String currentcar_id;
String currentlat;
String currentlng;
float sum_lat;
float sum_lng;
////////////////////////////////////////////////////////////////////////////////////////
const char* mqttServer = "203.150.107.212";
const int mqttPort = 1883;
const char* mqttUser = "";
const char* mqttPassword = "";
WiFiClient espClient;
PubSubClient client(espClient);
////////////////////////////////////////////////////////////////////////////////////////
//led
int LEDWIFI = 21;
int LEDMQTT = 22;
////////////////////////////////////////////////////////////////////////////////////////
void mqtt() {
  // mqtt
  client.setServer(mqttServer, mqttPort);
  if (client.connect("ESP32Client", mqttUser, mqttPassword )) {
    Serial.println("Mqtt_connected");

  } else {
    Serial.print("failed with state ");
  }
}
////////////////////////////////////////////////////////////////////////////////////////
void ota() {
  ArduinoOTA
  .onStart([]() {
    String type;
    if (ArduinoOTA.getCommand() == U_FLASH)
      type = "sketch";
    else          // แบบ U_SPIFFS
      type = "filesystem";
    Serial.println("Start updating " + type);

  })
  .onEnd([]() {
    Serial.println("\nEnd");
    ESP.restart();
  })
  .onProgress([](unsigned int progress, unsigned int total) {
    Serial.printf("Progress: %u%%\r", (progress / (total / 100)));
  })
  .onError([](ota_error_t error) {
    Serial.printf("Error[%u]: ", error);
    if (error == OTA_AUTH_ERROR) Serial.println("Auth Failed");
    else if (error == OTA_BEGIN_ERROR) Serial.println("Begin Failed");
    else if (error == OTA_CONNECT_ERROR) Serial.println("Connect Failed");
    else if (error == OTA_RECEIVE_ERROR) Serial.println("Receive Failed");
    else if (error == OTA_END_ERROR) Serial.println("End Failed");
  });

  ArduinoOTA.begin();
  Serial.println("Ready");
  Serial.println(WiFi.localIP());
}
////////////////////////////////////////////////////////////////////////////////////////
void setup() {
  Serial.begin(115200);
  pinMode(LEDWIFI, OUTPUT);
  pinMode(LEDMQTT, OUTPUT);
  pinMode(buttonPin, INPUT);
  //task 1
  xTaskCreatePinnedToCore(
    TaskA,   /* Task function. */
    "Task1",     /* name of task. */
    10000,       /* Stack size of task */
    NULL,        /* parameter of the task */
    1,           /* priority of the task */
    &Task1,      /* Task handle to keep track of created task */
    0);          /* pin task to core 0 */
  delay(5000);
  //task 2
  xTaskCreatePinnedToCore(
    TaskB,   /* Task function. */
    "Task2",     /* name of task. */
    10000,       /* Stack size of task */
    NULL,        /* parameter of the task */
    1,           /* priority of the task */
    &Task2,      /* Task handle to keep track of created task */
    1);          /* pin task to core 1 */
  delay(5000);
}
////////////////////////////////////////////////////////////////////////////////////////
void TaskA( void * pvParameters ) {
  Serial.print("Task1 running on core ");
  Serial.println(xPortGetCoreID());
  buttonState = digitalRead(buttonPin);
  WiFi.mode(WIFI_STA);
  WiFiManager wm;
  bool res;
  res = wm.autoConnect();
  if (!res) {
    Serial.println("Failed to connect");
    digitalWrite(LEDWIFI, LOW);
    ESP.restart();
  }
  else {
    Serial.println("connected...yeey :)");
    digitalWrite(LEDWIFI, HIGH);
  }
  ota();
  mqtt();
  while (true) {
    ArduinoOTA.handle();
    buttonState = digitalRead(buttonPin);
    if (buttonState == HIGH) {
      digitalWrite(LEDWIFI, LOW),
                   wm.resetSettings();
    } else {
    }
    if (client.connect("ESP32Client", mqttUser, mqttPassword )) {
      //Led
      digitalWrite(LEDMQTT, HIGH);
    } else {
      //led
      digitalWrite(LEDMQTT, LOW);
    }
  }
}
////////////////////////////////////////////////////////////////////////////////////////
void TaskB( void * pvParameters ) {
  Serial.print("Task2 running on core ");
  Serial.println(xPortGetCoreID());
  while (!Serial);
  Serial.println("LoRa Receiver");

  //setup LoRa transceiver module
  LoRa.setPins(ss, rst, dio0);

  //replace the LoRa.begin(---E-) argument with your location's frequency
  //433E6 for Asia
  //866E6 for Europe
  //915E6 for North America
  while (!LoRa.begin(433E6)) {
    Serial.println(".");
    delay(500);
  }
  // Change sync word (0xF3) to match the receiver
  // The sync word assures you don't get LoRa messages from other LoRa transceivers
  // ranges from 0-0xFF
  LoRa.setSyncWord(0xF3);
  Serial.println("LoRa Initializing OK!");

  while (true) {
    int packetSize = LoRa.parsePacket();
    if (packetSize) {
      // received a packet
      Serial.print("Received packet ");
      // read packet
      while (LoRa.available()) {
        currentcar_id = LoRa.readStringUntil('|');
        Serial.println(currentcar_id);
        currentlat = LoRa.readStringUntil('|');
        sum_lat = currentlat.toFloat();
        char lati[20];
        sprintf(lati, "%06f", sum_lat);
        Serial.println(sum_lat,6);
        currentlng = LoRa.readStringUntil('|');
        sum_lng = currentlng.toFloat();
        Serial.println(sum_lng,6);
        char longi[20];
        sprintf(longi, "%06f", sum_lng);
        
        StaticJsonBuffer<300> JSONbuffer;
        JsonObject& JSONencoder = JSONbuffer.createObject();
        JSONencoder["car_id"]   =currentcar_id;
        JSONencoder["latitude"] =lati;
        JSONencoder["longitude"]=longi;
        char JSONmessageBuffer[100];
        JSONencoder.printTo(JSONmessageBuffer, sizeof(JSONmessageBuffer));
        Serial.println("Sending message to MQTT topic..");
        Serial.println(JSONmessageBuffer);
        if (client.publish("excavator/location", JSONmessageBuffer) == true) {
          Serial.println("Success sending message");
        } else {
          Serial.println("Error sending message");
        }
        // print RSSI of packet
        Serial.print(" with RSSI ");
        Serial.println(LoRa.packetRssi());
      }
    }
  }
}
void loop() {


}
