int pinPr=A0;
int valMax=280;
int valMin=140;

void setup()
{
    Serial.begin(9600);
}

void loop()
{
    int valeur=analogRead(pinPr);
    int niv_eau = map(valeur,valMin,valMax,0,100);
    niv_eau=constrain (pourcentage,0,100);
    Serial.print("Valeur: ");
    Serial.print(valeur);
    Serial.print(" soit : ");
    Serial.print("niv_eau");
    Serial.print("%");
    delay(2000);
}