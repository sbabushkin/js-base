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
		this.basket[name] = newBasket;
	},
	// возвращаем ID предмета
	getItemId(name){
		let keysFromDb = Object.keys(this.items);
		const db = this.items;
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
		return this.items[id].cost;
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
	htmlCreateForm(type, id){
		let element = document.createElement(type);
		element.setAttribute('id', id);
		return element;
	},
	htmlEdit(elem, param){
		return elem.innerHTML = param;
	},
	htmlAppend(parent, child){
		return parent.appendChild(child);
	},
	htmlInsertAfter(elem, afterElem) {
		afterElem.parentNode.insertBefore(elem, afterElem.nextSibling);
	},
	htmlGenerateBasket(){
		if(!this.checkEmptyBasket()){
			return 'В корзине '+this.calculateBasketCount()+' товаров, на сумму: '+this.calculateBasketCost()+' рублей.'
		} else {
			return 'Корзина пуста';
		}
	},
};

/* Добавляем предметы в БД */
itemsDatabaseObj.addItem('Грелка', 50, 'KKG-001');
itemsDatabaseObj.addItem('Утюг', 100,'Samsung G433');
itemsDatabaseObj.addItem('Кофеварка', 50, 'Bork F123');
itemsDatabaseObj.addItem('Пылесос', 250, 'Dison J21');
console.log('База товаров:');
console.log(itemsDatabaseObj.items);
/* Добавляем предметы в корзину */
itemsDatabaseObj.addBasket('Утюг',2);
itemsDatabaseObj.addBasket('Кофеварка',3);
itemsDatabaseObj.addBasket('Пылесос',1);
console.log('Корзина:');
console.log(itemsDatabaseObj.basket);

/* Инфо часть: */
console.log('*** *** *** *** *** ***');
for(item in itemsDatabaseObj.basket){
	console.log(itemsDatabaseObj.basket[item].name+', в количестве: '+itemsDatabaseObj.basket[item].count+' шт., стоимость ед.: '+itemsDatabaseObj.items[itemsDatabaseObj.getItemId(itemsDatabaseObj.basket[item].name)].cost);
}
console.log('Стоимость корзины: '+itemsDatabaseObj.calculateBasketCost());
console.log('*** *** *** *** *** ***');

/* Логика отображения: */
const db = itemsDatabaseObj; //link to itemsDatabaseObj

const mainwrap = document.getElementById('wrap'); // link to main wrap
const description2 = document.getElementById('description');
const basketWrap = db.htmlCreateForm('div', 'basketWrap'); // creating basket wrap
db.htmlInsertAfter(basketWrap,description2); // appending to main wrap

const basketWrapLink = document.getElementById('basketWrap'); // linking basket wrap
const basket = db.htmlCreateForm('div', 'basket'); // creating basket form
db.htmlAppend(basketWrapLink, basket); // appending basket to basket wrap

const basketLink = document.getElementById('basket'); // linking basket

db.htmlEdit(basketLink, db.htmlGenerateBasket()); // generating basket content








