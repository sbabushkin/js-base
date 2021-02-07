/*
1. Написать функцию, преобразующую число в объект. Передавая на вход число от 0 до 999, мы
должны получить на выходе объект, в котором в соответствующих свойствах описаны
единицы, десятки и сотни. Например, для числа 245 мы должны получить следующий объект:
{‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}. Если число превышает 999, необходимо выдать
соответствующее сообщение с помощью console.log и вернуть пустой объект.
*/

const numToObj = (num) =>{
	// объявляем объект, содержащий нужные свойства и присваиваем им значения:
	let finalObj = {};
	// парсим на входе число до круглого и проверяем, что оно совпадает с увловием от 0 до 999: 
	if(parseInt(num) >= 0 && parseInt(num) < 1000){
		// считаем количество символов в числе:
		const x = num.toString().length;
		// переводим число в строку, чтобы можно было обращаться к её индексам:
		const stringNum = num.toString();
		// дальше, в зависимости от длины числа, передаем соответствующим свойствам их значения:
		if(x === 0){
		} else if (x === 1){
			finalObj['единицы'] = stringNum[0];
		} else if (x === 2){
			finalObj['десятки'] = stringNum[0];
			finalObj['единицы'] = stringNum[1];
		} else if (x === 3){
			finalObj['сотни'] = stringNum[0]; 
			finalObj['десятки'] = stringNum[1];
			finalObj['единицы'] = stringNum[2];
		}
	} else {
		console.log('Error: not >= 0 and < 1000 number!');
		return finalObj;
	};
	// возвращаем финальный объект:
	return finalObj;
};
// обращаемся к функции и выводим результат в консоль:
console.log('Объект, в котором в соответствующих свойствах описаны единицы, десятки и сотни:');
console.log('Вызываем функцию, число 976');
console.log(numToObj(976));
console.log('============================');

/*
2. Продолжаем работу с нашим интернет-магазином
2.1. В прошлом ДЗ Вы реализовали корзину на базе массивов. Какими объектами можно
заменить элементы данных массивов?
2.2. Реализуйте такие объекты
2.3. Перенесите функционал подсчета корзины на объектно-ориентированную базу
*/

let itemsDatabaseObj = {
	// перечень товаров в категории Items
	_items: {
		'Утюг':{
			cost: 100,
			id: 7763626,
			fullName: 'Samsung G433'
		},
		'Кофеварка':{
			cost: 50,
			id: 7763624
		},
		'Пылесос':{
			cost: 250,
			id: 7763625
		}
	}, 
	// ссылка на items:
	get items(){
		return this._items;
	},
	// функция добавления продукта:
	addItem(name, cost, id, fullName){
		let newItem = {
			cost,
			id,
			fullName
		};
		this.items[name] = newItem;
	},
	// функция удаления продукта:
	removeItem(name){
		delete this.items[name];
	},
	// функция возврата стоимости товара по названию товара:
	getItemCost(name){
		return this.items[name].cost;
	},
	// функция возврата полной стоимости корзины с учетом количества каждого элемента:
	getItemCostAll(obj){
		let totalCost = 0;
		// получаем перечень ключей корзины
		let keysObj = Object.keys(obj);
		for (let i=0; i<keysObj.length;i++){
			/*console.log(keysObj[i]+' costs: '+this.getItemCost(keysObj[i])+' times: '+obj[keysObj[i]].count);*/
			totalCost += this.getItemCost(keysObj[i]) * obj[keysObj[i]].count;
				/* ... this.getItemCost(keysObj[i]) - передаем название продукта из массива ключей в функцию воврата стоимости товара getItemCost,
					... * obj[keysObj[i]].count - перемножаем на значение количества продуктов в объекте корзины,
						totalCost += ...- то что получилось, добавляем в общую стоимость.
				*/
		}
		// возвращаем общую стоимость:
		return totalCost;
	},
};
/*itemsDatabaseObj.addItem('Грелка', 50, 67788, 'Грелка бытовая');
console.log(itemsDatabaseObj.items);
itemsDatabaseObj.removeItem('Грелка');
console.log(itemsDatabaseObj.items);*/

// корзина с товарами и количеством каждого товара:
let basketItemsObj = {
	'Утюг':{
		count: 2
	},
	'Кофеварка':{
		count: 3
	},
	'Пылесос':{
		count: 1
	}
};

// инфо часть:
console.log('Предметы в БД:')
for (keys in itemsDatabaseObj.items){
	console.log(keys+', цена: '+itemsDatabaseObj.items[keys].cost);
}
console.log('============================');
console.log('Предметы в корзине:');
for (keys in basketItemsObj){
	console.log(keys+', в количестве: '+basketItemsObj[keys].count+' шт.')
}
console.log('============================');

// вывод метода getItemCostAll объекта itemsDatabaseObj в консоль:
console.log('Стоимость корзины: '+itemsDatabaseObj.getItemCostAll(basketItemsObj));

/*
3. * Подумайте над глобальными сущностями. К примеру, сущность “Продукт” в
интернет-магазине актуальна не только для корзины, но и для каталога. Стремиться нужно к
тому, чтобы объект “Продукт” имел единую структуру для различных модулей нашего сайта,
но в разных местах давал возможность вызывать разные методы.
*/

// по сути, itemsDatabaseObj - это и есть глобальная сущность "продукт", она содержит в себе информацию о продуктах и методы работы с ними.