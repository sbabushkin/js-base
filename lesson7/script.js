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

const SNAKE_COLOR_ODD = '#37474F';
const SNAKE_COLOR_EVEN = '#455A64';
const pic = new Image(); pic.src = 'img/apple.svg';
const picFire = new Image(); picFire.src = 'img/fire.svg';

// game started && first key pressed (initialization states)
const gs = false;
let fkp = false;
// snake movement speed
const baseSpeed = 10;
let speed = baseSpeed;
// velocity (x & y)
let xv = 0;
let yv = 0;

var elementSize = 30;

// player size
const pw = elementSize;
const ph = elementSize;
// apple size
const aw = elementSize;
const ah = elementSize;
// apples list
const apples = [];
// fires list
const fires = [];
// tail elements list (aka tailPieces)
const tailPieces = [];
// tail size (1 for 10)
let tailSize = 10;
// self eating protection for head zone (aka safeZone)
const tailSizeMin = 10;
// is key in cooldown mode
const cooldown = false;

let score = -1; // current score
let lives = 5; // current lives
let addLive = 0;

function gameLives() {
    document.getElementById('gamelives').innerText = lives;
    // console.log("Жизней: " + lives);
}

function gameScore() {
    score++;
    document.getElementById('gamescore').innerText = score;
    // console.log("Съето яблок: " + score);
}

// функция рисования яблока
function spawnApple() {
  const
    newApple = {
      x: ~~(Math.random() * gameWidth - 4 * aw) + aw * 2,
      y: ~~(Math.random() * gameHeight - 4 * ah) + ah * 2,
    };

  // проверка что яблоко не попало на хвост
  for (let i = 0; i < tailSize.length; i++) {
    if (
      newApple.x < (tailPieces[i].x + pw)
      && newApple.x + aw > tailPieces[i].x
      && newApple.y < (tailPieces[i].y + ph)
      && newApple.y + ah > tailPieces[i].y
    ) {
      spawnApple();
      return;
    }
  }
  apples.push(newApple);
}
// функция рисования огня
function spawnFire() {
    const
      newRock = {
        x: ~~(Math.random() * gameWidth - 4 * aw) + aw * 2,
        y: ~~(Math.random() * gameHeight - 4 * ah) + ah * 2,
      };
  
    // проверка что огонь не попал на хвост
    for (let i = 0; i < tailSize.length; i++) {
      if (
        newRock.x < (tailPieces[i].x + pw)
        && newRock.x + aw > tailPieces[i].x
        && newRock.y < (tailPieces[i].y + ph)
        && newRock.y + ah > tailPieces[i].y
      ) {
        spawnFire();
        return;
      }
    }
    fires.push(newRock);
  }

// итерация рисования экрана
function loop() {
  // logic
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canv.width, canv.height);

  // force speed
  px += xv;
  py += yv;

  // teleports
  if (px > canv.width) { px = 0; }
  if (px + pw < 0) { px = canv.width; }
  if (py + ph < 0) { py = canv.height; }
  if (py > canv.height) { py = 0; }

  // paint the snake itself with the tail elements
  tailPieces.forEach((item, index) => {
    ctx.fillStyle = (index % 2) ? SNAKE_COLOR_EVEN : SNAKE_COLOR_ODD;
    ctx.fillRect(item.x, item.y, pw, ph);
  });
  // console.log(tailPieces.length);
  tailPieces.push({ x: px, y: py });

  // limiter
  while (tailPieces.length > tailSize) {
    tailPieces.shift();
  }

  // проверка что врезались в себя
  for (let i = tailPieces.length - tailSizeMin; i >= 0; i--) {
    if (
      px < (tailPieces[i].x + pw)
      && px + pw > tailPieces[i].x
      && py < (tailPieces[i].y + ph)
      && py + ph > tailPieces[i].y
      && score > 1
      && fkp == true
    ) {
      // got collision
      tailSize = tailSizeMin; // cut the tailSize
      speed = baseSpeed; // cut the speed (flash nomore lol xD)
      lives--;
      gameLives();
    }
  }

  // paint apples
  for (let a = 0; a < apples.length; a++) {
    ctx.drawImage(pic, apples[a].x, apples[a].y, aw, ah);
  }
  // check for snake head collisions with apples
  for (let a = 0; a < apples.length; a++) {
    if (
      px < (apples[a].x + pw)
      && px + pw > apples[a].x
      && py < (apples[a].y + ph)
      && py + ph > apples[a].y
    ) {
      // got collision with apple
      apples.splice(a, 1); // remove this apple from the apples list
      tailSize += ~~(baseSpeed / 3); // add tailSize length
      speed += 0.3; // add some speed
      gameScore();
      
      spawnApple(); // spawn another apple(-s)
      addLive++;
      if(addLive == 3) {
          spawnFire();
      }
      if(addLive == 5) {
          spawnFire();
          lives++;
          gameLives()
          addLive = 0;
      }
      break;
    }
  }
    // paint fires
    for (let a = 0; a < fires.length; a++) {
        ctx.drawImage(picFire, fires[a].x, fires[a].y, aw, ah);
      }
      // check for snake head collisions with fires
      for (let a = 0; a < fires.length; a++) {
        if (
          px < (fires[a].x + pw)
          && px + pw > fires[a].x
          && py < (fires[a].y + ph)
          && py + ph > fires[a].y
        ) {
          // got collision with fire
          fires.splice(a, 1); // remove this fire from the fires list
          tailSize -= ~~(baseSpeed / 3); // add tailSize length
          speed -= 0.3; // add some speed
          lives--;
          gameLives();
          spawnFire();
          spawnApple();
          break;
        }
      }
      if(lives < 1) {
          gameOver();
      }
}

function start() {
  interval = setInterval(loop, 1000 / 40); // 40 FPS
}

function pause() {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
}

function gameOver() {
    clearInterval(interval);
    interval = null;
    let gameOverWindow = document.createElement("div");
    gameOverWindow.id = 'gameover';
    gameOverWindow.className = 'gameover';
    gameOverWindow.innerHTML = '<div class="gameover_image"></div><h2>Игра закончена</h2><div class="gameover_score">Ваш счет: ' + score + '</div><img src="img/apple.svg">'
    document.getElementById('app').appendChild(gameOverWindow);
}

// velocity changer (controls)
function changeDirection(evt) {
  if (!fkp && [37, 38, 39, 40].indexOf(evt.keyCode) > -1) {
    fkp = true;
    spawnFire();
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

var gameWidth = document.getElementsByTagName('body')[0].offsetWidth,
    gameHeight = document.getElementsByTagName('body')[0].clientHeight;

// Строим игровое поле
function makeGameField() {
    console.log("Размер игрового поля " + gameWidth + "x" + gameHeight + " пикселей");
    if(gameWidth == 0 || gameHeight == 0) {
      makeGameField();
    }

    let gamePanel = document.createElement("div");
    gamePanel.className = 'panel';
    gamePanel.innerHTML = '<div class="panel_logo"><img src="img/snake.svg" alt="Змейка">Змейка</div><div class="panel_info"><div class="gamescore" id="gamescore"></div><div class="gamelives" id="gamelives"></div></div>';
    document.getElementById('app').appendChild(gamePanel);;

    let canvas = document.createElement("canvas");
        canvas.id = 'mc';
        canvas.width = gameWidth;
        canvas.height = gameHeight;
        document.getElementById('app').appendChild(canvas);
}
// Инициализируем игрока
function init() {
  canv = document.getElementById('mc');
  ctx = canv.getContext('2d');
  px = ~~(canv.width) / 2;
  py = ~~(canv.height) / 2;
  document.addEventListener('keydown', changeDirection);
  start();
  gameScore();
  gameLives();
}
function buildApp() {
    makeGameField();
    init();
}
window.onload = buildApp();