/*условиия использованы только для валидации входного параметра, само решение от них
не зависит, в качестве ограничителя использовал логарифм числа.
отсутствуют циклы, условия и прерывания
*/
function fn_revers (n){    
    let count = 'Ваши числа:';
    try {    
        if (arguments.length === 1){    
            if (typeof n === 'number'){ //проверяем тип параметра
                if (parseInt(n) === parseFloat(n)){ // число должно быть 'integer'
                    if (n >0 && n < 101){ // число должно быть от 1 до 100
                        document.write(fn_Numbers(n).split(' ').sort(function(a,b){return a-b;}).join(' ')+'</br></br>'); //произвожу реверс чисел, т.к. по условию числа должны быть от 1 до n+'</br></br>');                            
                    } else {
                        throw new Error('Function parameter must be between 1 and 100');
                    };
                } else {
                    throw new Error('Function parameter must be \'integer\'');
                };                
            } else {
                throw new Error('Function parameter must be \'number\'');
            };
        } else {
            throw new Error('Count of function parameters must be 1');
        };
    } catch (e){
        console.log(e);
    };
    
    function fn_Numbers (n){
        count += ' ' + n;
        !isNaN(Math.log(n-2)) && fn_Numbers(--n); //n-2 т.к. 1 count лишний за счет предыдущей строки и один лишний, т.к. infinity - это число
        return count;
    }; 
};     