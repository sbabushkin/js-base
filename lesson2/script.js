/*
Задание 1
*/
function ex1() {
  var a = 1,
    b = 1,
    c, d;
  c = ++a;
  alert("++a = " + c + " - 1+1 сначало прибавили, а потом вывели");
  d = b++;
  alert("b++ = " + d + " - 1 сначало вывели, а потом прибавили");
  c = (2 + ++a);
  alert("2 + (++a) = " + c + " - т.к. а = 2, мы сначало прибовляем 1 выполняя операцию ++а, потом прибовляем 2");
  d = (2 + b++);
  alert("2 + (b++) = " + d + " - т.к. b уже = 2 (то предыдущего b++) и мы прибовляем еще 2, и запоминаем что в следующем выводе будет +1");
  alert("a = " + a + " -  мы выполнили 2 действия ++а");
  alert("b = " + b + " - мы выполнили 2 действия b++ и вывели его 3 раза, что позволило прибавиться еще 1");
}

/*
Задание 2
*/
function ex2() {
  var a = 2;
  var x = 1 + (a *= 2);
  alert("a = a * 2 = " + a + " - мы присваиваем и умнажаем на 2 переменную а");
  alert("1 + (a * 2) = " + x + " - т.к. у нас сначало выполняются действия в () у нас а = 4 и мы прибовляем 1");
}

/*
Задание 3
*/
function ex3() {
  var variable_1 = prompt("Введите число: ", -5);
  var variable_2 = prompt("Введите число: ", 10);
  if (isNaN(variable_1) || isNaN(variable_2) || variable_1 == null || variable_2 == null) {
    alert('Нужно ввести число');
  } else if (variable_1 > 0 && variable_2 > 0) {
    alert('Введенные числа положительные: ' + (variable_1 - variable_2));
  } else if (variable_1 < 0 && variable_2 < 0) {
    alert('Введенные числа отрицательные: ' + (variable_1 * variable_2));
  } else if (variable_1 < 0 && variable_2 > 0 || variable_1 > 0 && variable_2 < 0) {
    var x = Number(variable_1) + Number(variable_2);
    alert('Числа с разными знаками: ' + x);
  } else {
    alert('Нужно ввести число');
  }
}

/*
Задание 4
*/
function ex4() {
  var a = +prompt('Введите число от 1 до 15');
  if (isNaN(a) || a === null) {
    alert('Нужно ввести число');
  } else {
    switch (a) {
      case 1:
        alert("1");
      case 2:
        alert("2");
      case 3:
        alert("3");
      case 4:
        alert("4");
      case 5:
        alert("5");
      case 6:
        alert("6");
      case 7:
        alert("7");
      case 8:
        alert("8");
      case 9:
        alert("9");
      case 10:
        alert("10");
      case 11:
        alert("11");
      case 12:
        alert("12");
      case 13:
        alert("13");
      case 14:
        alert("14");
      case 15:
        alert("15");
        break;
    }
  }
}
/*
Задание 5
*/
function plus(a, b) {
  return Number(a) + Number(b);
}

function minus(a, b) {
  return a - b;
}

function div(a, b) {
  return a / b;
}

function mult(a, b) {
  return a * b;
}

function ex5() {
  var addend1 = prompt('Введите первое слагаемое');
  var addend2 = prompt('Введите второе слагаемое');
  if (isNaN(addend1) || addend1 === null && isNaN(addend2) || addend2 === null) {
    alert('Нужно ввести число');
  } else {
    alert('Сложение ' + plus(addend1, addend2));
    alert('Вычитание ' + minus(addend1, addend2));
    alert('Деление ' + div(addend1, addend2));
    alert('Произведение ' + mult(addend1, addend2));
  }
}
/*
Задание 6
*/
function mathOperation(arg1, arg2, operation) {
  switch (operation) {
    case '+':
      return plus(arg1, arg2);
      break;
    case '-':
      return minus(arg1, arg2);
      break;
    case '/':
      return div(arg1, arg2);
      break;
    case '*':
      return mult(arg1, arg2);
      break;
  }
}

function ex6() {
  var addend1 = prompt('Введите первое слагаемое');
  var addend2 = prompt('Введите второе слагаемое');
  var symbol = prompt('Введите математический символ: + - / * ');
  if (isNaN(addend1) || addend1 === null && isNaN(addend2) || addend2 === null) {
    alert('Нужно ввести число');
  } else if (symbol === '+') {
    alert('Сложение ' + mathOperation(addend1, addend2, symbol));
  } else if (symbol === '-') {
    alert('Вычитание ' + mathOperation(addend1, addend2, symbol));
  } else if (symbol === '/') {
    alert('Деление ' + mathOperation(addend1, addend2, symbol));
  } else if (symbol === '*') {
    alert('Произведение ' + mathOperation(addend1, addend2, symbol));
  } else {
    alert('Нужно ввести математический символ: + - / *');
  }
}

/*
Задание 7
*/
function ex7() {
  var ziro = 0,
    nul = null;
  alert("Типы данных 0 и null: " + typeof (ziro) + " и " + typeof (nul));
  alert("0 + null: " + (ziro + nul));
  alert("0 - null: " + (ziro - nul));
  alert("0 * null: " + (ziro * nul));
  alert("0 / null: " + (ziro / nul));
  alert(ziro + " - это число 0");
  alert(nul + " - это пустая ячейка памяти");
}
/*
Задание 8
*/
// a^n = a*a*a*a*a*...*a;
// val – заданное число 5
// pow – степень.       3
function power(vol, pow) {
  var x = (pow != 1) ? (vol * power(vol, pow - 1)) : vol;
  return x;
  //      if (pow != 1) {
  //        return vol * power(vol, pow - 1);
  //      } else {
  //        return vol;
  //      }
}
function ex8() {
  var addend1 = prompt('Введите число');
  var addend2 = prompt('Введите степень');
  if (isNaN(addend1) || addend1 === null && isNaN(addend2) || addend2 === null) {
    alert('Нужно ввести число');
  } else {
    alert(power(addend1, addend2));
  }
}