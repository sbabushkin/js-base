	function b() {
		var a = -1,
			result = [];
		do {
			a++;
			if (a === 0) {
				result.push(a + "- это ноль");


			} else if (a % 2 === 0) {
				result.push(a + "- это четное число");

			} else {

				result.push(a + "- это нечетное число");
			}

		} while (a < 10);
		alert(result);
	}
