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
		console.log('------  HERE  ------');
		const sectorNum = Math.trunc(Math.random() * 9);
		this.defendSector = sectors[sectorNum];
		console.log('Goalkeeper wove to ' + this.defendSector);
	},
	checkWin() {
		if (this.saves === this.savesToWin) {
			return true;
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
		console.log('Attacker attack ' + this.sectorToAttack);
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
			return true;
		}
		return false;
	},
};

let moveToWin = {  // счетчик ходов
	count: 1,
	Post: function () { // метод определяет постфикс для номера хода
		let post;
		switch (this.count) {
			case 0:
				return '';
			case 1:
				return 'st';
			case 2:
				return 'nd';
			case 3:
				return 'rd';
			default:
				return 'th';
		}
	}
};

let keeperWins = false;
let attackerWins = false;

do {
	let currentAttacksector;
	do {
		currentAttacksector = prompt('Choose sector to attack ( ' + sectors.join(', ') + ' )');
	} while (!attacker.init(currentAttacksector));

	goalKeeper.init();
	attacker.attack(goalKeeper);
	keeperWins = goalKeeper.checkWin();
	attackerWins = attacker.checkWin();

	if (!keeperWins && !attackerWins) { // малька переделал, для более красивого вывода информации
		console.log('Goalkeeper need ' + (goalKeeper.savesToWin - goalKeeper.saves) + ' more saves');
	} else if (keeperWins){
		console.log('Goalkeeper won on the ' + moveToWin.count + moveToWin.Post() + ' move!!!');
	}

	if (!attackerWins && !keeperWins) {
		console.log('Attacker need ' + (attacker.goalsToWin - attacker.goals) + ' more goals');
	} else if (attackerWins) {
		console.log('Attacker won on the ' + moveToWin.count + moveToWin.Post() + ' move!!!');
	}

	moveToWin.count++;
} while (!keeperWins && !attackerWins);