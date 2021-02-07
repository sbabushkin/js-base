// Homework button
const myLink1 = document.getElementById('hw');
let checkLink1 = false;
myLink1.onclick = function(event){
    if(checkLink1 === false){
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "public/script.js"; 
        document.getElementsByTagName("body")[0].appendChild(script);
        checkLink1 = true;
        myLink1.classList.add('clicked');
        return;
    } else {
        return;
    }

    
}

// Football button
const myLink2 = document.getElementById('football');
let checkLink2 = false
myLink2.onclick = function(event){
    if(checkLink2 === false){
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "goalkeeper/goalkeeper game.js"; 
        document.getElementsByTagName("body")[0].appendChild(script);
        checkLink2 = true;
        myLink2.classList.add('clicked');
        return;
    } else {
        return;
    }
}

// Millionair button
const myLink3 = document.getElementById('millionair');
let checkLink3 = false;
myLink3.onclick = function(event){
    if(checkLink3 === false){
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "millionaire/millionair.js"; 
        document.getElementsByTagName("body")[0].appendChild(script);
        checkLink3 = true;
        myLink3.classList.add('clicked');
        return;
    } else {
        return;
    }
}