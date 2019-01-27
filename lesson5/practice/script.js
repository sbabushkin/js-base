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

function logAction(actionText) {
  document.getElementById('logger').innerHTML += '<div>* ' + actionText + '</div>';
}

const goalKeeper = {
  defendSector: null,
  savesToWin: 2,
  saves: 0,
  init() {
    const sectorNum = Math.trunc(Math.random() * 9);
    this.defendSector = sectors[sectorNum]; // left
    const sectorsElem = document.getElementsByClassName('sector');
    for (let i = 0; i < sectorsElem.length; i++) {
      sectorsElem[i].style.backgroundColor = '#fff';
    }
    document.getElementById('sector-' + sectors[sectorNum]).style.backgroundColor = 'green';
  },
  checkWin() {
    if (this.saves === this.savesToWin) {
      logAction('Goalkeeper wins!!!');
      return true;
    }
    logAction('Goalkeeper need ' + (this.savesToWin - this.saves) + ' more saves');
    return false;
  },
};


/* eslint no-param-reassign: 0 */
const attacker = {
  sectorToAttack: null,
  goals: 0,
  goalsToWin: 10,
  init(sector) { // top
    if (sectors.indexOf(sector) >= 0) {
      this.sectorToAttack = sector;
      const sectorsElem = document.getElementsByClassName('sector');
      for (let i = 0; i < sectorsElem.length; i++) {
        sectorsElem[i].style.border = '2px solid #444';
      }
      document.getElementById('sector-' + sector).style.border = '2px solid red';
      return true;
    }
    return false;
  },
  attack(keeper) {
    if (keeper.defendSector === this.sectorToAttack) {
      logAction('SAVE!!!');
      keeper.saves++;
      return false;
    }
    logAction('GOAL!!!');
    this.goals++;
    return true;
  },
  checkWin() {
    if (this.goals === this.goalsToWin) {
      logAction('Attacker wins!!!');
      return true;
    }
    logAction('Attacker need ' + (this.goalsToWin - this.goals) + ' more goals');
    return false;
  },
};

let keeperWins = false;
let attackerWins = false;

function round(attackSector) {
  attacker.init(attackSector);
  goalKeeper.init();
  attacker.attack(goalKeeper);

  keeperWins = goalKeeper.checkWin();
  attackerWins = attacker.checkWin();
  if (keeperWins || attackerWins) { // reset
    goalKeeper.saves = 0;
    attacker.goals = 0;
    keeperWins = false;
    attackerWins = false;
    document.getElementById('logger').innerHTML = '<div>New game started</div>';
  }
}