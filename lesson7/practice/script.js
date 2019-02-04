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

let doc_score;

let doc_lives;


const SNAKE_COLOR_ODD = 'blue';
const SNAKE_COLOR_EVEN = 'yellow';
const APPLE_COLOR = 'green';
const FAKE_APPLE_COLOR = 'red';
const MAX_COUNT_FAKE_APPLES = 5;

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
//fake apples list
const fakeApples = [];
// tail elements list (aka tailPieces)
const tailPieces = [];
// tail size (1 for 10)
let tailSize = 20;
// self eating protection for head zone (aka safeZone)
const tailSizeMin = 20;
// is key in cooldown mode
const cooldown = false;

//Счет яблок
let score = 0; // current score

//Жизни
let lives = 3;


// функция рисования яблока
function spawnApple() {
    const
        newApple = {
            x: ~~(Math.random() * canv.width - 2 * aw) + aw,
            y: ~~(Math.random() * canv.height - 2 * ah) + ah,
            color: APPLE_COLOR,
        };

    let checkPosition = true;

    // проверка что яблоко не попало на хвост
    for (let i = 0; i < tailSize.length; i++) {
        if (
            newApple.x < (tailPieces[i].x + pw) &&
            newApple.x + aw > tailPieces[i].x &&
            newApple.y < (tailPieces[i].y + ph) &&
            newApple.y + ah > tailPieces[i].y
        ) {
            checkPosition = false;
        }
    }
    //проверка чтобы яблоко не попало на фейковое
    for (let a = 0; a < fakeApples.length; a++) {
        if (
            newApple.x < (fakeApples[a].x + aw) &&
            newApple.x + aw > fakeApples[a].x &&
            newApple.y < (fakeApples[a].y + ah) &&
            newApple.y + ah > fakeApples[a].y
        ) {
            checkPosition = false;
        }
    }

    if (checkPosition == true) {
        apples.push(newApple);
    } else {
        spawnApple();
        return;
    }
}

// функция рисования гнилого яблока
function spawnFakeApple() {
    const
        newFakeApple = {
            x: ~~(Math.random() * canv.width - 2 * aw) + aw,
            y: ~~(Math.random() * canv.height - 2 * ah) + ah,
            color: FAKE_APPLE_COLOR,
        };
    let checkPosition = true;

    // проверка что яблоко не попало на хвост
    for (let i = 0; i < tailSize.length; i++) {
        if (
            newFakeApple.x < (tailPieces[i].x + pw) &&
            newFakeApple.x + aw > tailPieces[i].x &&
            newFakeApple.y < (tailPieces[i].y + ph) &&
            newFakeApple.y + ah > tailPieces[i].y
        ) {
            checkPosition = false;
        }
    }
    // check for fake apple collisions with apples
    for (let a = 0; a < apples.length; a++) {
        if (
            newFakeApple.x < (apples[a].x + aw) &&
            newFakeApple.x + aw > apples[a].x &&
            newFakeApple.y < (apples[a].y + ah) &&
            newFakeApple.y + ah > apples[a].y
        ) {
            checkPosition = false;
        }
    }


    if (checkPosition == true) {
        fakeApples.push(newFakeApple);
    } else {
        spawnFakeApple();
        return;
    }
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
    if (fkp && tailPieces.length != tailSizeMin) {
        for (let i = tailPieces.length - tailSizeMin; i >= 0; i--) {
            if (
                px < (tailPieces[i].x + pw) &&
                px + pw > tailPieces[i].x &&
                py < (tailPieces[i].y + ph) &&
                py + ph > tailPieces[i].y
            ) {
                // got collision
                tailSize = tailSizeMin; // cut the tailSize
                speed = baseSpeed; // cut the speed (flash nomore lol xD)
                lives--;
                tailPieces.length = 0;
                doc_lives.innerHTML = 'Осталось попыток: ' + lives;
                if (lives === 0) {
                    pause();
                    init();
                }
                break;
            }
        }
    }

    // paint apples
    for (let a = 0; a < apples.length; a++) {
        ctx.fillStyle = apples[a].color;
        ctx.fillRect(apples[a].x, apples[a].y, aw, ah);
    }

    // paint fake apples
    for (let a = 0; a < fakeApples.length; a++) {
        ctx.fillStyle = fakeApples[a].color;
        ctx.fillRect(fakeApples[a].x, fakeApples[a].y, aw, ah);
    }

    // check for snake head collisions with apples
    for (let a = 0; a < apples.length; a++) {
        if (
            px < (apples[a].x + pw) &&
            px + pw > apples[a].x &&
            py < (apples[a].y + ph) &&
            py + ph > apples[a].y
        ) {
            // got collision with apple
            apples.splice(a, 1); // remove this apple from the apples list
            tailSize += ~~(baseSpeed / 3); // add tailSize length
            speed += 0.3; // add some speed
            spawnApple(); // spawn another apple(-s)
            score++;
            if (score % 3 == 0) {
                fakeApples.length = 0;
                for (let a = 0; a <= ~~(Math.random() * MAX_COUNT_FAKE_APPLES);a++) {
                    spawnFakeApple();
                }
            }
            doc_score.innerHTML = "Счет яблок: " + score;
            break;
        }
    }

    // check for snake head collisions with fakeApples
    for (let a = 0; a < fakeApples.length; a++) {
        if (
            px < (fakeApples[a].x + pw) &&
            px + pw > fakeApples[a].x &&
            py < (fakeApples[a].y + ph) &&
            py + ph > fakeApples[a].y
        ) {
            // got collision with apple
            fakeApples.length = 0; // remove this apple from the apples list
            tailSize = tailSizeMin; // cut the tailSize
            speed = baseSpeed; // cut the speed (flash nomore lol xD)
            lives--;
            tailPieces.length = 0;
            doc_lives.innerHTML = 'Осталось попыток: ' + lives;
            if (lives === 0) {
                pause();
                start();
            }
            break;
        }
    }
}

function start() {
    score = 0;
    lives = 3;
    doc_score = document.getElementById('game_score');
    doc_score.innerHTML = 'Счет яблок: ' + score;
    doc_lives = document.getElementById('game_lives');
    doc_lives.innerHTML = 'Осталось попыток: ' + lives;
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

window.onload = init;
