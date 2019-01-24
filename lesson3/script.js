//1
function job1() {
    let result = '';
    let i = 1;

    while (i < 100) {
        let find = false;

        for (let j = 2; j < i; j++) {
            if (i % j === 0) find = true;
        }

        if (!find && i !== 1) {
            result += i + ", "
        }
        i++
    }


    let div = document.getElementById("result_1");
    div.innerHTML = result
}

//2
function job2() {
    let index = 0;
    document.getElementById('result_2').innerHTML = "";
    do {
        if (index === 0) {
            document.getElementById('result_2').innerHTML += index + " это ноль<br/>"
        }
        else if (index % 2 === 0) {
            document.getElementById('result_2').innerHTML += index + "  это четное число<br/>"
        }
        else {
            document.getElementById('result_2').innerHTML += index + "  это нечетное число<br/>"
        }
        index++;
    } while (index <= 10);
}

//3
function job3() {
    for (let number = 0; number <= 9; document.getElementById('result_3').innerHTML += (number++ + '')) {
    }
}


//4
function job4() {
    for (let i = 1, pyramid = ''; i <= 20; i++) {
        pyramid += 'x';
        document.getElementById('result_4').innerHTML += pyramid + '<br>';
        console.log(pyramid);
    }
}











