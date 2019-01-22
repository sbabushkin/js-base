/*
4. На базе игры, созданной на уроке, реализовать игру «Кто хочет стать миллионером?»
*/
const theMillionaireGame = {
	_questions: {},
	totalAnswers: 0, // total answers
	totalCorrectAnswers: 0, // current correct answers
	neededAnswersToWin: 2, // WIN condition
	currQIndex: 0, // current question key in questions{}
	currQAnswers: [],
	questionsAsked: [],
	get questions(){
		return this._questions;
	},
	set questions(param){
		this._questions = param;
	},
	init(){
		console.log('Добро пожаловать на игру');
		console.log('«Кто хочет стать миллионером?»');
		console.log('Если вы угадаете '+this.neededAnswersToWin+' вопроса, то станете победителем.');
	},
	// добавляем вопросы в коллекцию
	addQuestion(question, answerTrue, answerOne, answerTwo, answerThree){
		if(!question || !answerOne || !answerTwo || !answerThree || !answerTrue){
			return console.log('Please make sure to include all the parameters');
		} else {
			// making an object to put paramenters values:
			let importObj = {
				question,
				answerTrue,
				answerOne,
				answerTwo,
				answerThree
			};
			const questionsKeys = Object.keys(this.questions);
			this.questions[questionsKeys.length] = importObj;
		}
	},
	// we need to generate random key in questions obj, except ones already called for
	randomQuestionNumber(){
		// get all keys of questions
		const questionsKeys = Object.keys(this.questions);
		// checking if all of questions actually been played:
		if(questionsKeys.length === this.questionsAsked.length){
			return 'randomNum(): All questions has been played!';
			// if not - checking array with played questions contains random number
		} else {
			let x;
			do {
				x = Math.floor(Math.random()*questionsKeys.length);
				// console.log('x в цикле: '+x);
			} while (this.questionsAsked.indexOf(x) >= 0)
				// pushing to played keys array:
				this.questionsAsked.push(x);
				// console.log(this.questionsAsked);
				return x;		
		}
	},
	getQuestion(){
		this.currQIndex = this.randomQuestionNumber(); // gettin random rest of keys in questions
		this.currQAnswers = []; // cleaning arr
		index = this.currQIndex;
		let qArr = [] // temp arr
		// pushing questions to temp arr
		qArr.push(this.questions[index].answerTrue);
		qArr.push(this.questions[index].answerOne);
		qArr.push(this.questions[index].answerTwo);
		qArr.push(this.questions[index].answerThree);
		//
		this.currQAnswers = qArr; // putting temp arr into property
		// console.log(this.currQAnswers);
	},
	randomizeAnswers(){
		// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
		let shuffledArr = [];
		// creating copy of array
		for (keys in this.currQAnswers){
			shuffledArr.push(this.currQAnswers[keys]);
		}
		let temp = '';
		/* 
		* Randomize array element order in-place.
 		* Using Durstenfeld shuffle algorithm.
 		*/
		for(let i = shuffledArr.length-1; i>0; i--){
			var x = Math.floor(Math.random()*(i+1));
			temp = shuffledArr[i];
			shuffledArr[i] = shuffledArr[x];
			shuffledArr[x] = temp;
		}
		this.currQAnswers = shuffledArr;
		return;
	},
	showQuestions(){
		this.randomizeAnswers();
		let index = this.currQIndex;
		let answers = this.currQAnswers;
		// console.log(this.currQAnswers);
		console.log('=============================');
		console.log('Внимание, вопрос:');
		console.log(this.questions[index].question);
		console.log('Ответ #1: '+answers[0]);
		console.log('Ответ #2: '+answers[1]);
		console.log('Ответ #3: '+answers[2]);
		console.log('Ответ #4: '+answers[3]);
	},
	checkAnswer(){
		this.totalAnswers++; // +1 всего ответов дано
		let playerAnswer = this.currQAnswers[playerOne.answerToQuestion];
		let trueAnswer = this.questions[this.currQIndex].answerTrue;
		if(playerAnswer === trueAnswer){
			this.totalCorrectAnswers++; // +1 правильный ответ
			console.log('Правильный ответ!');
			return;
		} else {
			console.log('Не правильный ответ :(');
			console.log('Правильный ответ был: '+trueAnswer);
			return;
		}
	},
	showTotalCorrectAnswers(){
		console.log('Итого правильных ответов: '+this.totalCorrectAnswers);
	},
	endGameCheck(){
		let totalQ = this.questionsAsked.length;
		let libraryT = Object.keys(this.questions).length;
		if(this.totalCorrectAnswers === this.neededAnswersToWin){
			console.log('=============================');
			console.log('Поздравляем с победой!');
			console.log('Приходите еще :)');
			return true;
		} else if(totalQ === libraryT){
			console.log('=============================');
			console.log('К сожалению, вопросы закончилась!');
			console.log('Вы дали '+this.totalCorrectAnswers+' правильных ответов');
			console.log('Приходите еще :)');
			return true;
		} else {
			return false;
		}
	},
}

const playerOne = {
	answerToQuestion: 0,
	tellAnswer(){
		let x;
		do {
			x = parseInt(prompt('Выберите правильный ответ! Целое число от 1 до 4'))-1;
		} while(!theMillionaireGame.currQAnswers[x]);
		this.answerToQuestion = x;
	},
}

theMillionaireGame.addQuestion('Как правильно закончить пословицу: «Не откладывай на завтра то, что можно…»?',
	'сделать сегодня', 'сделать послезавтра', 'сделать через месяц', 'никогда не делать');
theMillionaireGame.addQuestion('Что говорит человек, когда замечает нечто необычное?',
	'бросилось в глаза', 'залетело в рот', 'накапало в уши', 'попало в лоб');
theMillionaireGame.addQuestion('Что помогает туристу ориентироваться в незнакомом городе?',
	'путеводитель','путепровод','путеукладчик','путеводная звезда');
theMillionaireGame.addQuestion('Какой наряд прославил баснописец Крылов?',
	'тришкин кафтан', 'ивашкин армяк', 'прошкин зипун', 'машкин сарафан');


let x;
x = (prompt('Добрый день! Вы хотите начать игру? "1" или "да" для подтверждения.')).toLowerCase();
if ( x==='1' || x==='да' ){

	theMillionaireGame.init();
	do {

		theMillionaireGame.getQuestion();
		theMillionaireGame.showQuestions();
		playerOne.tellAnswer();
		theMillionaireGame.checkAnswer();
		theMillionaireGame.showTotalCorrectAnswers();

	} while (!theMillionaireGame.endGameCheck())
			
}

// console.log('нижний: '+theMillionaireGame.randomQuestionNumber());
// console.log('нижний: '+theMillionaireGame.randomQuestionNumber());
// console.log('нижний: '+theMillionaireGame.randomQuestionNumber());
// console.log('нижний: '+theMillionaireGame.randomQuestionNumber());
// console.log('нижний: '+theMillionaireGame.randomQuestionNumber());
// theMillionaireGame.randomQuestionNumber();
// theMillionaireGame.randomQuestionNumber();
// theMillionaireGame.randomQuestionNumber();
// theMillionaireGame.randomQuestionNumber();
// theMillionaireGame.randomQuestionNumber();
// theMillionaireGame.getQuestion();
// theMillionaireGame.showQuestions();
// theMillionaireGame.getQuestion();
// theMillionaireGame.showQuestions();
// theMillionaireGame.getQuestion();
// theMillionaireGame.showQuestions();
// theMillionaireGame.getQuestion();
// theMillionaireGame.showQuestions();