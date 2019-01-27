function numToObj() {
    let inputNumber = parseInt(prompt('Write down three-point number'));
    if (inputNumber > 0 && inputNumber <=999) {
        const ones = inputNumber % 10;
        const ten = inputNumber % 100 - ones;
        const hundreds = inputNumber - ones - ten;
        const objNumber = {
            ones,
            ten: ten / 10,
            hundreds: hundreds / 100,
        };
        console.log('Единицы: ' + objNumber.ones + ', Десятки: ' + objNumber.ten + ',  Сотни: ' + objNumber.hundreds);
    } else {
        console.log('Your number' + inputNumber + 'must be in 0 - 999 period');
    }
}
    //numToObj();


  
  function football() {
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
      defendSector: null, // сектор, который мы защещаем
      savesToWin: 2, // количество голов для победы
      saves: 0, // количество отбитых голов
      init() {
        console.log('HERE');
        // Номер сектора от 0до 8
        const sectorNum = Math.trunc(Math.random() * 9);
        // куда goalkeeper встал
        this.defendSector = sectors[sectorNum];
        console.log(this.defendSector);
      },
      // проверка победили мы или нет
      checkWin() {
        if (this.saves === this.savesToWin) {
          console.log('Goalkeeper wins!!!' + ' In ' + numberOfSteps + ' steps');
          return true;
        }
        // goalkeeper нужно для победы
        console.log('Goalkeeper need ' + (this.savesToWin - this.saves) + ' more saves');
        return false;
      },
    };

    const attacker = {
      sectorToAttack: null,
      goals: 0,
      goalsToWin: 10,
      // сектор который мы атакуем
      // если введенные данные верны return: true
      init(sector) {
        if (sectors.indexOf(sector) >= 0) {
          this.sectorToAttack = sector;
          return true;
        }
        return false;
      },
      // в нем goalkeeper
      attack(keeper) {
        console.log(keeper.defendSector, this.sectorToAttack);
        // если у goalkeeper и у attacker сoвпали зоны
        if (keeper.defendSector === this.sectorToAttack) {
          console.log('SAVE!!!'); // мяч отбит
          keeper.saves++;
          return false;
        }
        console.log('GOAL!!!'); // иначе гол
        this.goals++; // прибаляем гол attacker
        return true;
      },
      // проверка на победу
      checkWin() {
        if (this.goals === this.goalsToWin) {
          console.log('Attacker wins!!!' + ' In ' + numberOfSteps + ' steps');
          return true;
        }
        console.log('Attacker need ' + (this.goalsToWin - this.goals) + ' more goals');
        return false;
      },
    };
  
    let keeperWins = false; // goalkeeper не победил
    let attackerWins = false; // attacker не победил
    let numberOfSteps = 0; // количество ходов
  
    // проверка на верность введенных данных
    do {
      let currentAttacksector;
      do {
        currentAttacksector = prompt('Choose sector to attack ( ' + sectors.join(', ') + ' )');
      } while (!attacker.init(currentAttacksector));
  
      goalKeeper.init();
      attacker.attack(goalKeeper);
      numberOfSteps++;
  
      keeperWins = goalKeeper.checkWin();
      attackerWins = attacker.checkWin();
    } while (!keeperWins && !attackerWins); 
  }
  
 // football();



function wantToBeAMillionaire() {
    const questions = [
      { // 1
        question: '25+10',
        answer1: '35',
        answer2: '42',
        answer3: '14',
        answer4: '555',
        answerTrue: '35',
        cost: 2000,
      },
      { // 2
        question: 'Столица Египта',
        answer1: 'Каир',
        answer2: 'Дели',
        answer3: 'Дамаск',
        answer4: 'Барнаул',
        answerTrue: 'Дели',
        cost: 5000,
      },
      { // 3
        question: 'What is the capital of Great Britain?',
        answer1: 'Poland',
        answer2: 'Orel',
        answer3: 'London',
        answer4: 'TreyWay',
        answerTrue: 'London',
        cost: 100000,
      },
      { // 4
        question: 'One Kelvin is .. degrees by Celcium',
        answer1: '273',
        answer2: '555',
        answer3: '8',
        answer4: '258',
        answerTrue: '273',
        cost: 500000,
      },
      {// 5
        question: 'Who has the biggest ears?',
        answer1: 'Elephant',
        answer2: 'Teacher, when you are on 1st row',
        answer3: 'Tiger',
        answer4: 'Mouse',
        answerTrue: 'Elephant',
        cost: 1000000,
      },
      {// 6
        question: 'The best educational IT courses',
        answer1: 'GeekBrains',
        answer2: 'Skillbox',
        answer3: 'WebDev',
        answer4: 'Netology',
        answerTrue: 'GeekBrains',
        cost: 2000000,
      },
      {// 7
        question: 'DOM - is?',
        answer1: 'document object model',
        answer2: 'deal of month',
        answer3: 'darkness on morning',
        answer4: 'deep orange mirror',
        answerTrue: 'document object model',
        cost: 3000000,
      },
    ];
    let numberOfQuestions = 0;
    let minWinnings = 0;
  
    for (numberOfQuestions = 0; numberOfQuestions < 8; numberOfQuestions++) {
      alert(questions[numberOfQuestions].question);
      const answ = prompt('Выберите ответ: '
        + questions[numberOfQuestions].answer1 + ', '
        + questions[numberOfQuestions].answer2 + ', '
        + questions[numberOfQuestions].answer3 + ', '
        + questions[numberOfQuestions].answer4);
      if (answ === questions[numberOfQuestions].answerTrue) {
        alert('Вы ответили верно! И заработали ' + questions[numberOfQuestions].cost + ' рублей');
        if (numberOfQuestions === 4) {
          alert('Поздравляю Вы добрались до несгораемой суммы!');
          minWinnings = 5000;
        } else if (numberOfQuestions === 9) {
          alert('Поздравляю Вы добрались до второй несгораемой суммы!');
          minWinnings = 100000;
        } else if (numberOfQuestions === 14) {
          alert('Поздравляю Вы выиграли!');
          minWinnings = 3000000;
          break;
        }
      } else {
        if (minWinnings === 0) {
          alert('Вы проиграли');
        } else if (minWinnings === 5000) {
          alert('Вы проиграли, но несгораемая сумма 5000 рублей!');
        } else if (minWinnings === 100000) {
          alert('Вы проиграли, но несгораемая сумма 100 000 рублей!');
        }
        break;
      }
    }
  }

  wantToBeAMillionaire();