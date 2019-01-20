function CheckSimple(num) {
    let j = 0;
    for (let i = 1; i<=num; i++){
        if (num/i == Math.round(num/i)) {
            j++;
        }
    }
    if (j<=2) {
        return true;
    } else {
        return false;
    }
}

function task1() {
    'use strict';
    let simpleDigits = 'Простые числа от 0 до 100: ';
    let i = 1;
    while (i<=100) {
        if (CheckSimple(i)===true) {
            simpleDigits = simpleDigits + ', ' + i;
        }
        i++;
    }
        alert(simpleDigits);
}

function task2() {
    'use strict';
    let simpleDigits = 'Простые числа от 0 до 100: ';
    let i = 0;
    do {
        if (i==0) {
            console.log(i+'- это ноль');
        } else if (i/2===Math.round(i/2)) {
            console.log(i+'- это четное число');
        } else {
            console.log(i+'- это нечетное число');
        }
        i++
    } while (i<=10);
}