//простое решение
let Add = 'Add';
let Sub = 'Sub';
let Mult = 'Mult';
let Div = 'Div';

function fn_MathOperation (Operation, a, b) {
    try {    
        if (typeof a === 'number' && typeof b === 'number' && typeof Operation === 'string'){
            switch (Operation){
                case 'Add':
                    return a+b;
                    break;
                case 'Sub':
                    return a-b;
                    break;
                case 'Mult':
                    return a*b;
                    break;
                case 'Div':
                    return a/b;
                    break;
            };
        } else {
            throw new Error('Function Parameter Error');    
        };
    } catch (e){
        console.log(e);
    };
};

//решение чуть поинтереснее
let OnMyMath = {       
    Add:  function (a,b){
                try {
                    if (typeof a === 'number' && typeof  b === 'number' && arguments.length == 2) {
                        return a+b;
                    } else {
                        throw new Error('Method parameter Error');   
                    };
                } catch (e){
                    console.log(e);
                };
            },

    Sub : function (a,b){
                try {    
                    if (typeof a === 'number' && typeof  b === 'number' && arguments.length == 2) {
                        return a-b;
                    } else {
                        throw new Error('Method parameter Error');   
                    };
                } catch (e){
                    console.log(e);
                };
            },

    Mult: function (a,b){
                try {    
                    if (typeof a === 'number' && typeof  b === 'number' && arguments.length == 2) {
                        return a*b;
                    } else {
                        throw new Error('Method parameter Error');   
                    };
                } catch (e){
                    console.log(e);
                };
            },

    Div:  function (a,b){
                try {    
                    if (typeof a === 'number' && typeof  b === 'number' && arguments.length == 2) {
                        return a/b;
                    } else {
                        throw new Error('Method parameter Error');   
                    };
                } catch (e){
                    console.log(e);
                };
            }
};

/*
результаты консоли

OnMyMath.Add(2,6)
8

*/


// решение еще более интересное
let myMath = {
    Add: function (a,b){return a+b;},
    Sub : function (a,b){return a-b;},
    Mult: function (a,b){return a*b;},
    Div: function (a,b){return a/b;}
}

function fn_OnMyMath (myMathVal, a, b){
    try {
        if (typeof myMath[myMathVal] === 'function' && typeof a === 'number' && typeof  b === 'number' && arguments.length === 3) {
            return myMath[myMathVal](a,b);
        } else {
            throw new Error('Function parameter Error'); 
        };
    } catch (e){
        console.log(e);
    };
};

/*
результат работы консоли

fn_OnMyMath(Add, 5, 6)
11

интересный способ применения объекта как параметра другой функции
fn_OnMyMath(Add, myMath.Div(3,5), myMath.Mult(2,4))
или
fn_OnMyMath(Add, myMath[Div](3,5), myMath[Mult](2,4))
8.6

функции как параметра другой функции
fn_OnMyMath(Add, fn_OnMyMath(Div, 3,5), fn_OnMyMath(Mult,2,4))
8.6

смешанное исполнение тоже пойдет
fn_OnMyMath(Add, fn_OnMyMath(Div, 3,5), myMath.Mult(2,4))
8.6

попробуйте написать, какой математический пример был задан...

ответ: (3/5)+(2*4)=0.6+8=8.6

сможете задать запрос на ((3/5)+(2*4))/(4+0,3)??

ответ: fn_OnMyMath(Div, fn_OnMyMath(Add, fn_OnMyMath(Div, 3,5), myMath[Mult](2,4)),fn_OnMyMath(Add, 4, 0.3))
2

P.S. Примеры были придуманы в ходе разбора возможностей функций
*/