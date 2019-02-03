function task1() {
    let arrN = [];
    arrN.push(2);
    let i = 3;
    let flag;

    while (i < 100) {
        let j = 0;
        flag = false;
        while (j <= arrN.length && flag == false ) {
            if ((i % arrN[j]) == 0) {
                flag = true;
            }
            j++;
        }
        if (flag == false ) {
            arrN.push(i);
        }
        i += 2;
    }
    alert(arrN);
}
function task2(){

    str='';
    let i=0;
    do{
        if(i==0){str+=i+'– это ноль\n';}
        else if(i % 2 == 0){ str+=i+'– четное число\n'}
        else{str+=i+'– нечетное число\n'}
        i++;
    }while(i<=10)
        alert(str);
}
function task3(){
       str='';
    for(let i=0;i<9;str+=i+' ',i++){}
    alert(str);
}
function task4(){
    let str;
    for(let i=1;i<=20;i++){
        str='';
        for(j=1;j<=i;j++){str+='*';}
        console.log(str);
    }
}