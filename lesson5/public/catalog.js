let catalogDb = {
	// перечень товаров в категории Items
	_items: {},
	idStart: 9990,
	// ссылка на items:
	get items(){
		return this._items;
	},
	// функция добавления продукта
	addItem(name, cost, details, img, desc){
		let idNum = this.idStart;
		let newItem = {
			name,
			cost,
			id: idNum,
			details,
			img,
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
	// конструктор форм с классами и айди
	htmlCreateForm(type, id, klass){
		let element = document.createElement(type);
		if(id){
			element.setAttribute('id', id);
		}
		if(klass){
			element.setAttribute('class', klass);
		}
		return element;
	},
	// редактировать содержание innerHTML
	htmlEdit(elem, param){
		return elem.innerHTML = param;
	},
	htmlAppend(parent, child){
		return parent.appendChild(child);
	},
	htmlInsertAfter(elem, afterElem) {
		afterElem.parentNode.insertBefore(elem, afterElem.nextSibling);
		return;
	},
	// функция получения тега с картинкой 
	htmlGetImageFrom(key){
		const it = this.items;
		/*
			<img src='it[key].img' />
		*/
		return '<img src="'+it[key].img+'" />'
	},
	//  получить описание товара из каталога
	htmlGetDescFrom(key){
		const it = this.items;
		/*
			<h3> key.name            </h3>
			<h4> key.details         </h4>
			<h5> Стоимость: key.cost </h5>
			<p >  key.desc           </p >
		*/
		let result = '<h3>'+it[key].name+'</h3><h4>'+it[key].details+'</h4><h5>Стоимость: '+it[key].cost+' рублей</h5><p>'+it[key].desc+'</p>';
		return result;
	},
	// генерит контент из каталога
	htmlGenerateCatalog(wrapper){
		// checking if catalog has any items:
		if(!this.checkEmptyItems()){
			for (keys in this.items){
				/*
					<div class='catalog'>
						<div class='img'>
							<img src='it[key].img' />
						</div>
						<div class='desc'>
							<h3> key.name            </h3>
							<h4> key.details         </h4>
							<h5> Стоимость: key.cost </h5>
							<p > key.desc            </p >							
						<div>
					</div>
				*/
				/* creating item in catalog wrap */
				const catalog = this.htmlCreateForm('div', '', 'catalog');
				this.htmlAppend(wrapper, catalog);
				/* creating Img div and pushing img src there */
				let imageDiv = this.htmlCreateForm('div','','img');
				this.htmlEdit(imageDiv,this.htmlGetImageFrom(keys));
				this.htmlAppend(catalog, imageDiv);
				/* creating description div */
				let descDiv = this.htmlCreateForm('div','','desc');
				this.htmlEdit(descDiv, this.htmlGetDescFrom(keys));
				this.htmlAppend(catalog, descDiv);
			}
			return;
		} else {
			/* if catalog is empty it will return:
				<div class='catalog'>
					Каталог пуст
				</div>
			*/
			const catalog = this.htmlCreateForm('div','','catalog');
			this.htmlAppend(wrapper, catalog);
			this.htmlEdit(catalog, 'Каталог пуст');
			return;
		}
	},
};

const cdb = catalogDb; // link to main obj

/* Добавляем предметы в БД */
cdb.addItem('Грелка', 50, 'KKG-001', 'public/placeholder.png' ,'Описание продукта – это главное основание для покупки. От того, сможете ли вы убедить посетителя в потребности в вашем товаре зависит купит он его или нет. Страничка товара — это последний пункт в воронке продаж перед тем, как пользователь нажмет «оформить заказ».');
cdb.addItem('Утюг', 100,'Samsung G433', 'public/placeholder.png', 'Описание продукта – это главное основание для покупки. От того, сможете ли вы убедить посетителя в потребности в вашем товаре зависит купит он его или нет. Страничка товара — это последний пункт в воронке продаж перед тем, как пользователь нажмет «оформить заказ».');
cdb.addItem('Кофеварка', 50, 'Bork F123', 'public/placeholder.png', 'Описание продукта – это главное основание для покупки. От того, сможете ли вы убедить посетителя в потребности в вашем товаре зависит купит он его или нет. Страничка товара — это последний пункт в воронке продаж перед тем, как пользователь нажмет «оформить заказ».');
cdb.addItem('Пылесос', 250, 'Dison J21', 'public/placeholder.png', 'Описание продукта – это главное основание для покупки. От того, сможете ли вы убедить посетителя в потребности в вашем товаре зависит купит он его или нет. Страничка товара — это последний пункт в воронке продаж перед тем, как пользователь нажмет «оформить заказ».');
console.log('Загруженный каталог товаров:');
console.log(cdb.items);

/* Генерим формы на странице */
const mainPageWrap = document.getElementById('wrap'); // linking main wrap
const catalogWrap = cdb.htmlCreateForm('div', 'catalogWrap');
const description3 = document.getElementById('description');
//cdb.htmlAppend(mainPageWrap, catalogWrap);

cdb.htmlInsertAfter(catalogWrap, description3); // вставляем враппер после описания ДЗ

cdb.htmlGenerateCatalog(catalogWrap);  // генерим контент в каталог



