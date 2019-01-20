/*
  Задание 1
*/

function isPrime(num) {
    if(num < 2) return false;
  
    var i = 2;
    while(i < num) {
        if(num % i === 0) {
            return false;
        }
        i++;
    }
    return true;
  }
  
  function getPrimes(max) {
    var i = 0;
    var list = []; // console.log(i)
  
    while(i < max) {
        if(isPrime(i)) list.push(i);
        i++;
    }
  
    console.log(list);
  }
  
  getPrimes(100);
  
  /*
    Задание 2
  */
  
  var i = 0;
  do {
      if(i === 0) {
          console.log(i + ' - это ноль' );
      } else if (i % 2 === 0) {
          console.log(i + ' - четное число' );
      } else {
          console.log(i + ' - нечетное число' );
      }
      i++;
  } while(i <= 10);
  
  /*
    Задание 3
  */
  
  for(var i = 0; i <= 9; console.log(i++)) {
    // ... пусто!
  }
  
  /*
    Задание 4
  */
  
  for(var i = 0, p = ''; i <=20; i++ ) {
    console.log(p += 'x');
  }