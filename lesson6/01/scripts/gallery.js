const galleryVAK = {
	
	imgs: ["images/pic1.jpg","images/pic2.jpg","images/pic3.jpg","images/pic4.jpg","images/pic5.jpg","images/pic6.jpg","images/pic7.jpg","images/pic8.jpg","images/pic9.jpg","images/pic10.jpg","images/pic11.jpg","images/pic12.jpg","images/pic13.jpg","images/pic14.jpg"], // массив с ссылками на изображения

	animation: {

	},

	overlay: {
		dark: undefined,
		forward: undefined,
		backward: undefined,
		fullScreen: { // кнопка режима фуллскрин
			close: function () { // закрыть режим фуллскрин
				try {
					if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
						if (document.exitFullscreen) {
							document.exitFullscreen();
						} else if (document.mozCancelFullScreen) {
							document.mozCancelFullScreen();
						} else if (document.webkitExitFullscreen) {
							document.webkitExitFullscreen();
						} else if (document.msExitFullscreen) {
							document.msExitFullscreen();
						}
					} else {
						throw new Error('Error of fullscreen mod');
					}
				} catch (e) {

				}
			},
			open: function () { // открыть режим фуллскрин
				try {
					if(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled){
						if ('requestFullscreen'  in divFullImg[0]) {
							divFullImg[0].requestFullscreen();
						} else if ('mozRequestFullScreen'  in divFullImg[0]) {
							divFullImg[0].mozRequestFullScreen();
						} else if ('webkitRequestFullscreen' in divFullImg[0]) {
							divFullImg[0].webkitRequestFullscreen();
						} else if ('msRequestFullscreen'  in divFullImg[0]) {
							divFullImg[0].msRequestFullscreen();
						} else {
							alert ('В данном браузере режим Full Screen не доступен.');
							throw new Error('Error of fullscreen mod');
						}
					}
				} catch (e) {

				}
			}
		},
		img: undefined,
	} ,
	
	create: function (imgs) { // в качестве параметра, передается массив с ссылками на изображения
		galleryVAK.imgs = imgs;
		let divGalleryVAK;
		if (document.querySelector('.galleryVAK')) { // при обнаружении блока с классом galleryVAK, добавляется галлерея в этот блок
			divGalleryVAK = document.querySelector('.galleryVAK');
		} else {
			divGalleryVAK = document.createElement('div'); // если такого блока нет, то он добавляется в конец body
			divGalleryVAK.setAttribute('class', 'galleryVAK');
		}

		// создается блок обертка
		const divGallery = document.createElement('div');
		divGallery.setAttribute('class', 'gallery');

		// создается блок для главного изображения и главное изображение
		const divMainImgBlock = document.createElement('div');
		divMainImgBlock.setAttribute('class', 'gallery__main-img-block');
		const divMainImg = document.createElement('div');
		divMainImg.setAttribute('class', 'gallery__main-img');
		divMainImg.style.background = 'url(' + galleryVAK.imgs[0] + ') center no-repeat';
		divMainImg.style.backgroundSize = 'contain';
		divMainImgBlock.appendChild(divMainImg);
		divGallery.appendChild(divMainImgBlock);

		// создается блок для затемнения
		const divDarkLight = document.createElement('div');
		divDarkLight.setAttribute('class', 'gallery__dark-light');
		divGallery.appendChild(divDarkLight);

		// создается оверлей с кнопками и просмотром изображение
		const divOverlay = document.createElement('div');
		divOverlay.setAttribute('class', 'gallery__overlay');

		// создается блок для кнопок затемнения и режима фуллскрин
		let divOverlayBtnBlock = document.createElement('div');
		divOverlayBtnBlock.setAttribute('class', 'gallery__overlay-btn-block');

		// создается кнопка затемнения
		const btnDark = document.createElement('button');
		btnDark.setAttribute('class', 'gallery__overlay-btn');
		btnDark.setAttribute('title', 'Темнее');
		btnDark.innerHTML = '&#9055;';
		btnDark.addEventListener('click', () => {}); // изменить обработчики
		divOverlayBtnBlock.appendChild(btnDark);

		// создается кнопка режима фуллскрин
		const btnFullScreen = document.createElement('button');
		btnFullScreen.setAttribute('class', 'gallery__overlay-btn');
		btnFullScreen.setAttribute('title', 'Развернуть на весь экран');
		btnFullScreen.innerHTML = '&harr;';
		btnFullScreen.addEventListener('click', () => {	}); // изменить обработчики
		divOverlayBtnBlock.appendChild(btnFullScreen);
		divOverlay.appendChild(divOverlayBtnBlock);

		// создается блок для кнопок вперед и назад
		divOverlayBtnBlock = document.createElement('div');
		divOverlayBtnBlock.setAttribute('class', 'gallery__overlay-btn-block');

		// создается кнопка назад
		const btnBackward = document.createElement('button');
		btnBackward.setAttribute('class', 'gallery__overlay-btn');
		btnBackward.setAttribute('title', 'Предыдущеее изображение');
		btnBackward.innerHTML = '&lt;&lt;';
		btnBackward.addEventListener('click', () => {}); // изменить обработчики
		divOverlayBtnBlock.appendChild(btnBackward);

		// создается кнопка вперед
		const btnForward = document.createElement('button');
		btnForward.setAttribute('class', 'gallery__overlay-btn');
		btnForward.setAttribute('title', 'Следущее изображение');
		btnForward.innerHTML = '&gt;&gt;';
		btnForward.addEventListener('click', () => {}); // изменить обработчики
		divOverlayBtnBlock.appendChild(btnForward);
		divOverlay.appendChild(divOverlayBtnBlock);

		// создается блок для просмотра следующих и предыдущих изображений
		const divOverlayImgsBlock = document.createElement('div');
		divOverlayImgsBlock.setAttribute('class', 'gallery__overlay-imgs-block');

		// создаются блоки для изображения для просмотра
		let divOverlayImg;
		for (let i = 0; i < 5; i++) {
			divOverlayImg = document.createElement('div');
			divOverlayImg.setAttribute('class', 'gallery__overlay-img');
			divOverlayImg.style.background = 'url(' + galleryVAK.imgs[i] + ') center no-repeat';
			divOverlayImg.style.backgroundSize = '100% 100%';
			divOverlayImgsBlock.appendChild(divOverlayImg);
		}
		divOverlay.appendChild(divOverlayImgsBlock);
		divGallery.appendChild(divOverlay);
		divGalleryVAK.appendChild(divGallery);

		if (!document.querySelector('.galleryVAK')) { // если такого блока нет, то он добавляется в конец body
			const body = document.querySelector('body');
			body.appendChild(divGalleryVAK);
		}
	}
};
/*
 var imgDisplayedImage = document.querySelector('.displayed-img');
var divOverlay = document.querySelector('.overlay');
var imgOverlayImg = document.getElementsByClassName('overlay_img');
var divFullImg = document.getElementsByClassName('gallery');
var divDarkLight = document.getElementById('dark-light');

var btnDark = document.getElementById('dark');
var btnForward = document.getElementById('forward');
var btnBackward = document.getElementById('backward');
var btnFullScreen = document.getElementById('fullscreen');

//var arrImg =
// ["images/pic1.jpg","images/pic2.jpg","images/pic3.jpg","images/pic4.jpg","images/pic5.jpg","images/pic6.jpg","images/pic7.jpg","images/pic8.jpg","images/pic9.jpg","images/pic10.jpg","images/pic11.jpg","images/pic12.jpg","images/pic13.jpg","images/pic14.jpg"]

//imgDisplayedImage.setAttribute('src',arrImg[2]);
// btn dark
//btnDark.addEventListener('click', fnDarklight);
var booDarkState = true;
//divDarkLight.style.background = 'rgba(0,0,0,0)';



btnForward.style.opacity = 0;
btnForward.addEventListener('mouseover', fnElementMouseOver);
btnForward.addEventListener('mouseout', fnElementMouseOut);
btnForward.addEventListener('click', fnNextImg);

btnBackward.style.opacity = 0;
btnBackward.addEventListener('mouseover', fnElementMouseOver);
btnBackward.addEventListener('mouseout', fnElementMouseOut);
btnBackward.addEventListener('click', fnNextImg);



btnFullScreen.style.opacity = 0;
btnFullScreen.addEventListener('mouseover', fnElementMouseOver);
btnFullScreen.addEventListener('mouseout', fnElementMouseOut);
btnFullScreen.addEventListener('click', fnFullScreen);
var booFullScreenState = false;

var iNextImg = 0; //счетчик итераций для поиска следущего img для оверлея

var i = 0;
var j = -20;
while (i != imgOverlayImg.length) {
	imgOverlayImg[i].setAttribute('src',arrImg[i])
	imgOverlayImg[i].style.opacity = 0;
	imgOverlayImg[i].style.left = j + 20 + '%';
	imgOverlayImg[i].addEventListener('mouseover', fnElementMouseOver);
	imgOverlayImg[i].addEventListener('mouseout', fnElementMouseOut);
	imgOverlayImg[i].addEventListener('click', fnNextImg);
	i++;
	j += 20;
}

var countAnimated = 0; //счетчик кликов мыши на кнопках btnForward и btnBackward
var arrCountAnimated = new Array();
var coefSpeedAnimation = 0.3;

var timerShowOverlay; // таймер для mousemove
var timerDelayConst = 500; //интервал задержки анимации
var timerDelay = timerDelayConst; // чем больше повторов, тем быстрее
var fps = 20;

var timerHide = 3000; // таймер скрытия оверлея
var timerHideAnimation = 1500; // таймер анимации скрытия оверлея
var timerWarning = 2500; // таймер вывода собщения при более 6 анимации оверлея

divGallery.addEventListener('mousemove', fnShowOverlay);
divGallery.addEventListener('mouseout', fnShowOverlay);

function fnHideOverlay(){
	clearInterval(timerShowOverlay);
	var timerOverlay = setInterval(fnHideOverlayAll, timerHideAnimation/fps);
	setTimeout(function(){
		clearInterval(timerOverlay);
		btnForward.style.cursor = 'default';
		btnBackward.style.cursor = 'default';
		btnFullScreen.style.cursor = 'default';
		i = 0;
		while (i != imgOverlayImg.length) {
			imgOverlayImg[i].style.cursor = 'default';
			i++;
		}			
	}, timerHideAnimation);
}

function fnHideOverlayAll() {
	btnForward.style.opacity -= 0.2/fps;
	btnBackward.style.opacity -= 0.2/fps;
	btnFullScreen.style.opacity -= 0.2/fps;
	i = 0;
	while (i != imgOverlayImg.length) {
		imgOverlayImg[i].style.opacity -= 0.4/fps;
		imgOverlayImg[i].style.cursor = 'default';
		i++;		
	}
	
}
	
function fnShowOverlay() {
	clearInterval(timerShowOverlay);
	btnForward.style.opacity = 0.2;
	btnForward.style.cursor = 'pointer';
	btnBackward.style.opacity = 0.2;
	btnBackward.style.cursor = 'pointer';
	btnFullScreen.style.opacity = 0.2;
	btnFullScreen.style.cursor = 'pointer';
	i = 0;
	while (i != imgOverlayImg.length){
		imgOverlayImg[i].style.opacity = 0.4;
		imgOverlayImg[i].style.cursor = 'pointer';
		i++;
	}
	timerShowOverlay = setTimeout(fnHideOverlay, timerHide);
}

function fnElementMouseOver(event) {
	var  event = event || window.event; // для IE8
	event.stopPropagation(); // выключает события на родителях
	divGallery.removeEventListener('mousemove', fnShowOverlay); // отключаем события по срытию/появлению оверлея
	clearInterval(timerShowOverlay); // отключаем таймер скрытия, если включится
	var elementSelect = event.target;
	elementSelect.style.opacity = 1;
}

function fnElementMouseOut(event) {
	var  event = event || window.event; // для IE8
	event.stopPropagation();
	divGallery.addEventListener('mousemove', fnShowOverlay);
	clearInterval(timerShowOverlay);
	var elementSelect = event.target;
	elementSelect.style.opacity = 0.4;
}

function fnNextImg(event) {
		
	iNextImg = 0;
	if (event.target == btnForward){
		iNextImg = fnFindInArrImg (iNextImg);
		iNextImg = fnFindINextImg ('forward', iNextImg);
		imgDisplayedImage.setAttribute('src',arrImg[iNextImg]);
				
		// ищем местоположение img из 0го и 4го оверлея в массиве img
		iNextImg = fnFindINextImg ('forward', iNextImg);
		// оверлей смещен на 1 позицию относительно просматриваемого изображения, требуется вторая проверка
		iNextImg = fnFindINextImg ('forward', iNextImg);
		arrCountAnimated.push([true, iNextImg, 'once']);
		
	} else if (event.target == btnBackward) {
		iNextImg = fnFindInArrImg (iNextImg);
		iNextImg = fnFindINextImg ('backward', iNextImg);
		imgDisplayedImage.setAttribute('src',arrImg[iNextImg]);
			
		// ищем местоположение img из 0го и 4го оверлея в массиве img
		iNextImg = fnFindINextImg ('backward', iNextImg);
		// оверлей смещен на 1 позицию относительно просматриваемого изображения, требуется вторая проверка
		iNextImg = fnFindINextImg ('backward', iNextImg);
		arrCountAnimated.push([false, iNextImg, 'once']);
	
	} else { // смена img при нажатии на оверлей
		fnOverlayClickOnOff ('off');
		var i = 0;
		imgDisplayedImage.setAttribute('src',event.target.getAttribute('src'));
		iNextImg = fnFindInArrImg (iNextImg);
		while (imgDisplayedImage.getAttribute('src') != imgOverlayImg[i].getAttribute('src')) {
			i ++;
		}
		switch (i) {
			case 0:
				iNextImg = fnFindINextImg ('backward', iNextImg);
				arrCountAnimated.push([false, iNextImg, 'again']);
				
				iNextImg = fnFindINextImg ('backward', iNextImg);
				arrCountAnimated.push([false, iNextImg, 'once']);
				break;
			case 1:
				iNextImg = fnFindINextImg ('backward', iNextImg);
				iNextImg = fnFindINextImg ('backward', iNextImg);
				
				arrCountAnimated.push([false, iNextImg, 'once']);
				break;
			case 2:
				countAnimated -= 1;
				fnOverlayClickOnOff ('on');
				break;
			case 3:
				iNextImg = fnFindINextImg ('forward', iNextImg);
				iNextImg = fnFindINextImg ('forward', iNextImg);
				
				arrCountAnimated.push([true, iNextImg, 'once']);
				break;
			case 4:
				iNextImg = fnFindINextImg ('forward', iNextImg);
				arrCountAnimated.push([true, iNextImg, 'again']);
				
				iNextImg = fnFindINextImg ('forward', iNextImg);
				arrCountAnimated.push([true, iNextImg, 'once']);
				break;
		}
	}
	
	if (countAnimated == 6) {
		fnShowWarning();
	}
	if (countAnimated == 0) {
			countAnimated += 1;
			fnOverlayAnimated(arrCountAnimated[0][0],arrCountAnimated[0][1]);
		} else {
			countAnimated += 1;
		}
}

function fnOverlayAnimated(stepForward, iNextImage) {	
	
	var newImg = imgOverlayImg[0].cloneNode(true); // создаю 6й оверлей блок для анимации
	newImg.setAttribute('src',arrImg[iNextImage]);
	newImg.style.opacity = 0.4;
	if (stepForward) { // размещаю новый блок оверлея
		newImg.style.left = 100+'%';
		divOverlay.appendChild(newImg);
	} else {
		newImg.style.left = -20 +'%';
		divOverlay.insertBefore(newImg, imgOverlayImg[0]);
	}
	
	newImg.addEventListener('mouseover', fnElementMouseOver);
	newImg.addEventListener('mouseout', fnElementMouseOut);
		
	var timerAnimated = setInterval ( // анимация
		function(){
			var iAnimated = 0; //счетчик итераций для анимации
			while (iAnimated != imgOverlayImg.length) {
				var overlayImgI = parseFloat(imgOverlayImg[iAnimated].style.left);
					if (stepForward) {
						imgOverlayImg[iAnimated].style.left = overlayImgI - 20/fps + '%';
					} else {
						imgOverlayImg[iAnimated].style.left = overlayImgI + 20/fps + '%';
					}
				iAnimated ++;
			}
		},timerDelay/fps);
	setTimeout(function(){
		clearInterval(timerAnimated);
			
		if (stepForward) { // удаляю ненужный элемент
			divOverlay.removeChild(imgOverlayImg[0]);
		} else {
			divOverlay.removeChild(imgOverlayImg[5]);
		}
				
		iAnimated = 0; //устанавливаю точное положение элементов оверлея
		var j = -20;
		while (iAnimated != imgOverlayImg.length) {
			imgOverlayImg[iAnimated].style.left = j + 20 + '%'; 
			iAnimated ++;
			j += 20;
		}
				
		if (arrCountAnimated[0][2] == 'once') { //двойное повторение при нажатии на оверлее
			countAnimated -= 1;
			fnOverlayClickOnOff ('on');
		}
		arrCountAnimated.shift();
		timerDelay = timerDelayConst/(1+coefSpeedAnimation*(arrCountAnimated.length)); // изменяем скорость прокрутки, при нескольких анимациях
		if (countAnimated != 0) {
			fnOverlayAnimated(arrCountAnimated[0][0],arrCountAnimated[0][1])
		}
	}, timerDelay);
}

function fnFindInArrImg (iNextImg) { // поиск текущего изображения в массиве изображений
	while (imgDisplayedImage.getAttribute('src') != arrImg[iNextImg]) {
		iNextImg ++;
	}
	return iNextImg;
}

function fnFindINextImg (direction, iNextImg) { // ищет следующее доступное для показа изображение
	if (direction == 'forward') {
		if (iNextImg == arrImg.length-1) {
			iNextImg = 0;
		} else {
			iNextImg ++;
		}
	} else if (direction == 'backward'){
		if (iNextImg == 0) {
			iNextImg = arrImg.length-1;
		} else {
			iNextImg --;
		}
	}
	return iNextImg;
}

function fnOverlayClickOnOff (state) { //колличество доступных кликов на оверлее
	i = 0;
	while (i != 5) {
		if (state == 'on') {
			imgOverlayImg[i].addEventListener('click', fnNextImg);
		} else if (state == 'off') {
			imgOverlayImg[i].removeEventListener('click', fnNextImg);
		}
		i++;
	}
}

function fnShowWarning() {
	btnForward.removeEventListener('click', fnNextImg);
	btnBackward.removeEventListener('click', fnNextImg);
	var strWarning = document.createElement('div');

	strWarning.innerHTML = 'Остановись злобный пользователь!!!';
	strWarning.style.position = 'absolute';
	strWarning.style.top = 50 +'%';
	strWarning.style.left = 50 + '%';
	strWarning.style.marginRight = -50 + '%';
	strWarning.style.transform = 'translate(-50%, -50%)';
	strWarning.style.fontSize = 2.5 + 'em';
	strWarning.style.color = '#d31313';
	strWarning.style.textShadow = '0 0 3px #ffffff';
	strWarning.style.opacity = 100;

	divFullImg[0].appendChild(strWarning);
	
	var hideWarning = setInterval(function(){
		strWarning.style.opacity -= 100/fps;
	}, timerWarning/fps);
	setTimeout(function() {
		clearInterval(hideWarning);
		divFullImg[0].removeChild(strWarning);
		btnForward.addEventListener('click', fnNextImg);
	btnBackward.addEventListener('click', fnNextImg);
	},timerWarning);
}

function fnDarklight () {
	if (booDarkState) {
		divDarkLight.style.background = 'rgba(0,0,0,0.5)';
		btnDark.textContent = 'Darken';
		booDarkState = false;
	} else {
		divDarkLight.style.background = 'rgba(0,0,0,0)';
		btnDark.textContent = 'Lighten';
		booDarkState = true;
	}
} */