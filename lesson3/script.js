/*
Задание 1
*/
function ex1() {
  //пустой масив
  var arr = [];
  //длинна масива
  const n = 100;
  for (let i = 0; i < n; i++) {
    //создаем масив из n элементов
    arr.push(i);
  }
  //объявляем переменныe
  let p = 2;
  let j = 2;
  /*
  Для нахождения всех простых чисел не больше заданного числа n, следуя методу Эратосфена, нужно выполнить следующие шаги:

  1) Выписать подряд все целые числа от двух до n (2, 3, 4, …, n).
  2) Пусть переменная p изначально равна двум — первому простому числу.
  3) Зачеркнуть в списке числа от 2p до n считая шагами по p (это будут числа кратные p: 2p, 3p, 4p, …).
  4) Найти первое незачёркнутое число в списке, большее чем p, и присвоить значению переменной p это число.
  5) Повторять шаги 3 и 4, пока возможно.
  */
  while (j < n) {
    while (p < n) {
      p += j;
      delete arr[p];
    }
    j++;
    p = j;
  }
  delete arr[0];
  delete arr[1];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== undefined) {
      alert(arr[i]);
    }
  }
}

/*
Задание 2
*/
function ex2() {
  const n = 10;
  let i = 0;
  do {
    if (i === 0) {
      alert(i + ' - это ноль');
    } else {
      let d = (i % 2) ? alert(i + ' - нечетное число') : alert(i + ' - четное число');
    }
    i++;
  } while (i <= n);
}
/*
Задание 3
*/
function ex3() {
  for (let i = 0; i < 10; alert(i++));
}
/*
Задание 4
*/
console.log("Задание 4.");
let star = "*";
for (let i = 1; i < 20; i++) {
  star += "*";
  console.log(star);
}

/*
Доп. задание
*/
console.log("Доп. задание");
const array1 = [1, 2, 10, 3, 4].reduce(function (previousValue, currentValue, index, array) {
  return Math.max.apply(null, array);
});

console.log(array1);
