function myProcessor() {
  function showBig(event) {
    const element = event.target; //img со всеми атрибутами
    const src = element.getAttribute('data-big-src'); //src большой картинки
    const notImg = "this.src = './img/big/standart.jpg'";//Если нет картинки то подставить этот src
    const bigElement = document.getElementById('bigPicture'); //div id="bigPicture" с его содержимым
    bigElement.innerHTML = '<img height="200" src="./' + src + '" onerror="' + notImg + '" />';
  }
  const images = document.getElementsByTagName('img'); //достали кортеж картинок
  for (let i = 0; i < images.length; i++) {
    const element = images[i];
    element.addEventListener('click', showBig); //добавили к каждой картинке событие 
  }
}

function myClick() {
  //console.log('click');
}
window.onload = myProcessor;
