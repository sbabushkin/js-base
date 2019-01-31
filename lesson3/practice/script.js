function strToArray(str) {
  const arr = [];
  for (let i = 0; i < str.length; i++) {
    arr.push(str[i]);
  }
  return arr;
}

function countCowsAndBulls(numStrRandom, numStrAssumption) {
  let cows = 0;
  let bulls = 0;
  const numArrRandom = strToArray(numStrRandom);
  const numArrAssumption = strToArray(numStrAssumption);
  for (let i = 0; i < numArrAssumption.length; i++) {
    const matchIndex = numArrRandom.indexOf(numArrAssumption[i]);
    if (matchIndex >= 0) {
      if (matchIndex === i) { // bull
        bulls++;
      } else { // cow
        cows++;
      }
    }
  }
  alert('Cows: ' + cows + ', Bulls: ' + bulls);
  return bulls;
}

function checkRepeates(arr) {
  const noRepeats = [];
  for (let i = 0; i < arr.length; i++) {
    if (noRepeats.indexOf(arr[i]) >= 0) {
      return false;
    }
    noRepeats.push(arr[i]);
  }
  return true;
}

function isValid(assumption) {
  if (assumption === null || !assumption.length || isNaN(assumption)) {
    alert('need number');
    return false;
  }
  const assumptionArr = strToArray(assumption);
  if (!checkRepeates(assumptionArr)) {
    alert('you have repeats');
    return false;
  }

  return true;
}

let randomNumber;

do {
  randomNumber = Math.trunc(Math.random() * 9999);
} while (!isValid(randomNumber.toString()));

console.log(randomNumber); //

let assumptionStr;
let bullsCount;

do {
  do {
    assumptionStr = prompt('Please enter assumption');
  } while (!isValid(assumptionStr));
  bullsCount = countCowsAndBulls(randomNumber.toString(), assumptionStr);
} while (bullsCount < 4);

alert('Done!!!');
