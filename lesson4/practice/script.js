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