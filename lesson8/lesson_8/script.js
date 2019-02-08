/* eslint no-bitwise: 0 */
let interval;
// canvas
let canv;
// 2d context
let ctx;
// player X position
let px;
// player Y position
let py;

const SNAKE_COLOR_ODD = '#982400';
const SNAKE_COLOR_EVEN = '#ca3102';
const APPLE_COLOR = 'green';
const FIRE_COLOR = '#ffeb3b';

// game started && first key pressed (initialization states)\почалася гра && перша клавіша (держави ініціалізації)
const gs = false;
let fkp = false;
// snake movement speed\швидкість руху змії
const baseSpeed = 3;
let speed = baseSpeed;
// velocity (x & y)\швидкість (x & y)
let xv = 0;
let yv = 0;

// player size\розмір гравця
const pw = 15;
const ph = 15;
// apple size\розмір яблука
const aw = 15;
const ah = 15;
// apples list\список яблук
const apples = [];
// fire size\розмір огня
const fw = 30;
const fh = 30;
// fire list\список огня
const fires = [];
// tail elements list (aka tailPieces)\список елементів хвоста (так звані tailpieces)
const tailPieces = [];
// tail size (1 for 10)\розмір хвоста (1 для 10)
let tailSize = 20;
// self eating protection for head zone (aka safeZone)\захист від самозаймання для головної зони
const tailSizeMin = 20;
// is key in cooldown mode\є ключем у режимі перезарядки
const cooldown = false;
let score = 0; // current score\поточний рахунок
let scoreNum = document.getElementById('score');
let life = 3;

// apple drawing function\функция рисования яблока
function spawnApple() {
  const
    newApple = {
      x: ~~(Math.random() * canv.width - 2 * aw) + aw,
      y: ~~(Math.random() * canv.height - 2 * ah) + ah,
      color: APPLE_COLOR,
    };

  // check that the apple did not hit the tail\проверка что яблоко не попало на хвост
  for (let i = 0; i < tailSize-1; i++) {
    if (newApple.x < (tailPieces[i].x + pw)
      && newApple.x + aw > tailPieces[i].x
      && newApple.y < (tailPieces[i].y + ph)
      && newApple.y + ah > tailPieces[i].y) {
      spawnApple();
      return;
    }
  }
  // \проверка что яблоко не попало на огонь
  for (let i = 0; i < fires.length; i++) {
    if (newApple.x < (fires[i].x + fw+5)
      && newApple.x + aw+5 > fires[i].x
      && newApple.y < (fires[i].y + fh+5)
      && newApple.y + ah+5 > fires[i].y) {
      spawnApple();
      return;
    }
  }
  
  // checking that the apple got into the area and not around the edges somewhere\проверка что яблоко попало в область а не по краям гдето
  if ((newApple.x > 10 && newApple.x < 590) && (newApple.y > 10 && newApple.y < 390)) {
    apples.push(newApple);
  } else {
    spawnApple();
    return;
  }
}

// fire drawing function\функция рисования огня
function spawnFire() {
  const
    newFire = {
      x: ~~(Math.random() * canv.width - 2 * fw) + fw,
      y: ~~(Math.random() * canv.height - 2 * fh) + fh,
      color: FIRE_COLOR,
    };

  // check that the fire did not hit the tail\проверка что огонь не попал на хвост
  for (let i = 0; i < tailSize-1; i++) {
    if (newFire.x < (tailPieces[i].x + pw)
      && newFire.x + fw > tailPieces[i].x
      && newFire.y < (tailPieces[i].y + ph)
      && newFire.y + fh > tailPieces[i].y) {
      spawnFire();
      return;
    }
  }
  
  // \проверка что огонь не попал на яблоко
  for (let i = 0; i < apples.length; i++) {
    if (newFire.x < (apples[i].x + aw)
      && newFire.x + fw > apples[i].x
      && newFire.y < (apples[i].y + ah)
      && newFire.y + fh > apples[i].y) {
      spawnFire();
      return;
    }
  }
  
  if ((newFire.x > 10 && newFire.x < 590) && (newFire.y > 10 && newFire.y < 390)) {
    fires.push(newFire);
  } else {
    spawnFire();
    return;
  }
}

// screen drawing iteration\итерация рисования экрана
function loop() {
  // logic\логіка
  ctx.fillStyle = '#545454';
  ctx.fillRect(0, 0, canv.width, canv.height);

  // force speed\швидкість сили
  px += xv;
  py += yv;

  // teleports\телепортування
  if (px > canv.width) { px = 0; }
  if (px + pw < 0) { px = canv.width; }
  if (py + ph < 0) { py = canv.height; }
  if (py > canv.height) { py = 0; }

  // paint the snake itself with the tail elements\Пофарбуйте змію сам з елементами хвоста
  tailPieces.forEach((item, index) => {
    ctx.fillStyle = (index % 2) ? SNAKE_COLOR_EVEN : SNAKE_COLOR_ODD;
    ctx.fillRect(item.x, item.y, pw, ph);
  });

  // console.log(tailPieces.length);

  tailPieces.push({ x: px, y: py });

  // limiter\межа
  while (tailPieces.length > tailSize) {
    tailPieces.shift();
  }

  // checking that you crashed into yourself\проверка что врезались в себя
  for (let i = tailPieces.length - tailSizeMin; i >= 0; i--) {
    if (
      px < (tailPieces[i].x + pw)
      && px + pw > tailPieces[i].x
      && py < (tailPieces[i].y + ph)
      && py + ph > tailPieces[i].y
    ) {
      // got collision\отримали зіткнення
      tailSize = tailSizeMin; // cut the tailSize\розрізати хвіст розміру
      speed = baseSpeed; // cut the speed (flash nomore lol xD)\скоротити швидкість (flash nomore lol xD)
      score = 0;
      scoreNum.innerHTML = '<h2>Score - ' + score + '</h2>' + '<h3>Life - ' + life + '</h3>';
    }
  }

  // paint apples\фарби яблук
  for (let a = 0; a < apples.length; a++) {
    ctx.fillStyle = apples[a].color;
    ctx.fillRect(apples[a].x, apples[a].y, aw, ah);
  }
  
  // paint fires\фарби огня
  for (let a = 0; a < fires.length; a++) {
    ctx.fillStyle = fires[a].color;
    ctx.fillRect(fires[a].x, fires[a].y, fw, fh);
  }

  // check for snake head collisions with apples\перевірити на зіткнення голови змії з яблуками
  for (let a = 0; a < apples.length; a++) {
    if (
      px < (apples[a].x + pw)
      && px + pw > apples[a].x
      && py < (apples[a].y + ph)
      && py + ph > apples[a].y
    ) {
      // got collision with apple\отримав зіткнення з яблуком
      apples.splice(a, 1); // remove this apple from the apples list\видалити це яблуко з списку яблук
      tailSize += ~~(baseSpeed / 3); // add tailSize length\додайте довжину tailSize
      speed += 0.3; // add some speed\додайте деяку швидкість
      spawnApple(); // spawn another apple(-s)\породити ще одне яблуко (-s)
      score++;
      scoreNum.innerHTML = '<h2>Score - ' + score + '</h2>' + '<h3>Life - ' + life + '</h3>';
      break;
    }
  } 
  
  // check for snake head collisions with fire\проверка на столкновение с огнем и минус одна жизнь
  for (let a = 0; a < fires.length; a++) {
    if (
      px < (fires[a].x + fw)
      && px + pw > fires[a].x
      && py < (fires[a].y + fh)
      && py + ph > fires[a].y
    ) {
      fires.splice(a, 1); 
      speed = baseSpeed; 
      life--;
      scoreNum.innerHTML = '<h2>Score - ' + score + '</h2>' + '<h3>Life - ' + life + '</h3>';
      break;
    }
  } 
  
  // game over
  if (life === 0) {
    pause();
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, canv.width, canv.height);
    ctx.strokeStyle = '#000';
    ctx.font = 'bold 85px sans-serif';
    ctx.strokeText('Game Over', 200, 250);
    
  }
}

function start() {
  interval = setInterval(loop, 1000 / 50); // 50 FPS
}

let rest = document.getElementById('score');
rest.onclick = restart;

function restart() {
  start();
}

function pause() {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
}

// velocity changer (controls)
function changeDirection(evt) {
  if (!fkp && [37, 38, 39, 40].indexOf(evt.keyCode) > -1) {
    fkp = true;
    spawnApple();
  }

  if (evt.keyCode === 32) {
    if (interval) {
      pause();
    } else {
      start();
    }
  }

  if (evt.keyCode === 37 && !(xv > 0)) { // left arrow
    xv = -speed; yv = 0;
  }

  if (evt.keyCode === 38 && !(yv > 0)) { // top arrow
    xv = 0; yv = -speed;
  }

  if (evt.keyCode === 39 && !(xv < 0)) { // right arrow
    xv = speed; yv = 0;
  }

  if (evt.keyCode === 40 && !(yv < 0)) { // down arrow
    xv = 0; yv = speed;
  }
}

function init() {
  canv = document.getElementById('mc');
  ctx = canv.getContext('2d');
  px = ~~(canv.width) / 2;
  py = ~~(canv.height) / 2;
  document.addEventListener('keydown', changeDirection);
  start();
  setInterval(spawnFire, 10000);
}

window.onload = init;