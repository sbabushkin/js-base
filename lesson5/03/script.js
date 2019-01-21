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

// создадим несколько позиций в каталоге
arr_Catalog['pos1'] = new fnc_Product(1, 'Жвачка', 'Бубльгум', 'Жутко вкусная жвачка', 'Bubl-production', 200, 800, 0.05);
arr_Catalog['pos2'] = new fnc_Product(2, 'Жвачка', 'Дирол', 'Мятная жвачка', 'Dirol-production', 400, 1500, 0.1);
arr_Catalog['pos3'] = new fnc_Product(3, 'Жвачка', 'Ментос', 'Мятная конфета', 'Mentos-production', 800, 400, 0.25);

function fn_CatalogOpen() { //функция создает таблицу товаров каталога
	try {
		let div_Catalog = document.querySelector('#catalog');
		let boo_IsProduct = false; //проверяем, есть ли в каталоге хотя бы один товар
		for (let val in arr_Catalog){
			if (typeof arr_Catalog[val] === 'object'){
				if (arr_Catalog[val].constructor.name === 'fnc_Product') {
					boo_IsProduct = true;
					break;
				}
			}
		}

		if (boo_IsProduct) { //если есть хотя бы один товар
			let p = document.createElement('p');
			p.setAttribute('class', 'catalog__head');
			p.textContent = 'Доступные товары';
			div_Catalog.appendChild(p);

			let table = document.createElement('table');
			table.setAttribute('class', 'catalog__table');
			let tr = document.createElement('tr');

			// создаем заголовки таблицы
			let th = document.createElement('th');
			th.textContent = 'Номер';
			tr.appendChild(th);
			th = document.createElement('th');
			th.textContent = 'Категория';
			tr.appendChild(th);
			th = document.createElement('th');
			th.textContent = 'Наименование';
			tr.appendChild(th);
			th = document.createElement('th');
			th.textContent = 'Описание';
			tr.appendChild(th);
			th = document.createElement('th');
			th.textContent = 'Производитель';
			tr.appendChild(th);
			th = document.createElement('th');
			th.textContent = 'Цена';
			tr.appendChild(th);
			th = document.createElement('th');
			th.textContent = 'Скидка';
			tr.appendChild(th);
			th = document.createElement('th');
			th.textContent = 'Доступное количество';
			tr.appendChild(th);
			table.appendChild(tr);

			//заполняем таблицу данными из arr_Catalog
			for (let val in arr_Catalog){
				if (typeof arr_Catalog[val] === 'object') {
					if (arr_Catalog[val].constructor.name === 'fnc_Product'){
						//номер
						tr = document.createElement('tr');
						td = document.createElement('td');
						td.textContent = arr_Catalog[val].id;
						tr.appendChild(td);
						//категория
						td = document.createElement('td');
						td.textContent = arr_Catalog[val].category;
						tr.appendChild(td);
						// наименование
						td = document.createElement('td');
						td.textContent = arr_Catalog[val].name;
						tr.appendChild(td);
						// описание
						td = document.createElement('td');
						td.textContent = arr_Catalog[val].description;
						tr.appendChild(td);
						// производитель
						td = document.createElement('td');
						td.textContent = arr_Catalog[val].producer;
						tr.appendChild(td);
						// цена
						td = document.createElement('td');
						td.textContent = arr_Catalog[val].price + ' руб.';
						tr.appendChild(td);
						// скидка
						td = document.createElement('td');
						td.textContent = arr_Catalog[val].discount*100 + '%';
						tr.appendChild(td);
						// доступное колличество
						td = document.createElement('td');
						td.textContent = arr_Catalog[val].count;
						tr.appendChild(td);
						table.appendChild(tr);
					}
				}
			}
			div_Catalog.appendChild(table);
		} else { // если товара нет
			let p = document.createElement('p');
			p.setAttribute('class', 'catalog__head');
			p.textContent = 'Каталог пуст';

			div_Catalog.appendChild(p);
		}
	} catch (e) {
		console.log(e);
	}
}

window.onload = function () {
	fn_CatalogOpen();
};