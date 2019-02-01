function init(){
	var images = document.getElementsByTagName("img");
	for (var i = 0; i < images.length; i++) {
		images[i].onclick = changeBigPicture;
	}
}
function changeBigPicture(eventObj){
	var appDiv = document.getElementById("big_picture");
	appDiv.innerHTML = "";	
	var eventElement = eventObj.target;
	var imageNameParts = eventElement.id.split("_");
	var src = "img/" + imageNameParts[1] + ".jpg";
	var imageDomElement = document.createElement("img");
	
	imageDomElement.src = src;
	appDiv.appendChild(imageDomElement);
}

window.onload = init;
var slideIndex = 1;
showSlides(slideIndex);

/* Функция увеличивает индекс на 1, показывает следующй слайд*/
function plusSlide() {
    showSlides(slideIndex += 1);
}

/* Функция уменьшяет индекс на 1, показывает предыдущий слайд*/
function minusSlide() {
    showSlides(slideIndex -= 1);  
}

/* Устанавливает текущий слайд */
function currentSlide(n) {
    showSlides(slideIndex = n);
}

/* Основная функция слайдера */
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("item");
    var dots = document.getElementsByClassName("slider-dots_item");
    if (n > slides.length) {
      slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
 
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}
