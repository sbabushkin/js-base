function myProcessor() {
  function showBig(event) {
    const bigElement = document.getElementById('bigPicture');
    const element = event.target;
    const src = element.getAttribute('data-big-src');
    const pic = document.createElement('img');
    pic.id = 'bigPic';
    pic.src = src;
    pic.onload = function () {
      bigElement.innerHTML = '';
      bigElement.appendChild(pic);
    }
    pic.onerror = function () {
      bigElement.innerHTML = '<h3>Picture is not!!!</h3>';
    }
    // element.removeEventListener('click', showBig);
  }

  const images = document.getElementsByTagName('img');
  for (let i = 0; i < images.length; i++) {
    const element = images[i];
    element.addEventListener('click', showBig);
  }
  
}

function clickSide(side) {
  const images = document.getElementsByTagName('img');
  const bigElement = document.getElementById('bigPicture');
  let bigPhoto = document.getElementById('bigPic');
  
  for (let i = 0; i < images.length; i++) {
    let srcBigPhoto = images[i].getAttribute('data-big-src');
    if (bigPhoto.src.indexOf(srcBigPhoto) != -1) {
      srcBigPhoto = images[i+side].getAttribute('data-big-src');
      if (srcBigPhoto.indexOf('.jpg') != -1) {
        bigPhoto.src = srcBigPhoto;
        return;
      } else {
        bigPhoto.src = bigPhoto.src;
      }
    }
  }
}

function myClick() {
  console.log('click');
}

window.onload = myProcessor;