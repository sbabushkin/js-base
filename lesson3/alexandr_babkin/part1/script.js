var j = 2; /*инициализируем переменную начального значения при расчете простых чисел*/

str = ''; /*инициализируем строковую переменную в которую будем заносить все найденные простые числа (значения будут разделяться символом ",")*/

/*инициализируем цикл по поиску простых чисел*/

while (j <= 100) { 
    if (searchNatur(j)) {
	str = str + j + ', ';
    }
    j++;
}

/*Функция по поределению является ли число простым*/

function searchNatur(number) {
    for (var i = 2; i <= number / 2; i++) {
        if (number % i == 0) {
            return false;
        }
    }
    return true;
}


alert(str);

