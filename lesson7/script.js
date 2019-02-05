let FIELD_SIZE_X = 20;
let FIELD_SIZE_Y = 20;
let SNAKE_SPEED = 300;
let snake = [];
let direction = 'y+';
let gameIsRunning = false;
let snakeTimer;
let foodTimer;
let score = 0;
let scoreField;

function init() {
    prepareGameField(); // Генерация поля

    scoreField = document.getElementById('score-field');
    scoreField.innerHTML = score;

    let main = document.getElementsByClassName('main')[0];
    if (20 * (FIELD_SIZE_X + 1) < 380) {
        main.style.width = '380px';
    }
    else {
        main.style.width = (20 * (FIELD_SIZE_X + 1)).toString() + 'px';
    }

    // События кнопок Старт,Новая игра
    document.getElementById('snake-start').addEventListener('click', startGame);
    document.getElementById('snake-renew').addEventListener('click', refreshGame);
    addEventListener('keydown', changeDirection);
}


function prepareGameField() {
    // Создаём таблицу
    let gameTable = document.createElement('table');
    gameTable.className = 'game-table';


    for (let i = 0; i < FIELD_SIZE_Y; i++) {
        let row = document.createElement('tr');
        row.className = 'game-table-row row-' + i;

        for (let j = 0; j < FIELD_SIZE_X; j++) {
            let cell = document.createElement('td');
            cell.className = 'game-table-cell cell-' + i + '-' + j;
            row.appendChild(cell);
        }
        gameTable.appendChild(row);
    }

    document.getElementById('snake-field').appendChild(gameTable);
}


function startGame() {
    gameIsRunning = true;
    respawn();

    snakeTimer = setInterval(move, SNAKE_SPEED);
    setTimeout(createFood, 3000);
    setInterval(createBlockage, 5000);
}


function respawn() {
    let startCoordX = Math.floor(FIELD_SIZE_X / 2);
    let startCoordY = Math.floor(FIELD_SIZE_Y / 2);

    // Голова
    let snakeHead = document.getElementsByClassName('cell-' + startCoordY + '-' + startCoordX)[0];
    snakeHead.setAttribute('class', snakeHead.getAttribute('class') + ' snake-unit');
    // Тело
    let snakeTail = document.getElementsByClassName('cell-' + (startCoordY - 1) + '-' + startCoordX)[0];
    snakeTail.setAttribute('class', snakeTail.getAttribute('class') + ' snake-unit');

    snake.push(snakeHead);
    snake.push(snakeTail);
}


function move() {
    let snakeHeadClasses = snake[snake.length - 1].getAttribute('class').split(' ');
    let newUnit;
    let snakeCoords = snakeHeadClasses[1].split('-');

    let coordY = parseInt(snakeCoords[1]);
    let coordX = parseInt(snakeCoords[2]);


    if (direction == 'x-') {
        newUnit = document.getElementsByClassName('cell-' + (coordY) + '-' + (coordX - 1))[0];
        if (snakeCoords[2] == (FIELD_SIZE_X - FIELD_SIZE_X)) {
            newUnit = document.getElementsByClassName('cell-' + (coordY) + '-' + (coordX + (FIELD_SIZE_X - 1)))[0];
        }
    }
    // через стенку
    else if (direction == 'x+') {
        newUnit = document.getElementsByClassName('cell-' + (coordY) + '-' + (coordX + 1))[0];
        if (snakeCoords[2] == (FIELD_SIZE_X - 1)) {
            newUnit = document.getElementsByClassName('cell-' + (coordY) + '-' + (coordX - (FIELD_SIZE_X - 1)))[0];
        }
    }
    else if (direction == 'y+') {
        newUnit = document.getElementsByClassName('cell-' + (coordY - 1) + '-' + (coordX))[0];
        if (snakeCoords[1] == (FIELD_SIZE_Y - FIELD_SIZE_Y)) {
            newUnit = document.getElementsByClassName('cell-' + (coordY + (FIELD_SIZE_Y - 1)) + '-' + (coordX))[0];
        }
    }
    else if (direction == 'y-') {
        newUnit = document.getElementsByClassName('cell-' + (coordY + 1) + '-' + (coordX))[0];
        if (snakeCoords[1] == (FIELD_SIZE_Y - 1)) {
            newUnit = document.getElementsByClassName('cell-' + (coordY - (FIELD_SIZE_Y - 1)) + '-' + (coordX))[0];
        }
    }

    //проверки
    if (!isSnakeUnit(newUnit) && newUnit !== undefined) {
        newUnit.setAttribute('class', newUnit.getAttribute('class') + ' snake-unit');
        snake.push(newUnit);
        if (!haveFood(newUnit)) {
            let removed = snake.splice(0, 1)[0];
            let classes = removed.getAttribute('class').split(' ');


            removed.setAttribute('class', classes[0] + ' ' + classes[1]);
        }

        if (haveBlockage(newUnit)) {
            finishTheGame();
        }
    }
    else {
        finishTheGame();
    }
}


function isSnakeUnit(unit) {
    let check = false;

    if (snake.includes(unit)) {
        check = true;
    }
    return check;
}

function haveFood(unit) {
    let check = false;

    let unitClasses = unit.getAttribute('class').split(' ');

    if (unitClasses.includes('food-unit')) {
        check = true;
        createFood();

        scoreField.innerHTML = ++score;
    }
    return check;
}


// Создание еды

function createFood() {
    let foodCreated = false;

    while (!foodCreated) {
        let foodX = Math.floor(Math.random() * FIELD_SIZE_X);
        let foodY = Math.floor(Math.random() * FIELD_SIZE_Y);

        let foodCell = document.getElementsByClassName('cell-' + foodY + '-' + foodX)[0];
        let foodCellClasses = foodCell.getAttribute('class').split(' ');


        if (!foodCellClasses.includes('snake-unit')) {
            let classes = '';

            for (let i = 0; i < foodCellClasses.length; i++) {
                classes += foodCellClasses[i] + ' ';
            }

            foodCell.setAttribute('class', classes + 'food-unit');
            foodCreated = true;
        }
    }
}


// препятствия

function createBlockage() {
    let blockCreated = false;


    while (!blockCreated) {
        let blockX = Math.floor(Math.random() * FIELD_SIZE_X);
        let blockY = Math.floor(Math.random() * FIELD_SIZE_Y);

        let blockCell = document.getElementsByClassName('cell-' + blockY + '-' + blockX)[0];
        let blockCellClasses = blockCell.getAttribute('class').split(' ');


        if (!blockCellClasses.includes('snake-unit')) {
            let classes = '';

            for (let i = 0; i < blockCellClasses.length; i++) {
                classes += blockCellClasses[i] + ' ';
            }

            blockCell.setAttribute('class', classes + 'block-unit');
            blockCreated = true;
        }
    }
}


function haveBlockage(unit) {
    let check = false;

    let unitClasses = unit.getAttribute('class').split(' ');

    if (unitClasses.includes('block-unit')) {
        check = true;
    }
    return check;
}


function changeDirection(e) {
    switch (e.keyCode) {
        case 37: //  влево
            if (direction != 'x+') {
                direction = 'x-'
            }
            break;
        case 38: //  вверх
            if (direction != 'y-') {
                direction = 'y+'
            }
            break;
        case 39: //  вправо
            if (direction != 'x-') {
                direction = 'x+'
            }
            break;
        case 40: //  вниз
            if (direction != 'y+') {
                direction = 'y-'
            }
            break;
    }
}


function finishTheGame() {
    gameIsRunning = false;
    clearInterval(snakeTimer);
    clearInterval(snakeTimer);
    alert('Вы проиграли! Ваш результат: ' + score.toString());
}


function refreshGame() {
    location.reload();
}

window.onload = init;