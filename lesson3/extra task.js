let massive = [0, 1, 2, 3, 4];

const reducer = (array) =>{
	let lengthCount = array.reduce(function(accumulator, currentValue, index, array) {
		console.log('tick');
	  	return index;
	}, 10);
	return lengthCount+1;
}
console.log(reducer(massive));