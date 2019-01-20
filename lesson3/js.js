// Задание №1 ----------------------------------------------------------------------------
/* Описание
С помощью цикла while вывести все простые числа в промежутке от 0 до 100
*/
function ex1() {
    var arr = []; 
    var a = 100; 
    for (var i = 0; i < a; i++) {
      arr.push(i); 
    }
    var b = 2,
      c = 2; 
    
    while (c < a) {
      while (b < a) {
        b += c;
        delete arr[b];
      }
      c++;
      p = c;
    }
    delete arr[0];
    delete arr[1];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] !== undefined) {
        alert(arr[i]);
      }
    }
  }
//----------------------------------------------------------------------------------------

// Задание №2 ----------------------------------------------------------------------------
/* Описание
С помощью цикла do…while написать функцию для вывода чисел от 0 до 10, чтобы результат выглядел так:
0 – это ноль
1 – нечетное число
2 – четное число
3 – нечетное число
…
10 – четное число
*/
 function ex2() {
    const n = 10;
    let i = 0;
    do {
      if (i === 0) {
        alert(i + ' - это ноль');
      } else {
        var d = (i % 2) ? alert(i + ' - нечетное число') : alert(i + ' - четное число');
      }
      i++;
    } while (i <= n);
  }
//----------------------------------------------------------------------------------------

// Задание №4 ----------------------------------------------------------------------------
/* Описание
Нарисовать пирамиду с помощью console.log, как показано на рисунке, только у вашей пирамиды должно быть 20 рядов, а не 5:

x
xx
xxx
xxxx
xxxxx
*/
 console.log('*');
 var star = '*';
 for (var i = 1; i < 20; i++) {
   star += '*';
   console.log(star);
 }
 //----------------------------------------------------------------------------------------