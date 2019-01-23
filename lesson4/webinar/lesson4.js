const aquarium = {
    width:100,
    height:150,
    isClean:true,
    dinnerCount:0,
    fishes: [
        'fish1',
        'fish2',
        'fish3',
        'fish4',
],
    foodToFishes() {
        if(this.dinnerCount===5) { //this - значит в этом obj
            console.log("No more Food!!!");
            return;
        }
        this.dinnerCount++;
        console.log(this.dinnerCount);
    }
    
    
}

aquarium.foodToFishes();
console.log(aquarium.fishes);

const result = delete aquarium.fishes;
console.log(result);
console.log(aquarium.fishes);

for (const propertyName in aquarium) {
    console.log(propertyName);
}