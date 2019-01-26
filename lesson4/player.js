let player = {
    score: 0,
    choise: 0,
    makeChoise() {
        this.choise = prompt('Введите номер ответа от 0 до 3');
        if (this.choise == null) {
            return;
        }
        if (!(this.choise in [0, 1, 2, 3])) {
            this.makeChoise();
        }
    }
}