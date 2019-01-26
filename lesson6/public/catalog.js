let catalogDb = {
	// перечень товаров в категории Items
	_items: {},
	idStart: 9990,
	// ссылка на items:
	get items(){
		return this._items;
	},
	// функция добавления продукта
	addItem(name, cost, details, img, img2, desc){
		let idNum = this.idStart;
		let newItem = {
			name,
			cost,
			id: idNum,
			details,
			img,
			img2,
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
	htmlAppend(parent, elem){
		return parent.appendChild(elem);
	},
	htmlInsertAfter(afterElem, elem) {
		afterElem.parentNode.insertBefore(elem, afterElem.nextSibling);
		return;
	},
	// функция получения тега с картинкой 
	htmlGetImageFrom(key){
		const it = this.items;
		/*
			<img src='it[key].img' />
		*/
		return '<img id="'+this.items[key].id+'" onclick="cdb.htmlPictureModule('+this.items[key].id+')" src="'+it[key].img+'" alt="'+this.items[key].details+'" />'
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
	htmlGetButtonFrom(key){
		const it = this.items;
			/*
				Добавить в корзину
			*/
		let result = '<h2>Добавить в корзину</h2>';
		return result;
	},
	htmlGetBuyAttribute(key){
		const it = this.items;
		/*
			
		*/
		return 'db.htmlInit("'+this.items[keys].name+'", 1)';
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
						</div>
						<div class='buy' onclick="XXXX('key.id')">
							Добавить в корзину
						</div>
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

				/* adding buy button */
				let buyDiv = this.htmlCreateForm('div', '', 'buy');
				buyDiv.setAttribute('onclick', this.htmlGetBuyAttribute(keys));
				this.htmlEdit(buyDiv, this.htmlGetButtonFrom(keys));
				this.htmlAppend(catalog, buyDiv);
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
	htmlPictureModule(id){
		// Get the modal
		const modal = document.getElementById('myModal');

		// checking if modal block already shown:
		if(modal.style.display === 'block'){
			/* do nothing */
			console.log('Picture Module already opened');
			return;
		} else {
			// link to modal IMG container
			let modalImg = document.getElementById("img01");
			// link to caption container
			let captionText = document.getElementById("caption");

			modal.style.display = "block"; // showing the block
			modalImg.src = this.items[id].img; // switch of source
			modalImg.alt = 'img' // pitting alt
			captionText.innerHTML = this.items[id].details; // switch of alt

			// Get the <span> element that closes the modal
			let span = document.getElementsByClassName("close")[0];

			// When the user clicks on <span> (x), close the modal
			span.onclick = () => { 
			  modal.style.display = "none";
			}
		
			/* putting previev gallery */
				/* putting previev gallery */
					/* putting previev gallery */
			let previewLink = document.getElementById('preview');
			let img2; 

			/* проверяем, есть ли элемнет на странице */
			if(document.getElementById('img02')){
				img2 = document.getElementById('img02');
			/* если не нашли элемент на странице, то создаем */
			} else {
				img2 = this.htmlCreateForm('img', 'img02', '');
				img2.setAttribute('src', this.items[id].img2);
				this.htmlAppend(previewLink, img2);
			}

			/* проверяем по значению alt */
				/* меняем местами картинки по клику */
			img2.onclick = () =>{
				if(modalImg.alt === 'img'){
					modalImg.src = this.items[id].img2; // switch of source
					modalImg.alt = 'img2'; // switch of alt
					img2.src = this.items[id].img; // switch of thumbnail
				} else {
					modalImg.src = this.items[id].img; // switch of source
					modalImg.alt = 'img'; // switch of alt
					img2.src = this.items[id].img2; // switch of thumbnail
				} 
			}
			return;	
		}
	},
};

const cdb = catalogDb; // link to main obj

/* Добавляем предметы в БД */
cdb.addItem('Грелка', 50, 'KKG-001', './public/placeholder.png', './public/placeholder2.jpg', 'Описание продукта – это главное основание для покупки. От того, сможете ли вы убедить посетителя в потребности в вашем товаре зависит купит он его или нет. Страничка товара — это последний пункт в воронке продаж перед тем, как пользователь нажмет «оформить заказ».');
cdb.addItem('Утюг', 100,'Samsung G433', 'public/placeholder.png', 'public/placeholder2.jpg', 'Описание продукта – это главное основание для покупки. От того, сможете ли вы убедить посетителя в потребности в вашем товаре зависит купит он его или нет. Страничка товара — это последний пункт в воронке продаж перед тем, как пользователь нажмет «оформить заказ».');
cdb.addItem('Кофеварка', 50, 'Bork F123', 'public/placeholder.png', 'public/placeholder2.jpg', 'Описание продукта – это главное основание для покупки. От того, сможете ли вы убедить посетителя в потребности в вашем товаре зависит купит он его или нет. Страничка товара — это последний пункт в воронке продаж перед тем, как пользователь нажмет «оформить заказ».');
cdb.addItem('Пылесос', 250, 'Dison J21', 'public/placeholder.png', 'public/placeholder2.jpg', 'Описание продукта – это главное основание для покупки. От того, сможете ли вы убедить посетителя в потребности в вашем товаре зависит купит он его или нет. Страничка товара — это последний пункт в воронке продаж перед тем, как пользователь нажмет «оформить заказ».');
console.log('Загруженный каталог товаров:');
console.log(cdb.items);

/* start */
	/* Генерим формы на странице */
	const mainPageWrap = document.getElementById('wrap'); // linking main wrap
	const catalogWrap = cdb.htmlCreateForm('div', 'catalogWrap');
	const description3 = document.getElementById('description');
	//cdb.htmlAppend(mainPageWrap, catalogWrap);

	cdb.htmlAppend(mainPageWrap, catalogWrap); // вставляем враппер после описания ДЗ

	cdb.htmlGenerateCatalog(catalogWrap);  // генерим контент в каталог




