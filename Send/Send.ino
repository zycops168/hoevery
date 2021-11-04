#include <SPI.h>
#include <LoRa.h>
#include <TinyGPS++.h>
#include <HardwareSerial.h>
/////////////////////////////////////////////////////////////////////////
//gps
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
/////////////////////////////////////////////////////////////////////////
//gps
static const uint32_t GPSBaud = 9600;
TinyGPSPlus gps;
HardwareSerial ss(2);
/////////////////////////////////////////////////////////////////////////
void setup() {
  Serial.begin(115200);
  ss.begin(GPSBaud, SERIAL_8N1, RXPin, TXPin, false);
  Serial.println("LoRa Sender Test");
  SPI.begin(SCK, MISO, MOSI, SS);
  LoRa.setPins(SS, RST, DIO0);
  while (!LoRa.begin(BAND)) {
    Serial.println("Starting LoRa failed!");
    delay(500);
  }
  //
  LoRa.setSyncWord(0xF3);
  Serial.println("LoRa Initializing OK!");
}
/////////////////////////////////////////////////////////////////////////
void loop() {
  while (ss.available() > 0)
    if (gps.encode(ss.read()))
      senddata();
  if (millis() > 5000 && gps.charsProcessed() < 10)
  {
    Serial.println(F("No GPS detected: check wiring."));
    while (true);
  }
}
/////////////////////////////////////////////////////////////////////////
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
    Serial.print(gps.location.lat(), 6);
    Serial.print(F(","));
    Serial.print(gps.location.lng(), 6);
    //Send LoRa packet to receiver
    LoRa.beginPacket();
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
