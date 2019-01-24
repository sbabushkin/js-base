/*
    Задание 1
    Написать функцию, преобразующую число в объект. Передавая на вход число от 0 до 999, мы должны получить на выходе объект, 
    в котором в соответствующих свойствах описаны единицы, десятки и сотни. Например, для числа 245 мы должны получить следующий 
    объект: {‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}. Если число превышает 999, необходимо выдать соответствующее сообщение с помощью 
    console.log и вернуть пустой объект.
    */

function task1() {
    'use strict';
    function numToObject(num) {
        let objectFromNum = {};
        let elems = num.toString().length;
        let str = num.toString();
        if (elems > 3) {
            alert('numToObject exepts three-digit numbers only!!!');
            return objectFromNum;
        }
        if (elems === 1) {
            objectFromNum.единицы = str.charAt(0);
        }
        if (elems === 2) {
            objectFromNum.десятки = str.charAt(0);
            objectFromNum.единицы = str.charAt(1);
        }
        if (elems === 3) {
            objectFromNum.сотни = str.charAt(0);
            objectFromNum.десятки = str.charAt(1);
            objectFromNum.единицы = str.charAt(2);
        }
        return objectFromNum;
    };

    console.log(numToObject(425));
};

/*
Задание 2
 Для игры, реализованной на уроке, добавить возможность вывода хода номер n (номер задается пользователем).
*/

function task2() {
    /*
    *******************GOALKEEPER********************

        -------------------------------------------
            topleft  |      top     |   topright    
        ___________________________________________

            left     |      center  |   right       
        ___________________________________________

         bottomleft  |     bottom   | bottomright
        ___________________________________________

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
            console.log('You finished a ' + actKeeper + ' round of the game');
            return false;
        },
    };

    let keeperWins = false;
    let attackerWins = false;
    let actKeeper = 0;


    do { 
        let currentAttacksector;
        do {
            currentAttacksector = prompt('Choose sector to attack ( ' + sectors.join(', ') + ' )');
            actKeeper++;
        } while (!attacker.init(currentAttacksector));

        goalKeeper.init();
        attacker.attack(goalKeeper);

        keeperWins = goalKeeper.checkWin();
        attackerWins = attacker.checkWin();
    } while (!keeperWins && !attackerWins);
        console.log('You finished this game on ' + actKeeper + ' round');
};

/*
Задание 3
 * На базе игры, созданной на уроке, реализовать игру «Кто хочет стать миллионером?»

 Задание не делал
*/