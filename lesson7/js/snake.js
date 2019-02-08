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
		divSnakeBlock.appendChild(divHUD);
		divBody.appendChild(divSnakeBlock);
	},

	animation: {
		init: () => {
			snakeDraw.animation.timerStep = setInterval(() => {
				game.nextFame();
			}, 200);
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

const createSettings = () => { // задаются вычисляемые свойства объектов
	snakeDraw.canvas.height = 500;
	snakeDraw.canvas.width = 500;

	snakeDraw.ctx = snakeDraw.canvas.getContext('2d');

	snakeDraw.mainSprait = new Image();
	snakeDraw.mainSprait.src = 'images/mainSprait.png';

	snakeDraw.greed.maxCellX = Math.floor(snakeDraw.canvas.width / snakeDraw.greed.cutX);
	snakeDraw.greed.maxCellY = Math.floor(snakeDraw.canvas.width / snakeDraw.greed.cutY);
};

window.onload = () => {
	createSettings();

	snakeDraw.createInterface();

	game.snake.startState(); // задаем стартовое положение змейки по центру экрана
	game.mouse.startState(); // задаем стартовое положение мышки рандомно

	snakeDraw.mainSprait.onload = () => { // запускаем анимацию
		snakeDraw.animation.init();
	};
};