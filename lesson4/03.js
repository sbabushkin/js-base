/*
На мой взгляд задание слишком абстрактное, лучше бы конкретное тз
*/
//примерный вариант объекта Product
function fnc_Product (id, category, name, description, produccer, price, count, discount) {
	this.id = id; //идендификатор
	this.category = category; // категория
	this.name = name; // наименование товара
	this.description = description; // описание товара
	this.producer = produccer; // производитель
	this.price = price; // стоимость
	this.count = count; // колличество доступного товара
	this.discount = discount; //скидка
}

// создадим корзину как объект
let Busket = {
	CostById: function (id) { //метод вычисляет стоимость по конкретному id товара, возвращает строку со стоимостью до 2х знаков полсе запятой
		try {
			if (arguments.length === 1){
				if (typeof id === 'number'){
					for (let val in this) {
						if (typeof this[val] === 'object') {
							if (this[val].hasOwnProperty('id') && this[val].id === id) {
								if (this[val].hasOwnProperty('usercount') && !isNaN(this[val].usercount)) {
									if (this[val].hasOwnProperty('price') && !isNaN(this[val].price)) {
										if (this[val].hasOwnProperty('discount') && !isNaN(this[val].discount)) {
											return (Math.round(this[val].usercount * this[val].price * (1 - this[val].discount) * 100) / 100).toFixed(2);
										} else {
											throw new Error('Cost of product' + id + ' cannot be calculated. Discount error.');
										}
									} else {
										throw new Error('Cost of product' + id + ' cannot be calculated. Price error.');
									}
								} else {
									throw new Error('Cost of product' + id + ' cannot be calculated. User count error.');
								}
							}
						}
					}
					throw new Error(id + ' is not in Busket'); //сообщаем, что в корзине нет такого продукта
				} else {
					throw new Error('Function parameter must be \'number\'');
				}
			} else {
				throw new Error('It must be only 1 parameter');
			}
		} catch (e) {
			console.log(e);
		}
	},

	Cost: function () { // метод считает общую стоимость корзины, возвращает строку со стоимостью до 2х знаков полсе запятой
		try{
			let cost = 0;
			for (let val in this) {
				if (typeof this[val] === 'object'){
					if (this[val].hasOwnProperty('usercount') && !isNaN(this[val].usercount)) {
						if (this[val].hasOwnProperty('price') && !isNaN(this[val].price)) {
							if (this[val].hasOwnProperty('discount') && !isNaN(this[val].discount)) {
								cost += Math.round(this[val].usercount * this[val].price * (1-this[val].discount)*100)/100;
							} else {
								throw new Error('Cost cannot be calculated. Discount error.');
							}
						} else {
							throw new Error('Cost cannot be calculated. Price error.');
						}
					} else {
						throw new Error('Cost cannot be calculated. User count error.');
					}
				}
			}
			return cost.toFixed(2);
		} catch (e) {
			console.log(e);
		}
	}
};

// заполняем корзину произвольными значениями
for (let i=0; i<10; i++) {
	Busket['product'+i] = new fnc_Product();
	Busket['product'+i].id = i; //идендификатор
	Busket['product'+i].price = Math.floor((i+500)*270)/100; // стоимость
	Busket['product'+i].discount = Math.round((i+7)/5)/100; //скидка
	Busket['product'+i].usercount = Math.floor((i+12)/9); //колличество заказа от пользователя
}

// пробный запрос на некоторые позиции товара
for (let i=0; i<11; i++){
	document.write(Busket.CostById(i)+'</br>');
}

