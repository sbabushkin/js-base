let game = {
	questionNumber: 0, // номер текущего вопроса
	questions: [], // элемены массива object {text, variants, answer, sum}

	init: function () { // начало новой игры
		if (questionBase && questionBase.low.length > 4 && questionBase.middle.length > 4 && questionBase.high.length > 4){
			this.questionGenerator(); // генерируется массив с вопросами
			this.showQuestion(); // показывается первый вопрос
			let variant = document.querySelectorAll('.main__questVar'); //назначаем события на кнопки ответов
			for (let j = 0; j<4; j++){
				variant[j].addEventListener('click', function (event) {
					let answer = this.textContent.substring(3); // тут this будет ссылаться на event, а не на game
					game.checkAnswer(answer)});
			}
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
	},

	showQuestion: function () { // показывает новый вопрос в интерфейсе
		let questBoard = document.querySelector('.main-questBoard__question'); // добавляем воппрос
		questBoard.textContent = this.questions[this.questionNumber].text;

		let variant = document.querySelectorAll('.main__questVar'); // добавляем ответы
		for (let j = 0; j<variant.length; j++){ // если уже есть варианты ответов, удаляем их
			if (variant[j].hasChildNodes()){
				for (let i=0; i < variant[j].childNodes.length; i++){
					variant[j].removeChild(variant[j].childNodes[i]);
				}
			}
		}

		let arr_i = [0,1,2,3]; // ответы добавляются в рандомном порядке
		let arr_variant = ['A', 'B', 'C', 'D'];
		for (let j = 0; j<4; j++){
			arr_i.sort(function(a,b){return Math.random()-0.5});
			let p = document.createElement('p');
			p.textContent = arr_variant[j] + '. ' +this.questions[this.questionNumber].variant[arr_i[0]];
			variant[j].appendChild(p);
			arr_i.shift();
		}
	},

	checkAnswer: function (answer) {
		if (answer === this.questions[this.questionNumber].answer){ // если ответ верный
			this.questionNumber++; //переходим к следующему вопросу
			this.showQuestion(); // показываем следующий вопрос
		}
	}
};

window.onload = function () {
	let btnStart = document.querySelector('.main__btnStart');
	btnStart.addEventListener('click', function() {game.init()});  // назначаем событие на кнопку начала игры

};