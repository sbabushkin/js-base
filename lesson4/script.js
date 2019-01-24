/*
************** Задание 1 ****************
  --------------------------------------
*/

// Функция получения массива из числа
function toMassive(n) {
  makeSring = String(n);
  makeMassive = makeSring.split('');
  // Массив должен иметь по крайней мере 3 переменных
  if(number < 10) {
      makeMassive.unshift('0','0');
  } else if(number < 100) {
      makeMassive.unshift('0');
  }
  return makeMassive;
}
// Функция заполняет параметры объекта значениями из массива
function fillObject(obj) {
  str = toMassive(number);
  obj.единицы = str[2];
  obj.десятки = str[1];
  obj.сотни = str[0];
}

// Объявляем число
let number = Math.trunc(Math.random() * 1100),
  numberObject = {};
console.log('Получено число: ' + number);

if(number > 999) {
  console.log('Полученное число превышает 999, поэтому numberObject пуст:');
} else {
  fillObject(numberObject);
}
let result = numberObject;
console.log(result);
  
// Еще можно сделать через добавление элементов в объект, но сделал так


/*
************** Задание 2 ****************
  --------------------------------------
*/

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
  
  let gameSteps = 0;

  const goalKeeper = {
    defendSector: null,
    savesToWin: 2,
    saves: 0,
    init() {
      console.log('HERE');
      const sectorNum = Math.trunc(Math.random() * 9);
      this.defendSector = sectors[sectorNum];
      console.log('The goalkeeper defended ' + this.defendSector + ' sector of the gate');
    },
    checkWin() {
      if (this.saves === this.savesToWin) {
        console.log('===============================');
        console.log('Goalkeeper wins for ' + gameSteps + ' attempts!!!');
        return true;
      }
      if(attackerWins === false) {
        console.log('Goalkeeper need ' + (this.savesToWin - this.saves) + ' more saves');
      }
      return false;
    },
  };
  
  /* eslint no-param-reassign: 0 */
  const attacker = {
    sectorToAttack: null,
    goals: 0,
    goalsToWin: 10,
    init(sector) {
      if (sectors.indexOf(sector) >= 0) {
        this.sectorToAttack = sector;
        return true;
      }
      return false;
    },
    attack(keeper) {
      console.log('The goalkeeper jumps into the sector ' + keeper.defendSector + ' and the striker gets in ' + this.sectorToAttack);
      if (keeper.defendSector === this.sectorToAttack) {
        console.log('SAVE!!!');
        keeper.saves++;
        return false;
      }
      console.log('GOAL!!!');
      this.goals++;
      return true;
    },
    checkWin() {
      if (this.goals === this.goalsToWin) {
        console.log('===============================');
        console.log('Attacker wins for ' + gameSteps + ' attempts!!!');
        return true;
      }
      if(keeperWins === false) {
        console.log('Attacker need ' + (this.goalsToWin - this.goals) + ' more goals');
      }
      
      return false;
    },
  };
  
  let keeperWins = false;
  let attackerWins = false;

  do {
    let currentAttacksector
    
    console.log('Round ' + ++gameSteps + ', Fight!!!');
    do {
      currentAttacksector = prompt('Choose sector to attack ( ' + sectors.join(', ') + ' )');
    } while (!attacker.init(currentAttacksector));
  
    goalKeeper.init();
    attacker.attack(goalKeeper);
  
    keeperWins = goalKeeper.checkWin();
    attackerWins = attacker.checkWin();
    console.log('===============================');

  } while (!keeperWins && !attackerWins);
  console.log('Many thanks to all football fans! It was a tough match. Take care of yourself.');

  /*
************** Задание 3 ****************
  --------------------------------------
*/
let questions = [
  {quest: 'Как правильно закончить пословицу: «Не откладывай на завтра то, что можно…»?', vars: '1. Cделать сегодня \n2. Cделать послезавтра \n3. Cделать через месяц \n4. Никогда не делать', true: 1},
  {quest: 'Что говорит человек, когда замечает нечто необычное?', vars: '1. Попало в лоб \n2. Залетело в рот \n3. Накапало в уши \n4. Бросилось в глаза', true: 4},
  {quest: 'Как звали старшую сестру императора Петра Первого?', vars: '1. Вера \n2. Надежда \n3. Любовь \n4. Софья', true: 4},
  {quest: 'Что не бывает морским?', vars: '1. Рельс \n2. Огурец \n3. Гребешок \n4. Узел', true: 1},
  {quest: 'Какой врач первым в истории русской медицины применил гипсовую повязку?', vars: '1. Субботин \n2. Пирогов \n3. Боткин \n4. Склифосовский', true: 2},
  {quest: 'Какой элемент есть в конструкции башенного крана?', vars: '1. Стрела \n2. Копьё \n3. Дротик \n4. Бумеранг', true: 1},
  {quest: 'Что написал Данте?', vars: '1. «Божественную трагедию» \n2. «Божественную комедию \n3. «Божественную драму» \n4. «Божественный фарс»', true: 2},
  {quest: 'Что надевает балерина?', vars: '1. Коробку \n2. Банку \n3. Пачку \n4. Ящик', true: 3},
  {quest: 'Какому танцу обучал отдыхающих Бывалый в фильме "Кавказская пленница"?', vars: '1. Вальсу \n2. Твисту \n3. Мазурке \n4. Котильону', true: 2},
],  textMessages = [
  'Приветствуем вас на игре "Кто хочет стать миллионером!"',
  'Правила игры простые: вам будет задан вопрос, на который вы должны указать номер варианта ответа (1-4).',
  'Поздравляем! Вы ответили на все вопросы игры!',
  'Правильный ответ',
  'Ответ неправильный. Правильных ответов: ',
  '.',
  '\n ==============================='
],
  questCount,
  answerRight,
  randomQuest;

function selectQuest() {
  const arrLength = questions.length;
  randomQuest = Math.trunc(Math.random() * arrLength);
  console.log('Вопрос №' + questCount + ": " + questions[randomQuest].quest + " \n" + questions[randomQuest].vars);

  const answer = prompt('Вопрос №' + questCount + ": " + questions[randomQuest].quest + " \n\n" + questions[randomQuest].vars);
 
  ++questCount;
  if(answer == questions[randomQuest].true) {
      console.log(textMessages[3]);
      alert(textMessages[3]);
      questions.splice(randomQuest,1);
      answerRight++;
      
      if(questions.length === 0) {
          console.log(textMessages[2]);
          alert(textMessages[2] + ' (всего вопросов : ' + questCount + ')' + textMessages[6]);
      }
      return true;
  } else {
      console.log(textMessages[4] + answerRight + textMessages[5] + textMessages[6]);
      alert(textMessages[4] + answerRight + textMessages[5]);
      questions.splice(randomQuest,1);
      return false;
  }
}
function gameOn() {
  console.log(textMessages[0]);
  console.log(textMessages[1]);
  alert(textMessages[0] + " \n" + textMessages[1]);
  questCount = 1;
  answerRight = 0;
  
  while(selectQuest(true) && questions.length !== 0) {
      selectQuest();
  }
  
}