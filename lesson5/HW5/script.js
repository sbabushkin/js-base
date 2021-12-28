function createChessField() {

    createN();
    createA(8);
    createP(7);
    for (let i = 6; i >= 3; i--) {
        document.getElementById('field').innerHTML += '<div class="num">' + i + '</div>';
        for (let j = 0; j < 8; j++) {
            document.getElementById('field').innerHTML += '<div class="square"></div>';
        }
        document.getElementById('field').innerHTML += '<div class="num">' + i + '</div>';
    }
    createP(2);
    createA(1);
    createN();
    let i=0; let N=0;
    
    while(i<64){
    N+=8;
    for(i;i<N;i++){
        if( i%2==0){
        document.getElementsByClassName('square')[i].style.backgroundColor='grey';
        document.getElementsByClassName('square')[i].style.color='white';}
    }
    N+=8;
    for(i;i<N;i++){
        if( i%2!=0){
        document.getElementsByClassName('square')[i].style.backgroundColor='grey';
        document.getElementsByClassName('square')[i].style.color='white';}
    }
    }
}

function createN() {
    arrA = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    document.getElementById('field').innerHTML += '<div class="num"></div>';
    for (i = 0; i <= 7; i++) {
        document.getElementById('field').innerHTML += '<div class="num">' + arrA[i] + '</div>';
    }
    document.getElementById('field').innerHTML += '<div class="num"></div>';
}

function createA(i) {
    arr = ['Л', 'Кнь', 'С', 'Ф', 'Кль', 'С', 'Кнь', 'Л'];
    document.getElementById('field').innerHTML += '<div class="num">' + i + '</div>';
    for (let j = 0; j < 8; j++) {
        document.getElementById('field').innerHTML += '<div class="square">' + arr[j] + '</div>';
    }
    document.getElementById('field').innerHTML += '<div class="num">' + i + '</div>';
}


function createP(i) {
    document.getElementById('field').innerHTML += '<div class="num">' + i + '</div>';
    for (let j = 0; j < 8; j++) {
        document.getElementById('field').innerHTML += '<div class="square">' + 'П' + '</div>';
    }
    document.getElementById('field').innerHTML += '<div class="num">' + i + '</div>';
}
