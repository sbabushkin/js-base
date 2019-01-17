// 1. Почему код дает именно такие результаты?

let a = 1, b = 1, c, d;
c = ++a;            // перед присваиванием происходит увелечение а на 1 за счет ++a, после выводится переменная
d = b++;            // увелечение переменной b происходит после присваивания b переменной d
c = (2 + ++a);      // а уже = 2, и тут мы еще прибавляем 1, в итоге 3+2 = 5
d = (2 + b++);      // сначало мы выполняем сложение 2+2, и потолько потом увеличиваем переменную b

// 2. Чему будет равен x?
a = 2;
let x = 1 + (a *= 2);
// 5 т.к. сначало выполнится скобочки после сложение, операция в скобочках это сокращеная
// запись присваивания и умножения переменной на некое число

/*
3. Объявить две целочисленные переменные — a и b и задать им произвольные начальные значения. Затем написать скрипт, который работает по следующему принципу:
если a и b положительные, вывести их разность;
если а и b отрицательные, вывести их произведение;
если а и b разных знаков, вывести их сумму;
Ноль можно считать положительным числом.
 */
function Job3() {
    let a = Number(document.getElementById("job_3_a").value);
    let b = Number(document.getElementById("job_3_b").value);

    if (isNaN(a) || isNaN(b)) {
        return
    }

    let resultBlock = document.getElementById("job_3_res");

    if (a >= 0 && b >= 0) {
        resultBlock.innerText = a - b;
    } else if (a < 0 && b < 0) {
        resultBlock.innerText = a * b;
    } else if ((a < 0 && b >= 0) || (a >= 0 && b < 0)) {
        resultBlock.innerText = a + b;
    }
}

//4. Присвоить переменной а значение в промежутке [0..15]. С помощью оператора switch организовать вывод чисел от a до 15.
function Job4() {

    let a = Number(document.getElementById("job_4_a").value);

    if (isNaN(a)) {
        return
    }

    let result = '';

    switch (a) {
        case 0:
            result += 0 + " , ";
        case 1:
            result += 1 + " , ";
        case 2:
            result += 2 + " , ";
        case 3:
            result += 3 + " , ";
        case 4:
            result += 4 + " , ";
        case 5:
            result += 5 + " , ";
        case 6:
            result += 6 + " , ";
        case 7:
            result += 7 + " , ";
        case 8:
            result += 8 + " , ";
        case 9:
            result += 9 + " , ";
        case 10:
            result += 10 + " , ";
        case 11:
            result += 11 + " , ";
        case 12:
            result += 12 + " , ";
        case 13:
            result += 13 + " , ";
        case 14:
            result += 14 + " , ";
        case 15:
            result += 15;
    }

    document.getElementById("job_4_res").innerText = result;
}

function plus(a, b) {
    return a + b;
}

function minus(a, b) {
    return a - b;
}

function multiplication(a, b) {
    return a * b;
}

function Division(a, b) {
    return a / b;
}

/*
6. Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation), где arg1, arg2 — значения аргументов,
   operation — строка с названием операции. В зависимости от переданного значения выполнить одну из арифметических операций
   (использовать функции из пункта 5) и вернуть полученное значение (применить switch).
*/
function Job6() {

    let a = Number(document.getElementById("job_6_a").value);
    let b = Number(document.getElementById("job_6_b").value);
    let operation = document.getElementById("job_6_operation").value;

    let result;
    switch (operation) {
        case "+":
            result = plus(a, b);
            break;
        case "-":
            result = minus(a, b);
            break;
        case "*":
            result = multiplication(a, b);
            break;
        case "/":
            result = Division(a, b);
            break;
        default:
            alert("неправильная операция");
            return;
    }
    document.getElementById("job_6_res").innerText = result;
}

//7. * Сравнить null и 0. Объяснить результат.
function AlertNull() {
    alert(Number(null));
}

//8. * С помощью рекурсии организовать функцию возведения числа в степень. Формат: function power(val, pow), где val — заданное число, pow –— степень.
function powFunc() {
    let a = Number(document.getElementById("job_8_a").value);
    let pow = Number(document.getElementById("job_8_pow").value);
    return power(a, pow)
}

function power(val, pow) {
    if (pow > 1) {
        return val * power(val, pow - 1);
    } else {
        return val;
    }
}