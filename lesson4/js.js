// Задание №1 ----------------------------------------------------------------------------
/* Описание
Написать функцию, преобразующую число в объект. Передавая на вход число от 0 до 999, мы должны получить на выходе объект, в котором в соответствующих свойствах описаны единицы, десятки и сотни. 
Например, для числа 245 мы должны получить следующий объект: {‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}. Если число превышает 999, необходимо выдать соответствующее сообщение с помощью console.log 
и вернуть пустой объект.
*/
function ex1() {
  let max = 999; //задаем максимальное число
	let numeric = {
		number: prompt('Введите число от 0 до 999'),
		hundreds: 0,
		tens: 0,
		units: 0,
	};
	if (numeric.number <= 9) {
		numeric.units = numeric.number;
	} else if (numeric.number <= max) {
		numeric.hundreds = Math.floor(numeric.number / 100 % 10);
		numeric.tens = Math.floor(numeric.number / 10 % 10);
		numeric.units = Math.floor(numeric.number % 10);
	} else {
		numeric.number = 0;
		alert('Вы ввели число за диапазоном 0 - 999');
	}
	alert('сотни ' + numeric.hundreds + ', десятки ' + numeric.tens + ', единицы ' + numeric.units);
}
//----------------------------------------------------------------------------------------

// Задание №2 ----------------------------------------------------------------------------
/* Описание
Для игры, реализованной на уроке, добавить возможность вывода хода номер n (номер задается пользователем)
*/
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
    defendSector: null,
    savesToWin: 2,
    saves: 0,
    n: 1,

  init() {
    n = this.n++;
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
        console.log(n);
        return true;
      }
      console.log('Attacker need ' + (this.goalsToWin - this.goals) + ' more goals');
      return false;
    },
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
  } while (!keeperWins && !attackerWins);
  alert('Победа была достигнута за' + ' ' + n + ' ' + 'шага(ов)');
}
//----------------------------------------------------------------------------------------
