let randomNumber = Math.floor(Math.random()*100)+1;
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
    if (!!(gn.value.match(/^[1-9][0-9]?[0-9]?$/))){ // проверяем, что ввели число
        if (parseInt(gn.value) >0 && parseInt(gn.value) < 100) { // проверяем, что число от 1 до 100
            previous.textContent += ' ' + gn.value;	
            count++;
            if (parseInt(gn.value) === randomNumber) {
                answer.textContent = 'Поздравляем! Вы угадали!';
                answer.style.backgroundColor = 'green';
                help.textContent = '';
                fn_SetGameOver();
            } else if (count === 10) {
                answer.textContent = 'Игра окончена. Вы проиграли.';
                fn_SetGameOver();
	        } else {
                answer.textContent = 'Неправильно!';
                answer.style.backgroundColor = 'red';
                if(parseInt(gn.value) < randomNumber) {
                    help.textContent = 'Больше';
                }
                else if(parseInt(gn.value) > randomNumber) {
                    help.textContent = 'Меньше';
                }
            };
            gn.value = '';
            gn.focus();
        } else {
            fn_ErrorOnInput();
        };
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
}

function fn_ResetGame() {
	сount = 0;
	previous.textContent = ""
	answer.textContent = ""
    answer.style.backgroundColor = 'white';
	help.textContent = ""
	
	resetButton.parentNode.removeChild(resetButton);

	gn.disabled = false;
	gs.disabled = false;
	gn.value = '';
	gn.focus();

	randomNumber = Math.floor(Math.random() * 100) + 1;
}

function fn_ErrorOnInput (){
    answer.textContent = 'Ошибка!';
    answer.style.backgroundColor = 'red';
    help.textContent = 'Необходимо ввести целое число от 1 до 100. Попытка не защитана';
    gn.value = '';
    gn.focus();
}