/** 
 * 1. Почему код дает именно такие результаты?
 * ```js
 *  var a = 1, b = 1, c, d;
 *  c = ++a; alert(c);           // 2 сначала идет увеличение a, затем присвоение (a=2, c=2)
 *  d = b++; alert(d);           // 1 сначала присваиваем значение 1 переменной d, затем увеличиваем b (d=1, b=2)
 *  c = (2+ ++a); alert(c);      // 5 сначала увеличение a (которая теперь становится 3), потом сложение (a=3, c=5)
 *  d = (2+ b++); alert(d);      // 4 сначала сложение 2+(b=2) потом увеличение b (d=4, b=3)
 *  alert(a);                    // 3 a=3
 *  alert(b);                    // 3 b=3
 * ```
 */

/**
 * 2. Чему будет равен x? 
 * ```js
 *  var a = 2;
 *  var x = 1 + (a *= 2); // сначала выполняем то что в скобках (2*2=4), добавляем это к 1
 * ```
 */

/**
 * 3. Объявить две целочисленные переменные — a и b и задать им произвольные
 * начальные значения. Затем написать скрипт, который работает по следующему 
 * принципу:
 * если a и b положительные, вывести их разность;
 * если а и b отрицательные, вывести их произведение;
 * если а и b разных знаков, вывести их сумму;
 * Ноль можно считать положительным числом.
 */

/*
так задаются случайные значения
let a = Math.round(Math.random()*10)-5;
let b = Math.round(Math.random()*10)-5;
*/

function ex3(a, b) {
    if (isNaN(a) || isNaN(b)) {
        return null;
    } 
    if (a >= 0 && b>= 0) {
        return (a + '-' + b + '=' + (a-b));
    } else if (a < 0 && b < 0) {
        return (a + '*' + b + '=' + (a*b));
    } else {
        return (a + '+' + b + '=' + (a+b));
    }
}

/**
 * 4. Присвоить переменной а значение в промежутке [0..15]. 
 * С помощью оператора switch организовать вывод чисел от a до 15.
 */

function ex4() {
    let a = Math.round(Math.random()*16);
    switch(a) {
        case 0:
            alert(0);
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
}

 /**
 * 5. Реализовать четыре основные арифметические операции в виде функций с двумя
 *  параметрами. Обязательно использовать оператор return.
 */

function add(a,b) {
    if (isNaN(a) || isNaN(b))
        return NaN;
    else 
        return a+b;
}

function sub(a,b) {
    if (isNaN(a) || isNaN(b))
        return NaN;
    else 
        return a-b;
}

function mul(a,b) {
    if (isNaN(a) || isNaN(b))
        return NaN;
    else 
        return a*b;
}

function div(a,b) {
    if (isNaN(a) || isNaN(b))
        return NaN;
    else 
        return a/b;
}

/**
 * 6. Реализовать функцию с тремя параметрами: 
 * function mathOperation(arg1, arg2, operation), 
 * где arg1, arg2 — значения аргументов, operation — строка с названием операции. 
 * В зависимости от переданного значения выполнить одну из арифметических операций 
 * (использовать функции из пункта 5) и вернуть полученное значение (применить switch).
 */
function mathOperation(arg1, arg2, operation) {
    switch(operation) {
        case 'add':
            return add(arg1, arg2);
            break;
        case 'sub':
            return sub(arg1, arg2);
            break;
        case 'mul':
            return mul(arg1, arg2);
            break;
        case 'div':
            return div(arg1, arg2);
            break;
        default:
            return NaN;
    }
}
/**
 * 7. * Сравнить null и 0. Объяснить результат.  
 * ```js
 * null == 0  // false
 * null === 0 // false
 * ```
 */

/**
 * 8. * С помощью рекурсии организовать функцию возведения числа в степень. 
 * Формат: function power(val, pow), где val — заданное число, pow –— степень.
 */

function power(val, pow) {
    if (isNaN(val) || isNaN(pow) || val == 0 || pow < 0)
        return NaN;
    else 
        return pow > 0 ? power(val, pow-1)*val : 1;
}