const degreeArray = ['градус', 'градуса', 'градусов'];

function converterTemperature() {
    bootbox.prompt("Введите градусы Цельсия", function (result) {
        if (isNaN(result)) {
            let alert = bootbox.alert('Должно быть введено число');
            alert.on('hide.bs.modal', function (e) {
                converterTemperature();
            });
        };
        if (result > 0) {
            let ferengateTemperature = Math.round((9 / 5) * result + 32);
            let titles = declOfNum(ferengateTemperature, degreeArray);
            bootbox.alert('Температура по Ференгейту составляет ' + ferengateTemperature + ' ' + titles + '.');
        }
    });
}

function declOfNum(number, titles) {
    cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

function setVasili() {
    let prompt = bootbox.prompt({
        title: "Как тебя зовут?",
        centerVertical: true,
        callback: function (result) {
            if (isNaN(result)) {
                let name = 'Василий';
                let admin = result;
                admin = name;
                bootbox.alert('Приятно познакомиться. Хорошее имя ' + admin + '!');
            }
        }
    });
}