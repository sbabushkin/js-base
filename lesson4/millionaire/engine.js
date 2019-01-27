/*структура:
game = {
	--- свойства ---
	hints {}				// подсказки
		hall				// доступность помощи зала true/false
		fifty				// доступность 50/50 true/false
		friend				// доступность звонок другу true/false
	questionNumber 	 		// номер текущего вопроса
	questions		 		// массив вопросов для текущей викторины элемены массива object {text, variants, answer, sum}
	varListener {}			// добавляет/удаляет обработчик событий на кнопки с вариантами ответов параметры: add, remove
		add ()					//добавляет обработчики событий на кнопки с вариантами ответов
		remove ()				//удаляет обработчики событий с кнопок с вариантами ответов
		varListenerHandler ()	//обработчик событий
	user {}					// данные игрока
		name					// имя
		score					// очки за текущий раунд
		totalMem				// запоминает очки с предыдущих раундов

	--- методы ---
	checkAnswer (answer) 	// проверяет правильность выбранного ответа параметры берутся от ивента
	fail ()					// проигрыш
	init			 		// начало новой игры
	questionGenerator ()	// генерация вопросов для текущей викторины
	message (parametr)		// выводит сообщение с уведомлением параметры: win, fail, getName, nofire1, nofire2
	reload ()				// перезагрузка игры
	showQuestion ()			// показывает новый вопрос в интерфейсе
	sumTable (clean)		// показывает сумму текущего вопроса параметр clean true/false - чистая таблица при перезагрузке игры
	varListenerHandler ()	// обработчик событий для varListener
	win ()					// победа или забрали сумму выводим сообщение
 }

 */

let game = {
	hints: {  // подсказки
		hall: true,
		fifty: true,
		friend: true
	},

	questionNumber: 0, // номер текущего вопроса

	questions: [], // элемены массива object {text, variants, answer, sum}

	varListener: { //добавляет/удаляет обработчики событий на кнопки с вариантами ответов
		add: function () {//добавляет обработчики событий на кнопки с вариантами ответов
			let variant = document.querySelectorAll('.main__questVar'); //назначаем события на кнопки ответов
			for (let j = 0; j < 4; j++) {
				variant[j].setAttribute('class', 'main__questVar main__questVar_bgBlue main__questVar_clickable'); // добавляем свойство cursor:
				// pointer и background
				variant[j].addEventListener('click', game.varListener.varListenerHandler);
			}
		},

		remove: function () {//удаляет обработчики событий с кнопок с вариантами ответов
			let variant = document.querySelectorAll('.main__questVar'); //назначаем события на кнопки ответов
			for (let j = 0; j < 4; j++) {
				variant[j].setAttribute('class', 'main__questVar main__questVar_bgBlue');
				variant[j].removeEventListener('click', game.varListener.varListenerHandler);
			}
		},

		varListenerHandler: function () { //обработчик событий
			this.setAttribute('class', 'main__questVar main__questVar_bgYellow main__questVar_clickable'); //меняем бакграунд выбранного ответа
			let mod = true;
			let timer = setTimeout(function () { // таймер для задержки проверки ответа для анимации
				let variant = document.querySelectorAll('.main__questVar'); //назначаем события на кнопки ответов
				for (let j = 0; j < 4; j++) {
					if (variant[j].textContent.substring(3) === game.questions[game.questionNumber].answer){ // анимация верного ответа
						let variantClass = variant[j].getAttribute('class'); // запоминаем предыдущий класс
						variant[j].setAttribute('class', 'main__questVar main__questVar_bgGreen main__questVar_clickable'); //меняем бакграунд
						// выбранного
						// ответа
						let timer2 = setInterval(function (){
							if (mod) {
								variant[j].setAttribute('class', variantClass);
								mod = false;
							} else {
								variant[j].setAttribute('class', 'main__questVar main__questVar_bgGreen main__questVar_clickable');
								mod = true;
							}
						}, 500, mod);
						let timer2Stop = setInterval(function() {clearInterval(timer2)}, 1000);
					}
				}
			}, 1500);
			let thisVar = this;
			timer = setTimeout (function () {
				game.checkAnswer(thisVar.textContent.substring(3)); // здесь thisVar ссылается на ивент обработчика событий 'click'
			}, 3000);
		},

	},

	user: {  // данные игрока
		name: '',
		score: 0,
		totalMem: 0
	},

	checkAnswer: function (answer) { // проверяем правильность выбранного ответа
		if (answer === this.questions[this.questionNumber].answer){ // если ответ верный
			if (this.questions[this.questionNumber].sum > this.user.score) { // увеличение счетчика максимальной суммы
				this.user.score = this.questions[this.questionNumber].sum;
				document.querySelector('.user__score').childNodes[0].textContent = 'Макс. счет: ' + this.user.score + ' руб';
			}
			document.querySelector('.user__total').childNodes[0].textContent = 'Всего: ' + (this.user.totalMem + this.questions[this.questionNumber].sum) + ' руб'; // увеличение счетчика общей суммы
			if (this.questionNumber++ === 14){ //переходим к следующему вопросу и проверяем  его номер
				this.win(); // победа
			} else {
				if (this.questionNumber === 5) this.message('nofire1');
				if (this.questionNumber === 10) this.message('nofire2');
				this.showQuestion(); // показываем следующий вопрос
			}
		} else {
			this.fail();
		}
		this.sumTable(false); // обновляем таблицу выйгрыша
	},

	fail: function () { // проигрыш
		this.message('fail')
	},

	init: function () { // начало новой игры
		this.questions = []; // очищаем массив вопросов. если он не пуст
		if (questionBase && questionBase.low.length > 4 && questionBase.middle.length > 4 && questionBase.high.length > 4){
			this.questionNumber = 0;  // сбрасываем счетчик вопросов
			this.questionGenerator(); // генерируется массив с вопросами
			this.showQuestion(); // показывается первый вопрос
			this.sumTable(false); // обновляем таблицу выйгрыша
			this.varListener.add(); // добавляет обработчик событий на кнопки с вариантами ответов
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
				if (!arr_used.some(function(elem){return elem === i;})){ // если такой вопрос еще не выбран
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
							arr_questions[arr_questions.length-1].sum = 125000;
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
					}
					j++;
				}
			} while (j < 5);
			level = k !== 1 ? 'middle':'high';
			arr_used = [];
		}
		this.questions=arr_questions;
	},

	message: function(parametr) { //выводит сообщение с уведомлением параметры: win, fail, getName
		let main = document.querySelector('.main');
		let div_messageBlock = document.createElement('div');
		div_messageBlock.setAttribute('class', 'main__message-block');
		let div = document.createElement('div');
		div.setAttribute('class', 'main__message');
		let p = document.createElement('p'); // текст сообщения
		p.setAttribute('class', 'main__message-p');
		let mess;
		switch (parametr) {
			case 'win':
				mess = 'Поздравляем, вы выйграли </br></br></br><span class="span2">'+ this.questions[this.questionNumber-1].sum + ' руб.</span>';
				this.user.totalMem += this.questions[this.questionNumber-1].sum;
				break;
			case 'nofire1':
				mess = 'Несгораеммая сумма.</br></br></br><span class="span2">1 000 руб.</span>';
				break;
			case 'nofire2':
				mess = 'Несгораеммая сумма.</br></br></br><span class="span2">32 000 руб.</span>';
				break;
			case 'fail':
				if (this.questionNumber-1 < 4) {
					mess = 'Вы проиграли. Ваш выйгрыш</br></br></br><span class="span2">0 руб.</span>';
				} else if (this.questionNumber-1 < 9) {
					mess = 'Вы проиграли. Ваш выйгрыш</br></br></br><span class="span2">1 000 руб.</span>';
					this.user.totalMem += 1000;
				} else {
					mess = 'Вы проиграли. Ваш выйгрыш</br></br></br><span class="span2">32 000 руб.</span>';
					this.user.totalMem += 32000;
				}
				break;
			case 'getName':
				mess = 'Введите Ваше имя.</br><span class="span1">(Используйте английские буквы и цифры, минимум три символа.)</span>';
				break;
		}
		p.innerHTML = mess;
		div.appendChild(p);
		if (parametr === 'getName'){
			let input = document.createElement('input'); // создае поле для ввода name
			input.setAttribute('type', 'text');
			input.setAttribute('maxlength', 20);
			input.setAttribute('class', 'main__message-input');
			input.addEventListener('input', function(){
				if (!this.value.match(/^[a-zA-Z0-9а-яА-Я]{0,20}$/)){ // ограничение на вводимые символы
					this.setAttribute('class', 'main__message-input main__message-input_fail');
					this.value = this.value.substr(0, this.value.length-1); // удаляем последний введенный символ
					let thisInput = this;
					let timer = setTimeout(function () { // анимация неверно использованных символов
						thisInput.setAttribute('class', 'main__message-input');
					}, 500);
				} else {
					this.setAttribute('class', 'main__message-input');
				}
			});
			div.appendChild(input);
		}
		let btn = document.createElement('button');
		btn.setAttribute('class', 'main__message-button');
		btn.textContent = 'OK';
		btn.addEventListener('click', function () { //нажатие на кнопку ОК
			if (parametr === 'getName'){ // запоминаем name, если нужно
				let input = document.querySelector('.main__message-input');
				if (input.value.length >2) { //имя минимум 3 символа
					game.user.name = input.value;
					document.querySelector('.user__name').childNodes[0].textContent = game.user.name;
					game.init(); // создаем новую викторину
				} else {
					input.setAttribute('class', 'main__message-input main__message-input_fail');
					let timer = setTimeout(function () { // анимация неверно использованных символов
						input.setAttribute('class', 'main__message-input');
					}, 500);
					return;
				}
			} else if (!(parametr === 'nofire1' || parametr === 'nofire2')) {
				game.reload(); // перезапуск игры если win/fail
				document.querySelector('.user__total').childNodes[0].textContent = 'Всего: ' + game.user.totalMem + ' руб'; // изменить счетчик общей
				// суммы
			}

			let div_messageBlock = document.querySelector('.main__message-block'); //удаляем всплывающее сообщение
			if (div_messageBlock) {
				div_messageBlock.parentNode.removeChild(div_messageBlock);
			}
		});
		div.appendChild(btn);
		div_messageBlock.appendChild(div);
		main.appendChild(div_messageBlock);
		if(document.querySelector('.main__message-input')){
			document.querySelector('.main__message-input').focus();
		}
	},

	reload: function () { //перезагрузка игры
		let variant = document.querySelectorAll('.main__questVar'); // удаляем ответы
		for (let j = 0; j<variant.length; j++){
			if (variant[j].hasChildNodes()){
				for (let i=0; i < variant[j].childNodes.length; i++){
					variant[j].removeChild(variant[j].childNodes[i]);
				}
			}
		}
		let questBoard = document.querySelector('.main-questBoard__question'); // возвращаем приветственное сообщение
		questBoard.textContent = 'Нажми на кнопку "Кто хочет стать миллионером?" чтобы начать игру.';

		this.sumTable(true); // обновляем таблицу выйгрыша
		this.varListener.remove(); // удаляем обработчик событий с кнопок с вариантами ответов
	},

	showQuestion: function () { // показывает новый вопрос в интерфейсе
		let questBoard = document.querySelector('.main-questBoard__question'); // добавляем вопрос
		questBoard.textContent = this.questions[this.questionNumber].text;

		let variant = document.querySelectorAll('.main__questVar'); // добавляем ответы
		for (let j = 0; j<variant.length; j++){ // если уже есть варианты ответов, удаляем их
			if (variant[j].hasChildNodes()){
				variant[j].setAttribute('class', 'main__questVar main__questVar_bgBlue main__questVar_clickable');//назначаем бакграунд для кнопок с ответами
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

	sumTable: function (clean) { // показывает сумму текущего вопроса
		let sumTable = document.querySelector('.main__sumTable');
		let nofire;
		for (let i=14; i > -1; i--){
			switch (i){ // стили для несгораемой суммы
				case 0:
				case 5:
				case 10:
					nofire = ' main-sumTable__nofire';
					break;
				default:
					nofire ='';
					break;
			}
			if (sumTable.childNodes[1].childNodes[2*i]){ // если такой нод существует
				if (clean) {
					sumTable.childNodes[1].childNodes[2*i].setAttribute('class', '' + nofire); // очистить таблицу при перезагрузке игры
				} else {
					if (14-i < this.questionNumber){
						sumTable.childNodes[1].childNodes[2*i].setAttribute('class', 'main-sumTable__win' + nofire); // отвеченные вопросы
					} else if (i === 14-this.questionNumber) { // текущий вопрос
						sumTable.childNodes[1].childNodes[2*i].setAttribute('class', 'main-sumTable__now' + nofire); // текущий вопрос
					} else {
						sumTable.childNodes[1].childNodes[2*i].setAttribute('class', '' + nofire); // неотвеченные вопросы
					}
				}
			}
		}
	},

	win: function () { // победа или забрали сумму выводим сообщение
		this.message('win');
	},


};

window.onload = function () {
	let btnStart = document.querySelector('.main-show__control-btnStart');
	btnStart.addEventListener('click', function() {
		if (game.user.name === '') { // запрашиваем имя игрока
			game.message('getName');
		} else {
			game.init(); // создаем новую викторину
		}
	});
};