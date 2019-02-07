//задание 1
window.onload = function chessBoardСonstruction() {
  function chessBoard(clas, name) {
    const div = document.createElement('div');
    div.className = clas;
    div.innerHTML = name;
    wrup.appendChild(div);
  };

  function letters() {
    const arr = [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', ' '];
    for (let i = 0; i < arr.length; i++) {
      chessBoard('white', arr[i]);
    }
  }

  function numbers() {
    const colors = ['white', 'black']
    for (let i = 1; i < 9; i++) {
      if (i % 2) {
        chessBoard(colors[0], i);
        for (let j = 2; j < 10; j++) {
          chessBoard(colors[j % 2], ' ');
        }
        chessBoard(colors[0], i);
      } else {
        chessBoard(colors[0], i);
        for (let j = 1; j < 9; j++) {
          chessBoard(colors[j % 2], ' ');
        }
        chessBoard(colors[0], i);
      }
    }
  }
  letters();
  numbers();
  letters();

  //задание 2
  function сhessmenСonstruction() {
    //ладья, конь, слон, ферзь, король, слон, конь, ладья
    const chessmen = ['Rook', 'Knight', 'Bishop', 'Queen', 'King', 'Bishop', 'Knight', 'Rook'];
    const pawn = 'Pawn';
    const cells = wrup.getElementsByTagName('div');
    for (let i = 0; i < chessmen.length; i++) {
      //Черные фигуры
      const span = document.createElement('span');
      span.className = 'text-black';
      span.innerHTML = chessmen[i];
      cells[11 + i].appendChild(span);
      const spanPawn = document.createElement('span');
      spanPawn.className = 'text-black';
      spanPawn.innerHTML = pawn;
      cells[21 + i].appendChild(spanPawn);
      //белсе фигуры
      const spanPawnWhite = document.createElement('span');
      spanPawnWhite.className = 'text-white';
      spanPawnWhite.innerHTML = pawn;
      cells[71 + i].appendChild(spanPawnWhite);
      const spanWhite = document.createElement('span');
      spanWhite.className = 'text-white';
      spanWhite.innerHTML = chessmen[i];
      cells[81 + i].appendChild(spanWhite);
    }
  }

  function сhessmenСonstructionUnicode() {
    const chessmen = ['&#9820;', '&#9821;', '&#9822;', '&#9819;', '&#9818', '&#9822;', '&#9821;', '&#9820;', '&#9823;'];
    const cells = wrup.getElementsByTagName('div');
    for (let i = 0; i < 8; i++) {
      //Черные фигуры
      const span = document.createElement('span');
      span.className = 'text-black unicode';
      span.innerHTML = chessmen[i];
      cells[11 + i].appendChild(span);
      const spanPawn = document.createElement('span');
      spanPawn.className = 'text-black unicode';
      spanPawn.innerHTML = chessmen[8];
      cells[21 + i].appendChild(spanPawn);
      //белсе фигуры
      const spanPawnWhite = document.createElement('span');
      spanPawnWhite.className = 'text-white unicode';
      spanPawnWhite.innerHTML = chessmen[8];
      cells[71 + i].appendChild(spanPawnWhite);
      const spanWhite = document.createElement('span');
      spanWhite.className = 'text-white unicode';
      spanWhite.innerHTML = chessmen[i];
      cells[81 + i].appendChild(spanWhite);
    }
  }
  
  //задание 3
  function сhessmenСonstructionImg() {
    const chessmen = ['0px -1150px', '0px -470px', '0px -17px', '0px -923px', '0px -242px', '0px -17px', '0px -470px', '0px -1150px', '0px -696px', '0px -1263px', '0px -583px', '0px -130px', '0px -1036px', '0px -355px', '0px -130px', '0px -583px', '0px -1263px', '0px -809px'];
    const cells = wrup.getElementsByTagName('div');
    for (let i = 0; i < 8; i++) {
      //Черные фигуры
      const span = document.createElement('span');
      span.className = 'img';
      span.style.backgroundPosition = chessmen[i];
      cells[11 + i].appendChild(span);
      const spanPawn = document.createElement('span');
      spanPawn.className = 'img';
      spanPawn.style.backgroundPosition = chessmen[8];
      cells[21 + i].appendChild(spanPawn);
      //белсе фигуры
      const spanPawnWhite = document.createElement('span');
      spanPawnWhite.className = 'img';
      spanPawnWhite.style.backgroundPosition = chessmen[17];
      cells[71 + i].appendChild(spanPawnWhite);
      const spanWhite = document.createElement('span');
      spanWhite.className = 'img';
      spanWhite.style.backgroundPosition = chessmen[i + 9];
      cells[81 + i].appendChild(spanWhite);
    }
  }
  сhessmenСonstruction();
  //сhessmenСonstructionUnicode();
  //сhessmenСonstructionImg();
}
