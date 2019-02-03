//задание 3
function b() {
	var a = prompt("Введи первое число:");
	a = parseInt(a);
	var b = prompt("Введи второе число:");
	b = parseInt(b);

	if (a >= 0 && b >= 0) {
		alert(a - b);
	} else if (a < 0 && b < 0) {
		alert(a * b);
	} else if ((a >= 0 && b < 0) || (a < 0 && b >= 0)) {
		alert(a + b);
	} else {
		alert("Необходимо ввести числа");
	}
}
