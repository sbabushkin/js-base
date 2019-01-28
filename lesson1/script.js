/**
 * Задание 1
 * Задать температуру в градусах по Цельсию. Вывести в alert соответствующую температуру в градусах по Фаренгейту.
 * Подсказка: расчёт идёт по формуле: Tf = (9 / 5) * Tc + 32,
 * где Tf –температура по Фаренгейту, Tc – температура по Цельсию
 */

function converter() { /* eslint no-unused-vars: 0 */
  const tempCelcium = prompt('Введите температуру в Цельсиях, 36.6');
  // Вызываем alert и повторение ввода в случае, если не было нажато 'Отмена'
  if (isNaN(tempCelcium)) {
    alert('Нужно ввести число');
  } else if (!(tempCelcium === null)) {
    alert((9 / 5) * tempCelcium + 32);
    converter();
  }
}


/**
 * Задание 2
 * Объявить две переменные: admin и name.
 * Записать в name строку "Василий";
 * Скопировать значение из name в admin. Вывести admin (должно вывести «Василий»).
 */
function showAdmin() {
  const name = 'Василий';
  const admin = name;
  alert(admin);
}

function setStyle(element) { /* eslint no-param-reassign: 0 */
  element.style.padding = '5px';
  element.style.border = '2px solid gray';
  element.style.borderRadius = '5px';
  element.style.marginTop = '10px';
}

/**
 * Задание 3
 * Чему будет равно JS-выражение 1000 + "108"
 */
function ex3() {
  const element = document.getElementById('answer3');
  element.innerHTML = 'JS-выражение 1000 + "108" будет равняться  <b>"1000108"</b>. '
    + 'Это связано с тем, что JS приводит '
    + 'number 1000 к типу string, а для этого типа оператор "+" выполняет конкатенацию.';
  setStyle(element);
}

/**
 * Задание 4
 * Самостоятельно разобраться с атрибутами тега script (async и defer)
 */
function ex4() {
  const element = document.getElementById('answer4');
  element.innerHTML = '<p><b>async</b> - cкрипт выполняется полностью асинхронно. Браузер не останавливает обработку '
    + 'страницы, а спокойно работает дальше. Когда скрипт будет загружен – он выполнится.</p>'
    + '<p><b>defer</b> - cкрипт также выполняется асинхронно. Но есть отличия: defer гарантирует '
    + 'последовательное выполнение скриптов.</p>';
  setStyle(element);
}
