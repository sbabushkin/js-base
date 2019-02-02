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

const SNAKE_COLOR_ODD = 'blue';
const SNAKE_COLOR_EVEN = 'yellow';
const APPLE_COLOR = 'green';
const BLOCK_COLOR = 'red';

// game started && first key pressed (initialization states)
const gs = false;
let fkp = false;
// snake movement speed
const baseSpeed = 3;
let speed = baseSpeed;
// velocity (x & y)
let xv = 0;
let yv = 0;

// player size
const pw = 20;
const ph = 20;
// apple size
const aw = 20;
const ah = 20;
// apples list
const apples = [];
// tail elements list (aka tailPieces)
const tailPieces = [];
// tail size (1 for 10)
let tailSize = 20;
// self eating protection for head zone (aka safeZone)
const tailSizeMin = 20;
// is key in cooldown mode
const cooldown = false;
let score = 0; // current score
// Задание 2, переменные
let roadBlocks = []; // {x: ?, y: ?}
const rbColor = 'red';
const rbW = 20; // block width
const rbH = 50; // block height
// how often we would check block positioning
// curretly 50 fps , so if we want 10 sec = 500;
const roadBlocksTimer = 250;
let roadBlocksTimerCount = 0;
const fontSizeFamily = '22px serif'; // font size and family

// функция рисования яблока
function spawnApple() {
  const
    newApple = {
      x: ~~(Math.random() * canv.width - 2 * aw) + aw,
      y: ~~(Math.random() * canv.height - 2 * ah) + ah,
      color: APPLE_COLOR,
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

// 2. Генерировать временные препятствия на поле.

const generateNewRoadBlock = () =>{
  let rbX = Math.floor(Math.random() * canv.width);
  if(rbX > (canv.width - rbW) && rbX <=  canv.width){
    rbX = canv.width - rbW;
  }
  let rbY = Math.floor(Math.random() * canv.height);
  if(rbY > (canv.height - rbH) && rbY <= canv.height){
    rbY = canv.height - rbH;
  }

  // we need to check where we put our blocks
    // first -> player 
  for (let i=0; i<tailPieces.length;i++){
    if (
      (rbX <= (tailPieces[i].x + pw) &&
      rbX >= tailPieces[i].x ||
      (rbX + rbW) >= tailPieces[i].x &&
      (rbX + rbW) <= (tailPieces[i].x + pw)) || 
      (
        rbY <= (tailPieces[i].y + rbH) &&
        rbY >= tailPieces[i].y ||
        (rbY + rbH) >= tailPieces[i].y &&
        (rbY + rbH) <= (tailPieces[i].y + rbH)
      )
    ){
      generateNewRoadBlock();
      return;
    }
  }

  roadBlocks.push({
    x: rbX,
    y: rbY,
  })
}

const spawnRoadBlocks = () =>{
  for(keys in roadBlocks){
    ctx.fillStyle = rbColor;
    ctx.fillRect(roadBlocks[keys].x, roadBlocks[keys].y, rbW, rbH)
  }
}

const gotCollision = () =>{
  tailSize = tailSizeMin; // cut the tailSize
  speed = baseSpeed; // cut the speed (flash nomore lol xD)
  // 1) Выводить счёт в режиме реального времени.
  score = 0; // reset the score
  roadBlocks = [];
  return;
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
  if (px > canv.width) { px = 0; }
  if (px + pw < 0) { px = canv.width; }
  if (py + ph < 0) { py = canv.height; }
  if (py > canv.height) { py = 0; }

  // paint the snake itself with the tail elements
  tailPieces.forEach((item, index) => {
    ctx.fillStyle = (index % 2) ? SNAKE_COLOR_EVEN : SNAKE_COLOR_ODD;
    ctx.fillRect(item.x, item.y, pw, ph);
  });

  tailPieces.push({ x: px, y: py });

  // console.log(tailPieces);

  // limiter
  while (tailPieces.length > tailSize) {
    tailPieces.shift();
  }

  // проверка что врезались в себя

  if(fkp){
    for (let i = tailPieces.length - tailSizeMin; i >= 0; i--) {
      if (
        px < (tailPieces[i].x + pw)
        && px + pw > tailPieces[i].x
        && py < (tailPieces[i].y + ph)
        && py + ph > tailPieces[i].y
      ) {
        // got collision
        gotCollision();
        break;
      }
    }
  }

  // paint apples
  for (let a = 0; a < apples.length; a++) {
    ctx.fillStyle = apples[a].color;
    ctx.fillRect(apples[a].x, apples[a].y, aw, ah);
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
      score++;
      apples.splice(a, 1); // remove this apple from the apples list
      tailSize += ~~(baseSpeed / 3); // add tailSize length
      speed += 0.3; // add some speed
      spawnApple(); // spawn another apple(-s)
      break;
    }
  }

  // 1) Выводить счёт в режиме реального времени.
  // draw score 
  ctx.fillStyle = 'white';
  ctx.font = fontSizeFamily;
  ctx.fillText(score, 100, 100); // (text, X, Y)
  
  // 2) we need to decide how often we will show blocks and how often change positions and how many at once we want to see
  if(fkp){
    roadBlocksTimerCount++; // timer count for road block appear
  }
  if(roadBlocksTimerCount === roadBlocksTimer){
    // each time we reach our timer - reset timer and do something
    // roadBlocks.splice(0,1);
    generateNewRoadBlock();
    roadBlocksTimerCount = 0;
  } 
  // road block drawing here:
  spawnRoadBlocks(); // draw road blocks from array;
  // check road block collision for snake head
  for (k in roadBlocks){
    if(
      px < (roadBlocks[k].x + rbW) &&
      (px + pw) > roadBlocks[k].x &&
      py < (roadBlocks[k].y + rbH) &&
      (py + ph) > roadBlocks[k].y
    ){ // got collision
      gotCollision();
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

// velocity changer (controls)
function changeDirection(evt) {
  if (!fkp && [37, 38, 39, 40].indexOf(evt.keyCode) > -1) {
    fkp = true;
    spawnApple();
    generateNewRoadBlock();
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
  let currentTime = 0;
  // setInterval(()=>{
  //   currentTime++
  //   console.log(`${currentTime} seconds`)}, 1000);
  start();
}

window.onload = init;
