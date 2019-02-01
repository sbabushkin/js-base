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
        img.src = './'+src;
        img.onload = function() {
            const bigElement = document.getElementById('bigPicture');
            bigElement.innerHTML = '<img height="200" src="./' + src + '"/>';
            }
        img.onerror = function(){
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





function myClick() {
    console.log('click');
}

window.onload = myProcessor;
