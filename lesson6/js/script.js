const DEFAULT_IMG = 'img/gallery/big/default.png';

function init() {
    let images = document.getElementById('gallery').children;
    for (let i = 0; i < images.length; i++) {
        images[i].addEventListener('click',changeBigPicture);
    }

    let leftArrow = document.getElementsByClassName('left-arrow')[0];
    leftArrow.addEventListener('click', decrease);
    let rightArrow = document.getElementsByClassName('right-arrow')[0];
    rightArrow.addEventListener('click', increase);
}

function decrease(eventObj) {
    change('DOWN');
}

function increase(eventObj) {
    change('UP');
}

function change(direction) {
    let bigImg = document.querySelector('#big_picture').children[0];
    let size = document.getElementById('gallery').children.length;

    if (!(bigImg == null)) {
        let imgNum = +bigImg.dataset.num;
        if (direction =='UP') {
            imgNum = ++imgNum > size ? 1 : imgNum;
        } else {
            imgNum = --imgNum < 1 ? size : imgNum;
        }
        let src = 'img/gallery/big/' + imgNum + '.png';
        bigImg.dataset.num = imgNum;
        if (imageExists(src)) {
            bigImg.src = src;
        } else {
            bigImg.src = DEFAULT_IMG;
        }
    } else {
        let appDiv = document.getElementById('big_picture');

        let current;
        bigImg = document.createElement('img');

        if (direction == 'UP') {
            current = 1;
        } else {
            current = size;
        }
        if (imageExists('img/gallery/big/' + current + '.png')) {
            bigImg.src = 'img/gallery/big/' + current + '.png';
        } else {
            bigImg.src = DEFAULT_IMG;
        }
        bigImg.dataset.num = current;
        appDiv.appendChild(bigImg);

    }
}

function changeBigPicture(eventObj){
    let appDiv = document.getElementById('big_picture');
    appDiv.innerHTML = "";
    let eventElement = eventObj.target;
    let imageNameParts = eventElement.id.split("_");

    let imageDomElement = document.createElement('img');
    let src = 'img/gallery/big/' + imageNameParts[1] + '.png';
    if (imageExists(src)) {
        imageDomElement.src = src;
    } else {
        imageDomElement.src = DEFAULT_IMG;
    }
    imageDomElement.dataset.num = imageNameParts[1];
    appDiv.appendChild(imageDomElement);
}

function imageExists(imageUrl){
    // не сумел реализовать проверку на то, что картинка существует
    return true;
}

window.onload = init;