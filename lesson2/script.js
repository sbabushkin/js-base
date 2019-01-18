    console.log('Задание 1. Разберем код и поймем, почему такие значения.');
    console.log('Объявили переменные и поехали. Вначале мы задаем значения для трёх переменных и объявляем ещё две: a = 1, b = 1, c, d.');

    let a = 1,
        b = 1,
        c, d;

    console.log('Далее мы указываем, что переменная c приравнена к инкремированной а. При этом сама а также станет равна 2.');
    c = ++a;
    console.log('c = ' + c + ' | a = ' + a); // 2

    console.log('После мы задаем значение переменной d, которая равна b, т.е. d = 1, а после этой операции увеличиваем значение b на единицу и она становится равной 2.');
    d = b++;
    console.log('d = ' + d + ' | b = ' + b); // 1

    console.log('Следующий шаг - для переменной c устанавливаем новое значение, которое равно сложению чисел 2 + 3, поскольку в этом случае мы опять сначала увеличиваем а на единицу (2 + 1 = 3), после чего складываем и получаем 5.');
    c = (2 + ++a);
    console.log('c = ' + c + ' | a = ' + a); // 5

    console.log('Ещё один шаг - устанавливаем для переменной d новое значение, которое равно сложению чисел 2 + 2 (потому что b равно 2) = 4, после чего саму b мы увеличиваем на единицу и она становится равной 3.');
    d = (2 + b++);
    console.log('d = ' + d + ' | b = ' + b); // 4

    console.log('По итогу переменные a и b равны 3, что и сообщает скрипт. Выводим значения переменных а и b:');
    console.log('a = ' + a); // 3
    console.log('b = ' + b); // 3

    console.log('Задание 1 выполнено, код разобран.');

    console.log('Задание 2. Разберем код и поймем, почему такие значения.');
    var a = 2;
    console.log('Установим значение переменной a = ' + a + '.');
    var x = 1 + (a *= 2);
    console.log('Теперь объявляем переменную x и установим для неё результат сложения 1 и умножения переменной a на 2, при этом для умножения а используем сокращённой записи операторов с присваиванием нового значения переменной.');
    console.log('Поскольку умножение, упрятанное в скобки, имеет приоритет, мы умножаем a на 2 (присваивая ей новое значение a = ' + a + '), а потом прибавляем к этому значению 1 и получаем x = ' + x + '.');
    console.log('Задание 2 выполнено, код разобран.');

    console.log('Задания 3 - 6 и 8 вызываются функциями, добро пожаловать в исходный код.');

    // Функция проверки на число в переменной
    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    // Функция проверки на число в переменной
    function letNums() {
        console.log('Запрашиваем данные переменных:');

        let a = Number(prompt('Укажите значение a:'));
        if (!isNumeric(a) || a === 0) {
            a = Number(prompt('Для переменной a указано не число. Укажите значение a eщё раз:'));
        }
        console.log('Переменная а = ' + a);

        let b = Number(prompt('Укажите значение b:'));
        if (!isNumeric(b) || b === 0) {
            b = Number(prompt('Для переменной b указано не число. Укажите значение b eщё раз:'));
        }
        console.log('Переменная b = ' + b);

        if (a > 0 && b > 0) {
            console.log('a и b положительные, их разность = ' + Math.abs(a - b));
        } else if (a < 0 && b < 0) {
            console.log('a и b отрицательные, их произведение = ' + a * b);
        } else if (a < 0 || b > 0 && a > 0 || b < 0) {
            console.log('а и b разных знаков, их сумма = ' + (a + b));
        } else {
            console.log('Что-то пошло не так ;( Когда я нормально разберусь в js, все будет работать нормально, а пока вот так...');
        }
    }

    // Функция для счета до 15 от значения переменной
    function letOutput() {
        let a = Math.trunc(Math.random() * 15);
        let b = 0;
        console.log('Переменная a = ' + a + '.');
        switch (a) {
            case 0:
                console.log(a++);
                b++;
            case 1:
                console.log(a++);
                b++;
            case 2:
                console.log(a++);
                b++;
            case 3:
                console.log(a++);
                b++;
            case 4:
                console.log(a++);
                b++;
            case 5:
                console.log(a++);
                b++;
            case 6:
                console.log(a++);
                b++;
            case 7:
                console.log(a++);
                b++;
            case 8:
                console.log(a++);
                b++;
            case 9:
                console.log(a++);
                b++;
            case 10:
                console.log(a++);
                b++;
            case 11:
                console.log(a++);
                b++;
            case 12:
                console.log(a++);
                b++;
            case 13:
                console.log(a++);
                b++;
            case 14:
                console.log(a++);
                b++;
            case 15:
                console.log(a++);
                b++;
                break;
        }
        console.log('Счет закончен, сделано ' + b + ' шагов.');
        // ИМХО, тут мне видится быдлокодинг в своем исполнении, чувствую, что можно как-то более элегантно и быстро это сделать
    }

    // Функция математической операции в зависимости от значений чисел
    function firstMathoper() {
        console.log('Запрашиваем данные переменных:');

        let a = Number(prompt('Укажите значение a:'));
        if (!isNumeric(a) || a === 0) {
            a = Number(prompt('Для переменной a указано не число. Укажите значение a eщё раз:'));
        }
        console.log('Переменная а = ' + a);

        let operation = prompt('Мы его: + (сложим), - (вычтем), * (умножим), / (поделим)');

        let b = Number(prompt('Укажите значение b:'));
        if (!isNumeric(b) || b === 0) {
            b = Number(prompt('Для переменной b указано не число. Укажите значение b eщё раз:'));
        }
        console.log('Переменная b = ' + b);

        function Operation(var1, var2, Mathoper) {
            var MathoperValue;
            switch (Mathoper) {
                case '+':
                    MathoperValue = var1 + var2;
                    console.log('Складываем число ' + var1 + ' и число ' + var2);
                    break;
                case '-':
                    MathoperValue = var1 - var2;
                    console.log('Отнимаем от числа ' + var1 + ' число ' + var2);
                    break;
                case '*':
                    MathoperValue = var1 * var2;
                    console.log('Умножаем число ' + var1 + ' на число ' + var2);
                    break;
                case '/':
                    MathoperValue = var1 / var2;
                    console.log('Делим число ' + var1 + ' на ' + var2);
                    break;
            }
            return MathoperValue;
        }
        let Mathresult = Operation(a, b, operation);
        console.log('Результат: ' + Mathresult);
    }

    console.log('Задание 7. Разберем код и поймем, почему такие значения.');
    console.log('Зададим строковую, числовую и null-переменные: ');

    let a = '0';
    console.log('Значение переменной a: ' + a);

    let aNum = 0;
    console.log('Значение переменной aNum: ' + aNum);

    let b = null;
    console.log('Значение переменной b: ' + b);

    console.log('Тип переменной a: ' + typeof a);
    console.log('Тип переменной aNum: ' + typeof aNum);
    console.log('Тип переменной b: ' + typeof b);
    console.log('Здесь всё просто: 0 уже является значением (хоть строковым, хоть числовым), а null - отдельный тип (указывается как object), который можно пояснить как "ничего" или "пустота".');
    console.log('Задание 7 выполнено, код разобран.');

    // Функция возведения числа в степень
    function degree() {
        let val = Number(prompt('Число, которое возводим в степень:'));
        if (!isNumeric(val) || val === 0) {
            val = Number(prompt('Указано не число. Попробуйте eщё раз:'));
        }
        console.log('Число, которое возводим в степень: ' + val);

        let pow = Number(prompt('Степень:'));
        if (!isNumeric(pow) || pow === 0) {
            pow = Number(prompt('Указано не число. Попробуйте eщё раз:'));
        }
        console.log('Степень возведения числа: ' + pow);

        let powStep = 1;
        let powResult = val;

        while (powStep != pow) {
            powStep++;
            powResult = powResult * val;
        }
        console.log(val + ' в степени ' + pow + ' = ' + powResult);
    }