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

