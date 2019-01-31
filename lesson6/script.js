var resultcost = 0,  // Переменная общей стоимости
    basket = [];     // Массив элементов корзины
    document.getElementById('resultcost').innerHTML = resultcost;

// Функция внешнего вида и общей суммы корзины
function viewBasket() {
    document.getElementById('basket').innerHTML = '';
    resultcost = 0;
    for(var i = 0; i < basket.length; i++){
        let basketgoods = document.createElement("div");
            basketgoods.className = "basket_goods";
            basketgoods.innerHTML = '<div><div class="basket_goods_title">' + basket[i].name + '</div>' + '<div class="basket_goods_price">' + basket[i].price + '</div></div>' + '<a href="#" onclick="deleteGoods(' + basket[i].inArrayPosition + ')"></a>';
            document.getElementById('basket').appendChild(basketgoods);
            resultcost = resultcost + parseInt(basket[i].price);
    }
    document.getElementById('resultcost').innerHTML = resultcost;
}

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

// Удаление элемента из корзины
function deleteGoods(a) {
    if(basket.length == 1) {
        resetBasket()
    } else {
        basket.splice(a,1);
        viewBasket();
    }
}
// Полная очистка корзины
function resetBasket() {
    basket = [];
    viewBasket();
}

// Добавление товара в корзину
function addGoods(event) {
    let element = event.currentTarget;
    let parentElement = element.parentNode;
    let nameElement = parentElement.childNodes[3].innerText;
    let priceElement = Number(parentElement.childNodes[5].innerText);
    let newGood = {
        name: nameElement,
        price: priceElement,
        inArrayPosition: basket.length + -1 + 1 // Получаем размещение объекта в массиве, чтобы можно было его оттуда выковырять при необходимости
    }
    basket.push(newGood);
    viewBasket();
}

// Функция отображения большого изображения
function myProcessor() {
    function showBig(event) {
        const element = event.target;
        const src = element.getAttribute('data-big-src');
        
        // Проверяем наличие тега для большого изображения
        if(src !== null) {
            // Проверяем наличие ссылки на изображение
            if(src !== '') {
                const bigElement = document.getElementById('bigPicture');
                bigElement.style.backgroundImage = 'url(' + src + ')';
            } else {
                console.log('Ошибка: большое изображение не найдено!');
                element.removeEventListener('click', showBig);
            }
        } else {
            console.log('Ошибка: тег не определён!');
            element.removeEventListener('click', showBig);
        }
    }
  
    const images = document.getElementsByTagName('img');
    for (let i = 0; i < images.length; i++) {
        const element = images[i];
        element.addEventListener('click', showBig);
    }
}
window.onload = myProcessor;