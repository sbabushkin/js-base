function makeChessField() {
    // Создадим доску
    let desk = document.createElement('div');
    desk.className = 'chessField';
    for (let i = 0; i <= 8; i++) {
        let row = document.createElement('div');
        row.className = 'chessRow';
        for (let r = 0; r <= 8; r++) {
            let cell = document.createElement('div');
            cell.className = 'field';
            cell.setAttribute('x',i);
            cell.setAttribute('y',r);
            if ((i + r) % 2 === 0 && ((i != 8) && (r != 8))) {
                cell.classList.add("white");
            } else if ((i + r) % 2 != 0 && ((i != 8) && (r != 8))) {
                cell.classList.add("black");
            }
            row.appendChild(cell);
        }
        desk.appendChild(row);
    }

    document.body.appendChild(desk);

 
   for (let i = 0; i < 8; i++) {
        document.querySelector(`[x="${i}"][y="1"]`).innerHTML = '&#9823;';
        document.querySelector(`[x="${i}"][y="6"]`).innerHTML = '&#9817;';
        document.querySelector(`[x="${i}"][y="8"]`).innerHTML = `&#${97+i};`;
        document.querySelector(`[x="8"][y="${i}"]`).innerHTML = 8-i;
    }
    document.querySelector('[x="0"][y="0"]').innerHTML = '&#9820;';
    document.querySelector('[x="7"][y="0"]').innerHTML = '&#9820;';
    document.querySelector('[x="7"][y="7"]').innerHTML = '&#9814;';
    document.querySelector('[x="0"][y="7"]').innerHTML = '&#9814;';

    document.querySelector('[x="1"][y="0"]').innerHTML = '&#9822;';
    document.querySelector('[x="6"][y="0"]').innerHTML = '&#9822;';
    document.querySelector('[x="6"][y="7"]').innerHTML = '&#9816;';
    document.querySelector('[x="1"][y="7"]').innerHTML = '&#9816;';

    document.querySelector('[x="2"][y="0"]').innerHTML = '&#9821;';
    document.querySelector('[x="5"][y="0"]').innerHTML = '&#9821;';
    document.querySelector('[x="5"][y="7"]').innerHTML = '&#9815;';
    document.querySelector('[x="2"][y="7"]').innerHTML = '&#9815;';

    document.querySelector('[x="3"][y="0"]').innerHTML = '&#9819;';
    document.querySelector('[x="4"][y="0"]').innerHTML = '&#9818;';
    document.querySelector('[x="4"][y="7"]').innerHTML = '&#9812;';
    document.querySelector('[x="3"][y="7"]').innerHTML = '&#9813;';
}

makeChessField();