const firstObj = {
    one: 0,
    dec: 0,
    hun: 0,

    convertObj: function (num) {
        if (num > 999) {
            this.one = 0;
            this.dec = 0;
            this.hun = 0;
            return false;
        } else {
            this.one = num % 10;
            this.dec = (num >= 10) ? ((num % 100) - this.one) / 10 : 0;
            this.hun = (num >= 100) ? (num - this.dec * 10 - this.one) / 100 : 0;
            return true;
        }
    }
};


function task1() {
    'use strict';
    let num = parseInt(prompt('Введите число от 0 до 999'));
    if (isNaN(num)) {
        console.log('Надо было вводить число!');
    } else {
        num = num;
        if (firstObj.convertObj(num) == true) {
            console.log('Единицы: ' + firstObj.one + ' Десятки: ' + firstObj.dec + ' Сотни: ' + firstObj.hun);
        } else {
            console.log('Число больше 999. ');
        }
    }
}

//Задание №2
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
    checkWin(roundNumber) {
        if (this.saves === this.savesToWin) {
            console.log('Goalkeeper wins!!! Last Round is: '+roundNumber);
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
    checkWin(roundNumber) {
        if (this.goals === this.goalsToWin) {
            console.log('Attacker wins!!! Last Round is: '+roundNumber);
            return true;
        }
        console.log('Attacker need ' + (this.goalsToWin - this.goals) + ' more goals');
        return false;
    },
};

function task2() {
    let roundNumber = 0;
    let keeperWins = false;
    let attackerWins = false;

    do {
        let currentAttacksector;
        roundNumber++;
        console.log('Round - '+roundNumber);
        do {
            currentAttacksector = prompt('Choose sector to attack ( ' + sectors.join(', ') + ' )');
        } while (!attacker.init(currentAttacksector));

        goalKeeper.init();
        attacker.attack(goalKeeper);
        
        keeperWins = goalKeeper.checkWin(roundNumber);
        attackerWins = attacker.checkWin(roundNumber);
    } while (!keeperWins && !attackerWins);
}
