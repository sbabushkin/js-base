const snakeDraw = {
	canvas: document.createElement('canvas'),

	ctx: undefined, // задается в createSettings()

	mainSprait: undefined, // задается в createSettings()

	greed: {
		cutX: 20, // размеры ячейки в пикселях
		cutY: 20,
		maxCellX: undefined, // количество ячеек задается в createSettings()
		maxCelly: undefined, // количество ячеек задается в createSettings()
	},

	lives: document.createElement('p'),

	score: document.createElement('p'),

	level: document.createElement('p'),

	object: {
		snake: {
			head: (dx, dy, direct) => {
				snakeDraw.object.snake.draw(dx, dy, direct, 'head');
			},
			
			body: (dx, dy, direct) => {
				snakeDraw.object.snake.draw(dx, dy, direct, 'body');
			},
			
			tail: (dx, dy, direct) => {
				snakeDraw.object.snake.draw(dx, dy, direct, 'tail');
			},
			
			bend: (dx, dy, direct) => {
				snakeDraw.object.snake.draw(dx, dy, direct, 'bend');
			},

			draw: (dx, dy, direct, object) => {
				let dir;
				switch (direct){
					case 'top':
					case 'top-left':
					case 'right-bottom':
						dir = 1;
						break;
					case 'left':
					case 'left-bottom':
					case 'top-right':
						dir = 2;
						break;
					case 'bottom':
					case 'bottom-right':
					case 'left-top':
						dir = 3;
						break;
					case 'right':
					case 'right-top':
					case 'bottom-left':
						dir = 4;
						break;
				}
				let thisPos;
				switch (object){
					case 'head':
						thisPos = 0;
						break;
					case 'body':
						thisPos = 1;
						break;
					case 'tail':
						thisPos = 2;
						break;
					case 'bend':
						thisPos = 3;
						break;
				}
				snakeDraw.ctx.drawImage(
					snakeDraw.mainSprait,
					thisPos * 12 + 1,
					dir * 12 + 1,
					10,
					10,
					dx * snakeDraw.greed.cutX,
					dy * snakeDraw.greed.cutY,
					snakeDraw.greed.cutX,
					snakeDraw.greed.cutY
				);
			}
		},

		mouse: {
			draw: (dx, dy) => {
				snakeDraw.ctx.drawImage(
					snakeDraw.mainSprait,
					1,
					60,
					20,
					20,
					dx * snakeDraw.greed.cutX,
					dy * snakeDraw.greed.cutY,
					snakeDraw.greed.cutX,
					snakeDraw.greed.cutY
				)
			}
		}
	},

	createInterface: function () {
		const divBody = document.querySelector('body');
		const divSnakeBlock = document.createElement('div');
		divSnakeBlock.setAttribute('class', 'snake-block');
		snakeDraw.canvas.setAttribute('class', 'snake-block__game-zone');
		divSnakeBlock.appendChild(snakeDraw.canvas);
		const divHUD = document.createElement('div');
		divHUD.setAttribute('class', 'snake-block__HUD');

		const divLives = document.createElement('div');
		divLives.setAttribute('class', 'snake-block__HUD-lives');
		const divLivesImg = document.createElement('div');
		divLivesImg.setAttribute('class', 'snake-block__HUD-lives-img');
		divLives.appendChild(divLivesImg);

		snakeDraw.lives.setAttribute('class', 'snake-block__HUD-lives-number');
		snakeDraw.lives.textContent = '3';
		divLives.appendChild(snakeDraw.lives);
		divHUD.appendChild(divLives);

		snakeDraw.score.setAttribute('class', 'snake-block__HUD-score');
		snakeDraw.score.textContent = 'Score ' + game.settings.score;
		divHUD.appendChild(snakeDraw.score);

		snakeDraw.level.setAttribute('class', 'snake-block__HUD-level');
		snakeDraw.level.textContent = 'Level 1';
		divHUD.appendChild(snakeDraw.level);

		const btnStart = document.createElement('button');
		btnStart.setAttribute('id', 'snake-block__HUD-btn-start');
		btnStart.setAttribute('class', 'snake-block__HUD-btn');
		btnStart.textContent = 'Start (F2)';
		btnStart.addEventListener('click', startGame);
		divHUD.appendChild(btnStart);

		const btnPause = document.createElement('button');
		btnPause.setAttribute('id', 'snake-block__HUD-btn-pause');
		btnPause.setAttribute('class', 'snake-block__HUD-btn');
		btnPause.textContent = 'Pause (Space)';
		btnPause.addEventListener('click', game.keyboard.pause.pauseFunction);
		divHUD.appendChild(btnPause);

		divSnakeBlock.appendChild(divHUD);
		divBody.appendChild(divSnakeBlock);
	},

	createSettings: () => { // задаются вычисляемые свойства объектов
		snakeDraw.canvas.height = 500;
		snakeDraw.canvas.width = 500;

		snakeDraw.ctx = snakeDraw.canvas.getContext('2d');

		snakeDraw.greed.maxCellX = Math.floor(snakeDraw.canvas.width / snakeDraw.greed.cutX);
		snakeDraw.greed.maxCellY = Math.floor(snakeDraw.canvas.width / snakeDraw.greed.cutY);

		snakeDraw.mainSprait = new Image();
		snakeDraw.mainSprait.onload = () => {
			game.keyboard.start = document.addEventListener('keydown', () => {
				if (event.keyCode === 113) {
					startGame();
				}
			});
		};
		snakeDraw.mainSprait.src = 'images/mainSprait.png';
	},

	animation: {
		init: () => {
			if (snakeDraw.animation.timerStep) {
				clearInterval(snakeDraw.animation.timerStep);
			}
			snakeDraw.animation.timerStep = setInterval(() => {
				game.nextFame();
				game.keyboard.state = true;
			}, 200*(1-Math.log10(game.settings.level)/5));
			if (snakeDraw.animation.request) {
				cancelAnimationFrame(snakeDraw.animation.request);
			}
			snakeDraw.animation.loopDraw();
		},

		loopDraw: () => {
			snakeDraw.ctx.clearRect(0, 0, snakeDraw.canvas.width, snakeDraw.canvas.height);

			for (let i in game.snake.state) { // отрисовка змейки
				snakeDraw.object.snake[game.snake.state[i].name](
					game.snake.state[i].posX,
					game.snake.state[i].posY,
					game.snake.state[i].bodyDirect ? game.snake.state[i].bodyDirect : game.snake.state[i].direct
				);
			}

			for (let i in game.mouse.state){ // отрисовка мышки
				snakeDraw.object.mouse.draw(game.mouse.state[i].posX, game.mouse.state[i].posY);
			}

			snakeDraw.animation.request = requestAnimationFrame(snakeDraw.animation.loopDraw);
		},

		request: undefined, // requestAnimationFrame

		timerStep: undefined, // таймер на вычисление следующего шага змейки
	},
};

const startGame = (set) => {
	game.settings.vx = 0;
	game.settings.vy = -1;
	game.settings.direct = 'top';
	game.settings.score = 0;
	snakeDraw.score.textContent = 'Score ' + game.settings.score;
	if (set === 'nextLevel'){
		game.settings.level++;
		snakeDraw.level.textContent = 'Level ' + game.settings.level;
	} else if (set === 'minusLive') {
		snakeDraw.lives.textContent = game.settings.lives;
	} else if (!set) {
		game.settings.lives = 3;
		snakeDraw.lives.textContent = game.settings.lives;
		game.settings.level = 1;
		snakeDraw.level.textContent = 'Level ' + game.settings.level;
	}
	if (set !== 'gameOver'){
		game.mouse.state = [];
		game.keyboard.state = true;
		game.keyboard.pause.state = true;
		game.snake.startState(); // задаем стартовое положение змейки по центру экрана
		game.mouse.startState(); // задаем стартовое положение мышки рандомно
		snakeDraw.animation.init(); // запускаем анимацию
	} else {
		snakeDraw.lives.textContent = game.settings.lives;
		clearInterval(snakeDraw.animation.timerStep);
		cancelAnimationFrame(snakeDraw.animation.request);
	}
	document.querySelector('body').focus();

};

window.onload = () => {
	snakeDraw.createSettings();
	snakeDraw.createInterface();
};