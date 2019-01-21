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
	Count: function () {
		try{
			let count = 0;
			for (let val in this) {
				if (typeof this[val] === 'object'){
					if (this[val].constructor.name === 'fnc_Product') {
						count++;
					}
				}
			}
			return count;
		} catch (e) {
			console.log(e);
		}
	},

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

// создадим несколько позиций в корзине
Busket['pos1'] = new fnc_Product(1, 'Жвачка', 'Бубльгум', 'Жутко вкусная жвачка', 'Bubl-production', 200, 800, 0.05);
Busket.pos1.usercount = 5;
Busket['pos2'] = new fnc_Product(2, 'Жвачка', 'Дирол', 'Мятная жвачка', 'Dirol-production', 400, 1500, 0.1);
Busket.pos2.usercount = 3;
Busket['pos3'] = new fnc_Product(3, 'Жвачка', 'Ментос', 'Мятная конфета', 'Mentos-production', 800, 400, 0.25);
Busket.pos3.usercount = 3;

function fn_BusketOpen() { //функция создает таблицу товаров корзины
	try {
		let div_busket = document.querySelector('#busket');
		let boo_IsProduct = false; //проверяем, есть ли в корзине хотя бы один товар
		for (let val in Busket){
			if (typeof Busket[val] === 'object'){
				if (arr_Catalog[val].constructor.name === 'fnc_Product') {
					boo_IsProduct = true;
					break;
				}
			}
		}

		if (boo_IsProduct) { //если есть хотя бы один товар
			let p = document.createElement('p');
			p.setAttribute('class', 'busket__head');
			p.textContent = 'Ваши товары';
			div_busket.appendChild(p);

			let table = document.createElement('table');
			table.setAttribute('class', 'busket__table');
			let tr = document.createElement('tr');

			// создаем заголовки таблицы
			let th = document.createElement('th');
			th.textContent = 'Номер';
			tr.appendChild(th);
			th = document.createElement('th');
			th.textContent = 'Наименование';
			tr.appendChild(th);
			th = document.createElement('th');
			th.textContent = 'Цена';
			tr.appendChild(th);
			th = document.createElement('th');
			th.textContent = 'Скидка';
			tr.appendChild(th);
			th = document.createElement('th');
			th.textContent = 'Количество';
			tr.appendChild(th);
			th = document.createElement('th');
			th.textContent = 'Стоимость';
			tr.appendChild(th);
			table.appendChild(tr);

			//заполняем таблицу данными из Busket
			for (let val in Busket){
				if (typeof Busket[val] === 'object') {
					if (Busket[val].hasOwnProperty('id') && Busket[val].id)	{
						if (Busket[val].hasOwnProperty('name') && Busket[val].name) {
							if (Busket[val].hasOwnProperty('price') && Busket[val].price) {
								if (Busket[val].hasOwnProperty('usercount') && Busket[val].usercount) {
									tr = document.createElement('tr');
									td = document.createElement('td');
									td.textContent = Busket[val].id;
									tr.appendChild(td);
									td = document.createElement('td');
									td.textContent = Busket[val].name;
									tr.appendChild(td);
									td = document.createElement('td');
									td.textContent = Busket[val].price + ' руб.';
									tr.appendChild(td);
									td = document.createElement('td');
									td.textContent = Busket[val].discount*100 + '%';
									tr.appendChild(td);
									td = document.createElement('td');
									td.textContent = Busket[val].usercount;
									tr.appendChild(td);
									td = document.createElement('td');
									td.textContent = Busket.CostById(Busket[val].id) + ' руб.';
									tr.appendChild(td);
									table.appendChild(tr);
								} else {
									throw new Error('Cannot creat busket. User count error on ' + val);
								}
							} else {
								throw new Error('Cannot creat busket. Price error on ' + val);
							}
						} else {
							throw new Error('Cannot creat busket. Name error on ' + val);
						}
					} else {
						throw new Error('Cannot creat busket. Id error on ' + val);
					}
				}
			}
			div_busket.appendChild(table);

		// строка с общей суммой
			p = document.createElement('p');
			p.setAttribute('class', 'busket__footer');
			p.textContent = 'Итого: Товаров '+ Busket.Count() + ' на сумму ' + Busket.Cost() + ' руб';

			div_busket.appendChild(p);
		} else { // если товара нет
			let p = document.createElement('p');
			p.setAttribute('class', 'busket__head');
			p.textContent = 'Корзина пуста';

			div_busket.appendChild(p);
		}

		let btn_busket = document.querySelector('#btn_busket');
		btn_busket.textContent = 'Закрыть корзину';
		btn_busket.removeEventListener('click', fn_BusketOpen);
		btn_busket.addEventListener('click', fn_BusketClose);
	} catch (e) {
		console.log(e);
	}
}

function fn_BusketClose() { // функция удаляет таблицу товаров корзины
	let div_busket = document.querySelector('#busket');
	let p = document.querySelector('.busket__head');
	div_busket.removeChild(p);
	let table = document.querySelector('.busket__table');
	if (table) {
		div_busket.removeChild(table);
	}
	p = document.querySelector('.busket__footer');
	if (table) {
		div_busket.removeChild(p);
	}
	let btn_busket = document.querySelector('#btn_busket');
	btn_busket.textContent = 'Открыть корзину';
	btn_busket.removeEventListener('click', fn_BusketClose);
	btn_busket.addEventListener('click', fn_BusketOpen);
}

window.onload = function () {
	let btn_busket = document.querySelector('#btn_busket');
	btn_busket.addEventListener('click', fn_BusketOpen);
};