let number = prompt('Введите число', '');
let obj = numToObj(number);
if (obj == null) {
    console.log('Объект равен нулю');
} else {
    /*console.log(obj);*/
    alert(obj);
}


function numToObj(num) {
    let arrNumber = num.split('');

    while (arrNumber.length < 3) {
        arrNumber.unshift(0);
    }
    let objNumber = {};
    if (arrNumber.length > 3) {
        return null;
    } else {
        objNumber['сотни'] = +arrNumber[0];
        objNumber['десятки'] = +arrNumber[1];
        objNumber['единицы'] = +arrNumber[2];
        return objNumber;
    }
}