#include <WiFi.h>
#include <ESPmDNS.h>
#include <WiFiUdp.h>
#include <ArduinoOTA.h>
#include <WebServer.h>     
#include <AutoConnect.h>
#include <TinyGPS++.h>
#include <HardwareSerial.h>

#define RXPin (22)
#define TXPin (21)
TaskHandle_t Task1;
TaskHandle_t Task2;
////////////////////////////////////////////////////////////////////////////////////////

WebServer Server;          
AutoConnect      Portal(Server);
static const uint32_t GPSBaud = 9600;
TinyGPSPlus gps;

// The serial connection to the GPS device
HardwareSerial ss(2);

int LED = 2;
void displayInfo()
{
Serial.print(F("Location: "));
if (gps.location.isValid())
{
Serial.print(gps.location.lat(), 6);
Serial.print(F(","));
Serial.print(gps.location.lng(), 6);
}
else
{
Serial.print(F("INVALID"));
}

Serial.println();
}

void rootPage() {
  char content[] = "Hello, world";
  Server.send(200, "text/plain", content);

}
////////////////////////////////////////////////////////////////////////////////////////
void setup() {
  Serial.begin(115200); 
   ss.begin(GPSBaud, SERIAL_8N1, RXPin, TXPin, false);
  Server.on("/", rootPage);
  if (Portal.begin()) {
    Serial.println("WiFi connected: " + WiFi.localIP().toString());
  }
  // ส่วนของ WiFi
  Serial.println("Booting");
  WiFi.mode(WIFI_STA);
 
  // หากเชื่อมต่อไม่สำเร็จ รอ 5 วินาทีแล้ว Restart ใหม่
  while (WiFi.waitForConnectResult() != WL_CONNECTED) {
    Serial.println("Connection Failed! Rebooting...");
    delay(5000);
    ESP.restart();
  }


 //task 1 
  xTaskCreatePinnedToCore(
                    TaskGps,   /* Task function. */
                    "Task1",     /* name of task. */
                    10000,       /* Stack size of task */
                    NULL,        /* parameter of the task */
                    1,           /* priority of the task */
                    &Task1,      /* Task handle to keep track of created task */
                    0);          /* pin task to core 0 */                  
  delay(500); 
   //task 2 
  xTaskCreatePinnedToCore(
                    TaskMqtt,   /* Task function. */
                    "Task2",     /* name of task. */
                    10000,       /* Stack size of task */
                    NULL,        /* parameter of the task */
                    1,           /* priority of the task */
                    &Task2,      /* Task handle to keep track of created task */
                    1);          /* pin task to core 1 */
    delay(500); 
    // ส่วนของ OTA
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
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

// กำหนด pinMode เหมือนเขียนโปรแกรมปกติ
  pinMode(LED, OUTPUT);
}
////////////////////////////////////////////////////////////////////////////////////////
void TaskGps( void * pvParameters ){
  Serial.print("Task1 running on core ");
  Serial.println(xPortGetCoreID());

 Portal.handleClient();
 while (true) {
 ArduinoOTA.handle();
// เขียนโปรแกรมปกติเพิ่มลงไป
//  digitalWrite(LED, HIGH);
//  delay(1000);
//  digitalWrite(LED, LOW);
//  delay(1000);
  } 
 }

////////////////////////////////////////////////////////////////////////////////////////
void TaskMqtt( void * pvParameters ){
  Serial.print("Task2 running on core ");
  Serial.println(xPortGetCoreID());

 while (true) {
   ArduinoOTA.handle();
if (gps.encode(ss.read()))
displayInfo();

if (millis() > 5000 && gps.charsProcessed() < 10)
{
Serial.println(F("No GPS detected: check wiring."));
while(true);
}
 }
}
void loop() {
    
 
}
