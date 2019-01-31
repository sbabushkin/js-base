window.onload = function (){
    smallImage();
    Img();
};

function smallImage() {
    let smallImg = document.querySelector('.smallImg');
    for (num = 1; num <= 5; num++) {
        let img = document.createElement('img');
        smallImg.appendChild(img);
        img.classList.add('image');
        img.setAttribute('src', 'img/small/' + num + '.jpg');
    }
}


function Img() {
    let big = document.getElementsByClassName('image');
    for (i = 0; i < big.length; i++) {
        big[i].onclick = changePicture;
    }


    function changePicture(event) {
        let bigImg = document.getElementById('Image');
        bigImg.innerHTML = "";
        let smallSrc = event.target.getAttribute('src');
        let bigCreate = document.createElement('img');
        bigCreate.classList.add('bigCreate');
        bigCreate.src = smallSrc.replace('small', 'big');
        bigImg.appendChild(bigCreate);

    }

}
