#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ArduinoJson.h>
#include <IRremoteESP8266.h>

const char *ssid = "LoDeAlexYSusy-Slow";
const char *password = "osaponaolavaope";
int recvPin = 5;

ESP8266WebServer server ( 80 );
IRrecv irrecv ( recvPin );
//IRsend irsend;

typedef union {
    uint64_t num;
    struct {
        uint8_t zeros1 : 1;
        uint8_t ones1 : 1;
        uint16_t zeros2 : 16;
        uint8_t sleep : 1;
        uint8_t temperature : 4;
        uint8_t zeros3 : 2;
        uint8_t swing : 1;
        uint8_t zeros4 : 2;
        uint8_t fan : 2;
        uint8_t mode : 3;
        uint8_t togglePower : 1;
    };
} ElectraCode;
typedef enum {
    IRElectraModeCool = 0b001,
    IRElectraModeHeat = 0b010,
    IRElectraModeAuto = 0b011,
    IRElectraModeDry  = 0b100,
    IRElectraModeFan  = 0b101
} IRElectraMode;
typedef enum {
    IRElectraFanLow    = 0b00,
    IRElectraFanMedium = 0b01,
    IRElectraFanHigh   = 0b10,
    IRElectraFanAuto   = 0b11
} IRElectraFan;

bool sleep = false;
int temperature = 24;
bool swing = false;
IRElectraFan fan = IRElectraFanAuto;
IRElectraMode mode = IRElectraModeCool;
bool power = false;

void setup ( void ) {
  Serial.begin ( 115200 );
  WiFi.begin ( ssid, password );
  Serial.println ( "" );

  // Wait for connection
  while ( WiFi.status() != WL_CONNECTED ) {
    delay ( 500 );
    Serial.print ( "." );
  }

  Serial.println ( "" );
  Serial.print ( "Connected to " );
  Serial.println ( ssid );
  Serial.print ( "IP address: " );
  Serial.println ( WiFi.localIP() );

  server.on ( "/", handleRoot );
  // server.on ( "/inline", []() {
  //   server.send ( 200, "text/plain", "this works as well" );
  // } );
  // server.onNotFound ( handleNotFound );
  server.begin();
  Serial.println ( "HTTP server started" );

  irrecv.enableIRIn();
  Serial.println ( "IR Receiver enabled" );
}
void loop ( void ) {
  server.handleClient();
  readIRReceiver();
}

void handleRoot() {
  DynamicJsonBuffer jsonBuffer;
  JsonObject& root = jsonBuffer.createObject();
  root["sleep"] = sleep;
  root["temperature"] = temperature;
  root["swing"] = swing;

  switch (fan) {
    case IRElectraFanLow:
      root["fan"] = "Low";
      break;
    case IRElectraFanMedium:
      root["fan"] = "Medium";
      break;
    case IRElectraFanHigh:
      root["fan"] = "High";
      break;
    case IRElectraFanAuto:
      root["fan"] = "Auto";
      break;
  }
  switch (mode) {
    case IRElectraModeCool:
      root["mode"] = "Cool";
      break;
    case IRElectraModeHeat:
      root["mode"] = "Heat";
      break;
    case IRElectraModeAuto:
      root["mode"] = "Auto";
      break;
    case IRElectraModeDry:
      root["mode"] = "Dry";
      break;
    case IRElectraModeFan:
      root["mode"] = "Fan";
      break;
  }
  
  root["power"] = power;
  String output;
  root.printTo(output);
  server.send (200, "application/json", output);
}
void printLLNumber(unsigned long long n, uint8_t base) {
  unsigned char buf[16 * sizeof(long)]; // Assumes 8-bit chars. 
  unsigned long long i = 0;

  if (n == 0) {
   Serial.print('0');
    return;
  } 

  while (n > 0) {
    buf[i++] = n % base;
    n /= base;
  }

  for (; i > 0; i--)
    Serial.print((char) (buf[i - 1] < 10 ? '0' + buf[i - 1] : 'A' + buf[i - 1] - 10));
}

void readIRReceiver() {
  decode_results results;

  if (irrecv.decode(&results)) {
    if (results.decode_type == ELECTRA && results.bits == 34) {
      Serial.print(results.bits);
      Serial.print(" - ");
      printLLNumber(results.value, BIN);
      Serial.println("");
      parseIRValue(&results);
    }
    Serial.println("");
    irrecv.resume();
  }
}

void parseIRValue(decode_results *results) {
  ElectraCode code = { 0 };
  code.num = results->value;
  Serial.print("code: "); 
  printLLNumber(code.num, BIN);
  Serial.println("");
  Serial.print("zeros1: "); 
  Serial.println(code.zeros1, BIN);
  Serial.print("ones1: "); 
  Serial.println(code.ones1, BIN);
  Serial.print("zeros2: "); 
  Serial.println(code.zeros2, BIN);
  Serial.print("sleep: "); 
  Serial.println(code.sleep, BIN);
  Serial.print("temperature: "); 
  Serial.println(code.temperature, BIN);
  Serial.print("zeros3: "); 
  Serial.println(code.zeros3, BIN);
  Serial.print("swing: "); 
  Serial.println(code.swing, BIN);
  Serial.print("zeros4: "); 
  Serial.println(code.zeros4, BIN);
  Serial.print("fan: "); 
  Serial.println(code.fan, BIN);
  Serial.print("mode: "); 
  Serial.println(code.mode, BIN);
  Serial.print("togglePower: "); 
  Serial.println(code.togglePower, BIN);

  sleep = code.sleep;
  temperature = code.temperature + 15;
  swing = code.swing;
  fan = (IRElectraFan)code.fan;
  mode = (IRElectraMode)code.mode;

  if (code.togglePower) {
    power = !power;
  }
}
