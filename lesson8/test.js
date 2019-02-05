// function createCounter() {
//    var numberOfCalls = 0;
//    return function() {
//       return ++numberOfCalls;
//    }
// }
// var fn = createCounter();
// console.log(fn()); //1
// console.log(fn()); //2
// console.log(fn()); //3

// console.log(createCounter());
// console.log(createCounter());
// console.log(createCounter());

// console.log(fn()); //4

/* 11111111111111111111111111111111111111111111 */

// var fn = (function() {
//     var numberOfCalls = 0;
//     return function() {
//        return ++ numberOfCalls;
//     }
//  })();

//  console.log(fn()); // 1
//  console.log(fn()); // 2
//  console.log(fn); // [Function]

/* 11111111111111111111111111111111111111111111111 */

// var createHelloFunction = function(name) {
//     return function() {
//        console.log('Hello, ' + name);
//     }
//  }
//  var sayHelloHabrahabr = createHelloFunction('Habrahabr');
//  sayHelloHabrahabr(); //alerts «Hello, Habrahabr»
//  var i = createHelloFunction('test');
// //  console.log(i());
// i();

/* 111111111111111111111111111111111111111111111111111 */

// Function.prototype.bind = function(context) {
//     var fn = this;
//     return function() {
//        return fn.apply(context, arguments);
//     };
//  }
//  var HelloPage = {
//     name: 'Habrahabr',
//     init: function() {
//        console.log(('Hello, ' + this.name));
//     }
//  }
//  //window.onload = HelloPage.init; //алертнул бы undefined, т.к. this указывало бы на window
//  i = HelloPage.init.bind(HelloPage); //вот теперь всё работает
//  i();


//  for (var i = 0; i < links.length; i++) {
//     (function(i) {
//        links[i].onclick = function() {
//           alert(i);
//        }
//     })(i);
//  }

function a(x) {
    return x * 2;
}
var a;
console.log(a(1)); // function