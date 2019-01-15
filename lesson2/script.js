/*
  Задание 1

  var a = 1, b = 1, c, d;
  c = ++a; alert(c);           // 2   Увеличение идет перед использованием переменной a 
  d = b++; alert(d);           // 1   Увеличение идет после использования переменной b и становится 2
  c = (2+ ++a); alert(c);      // 5   переменная a увеличивается перед сложением (2 + 3)
  d = (2+ b++); alert(d);      // 4   переменная b увеличивается после сложения (2 + 2) и становится 3
  alert(a);                    // 3   
  alert(b);                    // 3

*/

/*
  Задание 2

  var a = 2;
  var x = 1 + (a *= 2);       a *= 2 сокращенная запись от a = a * 2

  Ответ: a = 5

*/

/*
  Задание 3
*/

let a = 5, b = -4;

if (a >= 0 && b >= 0) {
  alert( a - b );
  alert(b);
} else {
  if (a < 0 || b < 0) {
    if (a < 0 && b < 0) {
      alert( a * b );
    } else {
      alert( a + b );
    }
  }
}

/*
  Задание 4
*/

a = 8;

switch (a) {
  case 1:
    alert(1);
  case 2:
    alert(2);
  case 3:
    alert(3);
  case 4:
    alert(4);
  case 5:
    alert(5);
  case 6:
    alert(6);
  case 7:
    alert(7);
  case 8:
    alert(8);
  case 9:
    alert(9);
  case 10:
    alert(10);
  case 11:
    alert(11);
  case 12:
    alert(12);
  case 13:
    alert(13);
  case 14:
    alert(14);
  case 15:
    alert(15);
}

/*
  Задание 5
*/

function addition(number1, number2) {
  return number1 + number2;
}

function subtraction(number1, number2) {
  return number1 - number2;
}

function multiplication(number1, number2) {
  return number1 * number2;
}

function division(number1, number2) {
  return number1 / number2;
}

/*
  Задание 6
*/

function mathOperation(arg1, arg2, operation) {
  let result;
  switch (operation) {
    case '+':
      result = addition(arg1, arg2);
      break;
    case '-':
      result = subtraction(arg1, arg2);
      break;
    case '*':
      result = multiplication(arg1, arg2);
      break;
    case '/':
      result = division(arg1, arg2);
      break;
  }
  return result;
}

/*
  Задание 7

  null  - это тип null
  0     - это тип number

*/

/*
  Задание 8
*/
let result = 1;

function power(val, pow) {
  result *= val;
  return (pow > 1) ? power(val, --pow) : result ;
}

alert(power(4, 5));