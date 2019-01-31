var product = [{
  name: "Гуппи",
  cost: 30,
  shortDescription: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam accusamus iste veniam provident temporibus minus ea dolorem debitis voluptas officiis, fugiat non, nesciunt voluptatibus! Harum illo veniam optio aspernatur iusto.", //короткое аписание
  fullDescription: "https://ru.wikipedia.org/wiki/%D0%93%D1%83%D0%BF%D0%BF%D0%B8", //полное описание
  imgURL: "img/gupimin.jpg"
    }, {
  name: "Петушки",
  cost: 700,
  shortDescription: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam accusamus iste veniam provident temporibus minus ea dolorem debitis voluptas officiis, fugiat non, nesciunt voluptatibus! Harum illo veniam optio aspernatur iusto.", //короткое аписание
  fullDescription: "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%B9%D1%86%D0%BE%D0%B2%D0%B0%D1%8F_%D1%80%D1%8B%D0%B1%D0%BA%D0%B0", //полное описание
  imgURL: "petushokmin.jpg"
    }, {
  name: "Золотая рыбка",
  cost: 450,
  shortDescription: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam accusamus iste veniam provident temporibus minus ea dolorem debitis voluptas officiis, fugiat non, nesciunt voluptatibus! Harum illo veniam optio aspernatur iusto.", //короткое аписание
  fullDescription: "", //полное описание
  imgURL: ""
    }, {
  name: "Альтернантера",
  cost: 300,
  shortDescription: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam accusamus iste veniam provident temporibus minus ea dolorem debitis voluptas officiis, fugiat non, nesciunt voluptatibus! Harum illo veniam optio aspernatur iusto.", //короткое аписание
  fullDescription: "", //полное описание
  imgURL: ""
    }, {
  name: "Анубиас",
  cost: 600,
  shortDescription: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam accusamus iste veniam provident temporibus minus ea dolorem debitis voluptas officiis, fugiat non, nesciunt voluptatibus! Harum illo veniam optio aspernatur iusto.", //короткое аписание
  fullDescription: "", //полное описание
  imgURL: ""
    }];

//Каталог-----------------------------------
function creatingKatalog(name, desc, namber, details, price) {
  var div = document.createElement('div');
  div.className = 'katalog';
  katalog.appendChild(div);
  var divIner = document.createElement('div');
  divIner.className = 'imgs-katalog';
  div.appendChild(divIner);
  var h3 = document.createElement('h3');
  h3.className = 'katalog-h';
  h3.innerHTML = name;
  div.appendChild(h3);
  var p = document.createElement('p');
  p.className = 'products-desc';
  p.innerHTML = desc;
  div.appendChild(p);
  var a = document.createElement('a');
  a.className = 'products-btn';
  a.setAttribute('href', 'javascript:void(0)');
  a.setAttribute('id', namber);
  a.innerHTML = 'в корзину';
  div.appendChild(a);
  a.onclick = function () {
    puch(event);
  }
  var aDesc = document.createElement('a');
  aDesc.className = 'products-btn';
  aDesc.setAttribute('href', details),
  aDesc.innerHTML = 'подробнее';
  div.appendChild(aDesc);
  var span = document.createElement('span');
  span.className = 'products-price';
  span.innerHTML = price;
  div.appendChild(span);
}
//name, desc, namber, details, price
for (let i = 0; i < product.length; i++) {
  creatingKatalog(product[i].name, product[i].shortDescription, i, product[i].fullDescription, product[i].cost + ' RUB');
}
// корзина-----------------------------
function creatingBasket(name, desc, price) {
  var div = document.createElement('div');
  div.className = 'products';
  basket.appendChild(div);
  var h3 = document.createElement('h3');
  h3.className = 'products-caption';
  h3.innerHTML = name;
  div.appendChild(h3);
  var aDesc = document.createElement('a');
  aDesc.className = 'products-btn';
  aDesc.setAttribute('href', "javascript:void(0)");
  aDesc.innerHTML = 'подробнее';
  div.appendChild(aDesc);
  var span = document.createElement('span');
  span.className = 'products-price';
  span.innerHTML = price;
  div.appendChild(span);
}
// Создаем корзину и оповещаем что она пуста
let productBasket = [];
let p = document.createElement('p');
p.innerHTML = 'Корзина пуста';
nameBasket.appendChild(p);
//Добавляем элементы в корзину
function puch(event) {
  //находим нажатый элемент
  for (let i = 0; i < product.length; i++) {
    //если id ссылки равно перебору
    if (event.path[0].id == i) {
      //добавляем элемент
      productBasket.push(product[i]);
      creatingBasket(product[i].name, product[i].shortDescription, product[i].cost + ' RUB');
    }
  }
  //вызываем функцию для вазвращения актуальной карзины
  obnovlenieBasket();
}
//Актуальная карзина------------------------------------
function obnovlenieBasket() {
  сonclusionBasket();
  //если в корзине чтото есть то убираем "пустая корзина"
  if (productBasket.length == 1) {
    nameBasket.removeChild(p);
  }
}
//подщет суммы товаров
function сonclusionBasket() {
  let countPrice = 0;
  for (var i = 0; i < productBasket.length; i++) {
    countPrice += productBasket[i].cost;
  }
  let p = document.createElement('p');
  p.innerHTML = 'В корзине: ' + productBasket.length + ' товар(ов) на сумму ' + countPrice + ' рублей.';
  textId.appendChild(p);
  //console.log(textId.childNodes.length);
  //если в textId больне 1 элемента удали первый элемент
  //Доступный для чтения аттрибут Node.childNodes возвращает коллекцию дочерних элементов данного элемента.
  if (textId.childNodes.length > 1) {
    textId.removeChild(textId.firstChild);
  }
}
