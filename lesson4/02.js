// объект корзины состоит из имени товара, его колличества и цены
function fncProduct (name, count, price) {
	this.name = name;
	this.count = count;
	this.price = price;
}

// массив содержит строки из корзины
let arr_Busket = [];

// заполняем массив произвольными значениями
for (let i=0; i<10; i++) {
	arr_Busket[i] = new fncProduct('product'+i,i,i*500);
}

//функция вычисляет стоимость по конкретному товару. Считаем, что имя товара уникально
function fnCostByName(name) {
	try {
		if (arguments.length === 1){
			if (typeof name === 'string'){
				for (let i=0; i<arr_Busket.length; i++) {
					if (arr_Busket[i].name === name) {
						return arr_Busket[i].count*arr_Busket[i].price;
					}
				}
				throw new Error(name + ' is not in Busket'); //сообщаем, что в корзине нет такого продукта
			} else {
				throw new Error('Function parameter must be \'string\'');
			}
		} else {
			throw new Error('It must be only 1 parameter');
		}
	} catch (e) {
		console.log(e);
	}
}

// функция считает общую стоимость корзины
function fnCost() {
	let cost = 0;
	for (let i=0; i<arr_Busket.length; i++) {
		cost += arr_Busket[i].count*arr_Busket[i].price;
	}
	return cost;
}