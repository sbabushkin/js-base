/*
1) Дан код: 
  var a = 1, b = 1, c, d;
  c = ++a; alert(c); // 2  -- префиксный оператор инкремента, значение а является после выполнения инкремента 
  d = b++; alert(d); // 1 -- постфиксный оператор инкремента, значение b является перед выполнения инкремента 
  c = (2+ ++a); alert(c); // 5  сложение будет выполнено со значением a после выполнением инкремента 
  d = (2+ b++); alert(d); // 4 сложение будет выполнено со значением b перед выполнением инкремента
  alert(a); // 3 - все операторы инкермента выполнены
  alert(b); // 3- все операторы инкермента выполнены

2) Чему будет равен x в примере ниже?

    var a = 2;
    var x = 1 + (a *= 2);

  Ответ: 5;      a *= 2 - это a = a * 2;

3) Объявить две целочисленные переменные a и b и задать им произвольные начальные значения. Затем написать скрипт, который работает по следующему принципу:
* если a и b положительные, вывести их разность;
* если а и b отрицательные, вывести их произведение;
* если а и b разных знаков, вывести их сумму;
ноль можно считать положительным числом.
*/
let a = 10, b = 2;

if (a >= 0 && b >= 0) {
    alert(a - b);
} else if (a < 0 && b < 0) {
    alert(a * b);
} else {
    alert(a + b);
}

/*
  4) Присвоить переменной а значение в промежутке [0..15]. С помощью оператора switch организовать вывод чисел от a до 15.
*/
a = 13;
switch(a) {
    case 0: alert(a++);
    case 1: alert(a++);
    case 2: alert(a++);
    case 3: alert(a++);
    case 4: alert(a++);
    case 5: alert(a++);
    case 6: alert(a++);
    case 7: alert(a++);
    case 8: alert(a++);
    case 9: alert(a++);
    case 10: alert(a++);
    case 11: alert(a++);
    case 12: alert(a++);
    case 13: alert(a++);
    case 14: alert(a++);
    case 15: alert(a++);
}

/*
  5) Реализовать основные 4 арифметические операции в виде функций с двумя параметрами. Обязательно использовать оператор return.
*/
function execute(a, b, operation) {
    if (isNaN(a) || isNaN(b)) {
        return 'Error: a = ' + a + ' or b = ' + b + ' is not a number';
    }

    return operation(a, b);
}

function isZero(n) {
    return !isNaN(n) ? n == 0 : true;
}

function sum(a, b) {
    return execute(a, b, function(a, b) { return a + b;});
}

function subtract(a, b) {
    return execute(a, b, function(a, b) { return a - b;});
}

function multiply(a, b) {
    return execute(a, b, function(a, b) { return a * b;});
}

function divide(a, b) {
    if (isZero(b)) {
        return 'Error: Division by 0 or b is not a number (b = ' + b + ')';
    }
    return execute(a, b, function(a, b) { return a / b;});
}

/*
6) Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation), где arg1, arg2 – значения аргументов, operation – строка с названием операции. В зависимости от переданного значения операции выполнить одну из арифметических операций (использовать функции из пункта 3) и вернуть полученное значение (использовать switch).
*/
function mathOperation(arg1, arg2, operation) {
    switch (operation) {        
      case '+':
         return sum(arg1, arg2);
      case '-':
         return subtract(arg1, arg2);
      case '*':
         return multiply(arg1, arg2);
      case '/':
         return divide(arg1, arg2);
      default:
         return 'Error: Not supported operation';
    }      
}

/*
  7) * Сравнить null и 0. Попробуйте объяснить результат.

  ПРАВИЛО: null равен (==) null и underfined, больше ничему другому

  При преобразовании к числу null -> 0, undefined -> NaN : 
  null > 0 - false, null >= 0 - true, НО: null == 0 - false, по правилу
*/

/*
  8) * С помощью рекурсии организовать функцию возведения числа в степень. Формат: function power(val, pow), где val – заданное число, pow – степень.
*/

function power(val, pow) {
    if (isNaN(val) || isNaN(pow)) {
        return 'Error: val = ' + val + ' or pow = ' + pow + ' is not a number';
    }

    if (pow <= 0) {
        return 1;
    } else if (pow == 1) {
        return val;
    } 

    return val * power(val, pow - 1);
}
