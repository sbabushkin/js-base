////Кто хочет стать миллионером
'use ctrict';
const questions = [
    ['Что бьют на счастье?', 'Посуду', 'Грушу', 'Ковры', 'Морду', 1],
    ['Как заканчивается название известного фильма: "Иван Васильевич меняет..."', 'Работу', 'Профессию', 'Прописку', 'Валюту', 2],
    ['Что такое "вКонтакте"?', 'Брачное агентство', 'Социальная сеть', 'Уфологическое общество', 'Название презервативов', 2],
    ['В честь какого штата США назван один из главных вредителей садоводов?', 'Аризона', 'Нью-Джерси', 'Нью-Мексико', 'Колорадо', 4],
    ['Каким словом называют не только канцелярскую принадлежность, но и алкогольный напиток?', 'Скотч', 'Ластик', 'Фломастер', 'Клей', 1],
    ['Сколько всего клеток занимают корабли одного игрока при игре в традиционный морской бой?', '18', '20', '22', '24', 2],
    ['Сколько всего фильмов о Гарри Поттере вышло на экраны кинотеатров?', '6', '7', '8', '9', 3],
    ['Где находится самый большой по количеству станций метрополитен в мире?', 'В Москве', 'В Нью-Йорке', 'В Лондоне', 'В Шанхае', 2],
    ['В какой стране родилась певица Мадонна?', 'США', 'Норвегия', 'Канада', 'Великобритания', 1],
    ['Какое отчество у кандидата в президенты России Михаила Прохорова?', 'Сергеевич', 'Андреевич', 'Дмитриевич', 'Георгиевич', 3],
    ['Поток воздуха с какой минимальной скоростью, согласно российскому ГОСТу, считается ветром?', '0.2 м/с', '0.6 м/с', '1.0 м/с', '2.5 м/с', 2],
    ['Что такое "нори"?', 'Водоросли', 'Рис', 'Рыба', 'Соус', 1],
    ['Главным редактором какого популярного американского журнала мод является Анна Винтур?', 'Vogue', 'Harper\'s Bazaar', 'GQ', 'L\'Officiel', 1],
    ['Запрет на что долгое время существовал на острове Делос в Эгейском море?', 'На разговоры', 'На смерть', 'На рождение детей', 'На сон', 2],
    ['Согласно календарю какой цивилизации, текущая эпоха началась 11 августа 3114 года до н.э., а закончится 21 декабря 2012 года н.э.?', 'Ольмеки', 'Ацтеки', 'Тараски', 'Майя', 4]
];

const summs = [100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 250000, 500000, 1000000];
const noFireSumms = [0, 4, 9, 14];

const question = {
    currentNumber: 0,
    currentText: '',
    varA: '',
    varB: '',
    varC: '',
    varD: '',
    currentSum: 0,
    lastNoFireSum: 0,
    nextQuestion: function (questions) {
        this.currentText = questions[this.currentNumber][0];
        this.varA = questions[this.currentNumber][1];
        this.varB = questions[this.currentNumber][2];
        this.varC = questions[this.currentNumber][3];
        this.varD = questions[this.currentNumber][4];
        this.currentSum = summs[this.currentNumber];
        return true;
    },
    checkCorrect: function (answer) {
        let dAnswer = 0;
        if (answer == 'A' || answer == 'a') {
            dAnswer = 1;
        } else if (answer == 'B' || answer == 'b') {
            dAnswer = 2;
        } else if (answer == 'C' || answer == 'c') {
            dAnswer = 3;
        } else if (answer == 'D' || answer == 'd') {
            dAnswer = 4;
        }
        if (questions[this.currentNumber][5] == dAnswer) {
            console.log('Ответ верный. Текущая сумма: ' + this.currentSum + ' руб.');   
            if (this.currentNumber!=14) {
                console.log('Следующая сумма: ' + summs[this.currentNumber+1] + ' руб.');   
            }
            if (noFireSumms.indexOf(this.currentNumber) != -1) {
                this.lastNoFireSum = summs[this.currentNumber];
            }
            this.currentNumber++;
            return true;
        } else {
            console.log('Ответ не верный. Ваш выигрыш: ' + this.lastNoFireSum + ' руб.');
            return false;
        }
    },
}

function task3() {

    let cAnswer = '';
    let continueAnswer = true;
    question.currentNumber=0;
    question.lastNoFireSum=0;
    console.log('Всего вопросов' + summs.length);
    do {
        console.log('----------------------------------------------');
        console.log('ВОПРОС №' + Number(question.currentNumber+1)+ '  СУММА: '+ summs[question.currentNumber] + ' руб.');
        console.log('----------------------------------------------');
        question.nextQuestion(questions);
        console.log(question.currentText);
        console.log('Вариант A: ' + question.varA + '\nВариант B:' + question.varB);
        console.log('Вариант C: ' + question.varC + '\nВариант D:' + question.varD);
        do {
            cAnswer = prompt('Выберите вариант A,B,C,D?');
        } while (cAnswer != 'A' && cAnswer != 'B' && cAnswer != 'C' && cAnswer != 'D' && cAnswer != 'a' && cAnswer != 'b' && cAnswer != 'c' && cAnswer != 'd');

        continueAnswer = question.checkCorrect(cAnswer);
    } while (question.currentNumber < summs.length && continueAnswer == true);
    if (question.currentNumber==summs.length) {
       console.log('ПОЗДРАВЛЯЕМ. ВЫ МИЛЛИОНЕР!!!'); 
    }
}
