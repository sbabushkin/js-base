function init() {
  const slider = document.querySelectorAll('.slider__thumbs img');
  const bigImage = document.querySelector('.show-full-img img');
  let nowShowingImgSrc;
  bigImage.onerror = () => {
    alert('Увеличенное изображение не найдено');
  };

  // навигация для слайдера
  const sliderNavPrev = document.querySelector('.slider-nav');
  sliderNavPrev.addEventListener('click', (event) => {
    if (event.target.classList.contains('prev')) {
      showPrev(slider);
    }
    if (event.target.classList.contains('next')) {
      showNext(slider);
    }
  });

  function changeBigPicture(event) {
    const smallImg = event.target.src;
    changeBigPictureSrc(smallImg);
  }

  function changeBigPictureSrc(src) {
    nowShowingImgSrc = src;
    const srcArr = src.split('/');
    const smallImgName = srcArr[srcArr.length - 1];
    const bigImgScr = 'img/big/' + smallImgName;
    bigImage.src = bigImgScr;
  }

  changeBigPictureSrc(slider[0].src);

  slider.forEach((element) => {
    element.addEventListener('click', changeBigPicture);
  });

  function showPrev(slider) {
    if (slider[0].src == nowShowingImgSrc) {
      nowShowingImgSrc = slider[slider.length - 1].src;
    } else {
      for (let i = 1; i < slider.length; i++) {
        if (slider[i].src == nowShowingImgSrc) {
          nowShowingImgSrc = slider[i - 1].src;
        }
      }
    }
    changeBigPictureSrc(nowShowingImgSrc);
  }

  function showNext(slider) {
    if (slider[slider.length - 1].src == nowShowingImgSrc) {
      nowShowingImgSrc = slider[0].src;
    } else {
      for (let i = slider.length - 1; i >= 0; i--) {
        if (slider[i].src == nowShowingImgSrc) {
          nowShowingImgSrc = slider[i + 1].src;
        }
      }
    }
    changeBigPictureSrc(nowShowingImgSrc);
  };

  /*
    Задание 2
   */
  const btnBuy = document.querySelectorAll('.btn-buy');
  const cart = document.querySelector('.cartItems');
  btnBuy.forEach((element) => {
    element.addEventListener('click', addToCart);
  });

  let total = 0;
  function addToCart(event) {
    const cartItem = document.createElement('li');
    cartItem.innerHTML = event.target.dataset.title + ' - $' + event.target.dataset.price;
    cart.appendChild(cartItem);
    const totalHTML = document.querySelector('.total');
    total += parseFloat(event.target.dataset.price);
    totalHTML.innerHTML = 'Сумма к оплате: $' + total;
  }
}
window.onload = init;
