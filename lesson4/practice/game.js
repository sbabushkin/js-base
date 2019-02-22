const question1 = {
    text: 'Как правильно закончить пословицу: «Не откладывай на завтра то, что можно…»?',
    a: 'сделать сегодня',
    b: 'сделать послезавтра',
    c: 'сделать через месяц',
    d: 'никогда не делать',
    answer: 'a',
    value: 200,
    isCorrectAnswer: function (letter) {
        return this.answer === letter;
    }
};
const question2 = {
    text: 'Что говорит человек, когда замечает нечто необычное?',
    a: 'попало в лоб',
    b: 'залетело в рот',
    c: 'накапало в уши',
    d: 'бросилось в глаза',
    answer: 'd',
    value: 400,
    isCorrectAnswer: function (letter) {
        return this.answer === letter;
    }
};
const question3 = {
    text: 'Что помогает туристу ориентироваться в незнакомом городе?',
    a: 'путепровод',
    b: 'путеукладчик',
    c: 'путеводитель',
    d: 'путеводная звезда',
    answer: 'c',
    value: 600,
    isCorrectAnswer: function (letter) {
        return this.answer === letter;
    }
};

const question4 = {
    text: 'Какой наряд прославил баснописец Крылов?',
    a: 'тришкин кафтан',
    b: 'ивашкин армяк',
    c: 'прошкин зипун',
    d: 'машкин сарафан',
    answer: 'a',
    value: 800,
    isCorrectAnswer: function (letter) {
        return this.answer === letter;
    }
};

const host = {
    name: 'Дмитрий Дибров',
    greet: function () {
        alert('Привет. Меня зовут ' + this.name + '. Как тебя зовут?');
    },
    greetPlayer: function (player) {
        alert('Добро пожаловать ' + player.name + ' . Давайте играть!');
    },
    giveQuestion: function (question) {
        let str = question.text + '\n';
        str += 'a) ' + question.a + '  c) ' + question.c + '\n';
        str += 'b) ' + question.b + '  d) ' + question.d;
        alert(str);
    },
    giveCorrectAnswer: function (question) {
        alert('Правильный ответ ' + question.answer + ': ' + question[question.answer]);
    },
    askForAnswer: function () {
        while (true) {
            let answer = prompt('Хотите ответить или выйти из игры? [Введите букву или exit чтобы забрать деньги]');
            switch (answer) {
                case 'a':
                case 'b':
                case 'c':
                case 'd':
                case 'exit':
                    return answer;
            }
        }
    },
    congratulateOnRightAnswer: function (player) {
        alert('Отлично! это правильный ответ\n' + ' Ваш выйгрыш ' + player.money);
    },
    sayGoodbye: function (player) {
        alert('Ваш выйгрыш ' + player.money + '. Пока');
        return;
    }
}

const player = {
    name: null,
    money: 0,
    greet: function () {
        this.name = prompt('Введите ваше имя');
    },
    giveAnswer: function () {
        return prompt('Введите ответ [буква]:');
    }
}

const game = {
    questions: [question1, question2, question3, question4],
    fixedSafetyAmount: 200,
    init: function () {
        host.greet();
        player.greet();
        host.greetPlayer(player);
    },
    onExit: function (question) {
        host.giveCorrectAnswer(question);
    },
    onWrongAnswer: function (question) {
        host.giveCorrectAnswer(question);
        if (player.money >= this.fixedSafetyAmount) {
            player.money = this.fixedSafetyAmount;
        } else {
            player.money = 0;
        }
    },
    end: function () {
        if (this.questions.length == 0) {
            alert('Вы победитель игры!!');
        }
        host.sayGoodbye(player);
    },
    run: function () {
        this.init();
        while (this.questions.length != 0) {
            question = this.questions.shift();
            host.giveQuestion(question);
            let answer = host.askForAnswer();
            if (answer == 'exit') {
                this.onExit(question);
                break;
            } else if (!question.isCorrectAnswer(answer)) {
                this.onWrongAnswer(question);
                break;
            } else {
                player.money = question.value;
                host.congratulateOnRightAnswer(player);
            }
        }
        this.end();
    }
}

game.run();



