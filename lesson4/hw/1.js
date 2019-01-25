console.log("4 урок. Задача №1");
//создаем функцию возвращающую целое число от 0 до 1000
function intNumb() {
    let x = Math.floor(Math.random()*2e3);
    return x;
}
// записываем в переменную случайное число из функции выше, и приводим ее к строке, что бы работал length
let b =String(intNumb());

// выводим число
console.log(b);

//объект где будут хранится разбитые числа числа
let objNumb = {};

//функция разбивающая число b 
function numbInObj() {

    if (b.length > 3) {
        console.log(objNumb + " 4х значное число --> Пустой объект" )
    }
    else {
        //objNumb.map(numb => numb['сотни'] = b[1]);

        objNumb['сотни'] = +b[0],// привели к числу +
        objNumb['десятки'] = +b[1],
        objNumb['единицы'] = +b[2],
        console.log(objNumb)
    }
}

numbInObj();


