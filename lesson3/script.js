// 1
/*
let num = 0;

while (num <= 100) {
  console.log(num++);
}
*/

// 2
/*
let num = 0;
console.log(num++ + ' - это ноль');

do {
  if ((num % 2) == 0) {
    console.log(num++ + ' - четное число');
  } 
  else if ((num % 2) != 0) {
    console.log(num++ + ' - нечетное число');
  }
  
} while (num <= 10);
*/

// 3
/*
for(let i=0; i < 10; console.log(i++)) {}
*/

// 4

let arr = '';
let i;

for(i=0; i < 20; i++) {
  arr = arr + 'x';
  console.log(arr);
}
