function task1() {
    'use strict';
    var a = 1,
        b = 1,
        c, d;
    c = ++a;
    alert('c = ' + c + 'с = 2 потому что увеличивает a на 1 и присваивает с'); // с = 2 потому что увеличивает a на 1 и присваивает с
    d = b++;
    alert('d = ' + d + 'd = 1 потому что сначала кладет b в d а потом увеличивает b на единицу'); // d = 1 потому что сначала кладет b в d а потом увеличивает b на единицу
    c = (2 + ++a);
    alert('c = ' + c + 'с = 5 потому что ранее a = 2 и еще раз увеличивается на 1, получается c = 2 + 3'); //с = 5 потому что ранее a = 2 и еще раз увеличивается на 1, получается c = 2 + 3
    d = (2 + b++);
    alert('d = ' + d + 'потому ранее b = 2 и сначала d = 2+2 а потом b = 3'); //потому ранее b = 2 и сначала d = 2+2 а потом b = 3
    alert('a = ' + a + 'потому что ранее a увеличилось до 3'); //потому что ранее a увеличилось до 3
    alert('b = ' + b + 'потому что ранее b увеличилось до 3'); //потому что ранее b увеличилось до 3
}

function task2() {
    'use strict';
    var a = 2;
    var x = 1 + (a *= 2);
    alert(x + 'Потому что присваивается a = 2, потом a * 2 = 4 и затем 1 + (4) = 5');
}

function mathOperation(arg1, arg2, operation) {
    var result;
    switch (operation) {
        case '*':
            result = mathMultiply(arg1, arg2);
            break;
        case '+':
            result = mathSum(arg1, arg2);
            break;
        case '-':
            result = mathMinus(arg1, arg2);
            break;
        case '/':
            result = mathDiv(arg1, arg2);
            break;
    }
    return result;
}

function mathSum(arg1, arg2) {
    return arg1 + arg2;
}

function mathMultiply(arg1, arg2) {
    return arg1 * arg2;
}

function mathDiv(arg1, arg2) {
    return arg1 / arg2;
}

function mathMinus(arg1, arg2) {
    return arg1 - arg2;
}

function task3() {
    'use strict';
    var a, b, result;
    do {
        a = parseInt(prompt('Введите целое число а:'));
        if (isNaN(a)) {
            alert('Введено не верное значение. Повторите ввод');
        }
    } while (isNaN(a));
    do {
        b = parseInt(prompt('Введите целое число b:'));
        if (isNaN(b)) {
            alert('Введено не верное значение. Повторите ввод');
        }
    } while (isNaN(b));

    if (a >= 0 && b >= 0) {
        result = mathOperation(a, b, '-');
    } else if (a < 0 && b < 0) {
        result = mathOperation(a, b, '*');
    } else if ((a < 0 && b >= 0) || (a >= 0 && b < 0)) {
        result = mathOperation(a, b, '+');
    }
    alert(result);
}

function task4() {
    var a, valid = true;
    do {
        a = parseInt(prompt('Введите число а в промежутке от [0..15]:'));
        if (isNaN(a)) {
            alert('Введено не верное значение. Повторите ввод');
            valid = false;
        } else if (a < 0 || a > 15) {
            alert('Значение должно быть в промежутке [0..15]. Повторите ввод.');
            valid = false;
        }
    } while (valid == false);

    switch (a) {
        case 0:
            alert(a);
        case 1:
            alert(a++);
        case 2:
            alert(a++);
        case 3:
            alert(a++);
        case 4:
            alert(a++);
        case 5:
            alert(a++);
        case 6:
            alert(a++);
        case 7:
            alert(a++);
        case 8:
            alert(a++);
        case 9:
            alert(a++);
        case 10:
            alert(a++);
        case 11:
            alert(a++);
        case 12:
            alert(a++);
        case 13:
            alert(a++);
        case 14:
            alert(a++);
        case 15:
            alert(a++);
            break;
    }
}

function task5() {
    'use strict';
    var a, b, operation, result;
    do {
        a = parseInt(prompt('Введите число а:'));
        if (isNaN(a)) {
            alert('Введено не верное значение. Повторите ввод');
        }
    } while (isNaN(a));
    do {
        b = parseInt(prompt('Введите число b:'));
        if (isNaN(b)) {
            alert('Введено не верное значение. Повторите ввод');
        }
    } while (isNaN(b));

    do {
        operation = prompt('Выберите операцию +, -, *, /:');
        if (operation != '+' && operation != '-' && operation != '*' && operation != '/') {
            alert('Введено не верное значение. Повторите ввод');
        }
    } while (operation != '+' && operation != '-' && operation != '*' && operation != '/');

    result = mathOperation(a, b, operation);

    alert(result);
}

function task7() {
    var a = null;
    var b = 0,
        result;

    result = a == b;
    alert('a == b = ' + result + ' - потому что null это пустое значение, а 0 уже является значением')

}

function power(arg1, arg2) {
    var result, k = false;
    if (arg2 < 0) {
        arg2 = -1*arg2;
        k = true;
    }
    if (arg2 == 1) {
        result = arg1;
    } else if (arg2 == 0) {
        result = 1;
    } else {
        result = arg1 * power(arg1, --arg2);
    }
    if (k == true) {
        result = 1 / result;
    }
    return result;
}

function task8() {
    'use strict';
    var a, b, result;
    do {
        a = parseInt(prompt('Введите число а:'));
        if (isNaN(a)) {
            alert('Введено не верное значение. Повторите ввод');
        }
    } while (isNaN(a));
    do {
        b = parseInt(prompt('Введите число b:'));
        if (isNaN(b)) {
            alert('Введено не верное значение. Повторите ввод');
        }
    } while (isNaN(b));

    result = power(a, b);

    alert(a + ' ^ ' + b + ' = ' + result);
}
