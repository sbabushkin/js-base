function fn_Power (val, pow){
    try {
        if (typeof val === 'number' && typeof pow === 'number'){// проверяем, что параметры number
            if (parseInt(pow) === parseFloat(pow)){ // pow должно быть целым числом
                if (pow >= 0) {
                    return fn_PowerPositive (val, pow);   
                } else {
                    return fn_PowerNegative (val, pow);   
                };
            } else {
                throw new Error('power must be \'integer\'');
            }
        } else {
            throw new Error('Function parameter Error');
        };
    } catch (e){
        console.log(e);
    }
};

function fn_PowerPositive (val, pow){ // положительная степень или 0
    if (pow > 0) {
        return val*fn_PowerPositive(val, pow-1);   
    } else {
        return 1;
    };
};

function fn_PowerNegative (val, pow){ // отрицательная степень
    if (pow < 0) {
        return (1/val)*fn_PowerNegative(val, pow+1);   
    } else {
        return 1;
    };
};