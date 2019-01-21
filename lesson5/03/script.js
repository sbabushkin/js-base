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

let arr_Catalog = [];

// создадим несколько позиций в корзине
arr_Catalog['pos1'] = new fnc_Product(1, 'Жвачка', 'Бубльгум', 'Жутко вкусная жвачка', 'Bubl-production', 200, 800, 0.05);
arr_Catalog['pos2'] = new fnc_Product(2, 'Жвачка', 'Дирол', 'Мятная жвачка', 'Dirol-production', 400, 1500, 0.1);
arr_Catalog['pos3'] = new fnc_Product(3, 'Жвачка', 'Ментос', 'Мятная конфета', 'Mentos-production', 800, 400, 0.25);

function fn_CatalogOpen() { //функция создает таблицу товаров корзины
	try {
		let div_busket = document.querySelector('#busket');
		let boo_IsProduct = false; //проверяем, есть ли в корзине хотя бы один товар
		for (let val in Busket){
			if (typeof Busket[val] === 'object'){
				boo_IsProduct = true;
				break;
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