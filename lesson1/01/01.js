"use strict";
/* Несмотря на то, что урок вводный, и задание состоит в простейшем задании
переменных и присвоении им определенных значений, пишу программу так, как мне
кажется наиболее лучшим, в соответсвии с моим прогрессом в изучении JS */
fn_TcToTf();

function fn_TcToTf (){
    var Tc = prompt ('Введите температуру по цельсию. Дробную часть пишите через точку.', '');
    if (Tc !== null && Tc !== ''){ // нажата кнопка "ОК"
        if (!!(Tc.match(/^\-?[0-9]+(\.[0-9]+)?$/))) { // проверяем, что было введено число
            alert ('Температура в фаренгейтах равна '+((9/5)*Tc+32));
            fn_CloseTcToTf ();
        } else {
            confirm ('Необходимо ввести число.') ? fn_TcToTf() : fn_CloseTcToTf ();
        } 
    } else {
        fn_CloseTcToTf ();
    };
};

function fn_CloseTcToTf () {
    !(confirm('Закрыть программу преобразования цельсии в ференгейт?')) && fn_TcToTf();
}