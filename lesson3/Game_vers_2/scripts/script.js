let randomNumber = Array(4);
fn_RandomNumber(randomNumber);
let pre = document.querySelector("#previous");
let ans = document.querySelector("#answer");
let help = document.querySelector("#help");
let gn = document.querySelector("#guess-number");
let gs = document.querySelector("#guess-submit");
gs.addEventListener("click", fn_CheckGuess);
let count = 0;
let resetButton;
// строка ниже позволит выйграть сразу
//gn.value = randomNumber 
function fn_CheckGuess() {
    let bull = 0;
    let cow = 0;
    if (gn.value.search(/^[1-9][0-9]{3}$/) != -1){ // проверяем, что ввели число jn 1000 до 9999
        previous.textContent += ' ' + gn.value;	
        count++;
        for (let i=0; i<4; i++){
            if (parseInt(gn.value.split('')[i]) === randomNumber[i]){
                bull++;
            };
        };
        if (bull === 4) {
            answer.textContent = 'Поздравляем! Вы угадали!';
            answer.style.backgroundColor = 'green';
            help.textContent = '';
            fn_SetGameOver();
        } else if (count === 10) {
                answer.textContent = 'Игра окончена. Вы проиграли.';
                fn_SetGameOver();
	    } else {
            for (let i=0; i<4; i++){
                for (let j=0; j<4; j++){
                    if (i !== j){
                        if (parseInt(gn.value.split('')[i]) === randomNumber[j]){
                            cow++;
                        };
                    };
                };
            };
            answer.textContent = 'Неправильно!';
            answer.style.backgroundColor = 'red';
            switch (bull){
                case 0:
                    str_bull = ' быков, ';
                    break;
                case 1:
                    str_bull = ' бык, ';
                    break;
                default:
                    str_bull = ' быка, ';
                    break;
            };
            switch (cow){
                case 0:
                    str_cow = ' коров.';
                    break;
                case 1:
                    str_cow = ' корова.';
                    break;
                default:
                    str_cow = ' коровы.';
                    break;
            };
            help.textContent = bull + str_bull + cow + str_cow;
        };
        gn.value = '';
        gn.focus();        
    } else {
        fn_ErrorOnInput();
    };
};

function fn_SetGameOver() {
	gn.disabled = true;
	gs.disabled = true;
	resetButton = document.createElement('button');
	resetButton.textContent = 'Начать заново';
	document.querySelector(".wrapper").appendChild(resetButton);
	resetButton.addEventListener('click', fn_ResetGame);
};

function fn_ResetGame() {
	count = 0;
	previous.textContent = "Предыдущие значения:"
	answer.textContent = ""
    answer.style.backgroundColor = 'white';
	help.textContent = ""
	
	resetButton.parentNode.removeChild(resetButton);

	gn.disabled = false;
	gs.disabled = false;
	gn.value = '';
	gn.focus();

    for (let i=0; i<4; i++){
        randomNumber[1]='';
    };
	fn_RandomNumber(randomNumber);
};

function fn_ErrorOnInput (){
    answer.textContent = 'Ошибка!';
    answer.style.backgroundColor = 'red';
    help.textContent = 'Необходимо ввести целое число от 1000 до 9999. Попытка не защитана';
    gn.value = '';
    gn.focus();
};

function fn_RandomNumber(randomNumber) {
    let check;
    for (let i=0; i<4; i++){
        do {
            check = false;
            randomNumber[i] = Math.round(Math.random()*9);
            for (let j=0; j<4; j++){
                if (i !== j){
                    if (randomNumber[j] === randomNumber[i] || randomNumber[0] === 0){ // первое значение не должно быть равным нулю
                        check = true;
                    };
                };
            };
        } while (check === true);
    }
    
};