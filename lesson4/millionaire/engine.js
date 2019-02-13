/*структура:
game = {
	--- свойства ---
	control {}				// кнопки
		startListener{}			// обработчик событий кнопки "Старт"
			handler ()				// обработчик событий
			state					// состояние кнопки начала игры 'start', 'takeMoney'
		varListener {}			// добавляет/удаляет обработчик событий на кнопки с вариантами ответов параметры: add, remove
			add ()					// добавляет обработчики событий на кнопки с вариантами ответов
			remove ()				// удаляет обработчики событий с кнопок с вариантами ответов
			handler ()				// обработчик событий
		hallListener{}			// обработчик событий кнопки "Помощь зала"
			handler ()				// обработчик событий
			on ()					// включает функцию
			off()					// выключает функцию
			state					// доступность помощи зала true/false
		friendListener{}		// обработчик событий кнопки "Помощь друга"
			handler ()				// обработчик событий
			on ()					// включает функцию
			off()					// выключает функцию
			state					// доступность звонок другу true/false
		fiftyListener{}			// обработчик событий кнопки "Помощь друга"
			handler ()				// обработчик событий
			on ()					// включает функцию
			off()					// выключает функцию
			state					// доступность 50/50 true/false
	message {}				// выводит сообщение с уведомлением
		clean ()				// очищает поле сообщений
		gameOver ()				// сообщение об окончании игры параметры 'fail' , 'win'
		getName ()				// сообщение на запрос имени игрока параметры 'friend', 'user'
		nofire ()				// сообщение о первой несгораемой сумме параметры 'first', 'second'
		welcome ()				// приветственное сообщение вначале каждого раунда
	questionNumber 	 		// номер текущего вопроса
	questions		 		// массив вопросов для текущей викторины элемены массива object {text, variants, answer, sum}
	user {}					// данные игрока
		name					// имя
		score					// очки за текущий раунд
		totalMem				// запоминает очки с предыдущих раундов

	--- методы ---
	checkAnswer (answer) 	// проверяет правильность выбранного ответа параметры берутся от ивента
	fail ()					// проигрыш
	init			 		// начало новой игры
	questionGenerator ()	// генерация вопросов для текущей викторины
	reload ()				// перезагрузка игры
	showQuestion ()			// показывает новый вопрос в интерфейсе
	sumTable (clean)		// показывает сумму текущего вопроса параметр clean true/false - чистая таблица при перезагрузке игры
	win ()					// победа или забрали сумму выводим сообщение
 }

 */

const game = {
	control: {  // кнопки
		startListener: { // обработчик событий кнопки "Старт"
			handler: () => { //обработчик событий
				if (game.control.startListener.state === 'start'){
					if (game.user.name === '') { // запрашиваем имя игрока
						game.message.getName('user');
					} else {
						game.init(); // создаем новую викторину
						game.control.startListener.state = 'takeMoney'; // заменяем кнопку 'старт' на кнопку 'забрать деньги'
						document.querySelector('.main-show__control-btnStart').textContent = 'Забрать выйгрыш';
					}
				} else if (game.control.startListener.state === 'takeMoney'){
					game.win();
					game.control.varListener.remove();
					game.control.fiftyListener.off();
					game.control.hallListener.off();
					game.control.friendListener.off();
				}
			},
			state: 'start', // состояние кнопки начала игры 'start', 'takeMoney'
		},

		varListener: { //добавляет/удаляет обработчики событий на кнопки с вариантами ответов
			add: () => { // добавляет обработчики событий на кнопки с вариантами ответов
				const variant = document.querySelectorAll('.main__questVar'); //назначаем события на кнопки ответов
				for (let j = 0; j < 4; j++) {
					variant[j].setAttribute('class', 'main__questVar main__questVar_bgBlue main__questVar_clickable'); // добавляем свойство cursor:
					// pointer и background
					variant[j].addEventListener('click', game.control.varListener.handler);
				}
			},

			remove: () => { // удаляет обработчики событий с кнопок с вариантами ответов
				const variant = document.querySelectorAll('.main__questVar'); //назначаем события на кнопки ответов
				for (let j = 0; j < 4; j++) {
					variant[j].setAttribute('class', 'main__questVar main__questVar_bgBlue');
					variant[j].removeEventListener('click', game.control.varListener.handler);
				}
			},

			handler: function() { // обработчик событий
				this.setAttribute('class', 'main__questVar main__questVar_bgYellow main__questVar_clickable'); //меняем бакграунд выбранного ответа
				let mod = true;
				let timer = setTimeout(() => { // таймер для задержки проверки ответа для анимации
					const variant = document.querySelectorAll('.main__questVar'); //назначаем события на кнопки ответов
					for (let j = 0; j < 4; j++) {
						if (variant[j].textContent.substring(3) === game.questions[game.questionNumber].answer){ // анимация верного ответа
							const variantClass = variant[j].getAttribute('class'); // запоминаем предыдущий класс
							variant[j].setAttribute('class', 'main__questVar main__questVar_bgGreen main__questVar_clickable'); //меняем бакграунд
							// выбранного
							// ответа
							const timer2 = setInterval(() => {
								if (mod) {
									variant[j].setAttribute('class', variantClass);
									mod = false;
								} else {
									variant[j].setAttribute('class', 'main__questVar main__questVar_bgGreen main__questVar_clickable');
									mod = true;
								}
							}, 500, mod);
							const timer2Stop = setInterval(() => {clearInterval(timer2)}, 1000);
						}
					}
				}, 1500);
				timer = setTimeout (() => {
					game.checkAnswer(this.textContent.substring(3)); // здесь thisVar ссылается на ивент обработчика событий 'click'
				}, 3000);
			},

		},

		hallListener: { // обработчик событий кнопки "Помощь зала"
			handler: () => { // обработчик событий

			},

			on: () => {
				game.control.hallListener.state = true;
				document.querySelector('.user__hint-hall').setAttribute('class', 'user__hint-hall user__hint-hall_no-used');
			},

			off: () => {
				game.control.hallListener.state = false;
				document.querySelector('.user__hint-hall').setAttribute('class', 'user__hint-hall user__hint-hall_used');
			},

			state: false, // доступность помощи зала true/false
		},

		friendListener: { // обработчик событий кнопки "Помощь друга"
			handler: () => {

			},

			on: () => {
				game.control.friendListener.state = true;
				document.querySelector('.user__hint-friend').setAttribute('class', 'user__hint-friend user__hint-friend_no-used');
			},

			off: () => {
				game.control.friendListener.state = false;
				document.querySelector('.user__hint-friend').setAttribute('class', 'user__hint-friend user__hint-friend_used');
			},

			state: false, // доступность звонок другу true/false
		},

		fiftyListener: { // обработчик событий кнопки "Помощь друга"
			handler: () => { // обработчик событий
				if (game.control.fiftyListener.state) {
					const variant = document.querySelectorAll('.main__questVar');
					const arr_i = [0,1,2,3]; // ответы добавляются в рандомном порядке
					let check = 0;
					do {
						arr_i.sort((a,b) => {return Math.random()-0.5});
						if (variant[arr_i[0]].childNodes[0].textContent.substring(3) !== game.questions[game.questionNumber].answer) {
							variant[arr_i[0]].removeChild(variant[arr_i[0]].childNodes[0]);
							variant[arr_i[0]].setAttribute('class', 'main__questVar main__questVar_bgBlue');
							variant[arr_i[0]].removeEventListener('click', game.control.varListener.handler);
							check++;
						}
						arr_i.shift();
					} while (check < 2);
					game.control.fiftyListener.off();
				}
			},

			on: () => {
				game.control.fiftyListener.state = true;
				document.querySelector('.user__hint-fifty').setAttribute('class', 'user__hint-fifty user__hint-fifty_no-used');
			},

			off: () => {
				game.control.fiftyListener.state = false;
				document.querySelector('.user__hint-fifty').setAttribute('class', 'user__hint-fifty user__hint-fifty_used');
			},

			state: false, // доступность 50/50 true/false
		}
	},

	message: {
		clean: () => { // очищает поле сообщений
			const main = document.querySelector('.main-show__control-message');
			while(main.childNodes.length){
				main.removeChild(main.childNodes[0]);
			}
		},

		gameOver: (parametr) => { // сообщение об окончании игры параметры 'fail' , 'win'
			game.message.clean();
			game.control.startListener.state = '';

			const main = document.querySelector('.main-show__control-message');

			const p = document.createElement('p'); // текст сообщения
			p.setAttribute('class', 'main-show-control-message__p');
			switch (parametr) {
				case 'win':
					if (game.questionNumber > 0){
						p.innerHTML = 'Поздравляем, вы выйграли </br></br></br><span class="span2">'+ game.questions[game.questionNumber-1].sum + ' руб.</span>';
						game.user.totalMem += game.questions[game.questionNumber-1].sum;
					} else {
						p.innerHTML = 'Поздравляем, вы выйграли </br></br><span class="span2">0 руб.</span>';
					}
					break;
				case 'fail':
					if (game.questionNumber-1 < 4) { // выйгрыш несгораемой суммы
						p.innerHTML = 'Вы проиграли. Ваш выйгрыш</br></br></br><span class="span2">0 руб.</span>';
					} else if (game.questionNumber-1 < 9) {
						p.innerHTML = 'Вы проиграли. Ваш выйгрыш</br></br></br><span class="span2">1 000 руб.</span>';
						game.user.totalMem += 1000;
					} else {
						p.innerHTML = 'Вы проиграли. Ваш выйгрыш</br></br></br><span class="span2">32 000 руб.</span>';
						game.user.totalMem += 32000;
					}
					break;
			}
			main.appendChild(p);

			const div = document.createElement('div'); // создаем блок с кнопками
			div.setAttribute('class', 'main-show-control-message__button-block');

			const btn = document.createElement('button'); // кнопка ОК
			btn.setAttribute('class', 'main-show-control-message__button');
			btn.textContent = 'OK';
			btn.addEventListener('click', () => { //нажатие на кнопку ОК
				game.reload(); // перезапуск игры
				document.querySelector('.user__total').childNodes[0].textContent = 'Всего: ' + game.user.totalMem + ' руб'; // изменить счетчик общей
				// суммы
				game.control.startListener.state = 'start'; // заменяем кнопку 'старт' на кнопку 'забрать деньги'
				document.querySelector('.main-show__control-btnStart').textContent = 'Начать игру';
			});
			div.appendChild(btn);
			main.appendChild(div);
		},

		getName: (parametr) => { // сообщение на запрос имени игрока
			game.message.clean();
			const main = document.querySelector('.main-show__control-message');
			const p = document.createElement('p'); // текст сообщения
			p.setAttribute('class', 'main-show-control-message__p');
			switch (parametr) {
				case 'friend':
					p.innerHTML = 'Кому будем звонить?.</br></br><span class="span1">(Используйте английские / русские буквы и цифры, минимум три' +
						' символа.)</span>';
					break;
				case 'user':
					p.innerHTML = 'Введите Ваше имя.</br></br><span class="span1">(Используйте английские / русские буквы и цифры, минимум три символа.)</span>';
					break;
			}
			main.appendChild(p);

			const input = document.createElement('input'); // создае поле для ввода name
			input.setAttribute('type', 'text');
			input.setAttribute('maxlength', 20);
			input.setAttribute('class', 'main-show-control-message__input');
			input.addEventListener('input', function(){
				if (!this.value.match(/^[a-zA-Z0-9а-яА-Я]{0,20}$/)){ // ограничение на вводимые символы
					this.setAttribute('class', 'main-show-control-message__input main-show-control-message__input_fail');
					this.value = this.value.substr(0, this.value.length-1); // удаляем последний введенный символ
					let timer = setTimeout(() => { // анимация неверно использованных символов
						this.setAttribute('class', 'main-show-control-message__input');
					}, 500);
				} else {
					this.setAttribute('class', 'main-show-control-message__input');
				}
			});
			main.appendChild(input);

			const div = document.createElement('div'); // создаем блок с кнопками
			div.setAttribute('class', 'main-show-control-message__button-block');

			let btn = document.createElement('button'); // кнопка ОК
			btn.setAttribute('class', 'main-show-control-message__button');
			btn.textContent = 'OK';
			btn.addEventListener('click', () => { //нажатие на кнопку ОК
				const input = document.querySelector('.main-show-control-message__input');
				if (input.value.length >2) { //имя минимум 3 символа
					game.user.name = input.value;
					document.querySelector('.user__name').childNodes[0].textContent = game.user.name;
					game.init(); // создаем новую викторину
				} else {
					input.setAttribute('class', 'main-show-control-message__input main-show-control-message__input_fail');
					const timer = setTimeout(() => { // анимация неверно использованных символов
						input.setAttribute('class', 'main-show-control-message__input');
					}, 500);
					input.focus(); // даем фокус на инпут и ставим каретку в конец
					input.selectionStart = input.value.length;
					input.selectionEnd = input.value.length;
					return; // мессадж очищать не нужно
				}
				game.message.clean(); // очищаем поле сообщений
				game.control.startListener.state = 'takeMoney'; // заменяем кнопку 'старт' на кнопку 'забрать деньги'
				document.querySelector('.main-show__control-btnStart').textContent = 'Забрать выйгрыш';
			});
			div.appendChild(btn);

			btn = document.createElement('button'); // кнопка отмена
			btn.setAttribute('class', 'main-show-control-message__button');
			btn.textContent = 'Отмена';
			btn.addEventListener('click', () => { //нажатие на кнопку Отмена
				game.message.clean(); // очищаем поле сообщений
				game.message.welcome('startGame');
			});
			div.appendChild(btn);
			main.appendChild(div);
			document.querySelector('.main-show-control-message__input').focus();
		},

		hall: () => {},

		nofire: (parametr) => { // сообщение о первой несгораемой сумме параметры 'first', 'second'
			game.message.clean();
			const main = document.querySelector('.main-show__control-message');

			const p = document.createElement('p'); // текст сообщения
			p.setAttribute('class', 'main-show-control-message__p');
			switch (parametr){
				case 'first':
					p.innerHTML = 'Несгораеммая сумма.</br></br></br><span class="span2">1 000 руб.</span>';
					break;
				case 'second':
					p.innerHTML = 'Несгораеммая сумма.</br></br></br><span class="span2">32 000 руб.</span>';
					break;
			}
			main.appendChild(p);

			const div = document.createElement('div');
			div.setAttribute('class', 'main-show-control-message__button-block');
			const btn = document.createElement('button');
			btn.setAttribute('class', 'main-show-control-message__button');
			btn.textContent = 'OK';
			btn.addEventListener('click', () => { //нажатие на кнопку ОК
				game.message.clean(); // очищаем поле сообщений
			});
			div.appendChild(btn);
			main.appendChild(div);
		},

		welcome: (parametr) => { // приветственное сообщение вначале каждого раунда
			game.message.clean();
			const main = document.querySelector('.main-show__control-message');

			const p = document.createElement('p'); // текст сообщения
			p.setAttribute('class', 'main-show-control-message__p');
			if (parametr === 'startGame'){
				p.innerHTML = 'Добро пожаловать на викторину </br></br><span>"Кто хочет стать миллионером?"</span></br></br>Если вы готовы, то начинаем!'
			} else if (parametr === 'newGame'){
				p.innerHTML = 'Попробуем еще раз? </br></br>Если вы готовы, то начинаем!';
			}
			main.appendChild(p);
		}
	},

	questionNumber: 0, // номер текущего вопроса

	questions: [], // элемены массива object {text, variants, answer, sum}

	user: {  // данные игрока
		name: '',
		score: 0,
		totalMem: 0
	},

	checkAnswer: (answer) => { // проверяем правильность выбранного ответа
		game.message.clean();
		if (answer === game.questions[game.questionNumber].answer){ // если ответ верный
			if (game.questions[game.questionNumber].sum > game.user.score) { // увеличение счетчика максимальной суммы
				game.user.score = game.questions[game.questionNumber].sum;
				document.querySelector('.user__score').childNodes[0].textContent = 'Макс. счет: ' + game.user.score + ' руб';
			}
			document.querySelector('.user__total').childNodes[0].textContent = 'Всего: ' + (game.user.totalMem + game.questions[game.questionNumber].sum) + ' руб'; // увеличение счетчика общей суммы
			if (game.questionNumber++ === 14){ //переходим к следующему вопросу и проверяем  его номер
				game.win(); // победа
			} else {
				if (game.questionNumber === 5) game.message.nofire('first');
				if (game.questionNumber === 10) game.message.nofire('second');
				game.showQuestion(); // показываем следующий вопрос
			}
		} else {
			game.fail();
		}
		game.sumTable(false); // обновляем таблицу выйгрыша
	},

	fail: () => { // проигрыш
		game.message.gameOver('fail')
	},

	init: () => { // начало новой игры
		game.questions = []; // очищаем массив вопросов. если он не пуст
		if (questionBase && questionBase.low.length > 4 && questionBase.middle.length > 4 && questionBase.high.length > 4){
			game.questionNumber = 0;  // сбрасываем счетчик вопросов
			game.questionGenerator(); // генерируется массив с вопросами
			game.showQuestion(); // показывается первый вопрос
			game.sumTable(false); // обновляем таблицу выйгрыша
			game.control.varListener.add(); // добавляет обработчик событий на кнопки с вариантами ответов
			game.message.clean(); // очищает поле сообщений
			game.control.fiftyListener.on();
			game.control.hallListener.on();
			game.control.friendListener.on();
		}
	},

	questionGenerator: () => { // генерация вопросов
		const arr_questions = Array();
		let arr_used = Array();
		let level = 'low';
		for (let k = 0; k < 3; k++){
			let j =	0;
			let i;
			do {
				i = Math.round(Math.random() * (questionBase[level].length-1)); // выбирает случайный вопрос по сложности
				if (!arr_used.some((elem) => {return elem === i;})){ // если такой вопрос еще не выбран
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
		game.questions=arr_questions;
	},

	reload: () => { //перезагрузка игры
		document.querySelector('.main-questBoard__question').textContent = ''; // удаляем вопрос
		const variant = document.querySelectorAll('.main__questVar'); // удаляем ответы
		for (let j = 0; j<variant.length; j++){
			if (variant[j].hasChildNodes()){
				for (let i=0; i < variant[j].childNodes.length; i++){
					variant[j].removeChild(variant[j].childNodes[i]);
				}
			}
		}

		game.message.welcome('newGame');

		game.sumTable(true); // обновляем таблицу выйгрыша
		game.control.varListener.remove(); // удаляем обработчик событий с кнопок с вариантами ответов
	},

	showQuestion: () => { // показывает новый вопрос в интерфейсе
		const questBoard = document.querySelector('.main-questBoard__question'); // добавляем вопрос
		questBoard.textContent = game.questions[game.questionNumber].text;

		if (!game.control.fiftyListener.state) { // восстанавливаем обработчики на кнопки ответов после 50/50
			game.control.varListener.remove();
			game.control.varListener.add();
		}

		const variant = document.querySelectorAll('.main__questVar'); // добавляем ответы
		for (let j = 0; j<variant.length; j++){ // если уже есть варианты ответов, удаляем их
			if (variant[j].hasChildNodes()){
				variant[j].setAttribute('class', 'main__questVar main__questVar_bgBlue main__questVar_clickable');//назначаем бакграунд для кнопок с ответами
				for (let i=0; i < variant[j].childNodes.length; i++){
					variant[j].removeChild(variant[j].childNodes[i]);
				}
			}
		}

		const arr_i = [0,1,2,3]; // ответы добавляются в рандомном порядке
		const arr_variant = ['A', 'B', 'C', 'D'];
		for (let j = 0; j<4; j++){
			arr_i.sort((a,b) => {return Math.random()-0.5});
			let p = document.createElement('p');
			p.textContent = arr_variant[j] + '. ' +game.questions[game.questionNumber].variant[arr_i[0]];
			variant[j].appendChild(p);
			arr_i.shift();
		}
	},

	sumTable: (clean) => { // показывает сумму текущего вопроса
		const sumTable = document.querySelector('.main__sumTable');
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
					if (14-i < game.questionNumber){
						sumTable.childNodes[1].childNodes[2*i].setAttribute('class', 'main-sumTable__win' + nofire); // отвеченные вопросы
					} else if (i === 14-game.questionNumber) { // текущий вопрос
						sumTable.childNodes[1].childNodes[2*i].setAttribute('class', 'main-sumTable__now' + nofire); // текущий вопрос
					} else {
						sumTable.childNodes[1].childNodes[2*i].setAttribute('class', '' + nofire); // неотвеченные вопросы
					}
				}
			}
		}
	},

	win: () => { // победа или забрали сумму выводим сообщение
		game.message.gameOver('win');
	}
};

window.onload = () => {
	const btnStart = document.querySelector('.main-show__control-btnStart');
	btnStart.addEventListener('click', game.control.startListener.handler);

	const btnHall = document.querySelector('.user__hint-hall');
	btnHall.addEventListener('click', game.control.hallListener.handler);

	const btnFifty = document.querySelector('.user__hint-fifty');
	btnFifty.addEventListener('click', game.control.fiftyListener.handler);

	const btnFriend = document.querySelector('.user__hint-friend');
	btnFriend.addEventListener('click', game.control.friendListener.handler);
};