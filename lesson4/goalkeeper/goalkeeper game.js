/*
4. Для игры, реализованной на уроке, добавить возможность вывода хода номер n (номер задается пользователем)
*/

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
  defendSector: null,
  savesToWin: 2,
  saves: 0,
  init() {
    const sectorNum = Math.trunc(Math.random() * 9);
    this.defendSector = sectors[sectorNum];
    console.log(this.defendSector);
  },
  checkWin() {
    if (this.saves === this.savesToWin) {
      console.log('Goalkeeper wins!!!');
      return true;
    }
    console.log('Goalkeeper need ' + (this.savesToWin - this.saves) + ' more saves');
    return false;
  },
};


/* eslint no-param-reassign: 0 */
const attacker = {
  sectorToAttack: null,
  goals: 0,
  goalsToWin: 3,
  init(sector) {
    if (sectors.indexOf(sector) >= 0) {
      this.sectorToAttack = sector;
      return true;
    }
    return false;
  },
  attack(keeper) {
    console.log(keeper.defendSector, this.sectorToAttack);
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
      console.log('Attacker wins!!!');
      return true;
    }
    console.log('Attacker need ' + (this.goalsToWin - this.goals) + ' more goals');
    return false;
  },
};
// HOMEWORK HERE
const gameLog = {
  // лог игры - свойство объекта, которое так же является объектом
  _log: {},
  get log(){
    return this._log;
  },
  set log(param){
    this._log = param;
  },
  // функция добавления хода в лог
  addMove(attackSector, defendSector, goals, saves){
    // получаем все текущие ключи лога
    let keysOfLog = Object.keys(this.log);
    // даем новому ключу последнюю цифру, чтобы каждый новый лог добавлялся под новым номером, +1 после последнего:
    let newKey = keysOfLog.length;
    // создаем объект импорта, куда передаем параметры метода:
    let importObj = {
      attackSector,
      defendSector,
      goals,
      saves
    }
    // добавляем ключи в объект с данными был ли гол или нет:
    if(attackSector === defendSector){
      importObj.goal = false;
    } else {
      importObj.goal = true;
    }
    // проверяем, произошла ли победа в игре и если да - то записываем победителя
      // проверка true \ false , если хотя бы один true - добавляем еще один ключ в импорт
    if(attacker.checkWin()){
      importObj.whoWin = 'Attacker';
    } else if (goalKeeper.checkWin()){
      importObj.whoWin = 'Goalkeeper';
    }
    // пушим импорт в лог под новым ключом:
    this.log[newKey] = importObj;
    /*console.log(this.log);*/

  },
  // метод получения информации по номеру хода:
  getMove(){
    // спрашиваем, хочет ли игрок посмотреть детали хода? 
    let choice;
    choice = prompt ('Would you like to see the details of the move? y/n');
    if (choice === 'y' || choice === 'Y'){
      // получаем все ключи лога:
      const numOfMoves = Object.keys(this.log);
      // цикл на ввод пользователем номера хода, если вводит не верный номер - спрашивает опять.
      let moveChoise;
      do {
        moveChoise = parseInt(prompt('Choose move to log info of. Total number of moves is: '+numOfMoves.length+'.'))-1;
        // убираем единицу в конце, чтобы правильно попадать в ключ в массиве
      } while (!numOfMoves[moveChoise]); // проверка, что указан ключ, который реально есть в массиве
      //  конец цикла
      // выдаем лог хода:
      console.log('Move #: '+(parseInt(moveChoise)+1)); // + 1, чтобы для пользователя номер хода выглядел ОК
      console.log('Attack sector was: '+this.log[moveChoise].attackSector);
      console.log('Defend sector was: '+this.log[moveChoise].defendSector);
      console.log('Was there a goal: '+this.log[moveChoise].goal);
      console.log('Attacker have a total of '+this.log[moveChoise].goals+' goals');
      console.log('Goalkeeper have a total of '+this.log[moveChoise].saves+' saves');
      if(this.log[moveChoise].whoWin){ // проверка, есть ли ключ, если ключ есть, то выводим ниже:
        console.log('At this point '+this.log[moveChoise].whoWin+' has won');
      }
      // в конце, снова спрашиваем пользователя, хочет ли он посмотреть ход.
      gameLog.getMove();

    } else {
      console.log('Thanks for playing with us!');
      return;
    }
  }
}

let keeperWins = false;
let attackerWins = false;

do {
  let currentAttacksector;
  do {
    currentAttacksector = prompt('Choose sector to attack ( ' + sectors.join(', ') + ' )');
  } while (!attacker.init(currentAttacksector));

  goalKeeper.init();
  attacker.attack(goalKeeper);

  gameLog.addMove(attacker.sectorToAttack, goalKeeper.defendSector, attacker.goals, goalKeeper.saves);

  keeperWins = goalKeeper.checkWin();
  attackerWins = attacker.checkWin();
} while (!keeperWins && !attackerWins);

/* HOMEWORK init here! :) */
gameLog.getMove();

