﻿/* Задание № 2 из методички
так как описание задания непонятно, предполагаю,
что ассоциативный массив содержит название товара и его стоимость,
массив заполняется по мере поступления товара в корзину, в массиве
возможны повторения*/

var arr_Basket = []; // создаем и заполняем массив
for (var i=0; i<15; i++){
    arr_Basket[(i+1)+' товар'] = 15*(i+1);
};

function  countBasketPrice (arr_Basket){
    var cost = 0;
    for(var val in arr_Basket){
        cost += arr_Basket[val];
    };
    return cost;
};