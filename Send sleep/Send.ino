#include <SPI.h>
#include <LoRa.h>
#include <TinyGPS++.h>
#include <HardwareSerial.h>
/////////////////////////////////////////////////////////////////////////
#define uS_TO_S_FACTOR 1000000  /* Conversion factor for micro seconds to seconds */
#define TIME_TO_SLEEP  10        /* Time ESP32 will go to sleep (in seconds) */
#define RXPin (16)
#define TXPin (17)
//lora
#define SCK 5
#define MISO 19
#define MOSI 27
#define SS 18
#define RST 14
#define DIO0 26
//433E6 for Asia
//866E6 for Europe
//915E6 for North America
#define BAND 433E6
int car_id =26;
RTC_DATA_ATTR int bootCount = 0;
////////////////////////////////////////////////////////////////////////////////////////
TaskHandle_t Task1;
TaskHandle_t Task2;
////////////////////////////////////////////////////////////////////////////////////////
unsigned long last_time = 0;
unsigned long period = 5000;
////////////////////////////////////////////////////////////////////////////////////////
//gps
static const uint32_t GPSBaud = 9600;
TinyGPSPlus gps;
HardwareSerial ss(2);
////////////////////////////////////////////////////////////////////////////////////////
void senddata()
{
  //gps
  Serial.print(F("Location: "));
  if (gps.location.isValid())
  {
    Serial.print(gps.location.lat(), 6);
    Serial.print(F(","));
    Serial.println(gps.location.lng(), 6);
    //lora
    Serial.print("Sending packet: ");
    Serial.print(car_id);
    Serial.print(F(","));
    Serial.print(gps.location.lat(), 6);
    Serial.print(F(","));
    Serial.print(gps.location.lng(), 6);
    //Send LoRa packet to receiver
    LoRa.beginPacket();
      LoRa.print(car_id);
    LoRa.print(gps.location.lat(), 6);
    LoRa.print(",");
    LoRa.print(gps.location.lng(), 6);
    LoRa.endPacket();
    delay(10000);
  }
  else
  {
    Serial.print(F("INVALID"));
    delay(2000);
  }
  Serial.println();
}
////////////////////////////////////////////////////////////////////////////////////////
void print_wakeup_reason(){
  esp_sleep_wakeup_cause_t wakeup_reason;

  wakeup_reason = esp_sleep_get_wakeup_cause();

  switch(wakeup_reason)
  {
    case ESP_SLEEP_WAKEUP_EXT0 : Serial.println("Wakeup caused by external signal using RTC_IO"); break;
    case ESP_SLEEP_WAKEUP_EXT1 : Serial.println("Wakeup caused by external signal using RTC_CNTL"); break;
    case ESP_SLEEP_WAKEUP_TIMER : Serial.println("Wakeup caused by timer"); break;
    case ESP_SLEEP_WAKEUP_TOUCHPAD : Serial.println("Wakeup caused by touchpad"); break;
    case ESP_SLEEP_WAKEUP_ULP : Serial.println("Wakeup caused by ULP program"); break;
    default : Serial.printf("Wakeup was not caused by deep sleep: %d\n",wakeup_reason); break;
  }
}
////////////////////////////////////////////////////////////////////////////////////////
void setup() {
  Serial.begin(115200);

  //task 1
  xTaskCreatePinnedToCore(
    TaskA,   /* Task function. */
    "Task1",     /* name of task. */
    10000,       /* Stack size of task */
    NULL,        /* parameter of the task */
    1,           /* priority of the task */
    &Task1,      /* Task handle to keep track of created task */
    0);          /* pin task to core 0 */
  delay(2000);
  //task 2
  xTaskCreatePinnedToCore(
    TaskB,   /* Task function. */
    "Task2",     /* name of task. */
    10000,       /* Stack size of task */
    NULL,        /* parameter of the task */
    1,           /* priority of the task */
    &Task2,      /* Task handle to keep track of created task */
    1);          /* pin task to core 1 */
  delay(2000);
}
////////////////////////////////////////////////////////////////////////////////////////
void TaskA( void * pvParameters ) {
  Serial.print("Task1 running on core ");
  Serial.println(xPortGetCoreID());
   delay(1000); 
  ++bootCount;
  Serial.println("Boot number: " + String(bootCount));

  print_wakeup_reason();
    esp_sleep_enable_timer_wakeup(TIME_TO_SLEEP * uS_TO_S_FACTOR);
  Serial.println("Setup ESP32 to sleep for every " + String(TIME_TO_SLEEP) +
  " Seconds");
    Serial.println("Going to sleep now");
  delay(1000);
  Serial.flush(); 
  esp_deep_sleep_start();
  Serial.println("This will never be printed");
  while (true) {
 
    
  }
}
////////////////////////////////////////////////////////////////////////////////////////
void TaskB( void * pvParameters ) {
  Serial.print("Task2 running on core ");
  Serial.println(xPortGetCoreID());
  ss.begin(GPSBaud, SERIAL_8N1, RXPin, TXPin, false);
  Serial.println("LoRa Sender ");
  SPI.begin(SCK, MISO, MOSI, SS);
  LoRa.setPins(SS, RST, DIO0);
  while (!LoRa.begin(BAND)) {
    Serial.println("Starting LoRa failed!");
    delay(500);
  }
 
  LoRa.setSyncWord(0xF3);
  Serial.println("LoRa Initializing OK!");
  while (true) {
 while (ss.available() > 0)
    if (gps.encode(ss.read()))
      senddata();
  if (millis() > 5000 && gps.charsProcessed() < 10)
  {
    Serial.println(F("No GPS detected: check wiring."));
    while (true);
  }
  }
}
void loop() {


}
