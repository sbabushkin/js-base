"use strict";

let snake = {
    body: null,
    direction: null,
    lastStepDirection: null,
    settings: null,
    lives: null,
    init(startPoint, direction, settings) {

        this.body = [startPoint];
        this.lastStepDirection = direction;
        this.direction = direction;
        this.settings = settings;
        this.lives = 9;
    },
    loseLife() {
        this.lives -= 1;
    },
    getLives() {
        return this.lives;
    },
    getNextStepHeadPoint() {
        let firstPoint = this.body[0];

        switch (this.direction) {
            case 'up':
                return { x: firstPoint.x, y: (this.settings.rowsCount + firstPoint.y - 1) % this.settings.rowsCount};
            case 'down':
                return { x: firstPoint.x, y: (firstPoint.y + 1) % this.settings.rowsCount};
            case 'right':
                return { x: (firstPoint.x + 1) % this.settings.colsCount, y: firstPoint.y};
            case 'left' :
                return { x: (this.settings.colsCount + firstPoint.x - 1) % this.settings.colsCount, y: firstPoint.y};
        }
    },

    isBodyPoint(point) {
        return this.body.some(snakePoint => snakePoint.x === point.x && snakePoint.y === point.y);
    },
    makeStep() {
        this.lastStepDirection = this.direction;
        this.body.unshift(this.getNextStepHeadPoint());
        this.body.pop();
    },

    setDirection(direction) {
        this.direction = direction;
    },

    incrementBody() {
        let lastBodyIdx = this.body.length - 1;
        let lastBodyPoint = this.body[lastBodyIdx];
        let lastBodyPointClone = Object.assign({}, lastBodyPoint);
        this.body.push(lastBodyPointClone);
    }
};

let renderer = {
    cells: {},
    renderMap(rowsCount, colsCount) {
        let table = document.getElementById('game');
        table.innerHTML = '';

        for (let row = 0; row < rowsCount; row++) {
            let tr = document.createElement('tr');
            tr.classList.add('row');
            table.appendChild(tr);

            for (let col = 0; col < colsCount; col++) {
                let td = document.createElement('td');
                td.classList.add('cell');
                tr.appendChild(td);
                this.cells[`x${col}_y${row}`] = td;
            }
        }
    },

    render(snakePointArray, foodPoint, brickPoint) {
        for (let key of Object.getOwnPropertyNames(this.cells)) {
            this.cells[key].className = 'cell';
        }
        
        snakePointArray.forEach((point, idx) => {
            this.cells[`x${point.x}_y${point.y}`].classList.add(idx === 0 ? 'snakeHead' : 'snakeBody');
        });
        this.cells[`x${foodPoint.x}_y${foodPoint.y}`].classList.add('food');

        this.cells[`x${brickPoint.x}_y${brickPoint.y}`].classList.add('brick');

    }
};

let food = {
    x: null,
    y: null,

    setFoodCoordinates(point) {
        this.x = point.x;
        this.y = point.y;
    },

    getFoodCoordinates() {
        return {
            x: this.x,
            y: this.y,
        }
    },

    isFoodPoint(point) {
        return this.x === point.x && this.y === point.y;
    }
};

let brick = {
    x: null,
    y: null,

    setBrickCoordinates(point) {
        this.x = point.x;
        this.y = point.y;
    },

    getBrickCoordinates() {
        return {
            x: this.x,
            y: this.y,
        }
    },

    isBrickPoint(point) {
        return this.x === point.x && this.y === point.y;
    }
}

let status = {
    condition: null,

    setPlaying() {
        this.condition = 'playing';
    },

    setStopped() {
        this.condition = 'stopped';
    },

    setFinished() {
        this.condition = 'finished';
    },

    isPlaying() {
        return this.condition === 'playing';
    },

    isStopped() {
        return this.condition === 'stopped';
    }
};

let settings = {
    rowsCount: 21,
    colsCount: 21,
    speed: 2,
    winLength: 999,

    validate() {
        if (this.rowsCount < 10 || this.rowsCount > 30) {
            console.error('Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30].');
            return false;
        }

        if (this.colsCount < 10 || this.colsCount > 30) {
            console.error('Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30].');
            return false;
        }

        if (this.speed < 1 || this.speed > 10) {
            console.error('Неверные настройки, значение speed должно быть в диапазоне [1, 10].');
            return false;
        }

        return true;
    },
};

let game = {
    settings,
    status,
    renderer,
    food,
    brick,
    snake,
    tickInterval: null,

    init(userSettings = {}) {
        Object.assign(this.settings, userSettings);
        if (!this.settings.validate()) {
            return;
        }

        this.renderer.renderMap(this.settings.rowsCount, this.settings.colsCount);

        this.setEventHandlers();

        this.reset();
    },

    reset() {
        this.stop();

        this.snake.init(this.getStartSnakePoint(), 'up', this.settings);

        this.food.setFoodCoordinates(this.getRandomCoordinates());
        
        this.brick.setBrickCoordinates(this.getRandomCoordinates());

        this.render();
    },

    render() {
        this.renderer.render(this.snake.body, this.food.getFoodCoordinates(), this.brick.getBrickCoordinates());
    },

    play() {
        //ставим статус в играем
        this.status.setPlaying();
        //запускать шаги змейки
        this.tickInterval = setInterval(() => this.tickHandler(), 1000 / this.settings.speed)
        //меняем кнопку игры на стоп
        this.changePlayButton('Стоп');
    },

    stop() {
        //ставим статус в стоп
        this.status.setStopped();
        //останавливаем шаги змейки
        clearInterval(this.tickInterval);
        //меняем кнопку игры на старт
        this.changePlayButton('Старт');
    },

    finish() {
        //ставим статус в финиш
        this.status.setFinished();
        //останавливаем шаги змейки
        clearInterval(this.tickInterval);
        //меняем кнопку игры, сделаем серой и напишем игра закончена
        this.changePlayButton('Игра закончена', true);
    },

    tickHandler() {
        if (!this.canSnakeMakeStep()) {
            this.finish();
            return;
        }

        if (this.food.isFoodPoint(this.snake.getNextStepHeadPoint())) {
            this.snake.incrementBody();
            this.food.setFoodCoordinates(this.getRandomCoordinates());
            if (this.isGameWon()) {
                this.finish();
            }
        }

        if (this.brick.isBrickPoint(this.snake.getNextStepHeadPoint())) {
            this.snake.loseLife();
            if (snake.getLives() == 0) {
                this.finish();
            }
            this.brick.setBrickCoordinates(this.getRandomCoordinates());
        }

        this.snake.makeStep();
        this.render();
        this.displayScore();
    },

    displayScore() {
        document.getElementById('score').innerText = this.snake.body.length - 1;
        let lives = '';
        for (let i = 0; i < this.snake.lives; i++) {
            lives += '<i class="fas fa-heart-broken"></i>';
        }
        document.getElementById('lives-wrap').innerHTML = lives;
    },

    isGameWon() {
        return this.snake.body.length > this.settings.winLength;
    },

    canSnakeMakeStep() {
        let nextHeadPoint = this.snake.getNextStepHeadPoint();

        return !this.snake.isBodyPoint(nextHeadPoint);
    },

    setEventHandlers() {
        document.getElementById('playButton').addEventListener('click', () => this.playClickHandler());
        document.getElementById('newGameButton').addEventListener('click', () => this.newGameClickHandler());
        document.addEventListener('keydown', () => this.keyDownHandler(event));
    },

    playClickHandler() {
        if (this.status.isPlaying()) {
            this.stop();
        } else if (this.status.isStopped()) {
            this.play();
        }
    },

    newGameClickHandler() {
        this.reset();
        this.displayScore();
    },

    keyDownHandler(event) {
        if (!this.status.isPlaying()) {
            return;
        }

        let direction = this.getDirectionByCode(event.code);
        if (this.canSetDirection(direction)) {
            this.snake.setDirection(direction);
        }
    },

    canSetDirection(direction) {
        return direction === 'up' && this.snake.lastStepDirection !== 'down' ||
               direction === 'right' && this.snake.lastStepDirection !== 'left' ||
               direction === 'down' && this.snake.lastStepDirection !== 'up' ||
               direction === 'left' && this.snake.lastStepDirection !== 'right';
    },

    getDirectionByCode(code) {
        switch (code) {
            case 'KeyW':
            case 'ArrowUp':
                return 'up';
            case 'KeyD':
            case 'ArrowRight':
                return 'right';
            case 'KeyS':
            case 'ArrowDown':
                return 'down';
            case 'KeyA':
            case 'ArrowLeft':
                return 'left';
            default:
                return '';
          }
    },

    changePlayButton(textContent, isDisabled = false) {
        let playButton = document.getElementById('playButton');
        playButton.textContent = textContent;
        isDisabled ? playButton.classList.add('disabled') : playButton.classList.remove('disabled');
    },

    getStartSnakePoint() {
        return {
            x: Math.floor(this.settings.colsCount / 2),
            y: Math.floor(this.settings.rowsCount / 2),
        };
    },

    getRandomCoordinates() {
        let exclude = [this.food.getFoodCoordinates(), this.brick.getBrickCoordinates(), ...this.snake.body];
        console.log(exclude);
        while (true) {
            //случайная точка в пределах игрового поля
            let rndPoint = {
                x: Math.floor(Math.random() * this.settings.colsCount),
                y: Math.floor(Math.random() * this.settings.rowsCount),
            };

            //проверяем не содержится ли в массиве exclude нашей случайной точки
            let excludeContainsRndPoint = exclude.some(function (exPoint) {
                return rndPoint.x === exPoint.x && rndPoint.y === exPoint.y;
            });

            //if (координата не содержится в массиве exclude) {}
            if (!excludeContainsRndPoint) {
                console.log(rndPoint);
                return rndPoint;
            }
        }
    },
}

window.onload = () => game.init({ speed: 5 });