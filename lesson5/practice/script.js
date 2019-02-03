function getChessTable() {
let table = document.createElement("table");
for (let i = 1; i < 9; i++) {
    let tr = document.createElement('tr');
    for (let j = 1; j < 9; j++) {
        let td = document.createElement('td');
        if (i%2 == j%2) {
            td.className = "white";
        } else {
            td.className = "black";
        }
        tr.appendChild(td);
    }
    table.appendChild(tr);
}
document.body.appendChild(table);
document.getElementsByClassName('white').style.backgroundColor = 'black';
}

window.onload = getChessTable;