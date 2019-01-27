window.onload = function () {

    let letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    let word = document.querySelector('.wordWhite');
    for (wnum = 0; wnum < letter.length; wnum++) {
        let wordCell = document.createElement('div');
        word.appendChild(wordCell);
        wordCell.classList.add('wordCell');
        wordCell.innerHTML = letter[wnum];
    }
    let word2 = document.querySelector('.wordBlack');
    for (wnum = 0; wnum < letter.length; wnum++) {
        let word2Cell = document.createElement('div');
        word2.appendChild(word2Cell);
        word2Cell.classList.add('wordCell');
        word2Cell.innerHTML = letter[wnum];
    }


    let number = document.querySelector('.numberWhite');
    for (num = 0; num < letter.length; num++) {
        let numCell = document.createElement('div');
        number.appendChild(numCell);
        numCell.classList.add('numCell');
        numCell.innerHTML = letter.length - num;
    }
    let number2 = document.querySelector('.numberBlack');
    for (num = 0; num < letter.length; num++) {
        let num2Cell = document.createElement('div');
        number2.appendChild(num2Cell);
        num2Cell.classList.add('numCell');
        num2Cell.innerHTML = letter.length - num;
    }


    let chessBoard = document.querySelector('.board');
    let i = 0;
    for (count = 0; count < 8 * 8; count++) {
        let cell = document.createElement('div');
        chessBoard.appendChild(cell);
        cell.classList.add('boardCell');

        if (i % 2)
            cell.classList.add('cellBlack');
        i += ((i + 2) % 9) ? 1 : 2;


        if (count < 16) {
            let figureBoardB = document.createElement('img');
            cell.appendChild(figureBoardB);
            figureBoardB.setAttribute('src', 'img/chess/' + (count + 1) + '.png');
        } else if (count > 47) {
            let figureBoardW = document.createElement('img');
            cell.appendChild(figureBoardW);
            figureBoardW.setAttribute('src', 'img/chess/' + (count - 31) + '.png');
        }
    }
}
