let game = {
    player: player,
    currentQuestion: 0,
    message: '',
    questions: [
        {
            text: 'Как правильно закончить пословицу: «Не откладывай на завтра то, что можно…»?',
            answers: [
                'сделать сегодня',
                'сделать послезавтра',
                'сделать через месяц',
                'никогда не делать'
            ],
            rightAnswer: 0,
            cost: 500,
            garantiered: 0
        },
        {
            text: 'Что говорит человек, когда замечает нечто необычное?',
            answers: [
                'попало в лоб',
                'залетело в рот',
                'накапало в уши',
                'бросилось в глаза'
            ],
            rightAnswer: 3,
            cost: 1000,
            garantiered: 0
        },
        {
            text: 'Что помогает туристу ориентироваться в незнакомом городе?',
            answers: [
                'путепровод',
                'путеукладчик',
                'путеводитель',
                'путеводная звезда'
            ],
            rightAnswer: 2,
            cost: 2000,
            garantiered: 0
        },
        {
            text: 'Какой наряд прославил баснописец Крылов?',
            answers: [
                'тришкин кафтан',
                'ивашкин армяк',
                'прошкин зипун',
                'машкин сарафан'
            ],
            rightAnswer: 0,
            cost: 3000,
            garantiered: 0
        },
        {
            text: 'Как звали старшую сестру императора Петра Первого?',
            answers: [
                'Вера',
                'Надежда',
                'Любовь',
                'Софья'
            ],
            rightAnswer: 3,
            cost: 5000,
            garantiered: 5000
        },
        {
            text: 'Что не бывает морским?',
            answers: [
                'рельс',
                'огурец',
                'гребешок',
                'узел'
            ],
            rightAnswer: 0,
            cost: 10000,
            garantiered: 5000
        },
        {
            text: 'Кого с большим основанием можно назвать островитянами?',
            answers: [
                'алеутов',
                'эвенков',
                'чукчей',
                'якутов'
            ],
            rightAnswer: 0,
            cost: 15000,
            garantiered: 5000
        },
        {
            text: 'В какой стране появилась мандолина?',
            answers: [
                'Испания',
                'Италия',
                'Венгрия',
                'Греция'
            ],
            rightAnswer: 1,
            cost: 25000,
            garantiered: 5000
        },
        {
            text: 'Как жители Лондона прозвали небоскреб Мэри-Экс, спроектированный Норманом Фостером?',
            answers: [
                'корнишон',
                'баклажан',
                'кабачок',
                'патиссон'
            ],
            rightAnswer: 0,
            cost: 50000,
            garantiered: 5000
        },
        {
            text: 'Какой врач первым в истории русской медицины применил гипсовую повязку?',
            answers: [
                'Субботин',
                'Пирогов',
                'Боткин',
                'Склифосовский'
            ],
            rightAnswer: 1,
            cost: 100000,
            garantiered: 100000
        },
        {
            text: 'Где в Древней Греции можно было увидеть надпись: «Здесь живут мертвые и говорят немые»?',
            answers: [
                'на кладбищах',
                'в больницах',
                'в библиотеках',
                'в тюрьмах'
            ],
            rightAnswer: 2,
            cost: 200000,
            garantiered: 100000
        },
        {
            text: 'Кто был одним из авторов сценария фильма «Музыкальная история» с Сергеем Лемешевым в главной роли?',
            answers: [
                'Илья Ильф',
                'Евгений Петров',
                'Михаил Зощенко',
                'Аркадий Аверченко'
            ],
            rightAnswer: 1,
            cost: 400000,
            garantiered: 100000
        },
        {
            text: 'С чем часто охотятся на рыбу протоптера между сезонами дождей?',
            answers: [
                'с сетями',
                'с сачками',
                'с ружьями',
                'с лопатами'
            ],
            rightAnswer: 3,
            cost: 800000,
            garantiered: 100000
        },
        {
            text: 'Каким видом спорта серьезно увлекался французский летчик Ролан Гаррос?',
            answers: [
                'пинг-понгом',
                'поло',
                'гольфом',
                'регби'
            ],
            rightAnswer: 3,
            cost: 1500000,
            garantiered: 100000
        },
        {
            text: 'Что такое лобогрейка?',
            answers: [
                'жнейка',
                'шапка',
                'болезнь',
                'печка'
            ],
            rightAnswer: 0,
            cost: 3000000,
            garantiered: 100000
        }, 
    ],
    init() {
        this.player.score = 0,
            this.currentQuestion = 0,
        console.clear(),
        console.log('Для начала игры наберите game.start()');
    },
    start() {
        while (true) {
            console.clear();
            console.log(this.message);
            console.log(this.questions[this.currentQuestion].text);
            console.log('Варианты ответа:');
            for (let i = 0; i < 4; i++) {
                console.log(i + ' : ' + this.questions[this.currentQuestion].answers[i]);
            }
            this.player.makeChoise();
            if (this.player.choise == null) {
                this.message = 'Игрок зарабирает банк. Выигрыш составляет ' + this.player.score;
                break;
            } else if (this.player.choise == this.questions[this.currentQuestion].rightAnswer) {
                this.player.score = this.questions[this.currentQuestion].cost;
                this.message = 'Верный ответ! Ваш текущая сумма выигрыша ' + this.player.score;
                this.currentQuestion++;
            } else {
                this.player.score = this.questions[this.currentQuestion].garantiered;
                this.message = 'Неверный ответ! Ваш текущая сумма выигрыша ' + this.player.score;
                break;
            }
        }
        console.log(this.message);
        console.log('Игра окончена!');
    },
};

game.init();