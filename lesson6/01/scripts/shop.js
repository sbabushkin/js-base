//примерный вариант объекта Product
function PRODUCT (id, category, name, description, produccer, price, count, discount, images) {
	this.id = id; //идендификатор
	this.category = category; // категория
	this.name = name; // наименование товара
	this.description = description; // описание товара
	this.producer = produccer; // производитель
	this.price = price; // стоимость
	this.count = count; // колличество доступного товара
	this.discount = discount; //скидка
	this.images = images; //массив с изображениями
}

// создадим корзину как объект
const shop = {
	catalog: {
		items: {},

		show: function () {
			try {
				let div_Catalog = document.querySelector('#catalog');
				let boo_IsProduct = false; //проверяем, есть ли в каталоге хотя бы один товар
				for (let val in shop.catalog.items){
					if (typeof shop.catalog.items[val] === 'object'){
						if (shop.catalog.items[val].constructor.name === 'PRODUCT') {
							boo_IsProduct = true;
							break;
						}
					}
				}

				if (boo_IsProduct) { //если есть хотя бы один товар
					for (let val in shop.catalog.items){
						if (typeof shop.catalog.items[val] === 'object') {
							if (shop.catalog.items[val].constructor.name === 'PRODUCT'){
								let i = 0;
								// создаем блок итемов
								let div_Item = document.createElement('div');
								div_Item.setAttribute('id', 'item' + i);
								i++;
								div_Item.setAttribute('class', 'catalog__item');

								// заголовок болка итемов
								let p = document.createElement('p');
								p.setAttribute('class', 'catalog__item-head');
								p.textContent = shop.catalog.items[val].name;
								div_Item.appendChild(p);

								// блок для картинки с кнопкой
								let imgBlock = document.createElement('div');
								imgBlock.setAttribute('class', 'catalog__item-img-block');

									// изображение товара
									let img = document.createElement('img');
									img.setAttribute('src', shop.catalog.items[val].images[0]);
									img.setAttribute('class', 'catalog__item-img');
									img.addEventListener('click', () => {

									});
									imgBlock.appendChild(img);
								div_Item.appendChild(imgBlock);

								// кнопка добавить в корзину
								let btnBay = document.createElement('button');
								btnBay.setAttribute('class', 'catalog__item-bay');
								btnBay.textContent = 'В корзину';
								btnBay.addEventListener('click', () => {
									shop.busket.add(shop.catalog.items[val].id);
									if (document.querySelector('.shop__busket-table')){
										shop.busket.close();
										shop.busket.open();
									}
								});
								div_Item.appendChild(btnBay);

								// заполняем первую таблицу
								let table = document.createElement('table');
								table.setAttribute('class', 'catalog__item-table');

								//номер
								let tr = document.createElement('tr');
								let th = document.createElement('th');
								th.textContent = 'Номер';
								tr.appendChild(th);
								table.appendChild(tr);
								let td = document.createElement('td');
								td.textContent = shop.catalog.items[val].id;
								tr.appendChild(td);
								table.appendChild(tr);

								//категория
								tr = document.createElement('tr');
								th = document.createElement('th');
								th.textContent = 'Категория';
								tr.appendChild(th);
								th = document.createElement('th');
								table.appendChild(tr);
								td = document.createElement('td');
								td.textContent = shop.catalog.items[val].category;
								tr.appendChild(td);
								table.appendChild(tr);

								// цена
								tr = document.createElement('tr');
								th = document.createElement('th');
								th.textContent = 'Цена';
								tr.appendChild(th);
								table.appendChild(tr);
								td = document.createElement('td');
								td.textContent = shop.catalog.items[val].price + ' руб.';
								tr.appendChild(td);
								table.appendChild(tr);

								// скидка
								tr = document.createElement('tr');
								th = document.createElement('th');
								th.textContent = 'Скидка';
								tr.appendChild(th);
								table.appendChild(tr);
								td = document.createElement('td');
								td.textContent = shop.catalog.items[val].discount*100 + '%';
								tr.appendChild(td);
								table.appendChild(tr);

								// доступное колличество
								tr = document.createElement('tr');
								th = document.createElement('th');
								th.textContent = 'Доступное количество';
								tr.appendChild(th);
								table.appendChild(tr);
								td = document.createElement('td');
								td.textContent = shop.catalog.items[val].count;
								tr.appendChild(td);
								table.appendChild(tr);

								// производитель
								tr = document.createElement('tr');
								th = document.createElement('th');
								th.textContent = 'Производитель';
								tr.appendChild(th);
								table.appendChild(tr);
								td = document.createElement('td');
								td.textContent = shop.catalog.items[val].producer;
								tr.appendChild(td);
								table.appendChild(tr);

								// описание
								tr = document.createElement('tr');
								th = document.createElement('th');
								th.textContent = 'Описание';
								tr.appendChild(th);
								table.appendChild(tr);
								tr = document.createElement('tr');
								td = document.createElement('td');
								td.setAttribute('colspan', '2');
								td.textContent = shop.catalog.items[val].description;
								tr.appendChild(td);
								table.appendChild(tr);

								div_Item.appendChild(table); //добавляем таблицу

								div_Catalog.appendChild(div_Item);
							}
						}
					}
				} else { // если товара нет
					let p = document.createElement('p');
					p.setAttribute('class', 'catalog__head');
					p.textContent = 'Каталог пуст';

					div_Item.appendChild(p);
				}
			} catch (e) {
				console.log(e);
			}
		}
	},

	busket: {
		items: {},

		add: function (id) { // добавляет товар в корзину
			for (let val in shop.busket.items){ // если товар уже существуе то добавляем +1 к количеству
				if (shop.busket.items[val].id === id){
					shop.busket.items[val].usercount++;
					return;
				}
			}
			let i = shop.busket.count()+1; // если товара еще нет, то обновляем корзину
			shop.busket.items['pos'+i] = {
				id: id,
				number: i,
				name: shop.catalog.items['pos'+id].name,
				price: shop.catalog.items['pos'+id].price,
				discount: shop.catalog.items['pos'+id].discount,
				usercount: 1
			};
		},

		count: function () { // количество товаров в корзине
			try{
				let count = 0;
				for (let val in shop.busket.items) {
					if (typeof shop.busket.items[val] === 'object'){
						count++;
					}
				}
				return count;
			} catch (e) {
				console.log(e);
			}
		},
	
		costById: function (id) { //метод вычисляет стоимость по конкретному id товара, возвращает строку со стоимостью до 2х знаков полсе запятой
			try {
				if (arguments.length === 1){
					if (typeof id === 'number'){
						for (let val in shop.busket.items) {
							if (typeof shop.busket.items[val] === 'object') {
								if (shop.busket.items[val].hasOwnProperty('id') && shop.busket.items[val].id === id) {
									if (shop.busket.items[val].hasOwnProperty('usercount') && !isNaN(shop.busket.items[val].usercount)) {
										if (shop.busket.items[val].hasOwnProperty('price') && !isNaN(shop.busket.items[val].price)) {
											if (shop.busket.items[val].hasOwnProperty('discount') && !isNaN(shop.busket.items[val].discount)) {
												return (Math.round(shop.busket.items[val].usercount * shop.busket.items[val].price * (1 - shop.busket.items[val].discount) * 100) / 100).toFixed(2);
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
						throw new Error(id + ' is not in shop'); //сообщаем, что в корзине нет такого продукта
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
	
		cost: function () { // метод считает общую стоимость корзины, возвращает строку со стоимостью до 2х знаков полсе запятой
			try{
				let cost = 0;
				for (let val in shop.busket.items) {
					if (typeof shop.busket.items[val] === 'object'){
						if (shop.busket.items[val].hasOwnProperty('usercount') && !isNaN(shop.busket.items[val].usercount)) {
							if (shop.busket.items[val].hasOwnProperty('price') && !isNaN(shop.busket.items[val].price)) {
								if (shop.busket.items[val].hasOwnProperty('discount') && !isNaN(shop.busket.items[val].discount)) {
									cost += Math.round(shop.busket.items[val].usercount * shop.busket.items[val].price * (1-shop.busket.items[val].discount)*100)/100;
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
		},
	
		open: function () {
			try {
				let divShop = document.querySelector('.shop__busket');
				let divBusket = document.createElement('div');
				divBusket.setAttribute('class', 'shop__busket-table');
				if (shop.busket.count()>0){ //проверяем, есть ли в корзине хотя бы один товар
					
					let p = document.createElement('p');
					p.setAttribute('class', 'shop__busket-table-head');
					p.textContent = 'Ваши товары';
					divBusket.appendChild(p);
	
					let table = document.createElement('table');
					table.setAttribute('class', 'shop__table');
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
	
					//заполняем таблицу данными из shop
					for (let val in shop.busket.items){
						if (typeof shop.busket.items[val] === 'object') {
							if (shop.busket.items[val].hasOwnProperty('id') && shop.busket.items[val].number)	{
								if (shop.busket.items[val].hasOwnProperty('name') && shop.busket.items[val].name) {
									if (shop.busket.items[val].hasOwnProperty('price') && shop.busket.items[val].price) {
										if (shop.busket.items[val].hasOwnProperty('usercount') && shop.busket.items[val].usercount) {
											tr = document.createElement('tr');
											td = document.createElement('td');
											td.textContent = shop.busket.items[val].number;
											tr.appendChild(td);
											td = document.createElement('td');
											td.textContent = shop.busket.items[val].name;
											tr.appendChild(td);
											td = document.createElement('td');
											td.textContent = shop.busket.items[val].price + ' руб.';
											tr.appendChild(td);
											td = document.createElement('td');
											td.textContent = shop.busket.items[val].discount*100 + '%';
											tr.appendChild(td);
											td = document.createElement('td');
											td.textContent = shop.busket.items[val].usercount;
											tr.appendChild(td);
											td = document.createElement('td');
											td.textContent = shop.busket.costById(shop.busket.items[val].id) + ' руб.';
											tr.appendChild(td);
											table.appendChild(tr);
										} else {
											throw new Error('Cannot creat shop. User count error on ' + val);
										}
									} else {
										throw new Error('Cannot creat shop. Price error on ' + val);
									}
								} else {
									throw new Error('Cannot creat shop. Name error on ' + val);
								}
							} else {
								throw new Error('Cannot creat shop. Id error on ' + val);
							}
						}
					}
					divBusket.appendChild(table);
	
					// строка с общей суммой
					p = document.createElement('p');
					p.setAttribute('class', 'shop__footer');
					p.textContent = 'Итого: Товаров '+ shop.busket.count() + ' на сумму ' + shop.busket.cost() + ' руб';
	
					divBusket.appendChild(p);
					divShop.appendChild(divBusket);
				} else { // если товара нет
					let p = document.createElement('p');
					p.setAttribute('class', 'shop__busket-table-head');
					p.textContent = 'Корзина пуста';
	
					divBusket.appendChild(p);
					divShop.appendChild(divBusket);
				}
	
				let btnShop = document.querySelector('#shop__busket-btn');
				btnShop.textContent = 'Закрыть корзину';
				btnShop.removeEventListener('click', shop.busket.open);
				btnShop.addEventListener('click', shop.busket.close);
			} catch (e) {
				console.log(e);
			}
		},
	
		close: function () {
			let divShop = document.querySelector('.shop__busket');
			let divBuskete = document.querySelector('.shop__busket-table');
			divShop.removeChild(divBuskete);

			let btnShop = document.querySelector('#shop__busket-btn');
			btnShop.textContent = 'Открыть корзину';
			btnShop.removeEventListener('click', shop.busket.close);
			btnShop.addEventListener('click', shop.busket.open);
		}
	}
};

// создадим несколько позиций в каталоге
shop.catalog.items['pos1'] = new PRODUCT(1, 'Жвачка', 'Бубльгум', 'Жутко вкусная жвачка', 'Bubl-production', 200, 800, 0.05);
shop.catalog.items.pos1.usercount = 5;
shop.catalog.items.pos1.images = ['images/bubble1.jpg', 'images/bubble2.jpg', 'images/bubble3.jpg'];
shop.catalog.items['pos2'] = new PRODUCT(2, 'Жвачка', 'Дирол', 'Мятная жвачка', 'Dirol-production', 400, 1500, 0.1);
shop.catalog.items.pos2.usercount = 3;
shop.catalog.items.pos2.images = ['images/dirol1.jpg', 'images/dirol2.jpg', 'images/dirol3.jpg'];
shop.catalog.items['pos3'] = new PRODUCT(3, 'Жвачка', 'Ментос', 'Мятная конфета', 'Mentos-production', 800, 400, 0.25);
shop.catalog.items.pos3.usercount = 3;
shop.catalog.items.pos3.images = ['images/mentos1.jpg', 'images/mentos2.jpg', 'images/mentos3.jpg'];

window.onload = function () {
	shop.catalog.show();
	let btnShop = document.querySelector('#shop__busket-btn');
	btnShop.addEventListener('click', shop.busket.open);
	galleryVAK.create(shop.catalog.items.pos3.images); // вызов галлереи с изображениями
};