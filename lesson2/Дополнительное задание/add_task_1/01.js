/*условиия использованы только для валидации входного параметра, само решение от них
не зависит, в качестве ограничителя использовал минимальность длинны массива '0'.
отсутствуют циклы, условия и прерывания
*/
function fn_revers (n){    
    let count = 'Ваши числа:';
    try {    
        if (typeof n === 'number'){ //проверяем тип параметра
            if (parseInt(n) === parseFloat(n)){ // число должно быть 'integer'
                if (n >0 && n < 101){ // число должно быть от 1 до 100
                    document.write(fn_Numbers(n)+'</br></br>');                            
                } else {
                    throw new Error('Function parameter must be between 1 and 100');
                };
            } else {
                throw new Error('Function parameter must be \'integer\'');
            };                
        } else {
            throw new Error('Function parameter must be \'number\'');
        };
        } catch (e){
            console.log(e);
        };
    
    function fn_Numbers (n){
        try{
            let arr = Array(n-1);                    
            count += ' ' + (arr.length+1);
            fn_Numbers(--n);
        } finally {
            return count.split(' ').sort(function(a,b){return a-b;}).join(' '); //произвожу реверс чисел, т.к. по условию числа должны быть от 1 до n
        };
    }; 
};     