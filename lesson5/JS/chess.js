'use strict';
const pawn = {
    color: '#000', //colors: white/black #000/#FFF
    pic: 'pawn.png'
, }
const boardCell = {
    height: 20
    , width: 20
    , cellColor: 'white', //colors: white/black #000/#FFF
    cellType: pawn
    , name: ''
, }
const chessBoard = [[boardCell, boardCell, boardCell, boardCell, boardCell, boardCell, boardCell, boardCell]
                    , [boardCell, boardCell, boardCell, boardCell, boardCell, boardCell, boardCell, boardCell]
                    , [boardCell, boardCell, boardCell, boardCell, boardCell, boardCell, boardCell, boardCell]
                    , [boardCell, boardCell, boardCell, boardCell, boardCell, boardCell, boardCell, boardCell]
                    , [boardCell, boardCell, boardCell, boardCell, boardCell, boardCell, boardCell, boardCell]
                    , [boardCell, boardCell, boardCell, boardCell, boardCell, boardCell, boardCell, boardCell]
                    , [boardCell, boardCell, boardCell, boardCell, boardCell, boardCell, boardCell, boardCell]
                    , [boardCell, boardCell, boardCell, boardCell, boardCell, boardCell, boardCell, boardCell], ];
const cellName = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

function chess() {
    let parentDiv = document.getElementById("sChessBoard");
    for (let i = chessBoard.length - 1; i >= 0; i--) {
        //заполняем легендуY
        let legendYDiv = document.getElementsByClassName('legendY');
        if (legendYDiv != null) {
            for (let k = 0; k < legendYDiv.length; k++) {
                let legendNameY = document.createElement('div');
                legendNameY.innerHTML = i;
                legendYDiv[k].appendChild(legendNameY);
            }
        }
        for (let j = 0; j <= chessBoard[i].length - 1; j++) {
            var div1 = document.createElement('div');
            div1.className = 'cell' + String(i) + String(j) + ' cells';
            if ((i + 1 + j + 1) % 2 == 0) {
                chessBoard[i][j].cellColor = 'darkkhaki';
            }
            else {
                chessBoard[i][j].cellColor = 'white';
            }
            div1.style = 'background-color:' + chessBoard[i][j].cellColor;
            div1.innerHTML = String(cellName[j])+String(i+1);
            if (parentDiv != null) {
                parentDiv.appendChild(div1);
            }
            //      parentDiv.appendChild(div);
        }
    }
}
window.onload = chess();