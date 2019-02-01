function myProcessor() {
  function showBig(event) {
    const element = event.target; //img со всеми атрибутами
    const src = element.getAttribute('data-big-src'); //src большой картинки
    const notImg = "this.src = './img/big/standart.jpg'"; //Если нет картинки то подставить этот src
    const bigElement = document.getElementById('bigPicture'); //div id="bigPicture" с его содержимым
    bigElement.innerHTML = '<img height="200" id="imgBig" src="./' + src + '" onerror="' + notImg + '" />';
  }
  const images = document.getElementsByTagName('img'); //достали кортеж картинок
  for (let i = 0; i < images.length; i++) {
    const element = images[i];
    element.addEventListener('click', showBig); //добавили к каждой картинке событие 
  }
//Дастаем сылки
const controlLeft = document.getElementById("left");
const controlRight = document.getElementById("right");
const bigElement = document.getElementById('bigPicture');
  
controlLeft.onclick = function () {
  if (bigElement.children.length) {
    switch (imgBig.src.slice(-6)){
      case '1.jpeg': 
        imgBig.src = './img/big/3.jpg';
        break;
        case '2.jpeg':
        imgBig.src = './img/big/1.jpeg';
        break;
        case '/3.jpg': 
        imgBig.src = './img/big/2.jpeg';
        break;
    }
  } else {
    console.log('нет картинки');
  }
};
controlRight.onclick = function () {
  if (bigElement.children.length) {
    switch (imgBig.src.slice(-6)){
      case '1.jpeg': 
        imgBig.src = './img/big/2.jpeg';
        break;
        case '2.jpeg':
        imgBig.src = './img/big/3.jpg';
        break;
        case '/3.jpg': 
        imgBig.src = './img/big/1.jpeg';
        break;
    }
    
  } else {
    console.log('нет картинки');
  }
}
}
function myClick() {
  //console.log('click');
}
window.onload = myProcessor;
