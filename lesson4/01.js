// функция - конструктор объектов Number от -999 до 999
function fncObjNumber (n) {
    try {    
        if (arguments.length === 1){ // проверяем количество параметров   
            if (typeof n === 'number'){ //проверяем тип параметра
                if (parseInt(n) === parseFloat(n)){ // число должно быть 'integer'
                    this.units = n%10;
                    this.tens = Math.floor(n/10)%10;
                    this.handreds = Math.floor(n/100)%10;
                        
                    this.sign = function(n){
                        if (n<0){
                            return 'Negative';
                        } else {
                            return 'Positiv';
                        }
                    };
                } else {
                    throw new Error('Function parameter must be \'integer\'');
                }
            } else {
                throw new Error('Function parameter must be \'number\'');
            }
        } else {
            throw new Error('Count of function parameters must be 1');
        }
    } catch (e){
        console.log(e);
    };
};

// функция создает новый объект Number для n от 0 до 999
function fn_CreateNewObjNumber(n){
    try {
        if (arguments.length === 1){ // проверяем количество параметров   
            if (typeof n === 'number'){ //проверяем тип параметра
                if (parseInt(n) === parseFloat(n)){ // число должно быть 'integer'
                    if (n >-1 && n < 1000){ // число должно быть от 0 до 999
                        let obj_number = new fncObjNumber(n);

                        document.write('Задано число: ' + n + '</br></br>' + 'Значк числа: '+ obj_number.sign() + '</br>' + 'Количество сотен: ' + obj_number.handreds + '</br>' + 'Количество десятков: ' + obj_number.tens + '</br>' + 'Количество единиц: ' + obj_number.units + '</br></br>');

                        return obj_number;
                    } else {
                        return {}; //возвращаем пустой объект
                    }
                } else {
                throw new Error('Function parameter must be \'integer\'');
                }
            } else {
                throw new Error('Function parameter must be \'number\'');
            }
        } else {
            throw new Error('Count of function parameters must be 1');
        }
    } catch (e){
        console.log(e);
    };
};