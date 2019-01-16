// не использую isNaN, чтобы избежать конфликтов в таких случаях fn_Addition ('2','3')
// вариант для двух чисел
function fn_Addition (a,b){
    try {
        if (typeof a === 'number' && typeof  b === 'number' && arguments.length == 2) {
            return a+b;
        } else {
            throw new Error('Function parameter Error');   
        };
    } catch (e){
        console.log(e);
    };
};

function fn_Subtraction (a,b){
    try {    
        if (typeof a === 'number' && typeof  b === 'number' && arguments.length == 2) {
            return a-b;
        } else {
            throw new Error('Function parameter Error');   
        };
    } catch (e){
        console.log(e);
    };
};

function fn_Multiplication (a,b){
    try {    
        if (typeof a === 'number' && typeof  b === 'number' && arguments.length == 2) {
            return a*b;
        } else {
            throw new Error('Function parameter Error');   
        };
    } catch (e){
        console.log(e);
    };
};

function fn_Division (a,b){
    try {    
        if (typeof a === 'number' && typeof  b === 'number' && arguments.length == 2) {
            return a/b;
        } else {
            throw new Error('Function parameter Error');   
        };
    } catch (e){
        console.log(e);
    };
};


//вариант для множества чисел

function fn_AdditionMult (){
    try {
        if (arguments.length === 0){
            return undefined;
        }
        for (let i in arguments){
            if (typeof arguments[i] !== 'number') {
                throw new Error('Function parameter Error: all of parameters must be \'number\'');
            };
        };
        let result = 0;
        for (let i in arguments){
            result += arguments[i];
        };
        return result;
    } catch (e){
        console.log(e);
    };
};

function fn_SubtractionMult (){ //вычитаем из первого значения все остальные
    try {
        if (arguments.length === 0){
            return undefined;
        }
        for (let i in arguments){
            if (typeof arguments[i] !== 'number') {
                throw new Error('Function parameter Error: all of parameters must be \'number\'');
            };
        };
        let result = arguments[0];
        for (let i = 1; i<arguments.length; i++){
            result -= arguments[i];
        };
        return result;
    } catch (e){
        console.log(e);
    };
};

function fn_MultiplicationMult (){
    try {
        if (arguments.length === 0){
            return undefined;
        }
        for (let i in arguments){
            if (typeof arguments[i] !== 'number') {
                throw new Error('Function parameter Error: all of parameters must be \'number\'');
            };
        };
        let result = 0;
        for (let i in arguments){
            result *= arguments[i];
        };
        return result;
    } catch (e){
        console.log(e);
    };
};

function fn_DivisionMult (){ // делим первое значение на все остальные
   try {
        if (arguments.length === 0){
            return undefined;
        }
        for (let i in arguments){
            if (typeof arguments[i] !== 'number') {
                throw new Error('Function parameter Error: all of parameters must be \'number\'');
            };
        };
        let result = arguments[0];
        for (let i = 1; i<arguments.length; i++){
            result /= arguments[i];
        };
        return result;
    } catch (e){
        console.log(e);
    };
};