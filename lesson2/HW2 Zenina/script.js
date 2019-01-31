function task3() {
    var a = document.getElementById('a').value;
    var b = document.getElementById('b').value;
    var str = 'Результат: ';
    if (a >= 0 && b >= 0) {
        if (a > b) {
            str += "Разность чисел = " + (a - b);
        } else {
            str += "Разность чисел = " + (b - a);
        }
    } else if (a < 0 && b < 0) {
        str += "Произведение чисел = " + a * b;
    } else {
        str += "Сумма чисел = " + (Number(a) + Number(b));
    }
    document.getElementById('t3').innerHTML = str;
}

function task4() {
    var a = Math.trunc(Math.random() * 16);
    var str = 'Вывод: ';
    //использовать switch ну уж совсем странно
    for (var i = a; i <= 15; i++) {
        str += i + ' ';
    }
    document.getElementById('t41').innerHTML = 'a = ' + a;
    document.getElementById('t42').innerHTML = str;
}

function Myadd(xn, yn, res) {
    var x = document.getElementById(xn.toString()).value;
    var y = document.getElementById(yn.toString()).value;
    document.getElementById(res.toString()).innerHTML = 'Результат: ' + (Number(x) + Number(y));
}

function Mysub(xn, yn, res) {
    var x = document.getElementById(xn.toString()).value;
    var y = document.getElementById(yn.toString()).value;
    document.getElementById(res.toString()).innerHTML = 'Результат: ' + (Number(x) - Number(y));

}

function Mydiv(xn, yn, res) {
    var x = document.getElementById(xn.toString()).value;
    var y = document.getElementById(yn.toString()).value;
    document.getElementById(res.toString()).innerHTML = 'Результат: ' + (Number(x) / Number(y));
}

function Mymult(xn, yn, res) {
    var x = document.getElementById(xn.toString()).value;
    var y = document.getElementById(yn.toString()).value;
    document.getElementById(res.toString()).innerHTML = 'Результат: ' + (Number(x) * Number(y));
}

function mathOperation(arg1, arg2, res, op) {
    switch (document.getElementById(op.toString()).value) {
        case 'add':
            Myadd(arg1, arg2, res);
            break;
        case 'sub':
            Mysub(arg1, arg2, res);
            break;
        case 'div':
            Mydiv(arg1, arg2, res);
            break;
        case 'mult':
            Mymult(arg1, arg2, res);
            break;
        default:
            alert('Нет такой команды');
    }
}

function task7() {
    var str = 'Результат: ';
    if (null == 0) {
        str += 'равны при ==; ';
    } else {
        str += 'не равны при ==; ';
    }
    if (null === 0) {
        str += 'равны при ===; ';
    } else {
        str += 'не равны при ===; ';
    }
    alert(null == 0);
    document.getElementById('t7').innerHTML = str;
}

function Mypower(val, pow) {
    var x = document.getElementById(val.toString()).value;
    var y = document.getElementById(pow.toString()).value;
    if (x == 0) {
        document.getElementById('t8').innerHTML = 'Результат:0'
    } else {
        document.getElementById('t8').innerHTML = 'Результат: ' + power(x, y);
    }
}

function power(a, b) {
    return b > 0 ? a * power(a, b - 1) : 1;
}
