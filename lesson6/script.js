
function myProcessor() {
  function showBig(event) {
    const element = event.target;
    const src = element.getAttribute('data-big-src');
    const bigElement = document.getElementById('bigPicture');
    bigElement.innerHTML = '<img height="200" src="./' + src + '" onerror="alert(\'Ошибка загрузки картинки\')"/>';
      //вешаем обработчик событий onerror на невозможность загрузить большую картинку
    // element.removeEventListener('click', showBig);
  }

  const images = document.getElementsByTagName('img');
  for (let i = 0; i < images.length; i++) {
    const element = images[i];
    element.addEventListener('click', showBig);
  }
}

function myClick() {
  console.log('click');
}

window.onload = myProcessor;
    //проверка на существование по src
/*
function sss() {
    const images = document.getElementsByTagName('img');
    let pictSrc = [];
    for(let z = 0; z<images.length;z++) {
        pictSrc.push(images[z].src)
    }

    for(let q = 0; q<images.length;q++) {
        pictSrc.push(images[q].dataset.big.src)
    }
    console.log(pictSrc);
    
    for(let i = 0; i < pictSrc.length; i++) {
      pictSrc[i] ? console.log("Картинка существует"): console.log("Картинка не существует");
    }
}
sss();
*/