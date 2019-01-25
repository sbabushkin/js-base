
// Task 1. простые числа от 1 до 100 с помощью while
let a= 2;
let j = 2;

while (a<=100) {
    nextNum:
    for (a = 2; a<=100; a++) {

        for (j=2; j<a; j++) {

            if(a%j==0) continue nextNum
        }
        alert(a);
    }
    
};

// Task 2. вывести числа от 1 до 10, указывая чётность

let m = ' - это ноль';
let b = ' - это чётное число';
let c = ' - это нечётное число';
let d = -1;
do {
    d++;
        if (d === 0) {
            alert(d + m);
        } else if (d % 2 == 0) {
            alert(d + b);
        } else {
            alert(d + c);
        }
    } while (d < 10);


// Task 3. С помощью цикла for вывести числа, оставив тело цикла пустым


    for (let i = 0; i<=9; alert(i++)){
        // пустое тело цикла
    }


// Task 4. Pyramide
let h = [];
let y = 'x';
do {
    h.push(y);
    console.log(h);
} while (h.length <=19);
