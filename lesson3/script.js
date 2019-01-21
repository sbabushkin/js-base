// exercise 1
function ex1() {
    let array = new Array();
    let i = 0;
    for (let j = 2; j < 100; j++) {
        let isSimple = true;
        for (let k = 2; k**2 <= j; k++) {
            if (j % k == 0) {
                isSimple = false;
                break;
            }
        }
        if (isSimple) array[i++] = j;
    }
    return array;
}

// exercise 2
function ex2() {
    let array = new Array();
    for (let i = 0; i <= 10; i++) {
        array[i] = i == 0 ? 0 + ' - это ноль' : 
            i % 2 == 0 ? i + ' - четное число' : 
            i + ' - нечетное число'
    }
    return array;
}

// exercise 3
function ex3() {
    for (let i = 0; i < 10; console.log(i++)) {}
}

// exercise 4
function ex4() {
    for (let i = 1; i <= 20; i++) {
        let x = '';
        for (let j = 0; j < i; j++) {
            x +='x';
        }
        console.log(x);
    }
}

console.log('Exercise 1');
console.log(ex1());

console.log('Exercise 2');
console.log(ex2());

console.log('Exercise 3');
ex3();

console.log('Exercise 4');
ex4();