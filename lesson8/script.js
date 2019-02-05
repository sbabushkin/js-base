if (!("a" in window)) {
    var a = 1;
}
alert(a); // выведет undefined

var b = function a(x) {
    x && a(--x);
};
alert(a); // выведет undefined

function a(x) {
    return x * 2;
}
var a;
alert(a); // выведет ƒunction a(x) { return x * 2; }

function b(x, y, a) {
    arguments[2] = 10;
    alert(a);
}
b(1, 2, 3); // выведет 10

function a() {
    alert(this);
}
a.call(null); // выведет window