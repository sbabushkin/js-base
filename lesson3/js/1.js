//создаем массив от 1 до 100 добавляем туда цифру 2 и убираем все четные цифры после 2ойки

let simpleNumb  = [];
let i = 1;

while (i<100) {
    i++;
    if (i/2 == 1)   {
        simpleNumb.push(i)
    }
}
let z = 1;
while (z<100) {
    z++;
    if(z%2 == 0) {
        continue;
    }
    simpleNumb.push(z);
}

//эту часть я списал... думал сделаю быстро но времени не хватило
let a = 4;
let b = 3;
while (a < 100){
    if (a % b ===0 && simpleNumb.indexOf(a) !== -1){
        simpleNumb.splice(simpleNumb.indexOf(a), 1);
    }else {
        a++;
    }
}

a = 6;
b = 5;
while (a < 100) {
    if (a % b === 0 && simpleNumb.indexOf(a) !== -1) {
        simpleNumb.splice(simpleNumb.indexOf(a), 1);
    } else {
        a++;
    }
}


a = 8;
b = 7;
while (a < 100) {
    if (a % b === 0 && simpleNumb.indexOf(a) !== -1) {
        simpleNumb.splice(simpleNumb.indexOf(a), 1);
    } else {
        a++;
    }
}

console.log("Ответ на 1 задачу: " + simpleNumb);
























