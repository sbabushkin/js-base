function ex1(num) {
    // найдем целую часть от числа
    let intNum = ~~(num);

    if (~~(num / 1000) > 0) {
        console.log('Число больше 999');
        return {};
    }

    let e1 = ~~(num % 10);
    let e2 = ~~(num / 10) % 10;
    let e3 = ~~(num / 100);
    return { 'единицы': e1, 'десятки': e2, 'сотни': e3 };
}