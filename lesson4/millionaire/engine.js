let game = {
	questions: [], // элемены массива text, variants, answer, sum

	init: function () { // начало новой игры
		if (questionBase && questionBase.low.length > 4 && questionBase.middle.length > 4 && questionBase.high.length > 4){
			this.questionGenerator();
		}
	},

	questionGenerator: function () { // генерация вопросов
		let arr_questions = Array();
		let arr_used = Array();
		let level = 'low';
		for (let k = 0; k < 3; k++){
			let j =	0;
			let i;
			do {
				i = Math.round(Math.random() * (questionBase[level].length-1)); // выбирает случайный вопрос по сложности
				if (!arr_used.some(function(elem){return elem === i? true : false;})){ // если такой вопрос еще не выбран
					arr_questions.push(questionBase[level][i]);
					arr_used.push(i); // запоминаем выбранный вопрос
					switch (arr_questions.length) {
						case 1:
							arr_questions[arr_questions.length-1].sum = 100;
							break;
						case 2:
							arr_questions[arr_questions.length-1].sum = 200;
							break;
						case 3:
							arr_questions[arr_questions.length-1].sum = 300;
							break;
						case 4:
							arr_questions[arr_questions.length-1].sum = 500;
							break;
						case 5:
							arr_questions[arr_questions.length-1].sum = 1000;
							break;
						case 6:
							arr_questions[arr_questions.length-1].sum = 2000;
							break;
						case 7:
							arr_questions[arr_questions.length-1].sum = 4000;
							break;
						case 8:
							arr_questions[arr_questions.length-1].sum = 8000;
							break;
						case 9:
							arr_questions[arr_questions.length-1].sum = 16000;
							break;
						case 10:
							arr_questions[arr_questions.length-1].sum = 32000;
							break;
						case 11:
							arr_questions[arr_questions.length-1].sum = 64000;
							break;
						case 12:
							arr_questions[arr_questions.length-1].sum = 12500;
							break;
						case 13:
							arr_questions[arr_questions.length-1].sum = 250000;
							break;
						case 14:
							arr_questions[arr_questions.length-1].sum = 500000;
							break;
						case 15:
							arr_questions[arr_questions.length-1].sum = 1000000;
							break;
					};
					j++;
				}
			} while (j < 5);
			level = k !== 1 ? 'middle':'high';
			arr_used = [];
		}
		this.questions=arr_questions;
	}
};

window.onload = function () {
	game.init();
	console.log(game.questions);

	let body = document.querySelector('body');

	let wrapper = document.createElement('div');
	wrapper.setAttribute('class', 'wrapper');
	body.appendChild(wrapper);

	let main = document.createElement('div');
	main.setAttribute('class', 'main');
	wrapper.appendChild(main);

	let sumTable = document.createElement('table');
	sumTable.setAttribute('class', 'sumTable');
	for (let i = 15; i > 0; i--){
		let tr = document.createElement('tr');
		tr.setAttribute('class', 'tr'+(i));

		let td = document.createElement('td');
		td.textContent = i;
		tr.appendChild(td);

		td = document.createElement('td');
		td.textContent = game.questions[i-1].sum;
		tr.appendChild(td);

		sumTable.appendChild(tr);
	}
	main.appendChild(sumTable);

	let questBoard = document.createElement('div');
	questBoard.setAttribute('class', 'questBoard');
};