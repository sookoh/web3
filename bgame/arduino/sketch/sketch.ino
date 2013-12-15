
const int pinFlex = 0;
int val123;

void setup(){
  Serial.begin(9600);

  int val1 = analogRead(pinFlex);
  int val2 = analogRead(pinFlex);
  int val3 = analogRead(pinFlex);
  val123 = (val1 + val2 + val3)/3;
}

void loop(){  

  int val4 = analogRead(pinFlex);
  int val5 = analogRead(pinFlex);
  int val6 = analogRead(pinFlex);
  int val456 = (val4 + val5 + val6)/3;

  int diff= val456 - val123;
  diff = abs(diff);
//  
//  Serial.print("diff: ");
//  Serial.println(diff);
int pd = map (diff, 0, 65, 1, 15);
//int pd2 = map (diff, 66, 80, 15, 16);
 
 // Serial.print("\t pd: ");
  Serial.println(pd);
//  Serial.print( "," );
//  Serial.println(pd2);

delay(5);

}













