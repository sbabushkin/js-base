function addBigImg(imgSrc) {
    var img = new Image();
    img.src = imgSrc;
    img.onload = function () {
        alert('картинка существует')
    };
    img.onerror = function () {
        alert('картинка не существует')
    };

    document.getElementById("bigImg").innerHTML = '<img src="' + imgSrc + '" alt="">';




}

function addProduct(Id) {

    let l = document.getElementById(Id).innerHTML.length;
    let n = document.getElementById(Id).innerHTML[l - 6];
    document.getElementById('basket').innerHTML += '<p>Товар' + document.getElementById(Id).innerHTML[5] + ' ' + n + '00руб' + '</p>'

    let sum = parseInt(document.getElementById("sum").innerHTML);
    sum += parseInt(n) * 100;
    document.getElementById("sum").innerHTML = sum;

}
