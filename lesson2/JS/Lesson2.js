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
            result = arg1 * arg2;
            break;
        case '+':
            result = arg1 + arg2;
            break;
        case '-':
            result = arg1 - arg2;
            break;
        case '/':
            result = arg1 / arg2;
            break;
    }
    return result;
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
