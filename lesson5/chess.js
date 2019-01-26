function makeChessBoard() {
    // Создадим доску
    let table = document.createElement('table');
    for (let i = 0; i < 9; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < 9; j++) {
            let col = document.createElement('td');
            col.setAttribute('data-y',i);
            col.setAttribute('data-x',j);
            if ((i + j) % 2 === 0 && ((i != 8) && (j != 8))) {
                col.classList.add("white-cell");
            } else if ((i + j) % 2 != 0 && ((i != 8) && (j != 8))) {
                col.classList.add("black-cell");
            }
            row.appendChild(col);
        }
        table.appendChild(row);
    }
    // Отпечатаем ее
    document.body.appendChild(table);
    
    // Расставим фигуры и подпишем доску
    for (let i = 0; i < 8; i++) {
        document.querySelector(`[data-x="${i}"][data-y="1"]`).innerHTML = '&#9823;';
        document.querySelector(`[data-x="${i}"][data-y="6"]`).innerHTML = '&#9817;';
        document.querySelector(`[data-x="${i}"][data-y="8"]`).innerHTML = `&#${97+i};`;
        document.querySelector(`[data-x="8"][data-y="${i}"]`).innerHTML = 8-i;
    }

    document.querySelector('[data-x="0"][data-y="0"]').innerHTML = '&#9820;';
    document.querySelector('[data-x="7"][data-y="0"]').innerHTML = '&#9820;';
    document.querySelector('[data-x="7"][data-y="7"]').innerHTML = '&#9814;';
    document.querySelector('[data-x="0"][data-y="7"]').innerHTML = '&#9814;';

    document.querySelector('[data-x="1"][data-y="0"]').innerHTML = '&#9822;';
    document.querySelector('[data-x="6"][data-y="0"]').innerHTML = '&#9822;';
    document.querySelector('[data-x="6"][data-y="7"]').innerHTML = '&#9816;';
    document.querySelector('[data-x="1"][data-y="7"]').innerHTML = '&#9816;';

    document.querySelector('[data-x="2"][data-y="0"]').innerHTML = '&#9821;';
    document.querySelector('[data-x="5"][data-y="0"]').innerHTML = '&#9821;';
    document.querySelector('[data-x="5"][data-y="7"]').innerHTML = '&#9815;';
    document.querySelector('[data-x="2"][data-y="7"]').innerHTML = '&#9815;';

    document.querySelector('[data-x="3"][data-y="0"]').innerHTML = '&#9819;';
    document.querySelector('[data-x="4"][data-y="0"]').innerHTML = '&#9818;';
    document.querySelector('[data-x="4"][data-y="7"]').innerHTML = '&#9812;';
    document.querySelector('[data-x="3"][data-y="7"]').innerHTML = '&#9813;';
}

makeChessBoard();