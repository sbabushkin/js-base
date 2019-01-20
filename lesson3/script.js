/*
1) С помощью цикла while вывести все простые числа в промежутке от 0 до 100
*/
let num = 0;
start:while (num <= 100) {
  if (num > 1) {
    for (let i = 2; i <= num / 2; i++) {
        if (num % i == 0) {
            num++;
            continue start;
        }
    }
    console.log(num);
  } 
  num++;
}

/*
2) С помощью цикла do…while написать функцию для вывода чисел от 0 до 10, чтобы результат выглядел так:
0 – это ноль
1 – нечетное число
2 – четное число
3 – нечетное число
…
10 – четное число
*/
let num = 0;
do {
  if (num == 0) {
    console.log(num + " – это ноль");
  } else if (num % 2 == 0) {
    console.log(num + " – четное число");
  } else {
    console.log(num + " – нечетное число");
  }
} while(++num <= 10);

/*
3) * Вывести с помощью цикла for числа от 0 до 9, НЕ используя тело цикла. То есть выглядеть должно вот так:

for(…){// здесь пусто}
*/

for (let i = 0; i <=10; console.log(i), i++) {}

/*
4) * Нарисовать пирамиду с помощью console.log, как показано на рисунке, только у вашей пирамиды должно быть 20 рядов, а не 5:
*/
let pyramidStr = '';
for (let i = 0; i < 20; i++) {
  for (let j = 0; j <= i; j++) {
    pyramidStr += 'x';
  }
  pyramidStr += '\n';
}

console.log(pyramidStr);