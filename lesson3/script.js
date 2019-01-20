// Задание 1
let i = 0;
while(i <= 100) {
    console.log(i++);
}

// Задание 2
let a = 0, iType;
// Функция опрелеляет четность / нечетность числа и определяет для этого переменную iType, после чего выводит сие в консоль
function numType(i) {
    do {
        if(i === 0) {
            iType = 'это ноль'
        } else {
            if((i%2) === 0) {
                iType = 'четное число'
            } else {
                iType = 'нечетное число'
            }
        }
        console.log(i++ + ' - ' + iType);
    } while (i <= 10);
}
numType(a);

// Задание 3
for (let b = 0; b < 9; console.log(b++)) {
  // Тут пусто
}

// Задание 4
let pyramids = ['x'], x;
for(let i = 1; i <= 20; ++i) {
    x = pyramids.join(''); // Или можно использовать .toString().replace(/,/g, '');
    console.log(x);
    pyramids.push('x');
} 