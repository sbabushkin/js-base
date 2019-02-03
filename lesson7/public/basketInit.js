let itemsDatabaseObj = {
	_basket: {},
	idStart: 9990,
	// ссылка на items:
	get items(){
		return this._items;
	},
	get basket(){
		return this._basket;
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
	calculateItemsCost(name){
		const itemId = this.getItemId(name);

		let total = 0;
		const query = this.basket;
		
		total += (this.getItemCost(itemId)*query[name].count);

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
		let result = [];
		// проверяет, есть ли товары в корзине
		if(!this.checkEmptyBasket()){
			/*
			<div class='item-wrap'>
				<div class='item-desc'>
					название
				</div>
				<div class='item-stats'>
					<div class='item-plus'>
						кнопка +
					</div>
					<div class='item-count'>
						текущее количество
					</div>
					<div class='item-minus'>
						кнопка -
					</div>
					<div class='items-sum'>
						SUMM
					</div>
				</div>
			</div>
			*/
			for (items in this.basket){
				result.push(`<div class='item-wrap' data-name='${this.basket[items].name}'><div class='item-desc'>${this.basket[items].name}</div><div class='item-stats'><div class='item-plus' onclick='db.htmlPlusItem("${this.basket[items].name}")'><img src="./public/plus.png" /></div><div class='item-count' data-name='${this.basket[items].name}'>${this.basket[items].count}</div><div class='item-minus' onclick='db.htmlMinusItem("${this.basket[items].name}")'><img src="./public/minus.png" /></div><div class='items-sum' data-name='${this.basket[items].name}'>${this.calculateItemsCost(items)}rub</div></div></div>`);			
			}
		// если корзина пустая:
		} else {
			result.push(`<div class='item-wrap'><div class='item-desc'><p>Корзина пустая</p></div><div class='item-stats'></div></div>`);
		}
		const checkBasket = document.getElementById('checkBasket');
		// check if basket exists
		if(!checkBasket){
			// Footer here
			result.push(`<div class='basket-footer'><div id="checkBasket" class='total-sum'>${this.calculateBasketCost()} rub</div><div class='next-button'><p>Далее</p></div></div>`)
		}


		return result.join('');
	},
	htmlPlusItem(name){	
		console.log(`Plus item ${name}`);
		// putting additional item in count
		this.basket[name].count++;
		// putting count number in item's innerHTML
		const countLink = document.getElementsByClassName('item-count');
		for(let i=0; i<countLink.length;i++){
			if(countLink[i].dataset.name === name){
				countLink[i].innerHTML = this.basket[name].count;
			}
		}
		// update SUM
		const sumLink = document.getElementsByClassName('items-sum');
		for(let i=0; i<sumLink.length;i++){
			if(sumLink[i].dataset.name === name){
				sumLink[i].innerHTML = this.calculateItemsCost(name)+' rub';
			}
		}
		// update TOTAL COST
		document.getElementsByClassName('total-sum')[0].innerHTML = this.calculateBasketCost()+' rub';
		return;
	},
	htmlMinusItem(name){
		console.log(`Minus item ${name}`);

		this.basket[name].count--;

		if(this.basket[name].count === 0){
			// const basketInner = document.getElementById
			delete this.basket[name];
			/* В момент, когда в корзине ничего нет, вновь вызываем функции создания корзины и снова вешаем Event Listener на кнопки */
			const cleanItems = document.getElementsByClassName('item-wrap');
			for (let i=0; i<cleanItems.length;i++){
				if(cleanItems[i].dataset.name === name){
					cleanItems[i].remove();
				}
			}

			if(Object.keys(this.basket).length === 0){
				const emptyBasketDiv = document.createElement('div')
				emptyBasketDiv.classList.add('item-wrap');
				const emptyBasketContent = `<div class='item-desc'><p>Корзина пустая</p></div><div class='item-stats'></div>`;
				this.htmlEdit(emptyBasketDiv, emptyBasketContent);
				basketDivLink.insertBefore(emptyBasketDiv, basketDivLink.firstChild);
			}
		}
		// putting count number in item's innerHTML
		const countLink = document.getElementsByClassName('item-count');
		for(let i=0; i<countLink.length;i++){
			if(countLink[i].dataset.name === name){
				countLink[i].innerHTML = this.basket[name].count;
			}
		}
		// update SUM
		const sumLink = document.getElementsByClassName('items-sum');
		for(let i=0; i<sumLink.length;i++){
			if(sumLink[i].dataset.name === name){
				sumLink[i].innerHTML = this.calculateItemsCost(name)+' rub';
			}
		}
		// update TOTAL COST
		document.getElementsByClassName('total-sum')[0].innerHTML = this.calculateBasketCost()+' rub';
		return;
	},
	/* Анимация и логика СТРЕЛОЧКИ */
	htmlAnimationArrow(){
		const arrowsLink = document.getElementsByClassName('arrow');
		for(let i = 0; i<arrowsLink.length;i++){
			arrowsLink[i].addEventListener('click',(e)=>{
				/* отображение стрелочки */
				const arrLink = e.target;
				arrLink.classList.toggle('up');
				arrLink.classList.toggle('down');

				/* отображение панели */
				const hideLink = arrLink.parentElement.parentElement.nextElementSibling;
				hideLink.classList.toggle('hidden');
			})
		}
	},
	htmlAnimationNextButton(){
		const nextButtonsLink = document.getElementsByClassName('next-button');
		for (let i=0; i<nextButtonsLink.length;i++){
			nextButtonsLink[i].addEventListener('click',(e)=>{
				/* логика последней кнопки */
				if(i === nextButtonsLink.length-1){
					/* будет тут */
				} else {
					/* ссылки */
					const buttonLink = e.target; // ссылка на кнопку
					const arrLinkParent = buttonLink.parentElement.parentElement.parentElement.previousElementSibling.children[1].children[0]; // ссылка на трелочку родителя
					const arrLinkParentSibling = buttonLink.parentElement.parentElement.parentElement.parentElement.nextElementSibling.children[0].children[1].children[0] // ссылка на стрелку след брата родителя
					const panelShow = buttonLink.parentElement.parentElement.parentElement.parentElement.nextElementSibling.children[1]; // панель, которую нужно открыть
					const panelHide = buttonLink.parentElement.parentElement.parentElement; // панель, которую нужно спрятать

					/* проверяем панель, которую должны показать после нажатия кнопки, если она закрыта - то открываем */	
					if(panelShow.classList.contains('hidden')){				
						/* отображение стрелочки родителя */
						arrLinkParent.classList.toggle('up');
						arrLinkParent.classList.toggle('down');
						/* отображение стрелочки след. брата родителя */
						arrLinkParentSibling.classList.toggle('up');
						arrLinkParentSibling.classList.toggle('down');		
						/* отображение панели родителя */
						panelHide.classList.toggle('hidden');
						/* отображение панели след. брата родителя */
						panelShow.classList.toggle('hidden');
						
					} else {
						/* если панель НЕ спрятана, то: */
						// console.log(arrLinkParentSibling);

						/* отображение стрелочки родителя */
						arrLinkParent.classList.toggle('up');
						arrLinkParent.classList.toggle('down');
						/* прячем только родительскую панель */
						panelHide.classList.toggle('hidden');	
					}
				}
			})
		}
	},
};

let catalogDb = {
	// перечень товаров в категории Items
	_items: {},
	idStart: 9990,
	// ссылка на items:
	get items(){
		return this._items;
	},
	// функция добавления продукта
	addItem(name, cost, details, img, img2, img3, desc){
		let idNum = this.idStart;
		let newItem = {
			name,
			cost,
			id: idNum,
			details,
			img,
			img2,
			img3,
			desc
		};
		this.items[idNum] = newItem;
		this.idStart++;
		return idNum;
	},
	// поиск ID предмета по name
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
	// возвращает стоимость по ID
	getItemCost(id){
		return this.items[id].cost;
	},
	// проверка, есть ли в каталоге товары
	checkEmptyItems(){
		if(Object.keys(this.items).length === 0){
			return true;
		} else {
			return false;
		}
	},
};

const cdb = catalogDb; // link to main obj
const db = itemsDatabaseObj; //link to itemsDatabaseObj

/* Добавляем предметы в БД */
cdb.addItem('Грелка', 50, 'KKG-001', './public/1.jpg', './public/22.jpg', './public/3.jpg', 'Описание продукта – это главное основание для покупки. От того, сможете ли вы убедить посетителя в потребности в вашем товаре зависит купит он его или нет. Страничка товара — это последний пункт в воронке продаж перед тем, как пользователь нажмет «оформить заказ».');
cdb.addItem('Утюг', 100,'Samsung G433', './public/1.jpg', './public/2.jpg', './public/3.jpg', 'Описание продукта – это главное основание для покупки. От того, сможете ли вы убедить посетителя в потребности в вашем товаре зависит купит он его или нет. Страничка товара — это последний пункт в воронке продаж перед тем, как пользователь нажмет «оформить заказ».');
cdb.addItem('Кофеварка', 50, 'Bork F123', './public/1.jpg', './public/2.jpg', './public/3.jpg', 'Описание продукта – это главное основание для покупки. От того, сможете ли вы убедить посетителя в потребности в вашем товаре зависит купит он его или нет. Страничка товара — это последний пункт в воронке продаж перед тем, как пользователь нажмет «оформить заказ».');
cdb.addItem('Пылесос', 250, 'Dison J21', './public/1.jpg', './public/2.jpg', './public/3.jpg', 'Описание продукта – это главное основание для покупки. От того, сможете ли вы убедить посетителя в потребности в вашем товаре зависит купит он его или нет. Страничка товара — это последний пункт в воронке продаж перед тем, как пользователь нажмет «оформить заказ».');
console.log('Загруженный каталог товаров:');
console.log(cdb.items);

/* получаем информацию из ссылки */
const basketInitParams = decodeURI(location.toString()); // getting params from url
console.log(basketInitParams)
if(basketInitParams.includes('?')){
	const params2 = basketInitParams.split('?'); // splitting into array before and after '?'
	const params1 = params2[1].split('&'); // splitting each param
	const paramObj = {}; //creating object, that will hold our params
	for (keys in params1){
		let split = params1[keys].split('=');
		db.addBasket(split[0],split[1]);
	}
}


db.getBasketInfoConsole();

/* Логика отображения: */
const basketDivLink = document.getElementById('contain-div');
db.htmlEdit(basketDivLink, db.htmlGenerateBasket());

/* Функционал СТРЕЛОЧКА */
db.htmlAnimationArrow();

/* Функционал ДАЛЕЕ */
db.htmlAnimationNextButton();













