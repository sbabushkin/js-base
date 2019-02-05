## Урок 8. Анонимные функции, замыкания

1. Для практикума из занятия 7 продумать, где можно применить замыкания
2. Не выполняя кода, ответить, что выведет браузер и почему

```
if (!("a" in window)) {
    var a = 1;
}
alert(a);
var b = function a(x) {
    x && a(--x);
};
alert(a);
function a(x) {
    return x * 2;
}
var a;
alert(a);
function b(x, y, a) {
    arguments[2] = 10;
    alert(a);
}
b(1, 2, 3);
function a() {
    alert(this);
}
a.call(null);
```