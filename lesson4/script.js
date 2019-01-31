function partitionOfNumbers() {
  const namber = prompt("Введите число от 0 до 999: ", 275);
  if (namber > 0 && namber <= 999) {
    const units = namber % 10; //находим единицы
    const ten = namber % 100 - units; //находим десятки
    const hundreds = namber - units - ten; //находим сотни
    objectNamber = {
      units: units,
      ten: ten / 10,
      hundreds: hundreds / 100
    }
    console.log(objectNamber);
    alert("Единицы: " + objectNamber.units + ", Десятки: " + objectNamber.ten + ", Сотни: " + objectNamber.hundreds);
  } else if (namber > 999) {
    console.log(objectNamber = {});
    alert('Вы ввели число больше 999');
  } else {
    alert('Вы ввели "' + namber + '", а должна быть цифра от 0 до 999');
  }
};

function ex2() {
  const sectors = [
  'topleft',
  'top',
  'topright',
  'left',
  'center',
  'right',
  'bottomleft',
  'bottom',
  'bottomright',
];

  const goalKeeper = {
    defendSector: null, //сектор который мы защещаем
    savesToWin: 2, //количество голов для победы
    saves: 0, //количество количество отбитых голов
    init() {
      console.log('HERE');
      //Номер сектора от 0до 8
      const sectorNum = Math.trunc(Math.random() * 9);
      //куда вратарь стал
      this.defendSector = sectors[sectorNum];
      console.log(this.defendSector);
    },
    //проверка победили мы или нет
    checkWin() {
      if (this.saves === this.savesToWin) {
        console.log('Goalkeeper wins!!!' + ' In ' + numberOfSteps + ' steps');
        return true;
      }
      //голкиперу нужно для победы
      console.log('Goalkeeper need ' + (this.savesToWin - this.saves) + ' more saves');
      return false;
    },
  };


  /* eslint no-param-reassign: 0 */
  const attacker = {
    sectorToAttack: null,
    goals: 0,
    goalsToWin: 10,
    //сектор который мы атакуем
    //если введенные данные верны вернет правда
    init(sector) {
      if (sectors.indexOf(sector) >= 0) {
        this.sectorToAttack = sector;
        return true;
      }
      return false;
    },
    //в нем есть голкипер
    attack(keeper) {
      console.log(keeper.defendSector, this.sectorToAttack);
      //если у голкипера и у атакера савпали зоны
      if (keeper.defendSector === this.sectorToAttack) {
        console.log('SAVE!!!'); //мяч отбит
        keeper.saves++;
        return false;
      }
      console.log('GOAL!!!'); //иначе гол
      this.goals++; //прибовляем гол атакеру
      return true;
    },
    //проверка на победу
    checkWin() {
      if (this.goals === this.goalsToWin) {
        console.log('Attacker wins!!!' + ' In ' + numberOfSteps + ' steps');
        return true;
      }
      console.log('Attacker need ' + (this.goalsToWin - this.goals) + ' more goals');
      return false;
    },
  };

  let keeperWins = false; //голкипер не победил
  let attackerWins = false; //атакер не победил
  let numberOfSteps = 0; //количество шагов

  //проверка на верность введенных данных
  do {
    let currentAttacksector;
    do {
      //получаем данные от пользователя
      currentAttacksector = prompt('Choose sector to attack ( ' + sectors.join(', ') + ' )');
    } while (!attacker.init(currentAttacksector));

    goalKeeper.init();
    attacker.attack(goalKeeper);
    numberOfSteps++;

    //вызаваються проверки на победу
    keeperWins = goalKeeper.checkWin();
    attackerWins = attacker.checkWin();
  } while (!keeperWins && !attackerWins); //когда ктнибудь выйграл то игра оконсена
}


function ex3() {
  const questions = [
    { //1
      question: 'Как правильно закончить пословицу: «Не откладывай на завтра то, что можно…»?',
      answer1: 'сделать сегодня',
      answer2: 'сделать послезавтра',
      answer3: 'сделать через месяц',
      answer4: 'никогда не делать',
      answerTrue: 'сделать сегодня',
      cost: 500
    },
    { //2
      question: 'Что говорит человек, когда замечает нечто необычное?',
      answer1: 'попало в лоб',
      answer2: 'залетело в рот',
      answer3: 'накапало в уши',
      answer4: 'бросилось в глаза',
      answerTrue: 'бросилось в глаза',
      cost: 1000
    },
    { //3
      question: 'Что помогает туристу ориентироваться в незнакомом городе?',
      answer1: 'путепровод',
      answer2: 'путеукладчик',
      answer3: 'путеводитель',
      answer4: 'путеводная звезда',
      answerTrue: 'путеводитель',
      cost: 2000
    },
    { //4
      question: 'Какой наряд прославил баснописец Крылов?',
      answer1: 'тришкин кафтан',
      answer2: 'ивашкин армяк',
      answer3: 'прошкин зипун',
      answer4: 'машкин сарафан',
      answerTrue: 'тришкин кафтан',
      cost: 3000
    },
    {//5
      question: 'Как звали старшую сестру императора Петра Первого?',
      answer1: 'Вера',
      answer2: 'Надежда',
      answer3: 'Любовь',
      answer4: 'Софья',
      answerTrue: 'Софья',
      cost: 5000
    },
    {//6
      question: 'Что не бывает морским?',
      answer1: 'рельс',
      answer2: 'огурец',
      answer3: 'гребешок',
      answer4: 'узел',
      answerTrue: 'рельс',
      cost: 10000
    },
    {//7
      question: 'Кого с большим основанием можно назвать островитянами?',
      answer1: 'алеутов',
      answer2: 'эвенков',
      answer3: 'чукчей',
      answer4: 'якутов',
      answerTrue: 'алеутов',
      cost: 15000
    },
    {//8
      question: 'В какой стране появилась мандолина?',
      answer1: 'Испания',
      answer2: 'Италия',
      answer3: 'Венгрия',
      answer4: 'Греция',
      answerTrue: 'Италия',
      cost: 25000
    },
    {//9
      question: 'Как жители Лондона прозвали небоскреб Мэри-Экс, спроектированный Норманом Фостером?',
      answer1: 'корнишон',
      answer2: 'баклажан',
      answer3: 'кабачок',
      answer4: 'патиссон',
      answerTrue: 'корнишон',
      cost: 50000
    },
    {//10
      question: 'Какой врач первым в истории русской медицины применил гипсовую повязку?',
      answer1: 'Субботин',
      answer2: 'Пирогов',
      answer3: 'Боткин',
      answer4: 'Склифосовский',
      answerTrue: 'Пирогов',
      cost: 100000
    },
    {//11
      question: 'Где в Древней Греции можно было увидеть надпись: «Здесь живут мертвые и говорят немые»?',
      answer1: 'на кладбищах',
      answer2: 'в больницах',
      answer3: 'в библиотеках',
      answer4: 'в тюрьмах',
      answerTrue: 'в библиотеках',
      cost: 200000
    },
    {//12
      question: 'Кто был одним из авторов сценария фильма «Музыкальная история» с Сергеем Лемешевым в главной роли?',
      answer1: 'Илья Ильф',
      answer2: 'Евгений Петров',
      answer3: 'Михаил Зощенко',
      answer4: 'Аркадий Аверченко',
      answerTrue: 'Евгений Петров',
      cost: 400000
    },
    {
      question: 'С чем часто охотятся на рыбу протоптера между сезонами дождей?',
      answer1: 'с сетями',
      answer2: 'с сачками',
      answer3: 'с ружьями',
      answer4: 'с лопатами',
      answerTrue: 'с лопатами',
      cost: 800000
    },
    {
      question: 'Каким видом спорта серьезно увлекался французский летчик Ролан Гаррос?',
      answer1: 'пинг-понгом',
      answer2: 'поло',
      answer3: 'гольфом',
      answer4: 'регби',
      answerTrue: 'регби',
      cost: 1500000
    },
    {
      question: 'Что такое лобогрейка?',
      answer1: 'жнейка',
      answer2: 'шапка',
      answer3: 'болезнь',
      answer4: 'печка',
      answerTrue: 'жнейка',
      cost: 3000000
    }
];
  let priorityOfQuestions = 0;
  let minWinnings = 0;

  for (priorityOfQuestions = 0; priorityOfQuestions < 15; priorityOfQuestions++) {
    alert(questions[priorityOfQuestions].question);
    let ans = prompt('Выберите ответ: ' +
      questions[priorityOfQuestions].answer1 + ', ' +
      questions[priorityOfQuestions].answer2 + ', ' +
      questions[priorityOfQuestions].answer3 + ', ' +
      questions[priorityOfQuestions].answer4);
    if (ans === questions[priorityOfQuestions].answerTrue) {
      alert('Вы ответили верно! И заработали ' + questions[priorityOfQuestions].cost + ' рублей');
      if (priorityOfQuestions === 4) {
        alert('Поздравляю Вы добрались до несгораемой суммы!');
        minWinnings = 5000;
      } else if (priorityOfQuestions === 9) {
        alert('Поздравляю Вы добрались до второй несгораемой суммы!');
        minWinnings = 100000;
      } else if (priorityOfQuestions === 14) {
        alert('Поздравляю Вы выиграли!');
        minWinnings = 3000000;
        break;
      }
    } else {
      if (minWinnings === 0) {
        alert('Вы проиграли');
      } else if (minWinnings === 5000) {
        alert('Вы проиграли, но добрались до несгораемой суммы в 5000 рублей!');
      } else if (minWinnings === 100000) {
        alert('Вы проиграли, но добрались до несгораемой суммы в 100 000 рублей!');
      }
      break;
    }
  }
}
