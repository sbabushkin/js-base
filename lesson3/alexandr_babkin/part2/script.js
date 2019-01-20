i = 1;

str = '0 - это нуль\n\r';

do {
    if (i % 2 == 0) {
        str = str + i + ' - четное число\n\r';
}
else {
    str = str + i + ' - нечетное число\n\r';
}
    i++;
}
while (i < 11);
alert(str);