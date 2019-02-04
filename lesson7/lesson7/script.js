/* eslint no-bitwise: 0 */
let interval; // canvas
let canv; // 2d context
let ctx; // player X position
let px; // player Y position
let py;

const SNAKE_COLOR_ODD = 'blue';
const SNAKE_COLOR_EVEN = 'yellow';
const APPLE_COLOR = 'green';

// game started && first key pressed (initialization states)
const gs = false;
let fkp = false; // snake movement speed
const baseSpeed = 3;
let speed = baseSpeed; // velocity (x & y)
let xv = 0;
let yv = 0;

// player size
const pw = 20;
const ph = 20; // apple size
const aw = 20;
const ah = 20; // apples list
const apples = []; // список элементов яблок
const obstacles = []; //список элементов преград
const tailPieces = []; // tail size (1 for 10)
let tailSize = 20; // self eating protection for head zone (aka safeZone)
const tailSizeMin = 20; // is key in cooldown mode
const cooldown = false;
const score = 0; // current score
let appleEat = 0; //Количества съеденных яблок
let live = 0;

// функция рисования яблока
function spawnApple() {
  const newApple = {
    x: ~~(Math.random() * ((canv.width - 40) - 2 * aw)) + aw * 2,
    y: ~~(Math.random() * ((canv.height - 40) - 2 * ah)) + ah * 2,
    color: APPLE_COLOR,
  };

  // проверка что яблоко не попало на хвост
  for (let i = 0; i < tailSize.length; i++) {
    if (
      (newApple.x < (tailPieces[i].x + pw) &&
        newApple.x + aw > tailPieces[i].x &&
        newApple.y < (tailPieces[i].y + ph) &&
        newApple.y + ah > tailPieces[i].y)
    ) {
      spawnApple();
      return;
    }
  }
  apples.push(newApple);
}
//Функция рисования препятствий
function spawnObstacles() {
  const newStop = {
    x: ~~(Math.random() * (550 - 50) + 50),
    y: ~~(Math.random() * (350 - 50) + 50),
    plesx: ~~(Math.random() * (60 - 15) + 15),
    plesy: ~~(Math.random() * (60 - 15) + 15),
  };
  obstacles.push(newStop);
}

// итерация рисования экрана
function loop() {
  // logic
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canv.width, canv.height);
  // force speed
  px += xv;
  py += yv;

  // teleports
  if (px > canv.width) {
    px = 0;
  }
  if (px + pw < 0) {
    px = canv.width;
  }
  if (py + ph < 0) {
    py = canv.height;
  }
  if (py > canv.height) {
    py = 0;
  }

  // paint the snake itself with the tail elements
  tailPieces.forEach((item, index) => {
    ctx.fillStyle = (index % 2) ? SNAKE_COLOR_EVEN : SNAKE_COLOR_ODD;
    ctx.fillRect(item.x, item.y, pw, ph);
  });

  // console.log(tailPieces.length);
  tailPieces.push({
    x: px,
    y: py
  });

  // limiter
  while (tailPieces.length > tailSize) {
    tailPieces.shift();
  }

  // проверка что врезались в себя
  for (let i = tailPieces.length - tailSizeMin; i >= 0; i--) {
    if (
      px < (tailPieces[i].x + pw) &&
      px + pw > tailPieces[i].x &&
      py < (tailPieces[i].y + ph) &&
      py + ph > tailPieces[i].y
    ) {
      // получил столкновение
      tailSize = tailSizeMin; // отрезать хвост
      speed = baseSpeed; // сократить скорость (вспышка Nore LOL XD)
    }
  }

  // рисовать яблоки
  for (let a = 0; a < apples.length; a++) {
    ctx.fillStyle = apples[a].color;
    ctx.fillRect(apples[a].x, apples[a].y, aw, ah);
  }

  // проверить на столкновение головы змеи с яблоками
  for (let a = 0; a < apples.length; a++) {
    if (
      px < (apples[a].x + pw) &&
      px + pw > apples[a].x &&
      py < (apples[a].y + ph) &&
      py + ph > apples[a].y
    ) {
      // столкнулся с яблоком
      apples.splice(a, 1); // remove this apple from the apples list
      tailSize += ~~(baseSpeed / 3); // add tailSize length
      speed += 0.3; // add some speed
      spawnApple(); // spawn another apple(-s)
      spawnObstacles();
      obstacles.splice(a, 1);
      appleEat++; //подщет очков
      applEat.innerHTML = 'Счет: ' + appleEat;
      break;
    }
  }
  //уровни сложности
  if (appleEat >= 5 && appleEat < 10) {
    level1();
  } else if (appleEat >= 10 && appleEat < 15) {
    level2();
  } else if (appleEat >= 15 && appleEat < 20) {
    level3();
  } else if (appleEat >= 20 && appleEat < 30) {
    level4();
  } else if (appleEat >= 30) {
    applEat.innerHTML = 'Поздравляю вы выиграли!';
  }
}

function level1() {
  //рисовать препятствия
  for (let a = 0; a < obstacles.length; a++) {
    ctx.fillStyle = 'red';
    ctx.fillRect(obstacles[a].x, obstacles[a].y, obstacles[a].plesx, obstacles[a].plesy);
    lev2.className = 'play';
  }

  // проверить на столкновение головы змеи с Obstacles
  for (let a = 0; a < obstacles.length; a++) {
    if (
      px < (obstacles[a].x + obstacles[a].plesx) && //право
      px + 20 > obstacles[a].x && //лево
      py < (obstacles[a].y + obstacles[a].plesy) && //низ
      py + 20 > obstacles[a].y //верх
    ) {
      applEat.innerHTML = 'Игра закончена! Вы набрали ' + appleEat + ' очков.';
      stop();
      break;
    }
  }
}

function level2() {
  //рисовать препятствия
  for (let a = 0; a < obstacles.length; a++) {
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, 600, 20);
    ctx.fillRect(0, 380, 600, 400);
    lev3.className = 'play';
  }

  // проверить на столкновение головы змеи с Obstacles
  for (let a = 0; a < obstacles.length; a++) {
    if (
      (px < (0 + 600) && px + 20 > 0 && py < (0 + 18) && py + 20 > 0) ||
      (px < (0 + 600) && px + 20 > 0 && py < (385 + 400) && py + 20 > 385)
    ) {
      applEat.innerHTML = 'Игра закончена! Вы набрали ' + appleEat + ' очков.';
      stop();
      break;
    }
  }
}

function level3() {
  //рисовать препятствия
  for (let a = 0; a < obstacles.length; a++) {
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, 600, 20);
    ctx.fillRect(0, 380, 600, 400);
    ctx.fillRect(0, 0, 20, 400);
    ctx.fillRect(580, 0, 600, 400);
    lev4.className = 'play';
  }

  // проверить на столкновение головы змеи с Obstacles
  for (let a = 0; a < obstacles.length; a++) {
    if (
      (px < (0 + 600) && px + 20 > 0 && py < (0 + 18) && py + 20 > 0) ||
      (px < (0 + 18) && px + 20 > 0 && py < (0 + 400) && py + 20 > 0) ||
      (px < (0 + 600) && px + 20 > 0 && py < (382 + 400) && py + 20 > 382) ||
      (px < (582 + 600) && px + 20 > 582 && py < (0 + 400) && py + 20 > 0)
    ) {
      applEat.innerHTML = 'Игра закончена! Вы набрали ' + appleEat + ' очков.';
      stop();
      break;
    }
  }
}

function level4() {
  //рисовать препятствия
  for (let a = 0; a < obstacles.length; a++) {
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, 600, 20);
    ctx.fillRect(0, 380, 600, 400);
    ctx.fillRect(0, 0, 20, 400);
    ctx.fillRect(580, 0, 600, 400);
    ctx.fillRect(obstacles[a].x, obstacles[a].y, obstacles[a].plesx, obstacles[a].plesy);
    lev5.className = 'play';
  }

  // проверить на столкновение головы змеи с Obstacles
  for (let a = 0; a < obstacles.length; a++) {
    if (
      (px < (0 + 600) && px + 20 > 0 && py < (0 + 18) && py + 20 > 0) ||
      (px < (0 + 18) && px + 20 > 0 && py < (0 + 400) && py + 20 > 0) ||
      (px < (0 + 600) && px + 20 > 0 && py < (382 + 400) && py + 20 > 382) ||
      (px < (582 + 600) && px + 20 > 582 && py < (0 + 400) && py + 20 > 0) ||
      (px < (obstacles[a].x + obstacles[a].plesx) &&
        px + 20 > obstacles[a].x &&
        py < (obstacles[a].y + obstacles[a].plesy) &&
        py + 20 > obstacles[a].y)
    ) {
      applEat.innerHTML = 'Поздравляю вы добрались до 5 уровня! Вы набрали ' + appleEat + ' очков.';
      stop();
      break;
    }
  }
}

function start() {
  interval = setInterval(loop, 1000 / 50); // 50 FPS
}

function pause() {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
}

// регулятор скорости (управление)
function changeDirection(evt) {
  if (!fkp && [37, 38, 39, 40].indexOf(evt.keyCode) > -1) {
    fkp = true;
    spawnApple();
    spawnObstacles();
  }

  if (evt.keyCode === 32) {
    if (interval) {
      pause();
    } else {
      start();
    }
  }

  if (evt.keyCode === 37 && !(xv > 0)) { // left arrow
    xv = -speed;
    yv = 0;
  }

  if (evt.keyCode === 38 && !(yv > 0)) { // top arrow
    xv = 0;
    yv = -speed;
  }

  if (evt.keyCode === 39 && !(xv < 0)) { // right arrow
    xv = speed;
    yv = 0;
  }

  if (evt.keyCode === 40 && !(yv < 0)) { // down arrow
    xv = 0;
    yv = speed;
  }
}

function init() {
  canv = document.getElementById('mc');
  ctx = canv.getContext('2d');
  px = ~~(canv.width) / 2;
  py = ~~(canv.height) / 2;
  document.addEventListener('keydown', changeDirection);
  start();
}

function stop() {
  clearInterval(interval);
}
window.onload = init;
