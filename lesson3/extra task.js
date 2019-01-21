let massive = [0, 1, 98, 3, 4, 44, 34, 67, 58];

const reducer = (array) =>{
	let maxNum = 0;
	let lengthCount = array.reduce(function(accumulator, currentValue, index, array) {
		// console.log(array[index]);
		if(array[index] > maxNum){
			maxNum = array[index];
		}
	  	return maxNum;
	}, 10);
	return lengthCount;
}
console.log(reducer(massive));