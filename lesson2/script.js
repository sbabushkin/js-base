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
    if (variable_1 >= 0 && variable_2 >= 0) {
      alert('Введенные числа положительные: ' + (variable_1 - variable_2));
    } else if (variable_1 < 0 && variable_2 < 0) {
      alert('Введенные числа отрицательные: ' + (variable_1 * variable_2));
    } else {
      alert('Числа с разными знаками: ' + (variable_1 + variable_2));
    }
    }
    
    /*
    Задание 4
    */
    console.log("Задание 4");
    var a = +prompt('Введите число от 1 до 15');
    switch (a) {
      case 1:
        console.log('1');
      case 2:
        console.log('2');
      case 3:
        console.log('3');
      case 4:
        console.log('4');
      case 5:
        console.log('5');
      case 6:
        console.log('6');
      case 7:
        console.log('7');
      case 8:
        console.log('8');
      case 9:
        console.log('9');
      case 10:
        console.log('10');
      case 11:
        console.log('11');
      case 12:
        console.log('12');
      case 13:
        console.log('13');
      case 14:
        console.log('14');
      case 15:
        console.log('15');
        break;
    }
    /*
    Задание 5
    */
    console.log("Задание 5");

    function plus(a, b) {
      return a + b;
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
    console.log('Сложение ', plus(5, 9));
    console.log('Вычитание ', minus(5, 9));
    console.log('Деление ', div(5, 9));
    console.log('Произведение ', mult(5, 9));
    /*
    Задание 6
    */
    console.log("Задание 6");

    function mathOperation(arg1, arg2, operation) {
      switch (operation) {
        case 'сложение':
          return plus(arg1, arg2);
          break;
        case 'вычитание':
          return minus(arg1, arg2);
          break;
        case 'деление':
          return div(arg1, arg2);
          break;
        case 'умножение':
          return mult(arg1, arg2);
          break;
      }
    }
    console.log('Сложение ', mathOperation(6, 9, 'сложение'));
    console.log('Вычитание ', mathOperation(5, 6, 'вычитание'));
    console.log('Деление ', mathOperation(6, 9, 'деление'));
    console.log('Произведение ', mathOperation(5, 6, 'умножение'));

    /*
    Задание 7
    */
    console.log("Задание 7");
    var ziro = 0,
      nul = null;
    console.log("Типы данных 0 и null: " + typeof (ziro) + " и " + typeof (nul));
    console.log("0 + null: " + (ziro + nul));
    console.log("0 - null: " + (ziro - nul));
    console.log("0 * null: " + (ziro * nul));
    console.log("0 / null: " + (ziro / nul));
    console.log(ziro + " - это число 0");
    console.log(nul + " - это пустая ячейка памяти");

    /*
    Задание 8
    */
    console.log("Задание 8");
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
    console.log(power(5, 4));
