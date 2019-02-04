let Chess = {
    getBox :  function (){
        return document.getElementById('chessBox')
    },
    chessBoard : {
        getBoard : function () {
           return document.getElementById('chessBoard')
        },
        rowCounter : ['A','B','C','D','E','F','G','H'],
        numRow : '<tr class="numColumns">\n' +
            '            <td class="numRows"></td>\n' +
            '            <td>1</td>\n' +
            '            <td>2</td>\n' +
            '            <td>3</td>\n' +
            '            <td>4</td>\n' +
            '            <td>5</td>\n' +
            '            <td>6</td>\n' +
            '            <td>7</td>\n' +
            '            <td>8</td>\n' +
            '            <td class="numRows"></td>\n' +
            '        </tr>',
        printBoard : function () {
            let board = this.getBoard();
            let html = '<thead>\n' + this.numRow + '</thead>\n';
            html += '<tbody>\n';
            for (let i = 0; this.rowCounter[i]; i++){
                html += '<tr>\n';
                html += '<td class="numRows">' + this.rowCounter[i] + '</td>\n';
                for (let n = 1; n < 9; n++){
                    html += '<td id="'+this.rowCounter[i]+n+'"></td>\n'
                }
                html += '<td class="numRows">' + this.rowCounter[i] + '</td>\n';
                html += '</tr>\n';
            }
            html += '</tbody>\n';
            html += '<tfood>\n' + this.numRow + '</tfood>\n';
            board.innerHTML = html;
        },
        arrangeFigures : function () {
            let figures = [];
            figures['blacks'] = Chess.figures.getFigures('black');
            figures['white'] = Chess.figures.getFigures('white');
            console.log(figures);

            let delay = 200;
            for (let key in figures){
                for (let i = 0; i < figures[key].length; i++){
                    let cell = document.getElementById(figures[key][i].position);
                    setTimeout(function () {
                        cell.style.backgroundImage = 'url("'+figures[key][i].img+'")'
                    }, delay);
                    delay += 200;
                }
            }
        }
    },
    figures : {
        getClone : function(Obj){
            let clone = {};
            for (let key in Obj){
                clone[key] = Obj[key];
            }
            return clone;
        },
        getFigures : function(color){
            let fModels = [];
            const figures = Object.keys(this.figures);
            for (let n = 0; n < figures.length; n++){
                let figure = this.getClone(this.figures[figures[n]]);
                let secondFigure;
                figure.color = color;
                figure.img = 'Images/' + color + '/' + figures[n] + '.png';
                switch (figures[n]) {
                    case 'king':
                        if (color == 'black'){
                            figure.position = 'A5';
                        } else figure.position = 'H4';
                        fModels.push(figure);
                        break;
                    case 'queen':
                        if (color == 'black'){
                            figure.position = 'A4';
                        } else figure.position = 'H5';
                        fModels.push(figure);
                        break;
                    case 'bishop':
                        secondFigure = this.getClone(figure);
                        if (color == 'black'){
                            figure.position = 'A3';
                            secondFigure.position = 'A6';
                        } else {
                            figure.position = 'H3';
                            secondFigure.position = 'H6';
                        }
                        fModels.push(figure);
                        fModels.push(secondFigure);
                        break;
                    case 'knight':
                        secondFigure = this.getClone(figure);
                        if (color == 'black'){
                            figure.position = 'A2';
                            secondFigure.position = 'A7';
                        } else {
                            figure.position = 'H2';
                            secondFigure.position = 'H7';
                        }
                        fModels.push(figure);
                        fModels.push(secondFigure);
                        break;
                    case 'rook':
                        secondFigure = this.getClone(figure);
                        if (color == 'black'){
                            figure.position = 'A1';
                            secondFigure.position = 'A8';
                        } else {
                            figure.position = 'H1';
                            secondFigure.position = 'H8';
                        }
                        fModels.push(figure);
                        fModels.push(secondFigure);
                        break;
                    case 'pawn':
                        for (let i = 1; i < 9; i ++){
                            let clone = this.getClone(figure);
                            if (color == 'black'){
                                clone.position = 'B' + i;
                            } else clone.position = 'G' + i;
                            fModels.push(clone);
                        }
                        break;
                }
            }
            return fModels;
        },
        figures : {
            pawn : {
                name     : 'Пешка',
                color    : '',
                img      : '',
                position : ''
            },
            rook : {
                name     : 'Ладья',
                color    : '',
                img      : '',
                position : ''
            },
            knight : {
                name     : 'Конь',
                color    : '',
                img      : '',
                position : ''
            },
            bishop : {
                name     : 'Слон',
                color    : '',
                img      : '',
                position : ''
            },
            queen : {
                name     : 'Ферзь',
                color    : '',
                img      : '',
                position : ''
            },
            king : {
                name     : 'Король',
                color    : '',
                img      : '',
                position : ''
            }
        }
    }
};