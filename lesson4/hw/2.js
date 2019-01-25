console.log("4 урок. Задача №2");
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
    console.log('HERE');
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
  goalsToWin: 10,
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

let keeperWins = false;
let attackerWins = false;
let i = 0;
do {
  let currentAttacksector;
  do {
    currentAttacksector = prompt('Choose sector to attack ( ' + sectors.join(', ') + ' )');     
//создаем переменную i. Считаем в нее удары по воротам
      i++;
//Выводим удары по воротам
      console.log("Вы ударили по воротам: " + i + " раз." )
  } while (!attacker.init(currentAttacksector));

  goalKeeper.init();
  attacker.attack(goalKeeper);

  keeperWins = goalKeeper.checkWin();
  attackerWins = attacker.checkWin();
} while (!keeperWins && !attackerWins);