const chess = {
  size: 8,
  chessBoard: document.querySelector('.chess-board'),
  build() {
    this.chessBoard.style.height = (this.size + 1) * 40 + 'px';
    this.chessBoard.style.width = (this.size + 1) * 40 + 'px';
    for (let y = 1; y <= this.size + 1; y++) {
      for (let x = 1; x <= this.size + 1; x++) {
        const newCell = document.createElement('div');
        newCell.className = 'cell';
        if (x === 1 && y > 1) {
          newCell.innerHTML = y - 1;
        }
        const lang = 'ABCDEFGH';
        if (y === 1 && x > 1) {
          newCell.innerHTML = lang.charAt(x - 2);
        }
        this.chessBoard.appendChild(newCell);
        if (y > 1 && x > 1) {
          if (y % 2 !== 0) {
            if (x % 2 === 0) {
              newCell.style.backgroundColor = '#777';
            }
          } else if (x % 2 !== 0) {
            newCell.style.backgroundColor = '#777';
          }
        }
      }
    }
  },
  setFigure() {
    const allCell = document.querySelectorAll('.cell');
    allCell[10].innerHTML = 'Л';
    allCell[11].innerHTML = 'К';
    allCell[12].innerHTML = 'С';
    allCell[13].innerHTML = 'Ф';
    allCell[14].innerHTML = 'Кр';
    allCell[15].innerHTML = 'С';
    allCell[16].innerHTML = 'К';
    allCell[17].innerHTML = 'Л';
    for (let i = 19, j = 64; i < 27, j < 72; i++, j++) {
      allCell[i].innerHTML = 'П';
      allCell[j].innerHTML = 'П';
    }
    allCell[73].innerHTML = 'Л';
    allCell[74].innerHTML = 'К';
    allCell[75].innerHTML = 'С';
    allCell[76].innerHTML = 'Ф';
    allCell[77].innerHTML = 'Кр';
    allCell[78].innerHTML = 'С';
    allCell[79].innerHTML = 'К';
    allCell[80].innerHTML = 'Л';
  },
};

chess.build();
chess.setFigure();
