/*
    Задание 1
*/

function arrResult(arg) {
  if (arg > 999) {
    console.log('Число вне диапозона');
    return {};
  }
  arg += '';
  return {'единицы': arg[0], 'десятки': arg[1], 'сотни': arg[2]};
}

console.log(arrResult(684));

/*
    Задание 2
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
let countStep = 0;

do {
  let currentAttacksector;
  do {
    currentAttacksector = prompt('Choose sector to attack ( ' + sectors.join(', ') + ' )');
    countStep++;
  } while (!attacker.init(currentAttacksector));

  goalKeeper.init();
  attacker.attack(goalKeeper);

  keeperWins = goalKeeper.checkWin();
  attackerWins = attacker.checkWin();
} while (!keeperWins && !attackerWins);
console.log('Победил за ' + countStep + ' шагов');