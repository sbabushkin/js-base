let itemsDatabaseObj = {
	// перечень товаров в категории Items
	_items: {},
	_basket: {},
	idStart: 9990,
	// ссылка на items:
	get items(){
		return this._items;
	},
	get basket(){
		return this._basket;
	},
	// функция добавления продукта
	addItem(name, cost, details){
		let idNum = this.idStart;
		let newItem = {
			name,
			cost,
			id: idNum,
			details
		};
		this.items[idNum] = newItem;
		this.idStart++;
		return idNum;
	},
	// функция добавляения продуктов в корзине
	addBasket(name, count){
		let newBasket = {
			name,
			count
		}
		if(this.basket[name]){
			this.basket[name].count++;
		} else {
			this.basket[name] = newBasket;
		}
		// console.log(this.basket);

	},
	// возвращаем ID предмета
	getItemId(name){
		let keysFromDb = Object.keys(cdb.items);
		const db = cdb.items;
		for (keysFromDb in db){
			if(name === db[keysFromDb].name){
				return db[keysFromDb].id;
			}
		}
		return 'Nothing found';
	},
	// функция удаления продукта:
	removeItem(name){
		delete this.items[name];
	},
	getItemCost(id){
		return cdb.items[id].cost;
	},
	// функция возврата полной стоимости корзины с учетом количества каждого элемента:
	calculateBasketCost(){
		let total = 0;
		const query = this.basket;
		for(item in query){
			let itemCost = this.getItemCost(this.getItemId(query[item].name))*query[item].count;
			total += itemCost;
		}
		return total;
	},
	// сколько товаров в корзине
	calculateBasketCount(){
		let total = 0;
		const query = this.basket;
		for(item in query){
			total += query[item].count;
		}
		return total;		
	},
	// проверяем, есть ли предметы в корзине:
	checkEmptyBasket(){
		if(Object.keys(this.basket).length === 0){
			return true;
		} else {
			return false;
		}
	},
	// вывод инфо по корзине в консоль
	getBasketInfoConsole(){
		console.log('*** *** *** *** *** ***');
		for(item in this.basket){
			console.log(this.basket[item].name+', в количестве: '+this.basket[item].count+' шт., стоимость ед.: '+cdb.items[this.getItemId(this.basket[item].name)].cost);
		}
		console.log('Стоимость корзины: '+this.calculateBasketCost());
		console.log('*** *** *** *** *** ***');
	},
	// создание корзины на странице
	htmlCreateForm(type, id){
		let element = document.createElement(type);
		element.setAttribute('id', id);
		return element;
	},
	htmlEdit(elem, param){
		return elem.innerHTML = param;
	},
	htmlAppend(parent, elem){
		return parent.appendChild(elem);
	},
	htmlInsertAfter(afterElem, elem) {
		afterElem.parentNode.insertBefore(elem, afterElem.nextSibling);
	},
	// возвращет массив html с контентом корзины
	htmlGenerateBasket(){
		// проверяет, есть ли товары в корзине
		if(!this.checkEmptyBasket()){
			let result = ['<h3>В корзине товаров:</h3>'];
			const buyDiv = `<div id='buyButton' onclick='db.htmlGetURL()'><h2>Перейти в корзину</h2></div>`
			for (keys in this.basket){
				result.push('<p>'+this.basket[keys].name+', '+this.basket[keys].count+' шт.;</p>');
			}
			result.push('<p>Всего '+this.calculateBasketCount()+' товаров, на сумму: '+this.calculateBasketCost()+' рублей.</p>'+buyDiv);
			return result.join('');
		// если корзина пустая:
		} else {
			return 'Корзина пуста';
		}
	},
	// вызывает функцию на клике по кнопке "купить"
	htmlUpdateBasketForm(){
		const basket = document.getElementById('basket');
		this.htmlEdit(basket, this.htmlGenerateBasket());
	},
	// вызывает функцию на клике по кнопке "купить"
	htmlInit(name, count){
		this.addBasket(name, count);
		this.htmlUpdateBasketForm();
	},
	htmlGetURL(){
		let urlParam = '?';
		for(items in this.basket){
			urlParam += `${this.basket[items].name}=${this.basket[items].count}&`
		}
		// console.log(urlParam.substr(0,urlParam.length-1));

		// window.location.replace('./basket.html');
		window.location.href = `./basket.html${urlParam.substr(0,urlParam.length-1)}`;
	},
};

/* Добавляем предметы в БД */
// itemsDatabaseObj.addItem('Грелка', 50, 'KKG-001');
// itemsDatabaseObj.addItem('Утюг', 100,'Samsung G433');
// itemsDatabaseObj.addItem('Кофеварка', 50, 'Bork F123');
// itemsDatabaseObj.addItem('Пылесос', 250, 'Dison J21');
// console.log('База товаров:');
// console.log(itemsDatabaseObj.items);
// /* Добавляем предметы в корзину */
// itemsDatabaseObj.addBasket('Утюг',2);
// itemsDatabaseObj.addBasket('Кофеварка',3);
// itemsDatabaseObj.addBasket('Пылесос',1);
// console.log('Корзина:');
// console.log(itemsDatabaseObj.basket);

/* Инфо часть: */


/* Логика отображения: */
const db = itemsDatabaseObj; //link to itemsDatabaseObj

const mainwrap = document.getElementById('wrap'); // link to main wrap
const description2 = document.getElementById('description');
const basketWrap = db.htmlCreateForm('div', 'basketWrap'); // creating basket wrap
db.htmlAppend(mainwrap, basketWrap); // appending to main wrap

const basketWrapLink = document.getElementById('basketWrap'); // linking basket wrap
const basket = db.htmlCreateForm('div', 'basket'); // creating basket form
db.htmlAppend(basketWrapLink, basket); // appending basket to basket wrap

const basketLink = document.getElementById('basket'); // linking basket

db.htmlEdit(basketLink, db.htmlGenerateBasket()); // generating basket content








