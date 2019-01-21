/* 1.) С помощью цикла while вывести все простые числа в промежутке от 0 до 100 */

const checkSimpleNum = (num) =>{ //функция на проверку простого числа, чтобы можно было в основной функции прерывать цикл
	for(let i=2; i<num;i++){
		if(num%i===0) return false;
	}
	return true;
}

const simpleNumArray = (num) =>{
	let arr = [];
	let i = 2;
	while(i<=num){
		if(checkSimpleNum(i)){ //на каждой итерации проверяем через функцию на true false;
			arr.push(i);
		}
		i++;
	}
	return arr;
}

console.log('Вывод массива простых чисел от 0 до 100: '+simpleNumArray(100));

/*
2) С помощью цикла do…while написать функцию для вывода чисел от 0 до 10, чтобы результат выглядел так:
0 – это ноль
1 – нечетное число
2 – четное число
3 – нечетное число
…
10 – четное число
*/

const numDisplay = () =>{
	let count = 0;
	const countMax = 10;
	do {
		if(count === 0){
			console.log(count+' - это ноль')
		} else if (count%2 === 0){
			console.log(count+' - это четное число')
		} else {
			console.log(count+' - это не четное число')
		}
		count++;
	} while(count <= 10)
}

numDisplay();

/* 2. Начиная с этого урока, мы начинаем работать с функционалом интернет-магазина.
Предположим, что у нас есть сущность корзины. Нужно реализовать функционал подсчета
стоимости корзины в зависимости от находящихся в ней товаров. Товары в корзине хранятся в
массиве.
2.1. Организуйте такой массив для хранения товаров в корзине
2.2. Организуйте функцию countBasketPrice, которая будет считать стоимость корзины. */

let basketItems = ['Утюг', 'Утюг', 'Кофеварка','Пылесос'];
let ItemsCost = [['Утюг', 100], ['Кофеварка', 50],['Пылесос', 250]];

//функция возврата стоимости конкретного товара.
const getItemPrice = (item, array) =>{
	let items = [];
	let costs = [];
	//предполагаем, что мы знаем структуру массива со стоимостями товара, поэтому разбиваем его на 2 одномерных массива
	for(let i=0; i<array.length; i++){
		items.push(array[i][0]);
		costs.push(array[i][1]);
	}
	//используя метод .indexOf получаем индекс товара в массиве с названиями товаров и возвращаем стоимость по этому индексу из массива цен
	return costs[items.indexOf(item)];
}

const countBasketPrice = (basketArr, costArr) =>{
	let totalCost = 0;
	for(let i=0;i<basketArr.length;i++){
		//на каждой итерации обхода массива корзины обращаемся к функции получения стоимости единицы товара.
		totalCost += getItemPrice(basketArr[i],costArr);
	}
	return totalCost;
}
console.log("Массив корзины: "+basketItems);
console.log("Массив стоимости каждого товара: "+ItemsCost);
console.log("Вывод полной стоимости корзины: "+countBasketPrice(basketItems, ItemsCost));

/* 3. *Вывести с помощью цикла for числа от 0 до 9, НЕ используя тело цикла. То есть
выглядеть должно вот так:
for(…){// здесь пусто} */

for(let i=0; i<=9; i++) console.log('Цикл без тела {}: '+i);

/* 4. * Нарисовать пирамиду с помощью console.log, как показано на рисунке, только у вашей
© geekbrains.ru 7
пирамиды должно быть 20 рядов, а не 5: */

const pyramidScheme = (rows, symbol) =>{
	let picture = '';
	for(let i=1; i<=rows;i++){
		console.log(picture+=symbol);
	}
}

pyramidScheme(20, 'x');

