//----------------------------------------------------------- 1

//let num = {};
//
//function numberSchedule (number) {
//  if (number > 999 || number < 0) {
//    console.log('число не дольжно быть больше 999!');
//  }
//  else {
//    num = {
//      'сотни': 0,
//      'десятки': 0,
//      'единицы': 0
//    };
//    let arrName = ['сотни', 'десятки', 'единицы'];
//    let arrNum = strToArray(number.toString());
//    num.единицы = arrNum[arrNum.length-1];
//    num.десятки = arrNum[arrNum.length-2];
//    num.сотни = arrNum[arrNum.length-3];
//    
//    if (num.десятки == undefined && num.сотни == undefined) {
//      num.десятки = 'нет';
//      num.сотни = 'нет';
//    } else if (num.десятки == undefined) {
//      num.десятки = 'нет';
//    } else if (num.сотни == undefined) {
//      num.сотни = 'нет';
//    }
//  }
//}
//
//function strToArray (str) {
//  let arr = [];
//  for (let i = 0; i < str.length; i++) {
//    arr.push(str[i]);
//  }
//  return arr;
//}
//
//numberSchedule(2484);
//console.log(num);
//numberSchedule(248);
//console.log(num);
//numberSchedule(28);
//console.log(num);
//numberSchedule(8);
//console.log(num);

//---------------------------------------------------------- 2

/*
**************GOALKEEPER****************
  -------------------------------------
  |  topleft   |  top   |  topright   |
  --------------------------
  |    left    | center |   right     |
  --------------------------
  | bottomleft | bottom | bottomright |
  --------------------------------------
*/

//const sectors = [
//  'topleft',
//  'top',
//  'topright',
//  'left',
//  'center',
//  'right',
//  'bottomleft',
//  'bottom',
//  'bottomright',
//];
//
//const goalKeeper = {
//  defendSector: null,
//  savesToWin: 2,
//  saves: 0,
//  init() {
//    console.log('HERE');
//    const sectorNum = Math.trunc(Math.random() * 9);
//    this.defendSector = sectors[sectorNum];
//    console.log(this.defendSector);
//  },
//  checkWin() {
//    if (this.saves === this.savesToWin) {
//      console.log('Goalkeeper wins!!!\n to ' + stepNumber + ' steps');
//      return true;
//    }
//    console.log('Goalkeeper need ' + (this.savesToWin - this.saves) + ' more saves');
//    return false;
//  },
//};
//
//
///* eslint no-param-reassign: 0 */
//const attacker = {
//  sectorToAttack: null,
//  goals: 0,
//  goalsToWin: 10,
//  init(sector) {
//    if (sectors.indexOf(sector) >= 0) {
//      this.sectorToAttack = sector;
//      return true;
//    }
//    return false;
//  },
//  attack(keeper) {
//    console.log(keeper.defendSector, this.sectorToAttack);
//    if (keeper.defendSector === this.sectorToAttack) {
//      console.log('SAVE!!!');
//      keeper.saves++;
//      return false;
//    }
//    console.log('GOAL!!!');
//    this.goals++;
//    return true;
//  },
//  checkWin() {
//    if (this.goals === this.goalsToWin) {
//      console.log('Attacker wins!!!\n to ' + stepNumber + ' steps');
//      return true;
//    }
//    console.log('Attacker need ' + (this.goalsToWin - this.goals) + ' more goals');
//    return false;
//  },
//};
//
//let keeperWins = false;
//let attackerWins = false;
//let stepNumber = 0;
//
//do {
//  let currentAttacksector;
//  do {
//    currentAttacksector = prompt('Choose sector to attack \n( ' + sectors.join(', \n') + ' )');
//  } while (!attacker.init(currentAttacksector));
//
//  goalKeeper.init();
//  attacker.attack(goalKeeper);
//  
//  stepNumber++;
//
//  keeperWins = goalKeeper.checkWin();
//  attackerWins = attacker.checkWin();
//} while (!keeperWins && !attackerWins);

//------------------------------------------------------------------- 3

let questions = [
    {
    question: '1. Как правильно закончить пословицу: «Не откладывай на завтра то, что можно…»?',
    answerone: 'сделать сегодня',
    answertwo: 'сделать послезавтра',
    answerthree: 'сделать через месяц',
    answerfour: 'никогда не делать',
    answer: 'сделать сегодня',
    money: 100
  },
    {
    question: '2. Что говорит человек, когда замечает нечто необычное?',
    answerone: 'попало в лоб',
    answertwo: 'залетело в рот',
    answerthree: 'накапало в уши',
    answerfour: 'бросилось в глаза',
    answer: 'бросилось в глаза',
    money: 200
  },
    {
    question: '3. Что помогает туристу ориентироваться в незнакомом городе?',
    answerone: 'путепровод',
    answertwo: 'путеукладчик',
    answerthree: 'путеводитель',
    answerfour: 'путеводная звезда',
    answer: 'путеводитель',
    money: 500
  },
    {
    question: '4. Какой наряд прославил баснописец Крылов?',
    answerone: 'тришкин кафтан',
    answertwo: 'ивашкин армяк',
    answerthree: 'прошкин зипун',
    answerfour: 'машкин сарафан',
    answer: 'тришкин кафтан',
    money: 1000
  },
    {
    question: '5. Как звали старшую сестру императора Петра Первого?',
    answerone: 'Вера',
    answertwo: 'Надежда',
    answerthree: 'Любовь',
    answerfour: 'Софья',
    answer: 'Софья',
    money: 5000
  }
];

let moneys = 0;

for (let i = 0; i < 5; i++) {
  let userAnswer = prompt(questions[i].question + '\n\nВаш ответ: \n- ' + 
                         questions[i].answerone + '\n- ' +
                         questions[i].answertwo + '\n- ' +
                         questions[i].answerthree + '\n- ' +
                         questions[i].answerfour);
  if (userAnswer === questions[i].answer) {
    alert('Верно!\nВы заработали - ' + questions[i].money + '$');
    moneys = questions[i].money;
  } else {
    alert('Неверно!\nНа следующий раз у вас получиться)\n' +
         'Вы заработали - ' + moneys + '$');
    break;
  }
}