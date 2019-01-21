
let films = [
    {"name": "Титаник", "money": 1e5},
    {"name": "Смешарики", "money": 2e5+3e4},
    {"name": "Рапунциль", "money": 2e4+3e3},
    {"name": "Один Дома", "money": 4e5+9e4},
]

let filmsMoney = 0;

function countBasketPrice() {

for (let s in films) {
    filmsMoney +=films[s]["money"];
}
return filmsMoney;
}

countBasketPrice();
console.log("ответ на задачу номер 2: " + filmsMoney);