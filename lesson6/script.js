function myProcessor() {
    let imgIndex = 0;
    let imgCount = document.getElementsByClassName('img-rolls').length;

    function showBig(event) {
        const element = event.target;
        const src = element.getAttribute('data-big-src');
        const bigElement = document.getElementById('bigPicture');
        bigElement.innerHTML = '<img height="200" src="./' + src + '"/>';
        // element.removeEventListener('click', showBig);
    }

    function nextImg() {
        imgIndex++;
        if (imgIndex > imgCount - 1) {
            imgIndex = 0;
        }
        changePic(imgIndex);
    }

    function prevImg() {
        imgIndex--;
        if (imgIndex < 0) {
            imgIndex = imgCount - 1;
        }

        changePic(imgIndex);
    }

    function changePic(nextImgIndex) {
        const images = document.getElementsByClassName('img-rolls');
        const src = images[imgIndex].getAttribute('data-big-src');
        let img = new Image();
        img.src = './' + src;
        img.onload = function () {
            const bigElement = document.getElementById('bigPicture');
            bigElement.innerHTML = '<img height="200" src="./' + src + '"/>';
        }
        img.onerror = function () {
            const bigElement = document.getElementById('bigPicture');
            bigElement.innerHTML = '<img height="200" src="./img/error404.jpeg"/>';
        }
    }

    const images = document.getElementsByClassName('img-rolls');
    for (let i = 0; i < images.length; i++) {
        const element = images[i];
        element.addEventListener('click', showBig);
    }

    const leftArrow = document.getElementById('left-arrow');
    const rightArrow = document.getElementById('right-arrow');
    leftArrow.addEventListener('click', prevImg);
    rightArrow.addEventListener('click', nextImg);

}

/// Функции для магазина
function shop() {
    let thingsList = [];
    //console.log('инициализация');
    let costList = [['t1', 10000], ['t2', 5000], ['t3', 20000], ['t4', 50000], ['t5', 150000]]

    const thingCollection = document.getElementsByClassName('things');
    for (let i = 0; i < thingCollection.length; i++) {
        thingCollection[i].addEventListener('click', addItemToRecycle);
//        console.log('Добавили события');
    }


    function showRecycleCoast() {
        let count = 0;
        for (let i = 0; i < thingsList.length; i++) {
            count += thingsList[i][1];
        }
        const cost = document.getElementById('reyclecount');
        cost.innerHTML = 'В корзине '+ thingsList.length +' товаров на сумму: '+ count + ' р.';
//        console.log(count);
    }

    function addItemToRecycle(event) {
        const element = event.target;
        thingsList.push(element.id);
        console.log(thingsList);
        thingsList[thingsList.length - 1] = [element.id];

        for (let k = 0; k < costList.length; k++) {
            if (costList[k][0] === element.id) {
                thingsList[thingsList.length - 1].push(costList[k][1]);
            }
        }
//        console.log(thingsList);
        showRecycleCoast();

    }
}


function myClick() {
    console.log('click');
}

window.onload = myProcessor;
window.onload = shop;
