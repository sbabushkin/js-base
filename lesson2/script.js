// 1
/*
var a = 1, b = 1, c, d;

c = ++a; alert(c); // 2 --- переменная -> a ровно 1 и переменная -> а сначала увеличилась на единицу и ее значение присвоилось переменной -> с

d = b++; alert(d); // 1 --- переменная -> b равна 1 и она присваеваеться переменной -> d и уже потом увеличиваеться на единицу

c = (2+ ++a); alert(c); // 5 --- переменная -> а увеличиваеться на 2 и потом плюсуем 2

d = (2+ b++); alert(d); // 4 --- переменная -> b уже увеличеная тоесть значение равно 2 и оно плюсуеться к 2 и значение присваеваеться переменной -> d и переменная -> b увеличиваеться на единицу

alert(a); // 3 --- конечный результат
alert(b); // 3 --- конечный результат
*/

// 2
/*
var a = 2;
var x = 1 + (a *= 2); // 1 + (а = а * 2)
console.log(x); // переменной а присвоиться выражение (2*2) ну и дальше плюс единицу
*/

// 3
/*
let a = Number(prompt('Введите целое число', 1));
let b = Number(prompt('Введите целое число', 3));

if (a >= 0 && b >= 0) {
  alert('разность чисел: ' + (a - b));
}
else if (a < 0 && b < 0) {
  alert('произведение чисел: ' + (a * b));
}
else {
  alert('сумма чисел: ' + (a + b));
}
*/

// 4 (с помощью switch не знаю как сделать чтоб был менее громаздкий код)
/*
let a = Number(prompt('Введите целое число от 0 до 15'));
if (a > 15 || a < 0) { //проверка не совсем доконца работает
  alert('Введите верные числа...');
  a = Number(prompt('Введите целое число от 0 до 15'));
} 

switch(a) {
  case 1:
    alert('1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15');
    break;
  case 2:
    alert('2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15');
    break;
  case 3:
    alert('3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15');
    break;
  case 4:
    alert('4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15');
    break;
  case 5:
    alert('5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15');
    break;
  case 6:
    alert('6, 7, 8, 9, 10, 11, 12, 13, 14, 15');
    break;
  case 7:
    alert('7, 8, 9, 10, 11, 12, 13, 14, 15');
    break;
  case 8:
    alert('8, 9, 10, 11, 12, 13, 14, 15');
    break;
  case 9:
    alert('9, 10, 11, 12, 13, 14, 15');
    break;
  case 10:
    alert('10, 11, 12, 13, 14, 15');
    break;
  case 11:
    alert('11, 12, 13, 14, 15');
    break;
  case 12:
    alert('12, 13, 14, 15');
    break;
  case 13:
    alert('13, 14, 15');
    break;
  case 14:
    alert('14, 15');
    break;
}
*/

// 5
/*
function sum(a,b) {
  return a + b;
}

function mult(a,b) {
  return a * b;
}

function division(a,b) {
  if (b === 0){
    return 'на ноль запрещенно';
  } else
  return a / b;
}

function diff(a,b) {
  return a - b;
}

let a = Number(prompt('Введите число а'));
let b = Number(prompt('Введите число b'));

alert('операцыи c числами ' + a + ' и ' + b + ':\n\n'
      + 'деление -> ' + division(a,b) + '\n'
      + 'умножение -> ' + mult(a,b) + '\n'
      + 'сумма -> ' + sum(a,b) + '\n'
      + 'разность -> ' + diff(a,b));
*/

// 6
/*
function mathOperation(arg1, arg2, operation) {
  switch (operation) {
    case '+': 
      return arg1 + arg2;
    case '*':
      return arg1 * arg2;
    case '/':
      return arg1 / arg2;
    case '-':
      return arg1 - arg2;
    default:
      return 'такой операции не запрограмировано';
  }
}

let a = Number(prompt('Введите число а'));
let b = Number(prompt('Введите число b'));
let operation = prompt('Введите название операции (+,-,*,/): ');

alert(mathOperation(a,b,operation));
*/

// 7 
/*
alert(0 == null); //значение null не равно ничему другому кроме undefined
alert(0 == Number(null)); // а если привести к числу тогда будут равны значения
*/

// 8

function power(val, pow) {
  let result = 1;
  if (pow > 0) {
    result = val * power(val, pow-1);
    console.log(result);
  }
  return result;
}

let a = Number(prompt('Введите число'));
let b = Number(prompt('Введите степень'));

alert(power(a, b));