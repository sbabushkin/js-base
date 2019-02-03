let galleryVAK = (imgs) => {
	const gallery = {

		imgs: [], // массив с ссылками на изображения

		animation: {
			nextImg: function (next) { // анимация движения оверлея с изображениями параметры 'forward', 'backward'
				let sign;
				switch (next) {
					case 'forward':
						sign = 1;
						break;
					case 'backward':
						sign = -1;
						break;
				}
				if ((gallery.mainImg.currentPos + 1 * sign) % gallery.imgs.length < 0 ){
					gallery.mainImg.currentPos = gallery.imgs.length + ((gallery.mainImg.currentPos + 1 * sign) % gallery.imgs.length);
				} else {
					gallery.mainImg.currentPos = (gallery.mainImg.currentPos + 1 * sign) % gallery.imgs.length;
				}
				let numFrames = 0;
				let timer = setInterval(() => {
					const divOverlayImgsBlock = document.querySelector('.galleryVAK__overlay-imgs-block');
					divOverlayImgsBlock.style.left = parseFloat(divOverlayImgsBlock.style.left.slice(0, -1)) - 1 * sign + '%';
					numFrames++;
					if (numFrames > 19) {
						clearInterval(timer, 0);
						const divOverlayImg = document.createElement('div');
						divOverlayImg.setAttribute('class', 'galleryVAK__overlay-img');
						divOverlayImg.style.background = 'url(' + gallery.overlay.img.currentImg(3 * sign) + ') center no-repeat';
						divOverlayImg.style.backgroundSize = '100% 100%';
						switch (sign) {
							case 1:
								divOverlayImgsBlock.removeChild(divOverlayImgsBlock.childNodes[0]);
								divOverlayImgsBlock.appendChild(divOverlayImg);
								break;
							case -1:
								divOverlayImgsBlock.removeChild(divOverlayImgsBlock.childNodes[6]);
								divOverlayImgsBlock.insertBefore(divOverlayImg, divOverlayImgsBlock.childNodes[0]);
								break;
						}
						divOverlayImgsBlock.style.left = -20 + '%';
						const divMainImg = document.querySelector('.galleryVAK__main-img');
						divMainImg.style.background = 'url(' + gallery.imgs[gallery.mainImg.currentPos] + ') center no-repeat';
						divMainImg.style.backgroundSize = 'contain';
					}
				}, 50);
			},
		},

		mainImg: {
			currentImg: function () {
				if (gallery.imgs !== []) {
					return gallery.imgs[gallery.mainImg.currentPos];
				}
			},

			currentPos: 0,
		},

		overlay: {
			btnExit: {
				close: function () {
					document.querySelector('.galleryVAK-in_fixed').parentNode.removeChild(document.querySelector('.galleryVAK-in_fixed'));
				}
			},

			btnForward: {
				click: () => {gallery.animation.nextImg('forward')},
			},

			btnBackward: {
				click: () => {gallery.animation.nextImg('backward')},
			},

			btnFullScreen: { // кнопка режима фуллскрин
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
							document.querySelector('#galleryVAK__overlay-btn-fullscreen').removeEventListener('click', () => {
								gallery.overlay.btnFullScreen.close();
							});
							document.querySelector('#galleryVAK__overlay-btn-fullscreen').addEventListener('click', () => {
								gallery.overlay.btnFullScreen.open();
							});
						} else {
							throw new Error('Error of fullscreen mod');
						}
					} catch (e) {

					}
				},
				open: function () { // открыть режим фуллскрин
					try {
						if(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled){
							let fullOpenDiv = document.querySelector('.galleryVAK__gallery');
							if ('requestFullscreen' in fullOpenDiv) {
								fullOpenDiv.requestFullscreen();
							} else if ('mozRequestFullScreen' in fullOpenDiv) {
								fullOpenDiv.mozRequestFullScreen();
							} else if ('webkitRequestFullscreen' in fullOpenDiv) {
								fullOpenDiv.webkitRequestFullscreen();
							} else if ('msRequestFullscreen' in fullOpenDiv) {
								fullOpenDiv.msRequestFullscreen();
							} else {
								alert ('В данном браузере режим Full Screen не доступен.');
								throw new Error('Error of fullscreen mod');
							}
							document.querySelector('#galleryVAK__overlay-btn-fullscreen').removeEventListener('click', () => {
								gallery.overlay.btnFullScreen.open();
							});
							document.querySelector('#galleryVAK__overlay-btn-fullscreen').addEventListener('click', () => {
								gallery.overlay.btnFullScreen.close();
							});
						}
					} catch (e) {

					}
				}
			},

			img: {
				currentImg: function (def) { // def - расстояние от центрального изображения до вставляемого
					if ((def + gallery.mainImg.currentPos) % gallery.imgs.length < 0) {
						return gallery.imgs[gallery.imgs.length + ((def + gallery.mainImg.currentPos) % gallery.imgs.length)];
					} else {
						return gallery.imgs[(def + gallery.mainImg.currentPos) % gallery.imgs.length];
					}
				},
			}
		},

		create: function (imgs) { // в качестве параметра, передается массив с ссылками на изображения
			gallery.imgs = imgs;

			// создается блок обертка
			const divGallery = document.createElement('div');
			divGallery.setAttribute('class', 'galleryVAK__gallery');

			// создается блок для главного изображения и главное изображение
			const divMainImg = document.createElement('div');
			divMainImg.setAttribute('class', 'galleryVAK__main-img');
			divMainImg.style.background = 'url(' + gallery.imgs[0] + ') center no-repeat';
			divMainImg.style.backgroundSize = 'contain';
			divGallery.appendChild(divMainImg);

			// создается оверлей с кнопками и просмотром изображение
			const divOverlay = document.createElement('div');
			divOverlay.setAttribute('class', 'galleryVAK__overlay');

			// создается блок для кнопок затемнения и режима фуллскрин
			let divOverlayBtnBlock = document.createElement('div');
			divOverlayBtnBlock.setAttribute('class', 'galleryVAK__overlay-btn-block');

			// создается кнопка выход
			const btnExit = document.createElement('button');
			btnExit.setAttribute('class', 'galleryVAK__overlay-btn');
			btnExit.setAttribute('id', 'galleryVAK__overlay-btn-exit');
			btnExit.setAttribute('title', 'Выход');
			btnExit.innerHTML = '&#10006;';
			btnExit.addEventListener('click', () => {
				gallery.overlay.btnExit.close();
			});
			divOverlayBtnBlock.appendChild(btnExit);

			// создается кнопка режима фуллскрин
			const btnFullScreen = document.createElement('button');
			btnFullScreen.setAttribute('class', 'galleryVAK__overlay-btn');
			btnFullScreen.setAttribute('id', 'galleryVAK__overlay-btn-fullscreen');
			btnFullScreen.setAttribute('title', 'Развернуть на весь экран');
			btnFullScreen.innerHTML = '&harr;';
			btnFullScreen.addEventListener('click', () => {
				gallery.overlay.btnFullScreen.open();
			});
			divOverlayBtnBlock.appendChild(btnFullScreen);
			divOverlay.appendChild(divOverlayBtnBlock);

			// создается блок для кнопок вперед и назад
			divOverlayBtnBlock = document.createElement('div');
			divOverlayBtnBlock.setAttribute('class', 'galleryVAK__overlay-btn-block');

			// создается кнопка назад
			const btnBackward = document.createElement('button');
			btnBackward.setAttribute('class', 'galleryVAK__overlay-btn');
			btnBackward.setAttribute('id', 'galleryVAK__overlay-btn-backward');
			btnBackward.setAttribute('title', 'Предыдущеее изображение');
			btnBackward.innerHTML = '&lt;&lt;';
			btnBackward.addEventListener('click', () => {
				gallery.overlay.btnBackward.click();
			});
			btnBackward.addEventListener('click', () => {}); // изменить обработчики
			divOverlayBtnBlock.appendChild(btnBackward);

			// создается кнопка вперед
			const btnForward = document.createElement('button');
			btnForward.setAttribute('class', 'galleryVAK__overlay-btn');
			btnForward.setAttribute('id', 'galleryVAK__overlay-btn-forward');
			btnForward.setAttribute('title', 'Следущее изображение');
			btnForward.innerHTML = '&gt;&gt;';
			btnForward.addEventListener('click', () => {
				gallery.overlay.btnForward.click();
			});
			divOverlayBtnBlock.appendChild(btnForward);
			divOverlay.appendChild(divOverlayBtnBlock);

			// создается блок для просмотра следующих и предыдущих изображений
			const divOverlayImgsBlock = document.createElement('div');
			divOverlayImgsBlock.setAttribute('class', 'galleryVAK__overlay-imgs-block');
			divOverlayImgsBlock.style.left = -20+'%';

			// создаются блоки для изображения для просмотра
			let divOverlayImg;
			for (let i = -3; i < 4; i++) {
				divOverlayImg = document.createElement('div');
				divOverlayImg.setAttribute('class', 'galleryVAK__overlay-img');
				divOverlayImg.style.background = 'url(' + gallery.overlay.img.currentImg(i) + ') center no-repeat';
				divOverlayImg.style.backgroundSize = '100% 100%';
				divOverlayImgsBlock.appendChild(divOverlayImg);
			}
			divOverlay.appendChild(divOverlayImgsBlock);
			divGallery.appendChild(divOverlay);

			// создается блок оболочка
			const divGalleryVAKIn = document.createElement('div');
			divGalleryVAKIn.appendChild(divGallery);
			if (document.querySelector('.galleryVAK')) { // если такой блок есть, то галлерея вставляетсы в него
				divGalleryVAKIn.setAttribute('class', 'galleryVAK-in');
				document.querySelector('.galleryVAK').appendChild(divGalleryVAKIn);
			} else { // если такого блока нет, то он добавляется в конец body как фикисрованный
				divGalleryVAKIn.setAttribute('class', 'galleryVAK-in_fixed');
				document.querySelector('body').appendChild(divGalleryVAKIn);
			}
		}
	};
	gallery.create(imgs);
};