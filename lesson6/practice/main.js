const ceil = document.getElementsByClassName('game-item');
const reset = document.getElementById('reset-game');
const message = document.getElementById('message');
let player = 'X';
let stepCount = 0;
const winCombinations = [
  [1, 2, 3],
  [1, 4, 7],
  [1, 5, 9],
  [2, 5, 8],
  [3, 6, 9],
  [3, 5, 7],
  [4, 5, 6],
  [7, 8, 9],
];
let dataX = [];
let dataO = [];

function changePlayer() {
  player === 'X' ? (player = 'O') : (player = 'X');
}

function checkWin(arr, number) {
  for (let w = 0, wLen = winCombinations.length; w < wLen; w++) {
    const someWinArr = winCombinations[w];
    let count = 0;
    if (someWinArr.indexOf(number) !== -1) {
      for (let k = 0, kLen = someWinArr.length; k < kLen; k++) {
        if (arr.indexOf(someWinArr[k]) !== -1) {
          count++;
          if (count === 3) {
            return true;
          }
        }
      }
      count = 0;
    }
  }
  return false;
}

function currentStep() {
  const num = +this.getAttribute('data-ceil');
  if (!this.textContent) {
    this.innerText = player;
    if (player === 'X') {
      dataX.push(num);
      this.classList.add('x');
    } else {
      dataO.push(num);
      this.classList.add('o');
    }
    if (
      (dataO.length > 2 || dataX.length > 2)
      && (checkWin(dataO, num) || checkWin(dataX, num))
    ) {
      for (let i = 0; i < ceil.length; i++) {
        ceil[i].removeEventListener('click', currentStep);
      }
      message.innerText = 'Победил игрок ' + player;
      return true;
    }
    changePlayer();
    stepCount++;
    if (stepCount === 9) {
      message.innerText = 'Ничья';
    } else {
      message.innerText = 'Ходит игрок ' + player;
    }
  }
  return false;
}

for (let i = 0; i < ceil.length; i++) {
  ceil[i].addEventListener('click', currentStep);
}

reset.addEventListener('click', () => { // обработчик кнопки сброса
  for (let i = 0; i < ceil.length; i++) {
    ceil[i].innerText = ''; // очищаем ячейки
  }
  dataO = [];
  dataX = [];
  player = 'O';
  stepCount = 0;
  message.innerText = 'Ходит игрок ' + player;
  for (let i = 0; i < ceil.length; i++) {
    ceil[i].addEventListener('click', currentStep);
    ceil[i].classList.remove('x', 'o');
  }
});
