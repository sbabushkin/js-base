window.onload = function () {
    let image = document.getElementsByTagName('img');
    for (let i = 0; i < image.length; i++) {
        image[i].onclick = addToBascket;
    }
};

function addToBascket(e) {
    let appDiv = document.getElementById('bigPicture');
    appDiv.innerHTML = '';
    let eventElement = event.target;
    console.log(eventElement);

    let imageNameParts = eventElement.id.split('_');
    let src = './img/big/' + imageNameParts[1] + '.jpg';
    let imageDomElement = document.createElement('img');
    imageDomElement.src = src;
    imageDomElement.onload = function () {alert};
    imageDomElement.onerror = function () {alert};
    appDiv.appendChild(imageDomElement);
}