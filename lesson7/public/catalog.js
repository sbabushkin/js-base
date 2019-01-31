let catalogDb = {
	// перечень товаров в категории Items
	_items: {},
	idStart: 9990,
	// по-умолчанию, "пустая" картинка
	placeHolderImg: './public/placeholder.jpg', 
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
	// create HTML Collection IMG element and проверяем, есть ли картинка по ссылке
	htmlPictureCreateAndCheck(src){
 
		const ph = this.placeHolderImg; // link to placeholder
		const newImg = new Image(); // creating new collection element
		/* checking if file on link exists */
		newImg.onerror = () => { newImg.src = ph; /*console.log(`picCreate: ${src} failed`)*/} // if failed - putting placeholder pic
		/* checking if file on link exists */
		newImg.onload = () => {/*console.log(`picCreate: ${src} OK`)*/}

		newImg.src = src; // putting src
		newImg.classList.add('galleryImg'); // adding class

		// console.log(newImg)
		return newImg;
	},
	/*
	в текущей реализации, предполагается, что у меня только 3 картинки на объект, конечно, в реальном мире нужно использовать массив в котором не определенное количество элементов. Функции создания галереи не привязаны к количеству элементов, однако, функция отображения основного изображения, а так же изображения в каталоге нужно будет переделывать.
	*/
	// htmlGeneratePreviewGallery - генерит объекты html коллекции IMG
	htmlGeneratePreviewGallery(id){
		/*
			<img class='galleryImg' src='' alt='' />
			<img class='galleryImg' src='' alt='' />
			<img class='galleryImg' src='' alt='' />
		*/
		const itemLink = this.items[id];
		// checking if images exist, if not -> putting placeholder img
		const img = this.htmlPictureCreateAndCheck(itemLink.img);
		img.alt = 'img';
		const img2 = this.htmlPictureCreateAndCheck(itemLink.img2);
		img2.alt = 'img2';
		const img3 = this.htmlPictureCreateAndCheck(itemLink.img3);
		img3.alt = 'img3';
		// array of HTMLCollection objects
		result = [img, img2, img3];
		// console.log(result.join(''));
		return result;

	},
	// добавляем подсветку элементу в модальном блоке
	htmlAddPreviewPicturesBack(index){
		const imagesPreviewLink = document.getElementsByClassName('galleryImg');
		imagesPreviewLink[index].classList.add('chosenImg');

	},
	// убираем подсветку со всех элементов в модальном блоке
	htmlCleanPreviewPicturesBack(){
		const imagesPreviewLink = document.getElementsByClassName('galleryImg');
		// убираем подсветку со всех элементов в блоке
		for(let k=0; k<imagesPreviewLink.length;k++){
			imagesPreviewLink[k].classList.remove('chosenImg');
		};
	},
	htmlArrowFunction(event){
		const tarLink = event.target; // link to target
		// right or left arrow? 
		const arrowDirection = tarLink.id;

		if(!(arrowDirection === 'arrowRight'|| event.keyCode === 39 || arrowDirection === 'arrowLeft' || event.keyCode === 37)){
			/* do nothing */
		} else {
			/*
				NOTE that in order to compare images i use ALT attribute of IMG tag
			*/
			// getting content of modal window
			const modalImg = document.getElementById("modalImage");		
			const imagesPreviewLink = document.getElementsByClassName('galleryImg');
			// getting pic index in array and amount of pics in gallery
			let picsIndexes = [];
			let chosenIndex;

			for(let i=0; i < imagesPreviewLink.length; i++){
				// getting amount of pics
				picsIndexes.push(i);
				// getting current pic index using alt attribute
				if(modalImg.alt === imagesPreviewLink[i].alt){
					chosenIndex = i;
				}
			}

			// replacing image in preview modal window:
			let newChosenIndex;

			// event.keyCode === 39
				// plus ARROW KEY functions!!
			if(arrowDirection === 'arrowRight'|| event.keyCode === 39){
				// if our image at the end of array
				if(chosenIndex === picsIndexes.length-1){
					modalImg.src = imagesPreviewLink[0].src;
					modalImg.alt = imagesPreviewLink[0].alt;
					newChosenIndex = 0;
				} else {
					modalImg.src = imagesPreviewLink[chosenIndex+1].src;
					modalImg.alt = imagesPreviewLink[chosenIndex+1].alt;
					newChosenIndex = chosenIndex+1;
				}
			} 
			// event.keyCode === 37
				// plus ARROW KEY functions!!
			if(arrowDirection === 'arrowLeft' || event.keyCode === 37) {
				// if our image at the start of array
				if(chosenIndex === 0){
					modalImg.src = imagesPreviewLink[picsIndexes.length-1].src;
					modalImg.alt = imagesPreviewLink[picsIndexes.length-1].alt;
					newChosenIndex = picsIndexes.length-1;
				} else {
					modalImg.src = imagesPreviewLink[chosenIndex-1].src;
					modalImg.alt = imagesPreviewLink[chosenIndex-1].alt;
					newChosenIndex = chosenIndex-1;
				}	
			}

			// now cleaning background selection

			/*
				since this is EVENT function i have to use GLOBAL link to object fucntions
			*/

			cdb.htmlCleanPreviewPicturesBack();

			// adding bg to correct element
			cdb.htmlAddPreviewPicturesBack(newChosenIndex);
		}	
	},
	// removes elements in picture gallery
	htmlKillPictureGallery(){
		const imagesPreviewLink = document.getElementsByClassName('galleryImg');
		// console.log(imagesPreviewLink);
		for(let i=imagesPreviewLink.length-1; i>=0; i--){
			// console.log(`current ${i}`)
			imagesPreviewLink[i].remove();
			// console.log(`kill ${imagesPreviewLink[i]}`);
		}
	},
	htmlPictureModule(id){
		/*
			NOTE that in order to compare images i use ALT attribute of IMG tag
		*/
		

		// Get the modal
		const modal = document.getElementById('myModal');

		// checking if modal block already shown:
		if(modal.style.display === 'block'){
			/* do nothing */
			console.log('Picture Module already opened');
			return;
		} else {
			// link to modal IMG container
			let modalImg = document.getElementById("modalImage");
			// link to caption container
			let captionText = document.getElementById("caption");

			modal.style.display = "block"; // showing the block
			modalImg.src = this.items[id].img; // switch of source
			modalImg.alt = 'img' // pitting alt
			captionText.innerHTML = this.items[id].details; // switch of alt

			// Get the <span> element that closes the modal
			let closeSpan = document.getElementsByClassName("close")[0];

			// When the user clicks on <span> (x), close the modal
			closeSpan.onclick = () => { 
			  modal.style.display = "none";
			  /* ON CLOSE - REMOVES items in gallery */
			  this.htmlKillPictureGallery();
			  /* REMOVES KEYS EVENT LISTENER */
			  document.removeEventListener('keydown', this.htmlArrowFunction);
			}
		
			/* putting previev gallery */
				/* putting previev gallery */
					/* putting previev gallery */
			const previewLink = document.getElementById('preview');

			/* вот тут жесть : ) */
			// htmlGeneratePreviewGallery - генерит объекты html коллекции IMG
			const previewItems = this.htmlGeneratePreviewGallery(id);
			// console.log(previewItems);
			for(let i=0;i<previewItems.length;i++){
				this.htmlAppend(previewLink, previewItems[i]);
			}

			// adding event listener on images click
			const imagesPreviewLink = document.getElementsByClassName('galleryImg');
			// вешаем событие на элементы для переключения:
			for (let i=0; i<imagesPreviewLink.length;i++){
				// вешаем событие на элементы для переключения:
				imagesPreviewLink[i].addEventListener('click',(e)=>{
					modalImg.src = imagesPreviewLink[i].src;
					modalImg.alt = imagesPreviewLink[i].alt;
					// убираем подсветку со всех элементов в блоке
					this.htmlCleanPreviewPicturesBack();
					// добавляем подсветку выделенному элементу
					this.htmlAddPreviewPicturesBack(i);
				});
			// при открытии галерею, нужно подсветить первую картинку
			this.htmlAddPreviewPicturesBack(0);
			}

			// ARROWS
				// ARROWS
					// ARROWS
			document.getElementById('arrowRight').addEventListener('click', this.htmlArrowFunction);
			document.getElementById('arrowLeft').addEventListener('click', this.htmlArrowFunction);

			// KEYS EVENT LISTENER
				// KEYS EVENT LISTENER
					// KEYS EVENT LISTENER
			document.addEventListener('keydown', this.htmlArrowFunction);

			return;	
		}
	},
};

const cdb = catalogDb; // link to main obj

/* Добавляем предметы в БД */
cdb.addItem('Грелка', 50, 'KKG-001', './public/1.jpg', './public/22.jpg', './public/3.jpg', 'Описание продукта – это главное основание для покупки. От того, сможете ли вы убедить посетителя в потребности в вашем товаре зависит купит он его или нет. Страничка товара — это последний пункт в воронке продаж перед тем, как пользователь нажмет «оформить заказ».');
cdb.addItem('Утюг', 100,'Samsung G433', './public/1.jpg', './public/2.jpg', './public/3.jpg', 'Описание продукта – это главное основание для покупки. От того, сможете ли вы убедить посетителя в потребности в вашем товаре зависит купит он его или нет. Страничка товара — это последний пункт в воронке продаж перед тем, как пользователь нажмет «оформить заказ».');
cdb.addItem('Кофеварка', 50, 'Bork F123', './public/1.jpg', './public/2.jpg', './public/3.jpg', 'Описание продукта – это главное основание для покупки. От того, сможете ли вы убедить посетителя в потребности в вашем товаре зависит купит он его или нет. Страничка товара — это последний пункт в воронке продаж перед тем, как пользователь нажмет «оформить заказ».');
cdb.addItem('Пылесос', 250, 'Dison J21', './public/1.jpg', './public/2.jpg', './public/3.jpg', 'Описание продукта – это главное основание для покупки. От того, сможете ли вы убедить посетителя в потребности в вашем товаре зависит купит он его или нет. Страничка товара — это последний пункт в воронке продаж перед тем, как пользователь нажмет «оформить заказ».');
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




