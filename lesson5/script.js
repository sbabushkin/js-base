//----------------------------------------------------------- 1
function my_initiation() {
  let board = document.getElementById('chess');


  for (let row = 0; row < 8; row++) {
    let deskRow1 = document.createElement('div');

    board.appendChild(deskRow1);
    deskRow1.style.display = "flex";

    if (row%2 == 0) {
      for (let i = 0; i < 4; i++) {
        let squaredBlack = document.createElement('div');
        squaredBlack.setAttribute('class', 'class' + row);
        squaredBlack.style.background = "#000";
        squaredBlack.style.width = "80px";
        squaredBlack.style.height = "80px";

        let squaredWhite = document.createElement('div');
        squaredWhite.setAttribute('class', 'class' + row);
        squaredWhite.style.background = "#fff";
        squaredWhite.style.width = "80px";
        squaredWhite.style.height = "80px";

        deskRow1.appendChild(squaredWhite);

        deskRow1.insertBefore(squaredBlack, squaredWhite);
        
        if (row == 6) {
          let figure = document.createElement('h1');
          figure.innerHTML = '<i class="fas fa-chess-pawn"></i>';
          let figure2 = document.createElement('h1');
          figure2.innerHTML = '<i class="fas fa-chess-pawn"></i>';
          squaredWhite.appendChild(figure);
          squaredBlack.appendChild(figure2);
        }
      }
    }
    else {
      for (let i = 0; i < 4; i++) {
        let squaredBlack = document.createElement('div');
        squaredBlack.setAttribute('class', 'class' + row);
        squaredBlack.style.background = "#000";
        squaredBlack.style.width = "80px";
        squaredBlack.style.height = "80px";

        let squaredWhite = document.createElement('div');
        squaredWhite.setAttribute('class', 'class' + row);
        squaredWhite.style.background = "#fff";
        squaredWhite.style.width = "80px";
        squaredWhite.style.height = "80px";

        deskRow1.appendChild(squaredBlack);

        deskRow1.insertBefore(squaredWhite, squaredBlack);
        
        if (row == 1) {
          let figure = document.createElement('h2');
          figure.innerHTML = '<i class="fas fa-chess-pawn"></i>';
          let figure2 = document.createElement('h2');
          figure2.innerHTML = '<i class="fas fa-chess-pawn"></i>';
          squaredWhite.appendChild(figure);
          squaredBlack.appendChild(figure2);
        }
      }
    }

    let num = document.createElement('div');
    num.innerHTML = row+1;
    num.style.fontSize = '24px';
    num.style.margin = '25px 20px';
    deskRow1.appendChild(num);

  }

  let deskRow2 = document.createElement('div');
  deskRow2.innerHTML = 'A B C D E F G H';
  deskRow2.style.fontSize = '24px';
  deskRow2.style.letterSpacing = '30px';
  deskRow2.style.margin = '10px 20px';
  board.appendChild(deskRow2);
  
  artillery ('class0', 'h2');
  artillery ('class7', 'h1');

}

function artillery (str, h) {
  let firsRow = document.getElementsByClassName(str);
  let figureTurL = document.createElement(h);
  figureTurL.innerHTML = '<i class="fas fa-chess-rook"></i>';
  firsRow[0].appendChild(figureTurL);
  let figureTurR = document.createElement(h);
  figureTurR.innerHTML = '<i class="fas fa-chess-rook"></i>';
  firsRow[7].appendChild(figureTurR);
  let figureHoursL = document.createElement(h);
  figureHoursL.innerHTML = '<i class="fas fa-chess-knight"></i>';
  firsRow[1].appendChild(figureHoursL);
  let figureHoursR = document.createElement(h);
  figureHoursR.innerHTML = '<i class="fas fa-chess-knight"></i>';
  firsRow[6].appendChild(figureHoursR);
  let figureOficerL = document.createElement(h);
  figureOficerL.innerHTML = '<i class="fas fa-chess-bishop"></i>';
  firsRow[2].appendChild(figureOficerL);
  let figureOficerR = document.createElement(h);
  figureOficerR.innerHTML = '<i class="fas fa-chess-bishop"></i>';
  firsRow[5].appendChild(figureOficerR);
  let figureF = document.createElement(h);
  figureF.innerHTML = '<i class="fas fa-chess-king"></i>';
  firsRow[3].appendChild(figureF);
  let figureK = document.createElement(h);
  figureK.innerHTML = '<i class="fas fa-chess-queen"></i>';
  firsRow[4].appendChild(figureK);
}

Window.onload = my_initiation();


