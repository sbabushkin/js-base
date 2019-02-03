//задание 5
function d() {
	function multiplication(x, y) {
		return x * y;
	}

	function division(x, y) {
		return x / y;
	}

	function residual(x, y) {
		return x - y;
	}

	function summa(x, y) {
		return x + y;
	}

	var x = prompt("Введи первое число:");
	x = parseInt(x);
	if (isNaN(x)) {
		alert('введи число');
	} else {
		var y = prompt("Введи второе число:");
		y = parseInt(y);

		if (isNaN(y)) {
			alert('введи число');
		} else {
			switch (prompt("Введи одну из операций( * , / , + , - ) :")) {
				case "*":
					var M = multiplication(x, y);
					alert(x + '*' + y + '=' + M);
					break;
				case "/":
					var D = division(x, y);
					alert(x + '/' + y + '=' + D);
					break;
				case "-":
					var R = residual(x, y);
					alert(x + '-' + y + '=' + R);
					break;
				case "+":
					var S = summa(x, y);
					alert(x + '+' + y + '=' + S);
					break;
				default:
					alert('Вы что-то ввели неправильно');
					break;
			}
		}
	}
}
