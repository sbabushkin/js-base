var cellsnumbers = 1,
    stroke = 8,
    colNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    // Набор шахмат
    chesses = [
        // Черные шахматы
        {name: 'Черная пешка', position: 'A-7', image: 'http://chess-board.ru/img/pieces/pb.svg'},
        {name: 'Черная пешка', position: 'B-7', image: 'http://chess-board.ru/img/pieces/pb.svg'},
        {name: 'Черная пешка', position: 'C-7', image: 'http://chess-board.ru/img/pieces/pb.svg'},
        {name: 'Черная пешка', position: 'D-7', image: 'http://chess-board.ru/img/pieces/pb.svg'},
        {name: 'Черная пешка', position: 'E-7', image: 'http://chess-board.ru/img/pieces/pb.svg'},
        {name: 'Черная пешка', position: 'F-7', image: 'http://chess-board.ru/img/pieces/pb.svg'},
        {name: 'Черная пешка', position: 'G-7', image: 'http://chess-board.ru/img/pieces/pb.svg'},
        {name: 'Черная пешка', position: 'H-7', image: 'http://chess-board.ru/img/pieces/pb.svg'},
        {name: 'Черная ладья', position: 'A-8', image: 'http://chess-board.ru/img/pieces/rb.svg'},
        {name: 'Черная ладья', position: 'H-8', image: 'http://chess-board.ru/img/pieces/rb.svg'},
        {name: 'Черный конь', position: 'B-8', image: 'http://chess-board.ru/img/pieces/nb.svg'},
        {name: 'Черный конь', position: 'G-8', image: 'http://chess-board.ru/img/pieces/nb.svg'},
        {name: 'Черный cлон', position: 'C-8', image: 'http://chess-board.ru/img/pieces/bb.svg'},
        {name: 'Черный cлон', position: 'F-8', image: 'http://chess-board.ru/img/pieces/bb.svg'},
        {name: 'Черный ферзь', position: 'D-8', image: 'http://chess-board.ru/img/pieces/qb.svg'},
        {name: 'Черный король', position: 'E-8', image: 'http://chess-board.ru/img/pieces/kb.svg'},
        // Белые шахматы
        {name: 'Белая пешка', position: 'A-2', image: 'http://chess-board.ru/img/pieces/pw.svg'},
        {name: 'Белая пешка', position: 'B-2', image: 'http://chess-board.ru/img/pieces/pw.svg'},
        {name: 'Белая пешка', position: 'C-2', image: 'http://chess-board.ru/img/pieces/pw.svg'},
        {name: 'Белая пешка', position: 'D-2', image: 'http://chess-board.ru/img/pieces/pw.svg'},
        {name: 'Белая пешка', position: 'E-2', image: 'http://chess-board.ru/img/pieces/pw.svg'},
        {name: 'Белая пешка', position: 'F-2', image: 'http://chess-board.ru/img/pieces/pw.svg'},
        {name: 'Белая пешка', position: 'G-2', image: 'http://chess-board.ru/img/pieces/pw.svg'},
        {name: 'Белая пешка', position: 'H-2', image: 'http://chess-board.ru/img/pieces/pw.svg'},
        {name: 'Белая ладья', position: 'A-1', image: 'http://chess-board.ru/img/pieces/rw.svg'},
        {name: 'Белая ладья', position: 'H-1', image: 'http://chess-board.ru/img/pieces/rw.svg'},
        {name: 'Белый конь', position: 'B-1', image: 'http://chess-board.ru/img/pieces/nw.svg'},
        {name: 'Белый конь', position: 'G-1', image: 'http://chess-board.ru/img/pieces/nw.svg'},
        {name: 'Белый cлон', position: 'C-1', image: 'http://chess-board.ru/img/pieces/bw.svg'},
        {name: 'Белый cлон', position: 'F-1', image: 'http://chess-board.ru/img/pieces/bw.svg'},
        {name: 'Белый ферзь', position: 'D-1', image: 'http://chess-board.ru/img/pieces/qw.svg'},
        {name: 'Белый король', position: 'E-1', image: 'http://chess-board.ru/img/pieces/kw.svg'}
    ],
    buildOn = true;

// Функция, которая нумерует столбцы от А до H
function setColName() {
    for (let i = 1; i < 9; i++) {
        let colname = document.createElement("div");
        colname.className = "chess_colname";
        colname.innerHTML = colNames[i-1];
        document.getElementById('chesstable').appendChild(colname);
    }
}
// Функция, которая нумерует строки; в задании сказано нумеровать от 1 до 8, но правильнее будет первую строку сделать 8, а последнюю - 1
function setStrokeName(stroke) {
    let cellstroke = document.createElement("div");
    cellstroke.className = "chess_cellstroke";
    cellstroke.innerHTML = stroke;
    document.getElementById('chesstable').appendChild(cellstroke);
}

function generateChess() {

    if(buildOn === false) {
        document.getElementById('chesstable').innerHTML = "";
        buildOn = true;
        cellsnumbers = 1;
        stroke = 8;
    }

    document.getElementById('chesstable').style.padding = '10px';
    setColName();
    for (let i = 1; i < 9; i++) {
        setStrokeName(stroke);
        for (let j = 1; j < 9; j++) {
            let cell = document.createElement("div");
    
            if (i%2 == j%2) {
                cell.className = "chess_cell animated fadeIn";
                cell.id = colNames[j-1] + '-' + stroke;
                document.getElementById('chesstable').appendChild(cell);
            } else {
                cell.className = "chess_cell cell-black animated fadeIn";
                cell.id = colNames[j-1] + '-' + stroke;
                document.getElementById('chesstable').appendChild(cell);
            }
        }
        setStrokeName(stroke)
        stroke--;
    }
    setColName();
    // console.log("Шахматные поля готовы. Расставляем шахматы:");
    chesses.forEach(function(item, i, chesses) {
        // console.log(chesses[i].name + " встает на клетку " + chesses[i].position);
        let chessfigure = document.createElement("div");
        chessfigure.className = "chess_figure bounceIn";
        chessfigure.title = chesses[i].name;
        chessfigure.innerHTML = "<img src='" + chesses[i].image +"'>";
        document.getElementById(chesses[i].position).appendChild(chessfigure);
    });
    // console.log("Шахматная доска сгенерирована");

    buildOn = false;
}
Window.onload = generateChess;