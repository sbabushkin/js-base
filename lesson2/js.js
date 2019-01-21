// Задание №1 ----------------------------------------------------------------------------
/* Описание
Дан код: 

var a = 1, b = 1, c, d;
c = ++a; alert(c); // 2
d = b++; alert(d); // 1
c = (2+ ++a); alert(c); // 5
d = (2+ b++); alert(d); // 4
alert(a); // 3
alert(b); // 3

Почему код даёт именно такие результаты?
*/
function setStyle(element) { /* eslint no-param-reassign: 0 */
    element.style.padding = '5px';
    element.style.border = '2px solid gray';
    element.style.borderRadius = '5px';
    element.style.marginTop = '10px';
}

function ex1() {
    const element = document.getElementById('answer1');
    element.innerHTML = 'var a = 1, b = 1, c, d;<br>'
      + 'c = ++a; alert(c); //2, потому что изначально а = 1, оператор "++а" сначала увеличивает значение переменной а на единицу а затем выводит его, значение переменной a = 2. <br>'
      + 'd = b++; alert(d); //1, потому что оператор "b++" сначала выводит значение переменной b (равное 1) и присваивает его переменной d, которое потом выводится командой alert, а затем увеличивается на 1(единицу) и запоминается т.е. b = 2.<br>'
      + 'c = (2+ ++a); alert(c); //5, потому что оператов "++а" сначала увеличивает значение переменной а на единицу а затем выводит его, и производит сложение. значение переменной a = 3.<br>'
      + 'd = (2+ b++); alert(d); //4, потому что сначала подставляется значение переменной которое мы имеем на данный момент, b = 2, производятся вычисление, а затем переменная b увеличивается на 1(единицу).<br>'
      + 'alert(a); //3, потому что переменная а увеличивалась на единицу 2 раза.<br>'
      + 'alert(b); //3, потому что переменная b увеличивалась на единицу 2 раза.<br>';
      + '';
    setStyle(element);
}
//----------------------------------------------------------------------------------------


// Задание №2 ----------------------------------------------------------------------------
/* Описание
Чему будет равен x в примере ниже?

var a = 2;
var x = 1 + (a *= 2);
*/
function ex2() {
    const element = document.getElementById('answer2');
    element.innerHTML = 'Оператор *= говорит сначала умнож a на 2, потом присвой полученное значение переменной а, т.к. a = 2 ==> 2 * 2 = 4, 4 присваиваем переменной а ==> x = 1 + 4 = 5. Ответ x = 5. '
      + '';
    setStyle(element);
}
//----------------------------------------------------------------------------------------

// Задание №3 ----------------------------------------------------------------------------
/* Описание
Объявить две целочисленные переменные a и b и задать им произвольные начальные значения. Затем написать скрипт, который работает по следующему принципу:
* если a и b положительные, вывести их разность;
* если а и b отрицательные, вывести их произведение;
* если а и b разных знаков, вывести их сумму;
ноль можно считать положительным числом.
*/
function second() {
    function number1(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function number2(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let a = number1(-10, 10);
    let b = number2(-10, 10);
    alert('Превое сгенерированное число равно: ' + a);
    alert('Второе сгенерированное число равно: ' + b);

    if ((a > 0) && (b > 0)) {
        alert('Так как оба числа больше нуля, то выполняем: a - b = ' + (a - b)); 
        } else {
            if ((a > 0) && (b < 0)) {
            alert('Так как а > 0, b < 0, то выполняем: a + b = ' + (a + b));
            } else {
                if ((a > 0) && (b = 0)) {
                    alert('Так как а > 0, b = 0(а ноль считаем как положительное число), то выполняем: a - b = ' + (a - b));
                } else {
                    if ((a < 0) && (b > 0)) {
                        alert('Так как a < 0, b > 0, то выполняем: a + b = ' + (a + b));
                    } else {
                        if ((a < 0) && (b < 0)) {
                            alert('Так как a < 0 и b < 0, то выполняем: a * b = ' + (a * b));
                        } else {
                            if ((a < 0) && (b = 0)) {
                                alert('Так как a < 0, b = 0(а ноль считаем как положительное число), то выполняем: a + b = ' + (a + b));
                            } else {
                                if ((a = 0) && (b > 0)) {
                                    alert('Так как а = 0, b > 0, то выполняем: a - b = ' + (a - b));
                                } else {
                                    if ((a = 0) && (b < 0)) {
                                        alert('Так как a = 0(а ноль считаем как положительное число), b < 0, то выполняем: a + b = ' + (a + b));
                                    } else {
                                        if ((a = 0) && (b = 0)) {
                                            alert('Так как а = 0 и b = 0(а ноль считаем как положительное число), то выполняем: a - b = ' + (a - b));
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
}
//----------------------------------------------------------------------------

// Задание №4 ----------------------------------------------------------------------------
/* Описание
Присвоить переменной а значение в промежутке [0..15]. С помощью оператора switch организовать вывод чисел от a до 15.
*/
function ex4() {
    function number1(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function number2(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let a = number1(0, 15);
    alert(a);

    switch(a) {
        case parseInt('0'):
        alert('1,2,3,4,5,6,7,8,9,10,11,12,13,14,15');
        break;

        case parseInt('1'):
        alert('2,3,4,5,6,7,8,9,10,11,12,13,14,15');
        break;

        case parseInt('2'):
        alert('3,4,5,6,7,8,9,10,11,12,13,14,15');
        break;

        case parseInt('3'):
        alert('4,5,6,7,8,9,10,11,12,13,14,15');
        break;

        case parseInt('4'):
        alert('5,6,7,8,9,10,11,12,13,14,15');
        break;

        case parseInt('5'):
        alert('6,7,8,9,10,11,12,13,14,15');
        break;

        case parseInt('6'):
        alert('7,8,9,10,11,12,13,14,15');
        break;

        case parseInt('7'):
        alert('8,9,10,11,12,13,14,15');
        break;

        case parseInt('8'):
        alert('9,10,11,12,13,14,15');
        break;

        case parseInt('9'):
        alert('10,11,12,13,14,15');
        break;

        case parseInt('10'):
        alert('11,12,13,14,15');
        break;

        case parseInt('11'):
        alert('12,13,14,15');
        break;

        case parseInt('12'):
        alert('13,14,15');
        break;

        case parseInt('13'):
        alert('14,15');
        break;

        case parseInt('14'):
        alert('15');
        break;

        case parseInt('15'):
        alert('после 15 ничего больше нет');
        break;
    }
}
//----------------------------------------------------------------------------------------


// Задание №5 ----------------------------------------------------------------------------
/* Описание
Реализовать основные 4 арифметические операции в виде функций с двумя параметрами. Обязательно использовать оператор return.
*/
function ex5() {
    function number1(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function number2(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let a = number1(0, 15);
    let b = number2(0, 15);
    alert(a);
    alert(b);

    function calcSumma(a, b) {
       return a + b;
    }
    let summa = calcSumma(a, b);
    alert(a + '+' + b + '=' + summa);


    function calcraznost(a, b) {
        return a - b;
    }
    let raznost = calcraznost(a, b);
    alert(a + '-' + b + '=' + raznost);


    function calcumnogenie(a, b) {
       return a * b;
    }
    let umnogenie = calcumnogenie(a, b);
    alert(a + '*' + b + '=' + umnogenie);


    function calcdelenie(a, b) {
       return a / b;
    }
    let delenie = calcdelenie(a, b);
    alert(a + '/' + b + '=' + delenie);
}
//----------------------------------------------------------------------------------------


// Задание №6 ----------------------------------------------------------------------------
/* Описание
Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation), где arg1, arg2 – значения аргументов, operation – строка с названием операции. В зависимости от переданного значения операции выполнить одну из арифметических операций (использовать функции из пункта 3) и вернуть полученное значение (использовать switch).
*/
function ex6() {
    let arg1 = parseInt(prompt('введите 1 число'));
            let arg2 = parseInt(prompt('введите 2 число'));
            let operation = prompt('введите операцию "+", "-", "*", "/":');
            

            function mathOperation(arg1, arg2, operation) {

                switch(operation) {
                    case ('-'):
                        function calcraznost(arg1, arg2) {
                            return arg1 - arg2;
                        }
                    let raznost = calcraznost(arg1, arg2);
                    alert(arg1 + '-' + arg2 + '=' + raznost);
                    break;

                    case ('*'):
                        function calcumnogenie(arg1, arg2) {
                            return arg1 * arg2;
                        }
                    let umnogenie = calcumnogenie(arg1, arg2);
                    alert(arg1 + '*' + arg2 + '=' + umnogenie);
                    break;
                                  
                    case ('+'):
                         function calcSumma(arg1, arg2) {
                            return arg1 + arg2;
                        }
                    let summa = calcSumma(arg1, arg2);
                    alert(arg1 + '+' + arg2 + '=' + summa);
                    break;

                    default:
                        alert('Такой операции не предусмотренно!');
                    break;
                }
            }
            let q = mathOperation(arg1, arg2, operation);
            alert(q);
}
//----------------------------------------------------------------------------------------


// Задание № ----------------------------------------------------------------------------
/* Описание

*/
//----------------------------------------------------------------------------------------