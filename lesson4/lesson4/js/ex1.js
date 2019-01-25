function a() {
	let max = 999;
	let numeric = {
		number: prompt('Введите число от 0 до 999'),
		hundreds: 0,
		tens: 0,
		units: 0,
	};
	if (numeric.number <= 9) {
		numeric.units = numeric.number;
	} else if (numeric.number <= max) {
		numeric.hundreds = Math.floor(numeric.number / 100 % 10);
		numeric.tens = Math.floor(numeric.number / 10 % 10);
		numeric.units = Math.floor(numeric.number % 10);
	} else {
		numeric.number = 0;
		alert('Вы ввели число за диапазоном 0 - 999');
	}
	console.log(numeric);
}
