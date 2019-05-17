#include <EtherCard.h>

#pragma region // Variables Ethernet
static byte mymac[] = {0x74, 0x69, 0x69, 0x2D, 0x30, 0x31};
byte Ethernet::buffer[700];
static uint32_t timer;
const char website[] PROGMEM = "88.164.117.197:8081";
#pragma region // Déclaration des prototypes de fonctions
void sendMessage();
void ethCallback();
void setupEthernet();
void loopEthernet();
#pragma endregion
#pragma endregion

#pragma region //Variables niveau d'eau

int eau_pinPr=A0;
int eau_valMax=280;
int eau_valMin=140;
#pragma region // Déclaration des prototypes de fonctions
void setupEau();
void loopEau();
#pragma endregion
#pragma endregion

void setup()
{
    Serial.begin(9600);
    setupEthernet();
    setupEau();
}

void loop()
{
    loopEthernet();
}

#pragma region // Fonctions Ethernet
void setupEthernet()
{
    Serial.println(F("\n[webClient]"));
    if (ether.begin(sizeof Ethernet::buffer, mymac, SS) == 0)
        Serial.println(F("Failed to access Ethernet controller"));
    if (!ether.dhcpSetup())
        Serial.println(F("DHCP failed"));

    ether.printIp("IP:  ", ether.myip);
    ether.printIp("GW:  ", ether.gwip);
    ether.printIp("DNS: ", ether.dnsip);

    byte hisip[] = {88, 164, 117, 197};
    ether.copyIp(ether.hisip, hisip);

    ether.printIp("SRV: ", ether.hisip);
    ether.hisport = 8081;
}

void loopEthernet()
{
    ether.packetLoop(ether.packetReceive());
}

void sendInfo(char varName[], int Value)
{
    char path[50];
    sprintf(path, "%s/%d", varName, Value);
    ether.browseUrl(PSTR("/database/0/"), path, website, my_callback);
}

void ehtCallback()
{
    Serial.println(">>>");
    Ethernet::buffer[off + 300] = 0;
    Serial.print((const char *)Ethernet::buffer + off);
    Serial.println("...");
}
#pragma endregion

#pragma region // Fonctions Niveau d'eau
void setupEau(){
    //Serial.begin(9600);
    pinMode(eau_pinPr, OUTPUT);
}

void loopEau(){
    int valeur=analogRead(eau_pinPr);
    int niv_eau = map(valeur,eau_valMin,eau_valMax,0,100);
    niv_eau=constrain (pourcentage,0,100);
    /*
    Serial.print("Valeur: ");
    Serial.print(valeur);
    Serial.print(" soit : ");
    Serial.print("niv_eau");
    Serial.print("%");
    delay(2000);
    */
    sendInfo("eau", niv_eau);
}
#pragma endregion