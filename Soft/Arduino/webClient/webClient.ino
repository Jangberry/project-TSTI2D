// Demo using DHCP and DNS to perform a web client request.
// 2011-06-08 <jc@wippler.nl>
//
// License: GPLv2

#include <EtherCard.h>

// ethernet interface mac address, must be unique on the LAN
static byte mymac[] = { 0x74, 0x69, 0x69, 0x2D, 0x30, 0x31 };

byte Ethernet::buffer[700];
static uint32_t timer;

const char website[] PROGMEM = "88.164.117.197:8081";

// called when the client request is complete
static void my_callback (byte status, word off, word len) {
  Serial.println(">>>");
  Ethernet::buffer[off + 300] = 0;
  Serial.print((const char*) Ethernet::buffer + off);
  Serial.println("...");
}

void sendInfo(char varName[], int Value) {
    char path[50];
    sprintf(path, "%s/%d", varName, Value);
    ether.browseUrl(PSTR("/database/0/"), path, website, my_callback);
}

void setup () {
  Serial.begin(57600);
  Serial.println(F("\n[webClient]"));

  // Change 'SS' to your Slave Select pin, if you arn't using the default pin
  if (ether.begin(sizeof Ethernet::buffer, mymac, SS) == 0)
    Serial.println(F("Failed to access Ethernet controller"));
  if (!ether.dhcpSetup())
    Serial.println(F("DHCP failed"));

  ether.printIp("IP:  ", ether.myip);
  ether.printIp("GW:  ", ether.gwip);
  ether.printIp("DNS: ", ether.dnsip);

  byte hisip[] = { 88, 164, 117, 197 };
  ether.copyIp(ether.hisip, hisip);

  ether.printIp("SRV: ", ether.hisip);
  ether.hisport = 8081;
}

void loop () {
  ether.packetLoop(ether.packetReceive());

  if (millis() > timer) {
    timer = millis() + 60000;
    Serial.println();
    Serial.print("<<< REQ ");
    sendInfo("test", 250);
  }
}
