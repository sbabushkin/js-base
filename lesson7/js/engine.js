class SNAKEBLOCK {
	constructor (name, posX, posY, direct, bodyDirect, animSet) {
		this.name = name;
		this.posX = posX;
		this.posY = posY;
		this.direct = direct;
		this.bodyDirect = bodyDirect; // для анимации блока body при движении
		this.animSet = animSet;
	}
}

class UNAVAILABLESECTOR {
	constructor (name, posX, posY) {
		this.name = name;
		this.posX = posX;
		this.posY = posY;
	}
}

const game = {
	unavailableSector: {
		state: [],

		addState: (where) => {
			for (let i in where){
				game.unavailableSector.state.push({
					name: where[i].name,
					posX: where[i].posX,
					posY: where[i].posY
				})
			}
		},

		updateState: () => {
			game.unavailableSector.state = [];
			game.unavailableSector.addState(game.snake.state);
			game.unavailableSector.addState(game.mouse.state);
		}
	},

	keyboard: {
		pause: {
			down: document.addEventListener('keydown', () => {
				game.keyboard.pause.pauseFunction();
			}),

			state: true,

			pauseFunction: () => {
				if (event.keyCode === 32) {
					if (game.keyboard.pause.state) {
						clearInterval(snakeDraw.animation.timerStep);
						cancelAnimationFrame(snakeDraw.animation.request);
						game.keyboard.pause.state = false;
						game.keyboard.state = false;
					} else {
						game.keyboard.pause.state = true;
						game.keyboard.state = true;
						snakeDraw.animation.init();
					}
				}
			}
		},

		changeDirect: document.addEventListener('keydown', () => {
			if (game.keyboard.state){
				game.keyboard.state = false;
				switch (event.keyCode) {
					case 38:
						if (game.settings.direct !== 'bottom') {
							game.settings.direct = 'top';
							game.settings.vx = 0;
							game.settings.vy = -1;
						}
						break;
					case 37:
						if (game.settings.direct !== 'right') {
							game.settings.direct = 'left';
							game.settings.vx = -1;
							game.settings.vy = 0;
						}
						break;
					case 40:
						if (game.settings.direct !== 'top') {
							game.settings.direct = 'bottom';
							game.settings.vx = 0;
							game.settings.vy = 1;
						}
						break;
					case 39:
						if (game.settings.direct !== 'left') {
							game.settings.direct = 'right';
							game.settings.vx = 1;
							game.settings.vy = 0;
						}
						break;
				}
			}
		}),

		start: undefined,

		state: true,
	},

	settings: {
		vx: 0,
		vy: -1,
		direct: 'top',
		score: 0,
		lives: 3,
		level: 1
	},

	snake: {
		state: [],

		startState: () => {
			if (snakeDraw.canvas){
				game.snake.state = [ // стартовое положение змейки
					new SNAKEBLOCK('head', Math.floor(snakeDraw.greed.maxCellX/2), Math.floor(snakeDraw.greed.maxCellY/2), 'top', undefined, 1),
					new SNAKEBLOCK('body', Math.floor(snakeDraw.greed.maxCellX/2), Math.floor(snakeDraw.greed.maxCellY/2)+1, 'top', 'top', 1),
					new SNAKEBLOCK('tail', Math.floor(snakeDraw.greed.maxCellX/2), Math.floor(snakeDraw.greed.maxCellY/2)+2, 'top', undefined, 1)
				];
				game.unavailableSector.updateState(); // добавляем на первом ходе
			}
		},

		addBlock: () => {
			game.snake.state[0].direct = game.settings.direct;
			let name;
			let direct;
			let bodyDirect;
			if (game.snake.state[1].name === 'body'){
				if (game.snake.state[1].direct === game.snake.state[0].direct){
					name = 'body';
					direct = game.snake.state[0].direct;
					switch (game.snake.state[1].bodyDirect) { // анимация изгибов
						case 'top':
							bodyDirect = 'bottom';
							break;
						case 'left':
							bodyDirect = 'right';
							break;
						case 'bottom':
							bodyDirect = 'top';
							break;
						case 'right':
							bodyDirect = 'left';
							break;
					}
				} else {
					name = 'bend';
					direct = game.snake.state[1].direct + '-' + game.snake.state[0].direct;
					bodyDirect = undefined;
				}
			} else {
				if (game.snake.state[1].direct.substring(game.snake.state[1].direct.indexOf('-')+1) === game.snake.state[0].direct) {
					name = 'body';
					direct = game.snake.state[0].direct;
					switch (game.snake.state[1].bodyDirect) { // анимация изгибов
						case 'top':
							bodyDirect = 'bottom';
							break;
						case 'left':
							bodyDirect = 'right';
							break;
						case 'bottom':
							bodyDirect = 'top';
							break;
						case 'right':
							bodyDirect = 'left';
							break;
					}
				} else {
					name = 'bend';
					direct = game.snake.state[1].direct.substring(game.snake.state[1].direct.indexOf('-')+1) + '-' + game.snake.state[0].direct;
					bodyDirect = undefined;
				}
			}
			game.snake.state.splice(1, 0, new SNAKEBLOCK(name, game.snake.state[0].posX, game.snake.state[0].posY, direct , bodyDirect , game.snake.state[0].animSet));
			game.snake.state[0].posX += game.settings.vx;
			game.snake.state[0].posY += game.settings.vy;
			game.unavailableSector.updateState();
		},

		step: () => {
			game.snake.state[0].direct = game.settings.direct; // изменяем направление сразу, так требует алгоритм
			for (let i = game.snake.state.length-1; i>-1; i--) {
				switch (game.snake.state[i].name) {
					case 'head':
						if (game.snake.state[i].posX + game.settings.vx <= -1) {
							game.snake.state[i].posX = snakeDraw.greed.maxCellX - 1;
						} else if (game.snake.state[i].posX + game.settings.vx >= snakeDraw.greed.maxCellX) {
							game.snake.state[i].posX = 0;
						} else {
							game.snake.state[i].posX += game.settings.vx;
						}
						if (game.snake.state[i].posY + game.settings.vy <= -1) {
							game.snake.state[i].posY = snakeDraw.greed.maxCellY - 1;
						} else if (game.snake.state[i].posY + game.settings.vy >= snakeDraw.greed.maxCellY) {
							game.snake.state[i].posY = 0;
						} else {
							game.snake.state[i].posY += game.settings.vy;
						}
						return;
					case 'body':
						if (game.snake.state[i].direct !== game.snake.state[i-1].direct){ // если произошла смена направления
							if (game.snake.state[i-1].name !== 'bend'){
								game.snake.state[i].direct = game.snake.state[i].direct + '-' + game.snake.state[i-1].direct;
							} else {
								game.snake.state[i].direct = game.snake.state[i-1].direct;
							}
							game.snake.state[i].bodyDirect = undefined;
							game.snake.state[i].name = 'bend';
						} else {
							switch (game.snake.state[i].bodyDirect) { // анимация изгибов
								case 'top':
									game.snake.state[i].bodyDirect = 'bottom';
									break;
								case 'left':
									game.snake.state[i].bodyDirect = 'right';
									break;
								case 'bottom':
									game.snake.state[i].bodyDirect = 'top';
									break;
								case 'right':
									game.snake.state[i].bodyDirect = 'left';
									break;
							}

						}
						break;
					case 'bend':
						switch (game.snake.state[i-1].name) {
							case 'head':
								if (game.snake.state[i].direct.substring(game.snake.state[i].direct.indexOf('-')+1) === game.snake.state[i-1].direct) {
									game.snake.state[i].bodyDirect = game.snake.state[i-1].direct;
									game.snake.state[i].direct = game.snake.state[i-1].direct;
									game.snake.state[i].name = 'body';
								} else {
									game.snake.state[i].direct = game.snake.state[i].direct.substring(game.snake.state[i].direct.indexOf('-')+1) + '-' + game.snake.state[i-1].direct
								}
								break;
							case 'body':
								game.snake.state[i].bodyDirect = game.snake.state[i-1].bodyDirect;
								game.snake.state[i].direct = game.snake.state[i-1].direct;
								game.snake.state[i].name = 'body';
								break;
							case 'bend':
								game.snake.state[i].direct = game.snake.state[i-1].direct;
								break;
						}
						break;
					case 'tail':
						if (game.snake.state[i-1].name === 'bend')
							game.snake.state[i].direct = game.snake.state[i-1].direct.substring(game.snake.state[i-1].direct.indexOf('-')+1);
						break;
				}
				game.snake.state[i].posX = game.snake.state[i-1].posX;
				game.snake.state[i].posY = game.snake.state[i-1].posY;
				game.unavailableSector.updateState();
			}
		}
	},

	mouse: {
		state: [],

		startState: () => {
			let check;
			let posX;
			let posY;
			for(let i=0; i < game.mouse.count(); i++){
				do {
					check = [false, false];
					posX = Math.round(Math.random() * (snakeDraw.greed.maxCellX- 1));
					posY = Math.round(Math.random() * (snakeDraw.greed.maxCellY - 1));
					for (let i in game.unavailableSector.state){
						if (game.unavailableSector.state[i].posX === posX
							&& game.unavailableSector.state[i].posY === posY){
							check[0] = true;
							break;
						}
					}
					for (let i in game.mouse.state){
						if (game.mouse.state[i].posX === posX
							&& game.mouse.state[i].posY === posY){
							check[1] = true;
							break;
						}
					}
				} while (!(check[0] === false && check[1] === false));
				if (game.mouse.state.length === 0) {
					game.mouse.state = [new UNAVAILABLESECTOR('mouse', posX, posY)]	;
				} else {
					game.mouse.state.push(new UNAVAILABLESECTOR('mouse', posX, posY));
				}
			}
			game.unavailableSector.updateState();
		},

		removeState: () => {
			for (let i in game.mouse.state){
				if (game.snake.state[0].posX === game.mouse.state[i].posX
				&& game.snake.state[0].posY === game.mouse.state[i].posY){
					game.mouse.state.splice(i, 1);
					game.unavailableSector.updateState();
					break;
				}
			}
			if (game.mouse.state.length === 0) {
				game.mouse.startState();
			}
		},

		count: () => {
			if (game.settings.score>=0 && game.settings.score<=1){
				return 1;
			} else if(game.settings.score>=2 && game.settings.score<=5){
				return 2;
			} else if(game.settings.score>=6 && game.settings.score<=11){
				return 3;
			} else if(game.settings.score>=12 && game.settings.score<=19){
				return 4;
			} else if(game.settings.score>=20 && game.settings.score<=29){
				return 5;
			}
		}
	},

	nextFame: () => {
		for (let i in game.unavailableSector.state){
			if (game.snake.state[0].posX + game.settings.vx === game.unavailableSector.state[i].posX
				&& game.snake.state[0].posY + game.settings.vy === game.unavailableSector.state[i].posY) {
				switch (game.unavailableSector.state[i].name){
					case 'body':
					case 'bend':
					case 'tail':
						if (--game.settings.lives === 0) {
							startGame('gameOver');
						} else {
							startGame('minusLive');
						}
						break;

					case 'mouse':
						if (++game.settings.score === 30) {
							startGame('nextLevel');
							return;
						}
						snakeDraw.score.textContent = 'Score ' + game.settings.score;
						game.snake.addBlock();
						game.mouse.removeState();
						break;
				}
				return;
			}
		}
		game.snake.step();
	}
};