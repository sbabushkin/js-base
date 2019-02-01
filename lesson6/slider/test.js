var btn_prev = document.querySelector('#gallery .button .prev');
var btn_next = document.querySelector('#gallery .button .next');

var images = document.querySelectorAll('#gallery .photos img');
var i = 0;

btn_prev.onclick = function () {
    images[i].style.display = 'none';
    i = i - 1; /* i++ */

    if (i < 0) {
        i = images.length - 1;
    }

    images[i].style.display = 'block';
}

btn_next.onclick = function () {
    images[i].style.display = 'none';
    i = i + 1; /* i++ */

    if (i >= images.length) {
        i = 0;
    }

    images[i].style.display = 'block';
}
