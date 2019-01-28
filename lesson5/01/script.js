//начало система координат верхний левый угол,

function CHESSFIGURE (posX, posY, useable, chessClass) {
	this.posX = posX;
	this.posY = posY;
	this.useable = useable; // на доске или вне ее true/false
	this.chessClass = chessClass;
}

chess = {
	figure: { // шахматные фигуры и их свойства
		blackBishop1: new CHESSFIGURE(3, 8, true, 'chess__black-bishop'),
		blackBishop2: new CHESSFIGURE(6, 8, true, 'chess__black-bishop'),
		blackKing: new CHESSFIGURE(4, 8, true, 'chess__black-king'),
		blackKnight1: new CHESSFIGURE(2, 8, true, 'chess__black-knight'),
		blackKnight2: new CHESSFIGURE(7, 8, true, 'chess__black-knight'),
		blackPawn1: new CHESSFIGURE(1, 7, true, 'chess__black-pawn'),
		blackPawn2: new CHESSFIGURE(2, 7, true, 'chess__black-pawn'),
		blackPawn3: new CHESSFIGURE(3, 7, true, 'chess__black-pawn'),
		blackPawn4: new CHESSFIGURE(4, 7, true, 'chess__black-pawn'),
		blackPawn5: new CHESSFIGURE(5, 7, true, 'chess__black-pawn'),
		blackPawn6: new CHESSFIGURE(6, 7, true, 'chess__black-pawn'),
		blackPawn7: new CHESSFIGURE(7, 7, true, 'chess__black-pawn'),
		blackPawn8: new CHESSFIGURE(8, 7, true, 'chess__black-pawn'),
		blackQueen: new CHESSFIGURE(5, 8, true, 'chess__black-queen'),
		blackRook1: new CHESSFIGURE(1, 8, true, 'chess__black-rook'),
		blackRook2: new CHESSFIGURE(8, 8, true, 'chess__black-rook'),
		whiteBishop1: new CHESSFIGURE(3, 1, true, 'chess__white-bishop'),
		whiteBishop2: new CHESSFIGURE(6, 1, true, 'chess__white-bishop'),
		whiteKing: new CHESSFIGURE(4, 1, true, 'chess__white-king'),
		whiteKnight1: new CHESSFIGURE(2, 1, true, 'chess__white-knight'),
		whiteKnight2: new CHESSFIGURE(7, 1, true, 'chess__white-knight'),
		whitePawn1: new CHESSFIGURE(1, 2, true, 'chess__white-pawn'),
		whitePawn2: new CHESSFIGURE(2, 2, true, 'chess__white-pawn'),
		whitePawn3: new CHESSFIGURE(3, 2, true, 'chess__white-pawn'),
		whitePawn4: new CHESSFIGURE(4, 2, true, 'chess__white-pawn'),
		whitePawn5: new CHESSFIGURE(5, 2, true, 'chess__white-pawn'),
		whitePawn6: new CHESSFIGURE(6, 2, true, 'chess__white-pawn'),
		whitePawn7: new CHESSFIGURE(7, 2, true, 'chess__white-pawn'),
		whitePawn8: new CHESSFIGURE(8, 2, true, 'chess__white-pawn'),
		whiteQueen: new CHESSFIGURE(5, 1, true, 'chess__white-queen'),
		whiteRook1: new CHESSFIGURE(1, 1, true, 'chess__white-rook'),
		whiteRook2: new CHESSFIGURE(8, 1, true, 'chess__white-rook')
	},

	createTable: function() { // отрисовка шахматной доски
		let arr_name = ['a', 'b', 'c', 'd', 'i', 'f', 'g', 'h'];
		let div_chess = document.querySelector('#chess');
		let table = document.createElement('table');
		for (let i=0; i<10; i++){
			let tr = document.createElement('tr');
			for (let j=0; j<10; j++){
				let td = document.createElement('td');
				if ((j === 0 || j === 9) && i>0) td.textContent = arr_name[i-1];
				if (i === 0 || i === 9) {
					if (j > 0 && j < 9) td.textContent = j;
				}
				tr.appendChild(td);
			}
			table.appendChild(tr);
		}
		div_chess.appendChild(table);
	},

	showFigure: function () { // отрисовка шахматных фигур
		let chessTable = document.querySelector('.chess').childNodes[0];
		for (let i=1; i<9; i++){
			for (let j=1; j<9; j++) {
				if (chessTable.childNodes[j].childNodes[i].childNodes[0]){  // удаляем фигуры если они есть
					chessTable.childNodes[j].childNodes[i].removeChild(chessTable.childNodes[j].childNodes[i].childNodes[0]);
				}
				for (let val in chess.figure){ // в каждую клетку добаляем див с фигурой, если она там должна быть
					if (chess.figure[val].hasOwnProperty('posX')){
						if (chess.figure[val].hasOwnProperty('posY')){
							if (chess.figure[val].hasOwnProperty('useable')){
								if (chess.figure[val].hasOwnProperty('chessClass')){
									if (chess.figure[val]['posX'] === i && chess.figure[val]['posY'] === j && chess.figure[val]['useable']){
										let divFigure = document.createElement('div');
										divFigure.setAttribute('class', 'chess__figure ' + chess.figure[val]['chessClass']);
										chessTable.childNodes[j].childNodes[i].appendChild(divFigure);
									}
								} else {
									throw new Error(chess.figure[val] + 'does not a chess figure');
								}
							} else {
								throw new Error(chess.figure[val] + 'does not a chess figure');
							}
						} else {
							throw new Error(chess.figure[val] + 'does not a chess figure');
						}
					} else {
						throw new Error(chess.figure[val] + 'does not a chess figure');
					}
				}
			}
		}
	}
};

window.onload = function(){
	chess.createTable();
	chess.showFigure();
};