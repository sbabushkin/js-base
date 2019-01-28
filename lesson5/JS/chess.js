'use strict';
const pawn = {
    color: '#000', //colors: white/black #000/#FFF
    pic: 'pawn.png'
, }
const boardCell = function () {
    this.id = '';
    this.cellColor = 'white'; //colors: white/black #000/#FFF
    this.cellType = 'none';
    this.figureColor = 'white';
    this.icon = ''; //black/white
}
const chessBoard = [[new boardCell, new boardCell, new boardCell, new boardCell, new boardCell, new boardCell, new boardCell, new boardCell]
                    , [new boardCell, new boardCell, new boardCell, new boardCell, new boardCell, new boardCell, new boardCell, new boardCell]
                    , [new boardCell, new boardCell, new boardCell, new boardCell, new boardCell, new boardCell, new boardCell, new boardCell]
                    , [new boardCell, new boardCell, new boardCell, new boardCell, new boardCell, new boardCell, new boardCell, new boardCell]
                    , [new boardCell, new boardCell, new boardCell, new boardCell, new boardCell, new boardCell, new boardCell, new boardCell]
                    , [new boardCell, new boardCell, new boardCell, new boardCell, new boardCell, new boardCell, new boardCell, new boardCell]
                    , [new boardCell, new boardCell, new boardCell, new boardCell, new boardCell, new boardCell, new boardCell, new boardCell]
                    , [new boardCell, new boardCell, new boardCell, new boardCell, new boardCell, new boardCell, new boardCell, new boardCell], ];
const cellName = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

function initBoard() {
    let legendXDiv = document.getElementsByClassName('legendX');
    for (let k = 0; k < legendXDiv.length; k++) {
        for (let l = 0; l < chessBoard.length; l++) {
            let legendNameX = document.createElement('div');
            legendNameX.innerHTML = cellName[l];
            legendNameX.className = 'cellsname';
            legendXDiv[k].appendChild(legendNameX);
        }
    }
    for (let i = 0; i < chessBoard.length; i++) {
        //заполняем легендуY
        let legendYDiv = document.getElementsByClassName('legendY');
        if (legendYDiv != null) {
            for (let k = 0; k < legendYDiv.length; k++) {
                let legendNameY = document.createElement('div');
                legendNameY.innerHTML = i + 1;
                legendYDiv[k].appendChild(legendNameY);
            }
        }
        for (let j = 0; j < chessBoard[i].length; j++) {
            chessBoard[i][j].cellType = '';
            chessBoard[i][j].figureColor = '';
            if (i == 1) {
                chessBoard[i][j].cellType = 'PAWN';
                chessBoard[i][j].figureColor = 'white';
                chessBoard[i][j].icon = '&#9817';
            }
            if (i == 6) {
                chessBoard[i][j].cellType = 'PAWN';
                chessBoard[i][j].figureColor = 'black';
                chessBoard[i][j].icon = '&#9823';
            }
            if (i == 0 && (j == 0 || j == 7)) {
                chessBoard[i][j].cellType = 'ROOK';
                chessBoard[i][j].figureColor = 'white';
                chessBoard[i][j].icon = '&#9814';
            }
            if (i == 7 && (j == 0 || j == 7)) {
                chessBoard[i][j].cellType = 'ROOK';
                chessBoard[i][j].figureColor = 'black';
                chessBoard[i][j].icon = '&#9820';
            }
            if (i == 0 && (j == 1 || j == 6)) {
                chessBoard[i][j].cellType = 'HORSE';
                chessBoard[i][j].figureColor = 'white';
                chessBoard[i][j].icon = '&#9816';
            }
            if (i == 7 && (j == 1 || j == 6)) {
                chessBoard[i][j].cellType = 'HORSE';
                chessBoard[i][j].figureColor = 'black';
                chessBoard[i][j].icon = '&#9822';
            }
            if (i == 0 && (j == 2 || j == 5)) {
                chessBoard[i][j].cellType = 'BISHOP';
                chessBoard[i][j].figureColor = 'white';
                chessBoard[i][j].icon = '&#9815';
            }
            if (i == 7 && (j == 2 || j == 5)) {
                chessBoard[i][j].cellType = 'BISHOP';
                chessBoard[i][j].figureColor = 'black';
                chessBoard[i][j].icon = '&#9821';
            }
            if (i == 0 && (j == 3)) {
                chessBoard[i][j].cellType = 'QUEEN';
                chessBoard[i][j].figureColor = 'white';
                chessBoard[i][j].icon = '&#9813';
            }
            if (i == 7 && (j == 3)) {
                chessBoard[i][j].cellType = 'QUEEN';
                chessBoard[i][j].figureColor = 'black';
                chessBoard[i][j].icon = '&#9819';
            }
            if (i == 0 && (j == 4)) {
                chessBoard[i][j].cellType = 'KING';
                chessBoard[i][j].figureColor = 'white';
                chessBoard[i][j].icon = '&#9812';
            }
            if (i == 7 && (j == 4)) {
                chessBoard[i][j].cellType = 'KING';
                chessBoard[i][j].figureColor = 'black';
                chessBoard[i][j].icon = '&#9818';
            }
        }
    }
    return;
}

function change(id) {
    for (let i = 0; i < chessBoard.length; i++) {
        for (let j = 0; j < chessBoard[i].length; j++) {
            if (chessBoard[i][j].id === id) {
                let div = document.getElementById(id);
                div.style = 'background-color: ' + 'gray';
            }
        }
    }
    return;
}

function chess() {
    let parentDiv = document.getElementById("sChessBoard");
    for (let i = chessBoard.length - 1; i >= 0; i--) {
        for (let j = 0; j <= chessBoard[i].length - 1; j++) {
            //Рисуем поле доски
            var div = document.createElement('div');
            div.id = cellName[j] + '' + Number(i + 1);
            div.className = 'cell' + String(i) + String(j) + ' cells';
            div.setAttribute('onclick', 'change("' + String(cellName[j]) + String(Number(i + 1)) + '")');
            if ((i + 1 + j + 1) % 2 == 0) {
                chessBoard[i][j].cellColor = 'darkkhaki';
            }
            else {
                chessBoard[i][j].cellColor = 'white';
            }
            div.style = 'background-color:' + chessBoard[i][j].cellColor;
            div.innerHTML = chessBoard[i][j].icon;
            if (parentDiv != null) {
                parentDiv.appendChild(div);
            }
            chessBoard[i][j].id = cellName[j] + '' + Number(i + 1);
            //      parentDiv.appendChild(div);
        }
    }
}
window.onload = initBoard();
window.onload = chess();