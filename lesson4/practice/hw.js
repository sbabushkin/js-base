function converNumToObject(num) {
  let result = {};

  if (isNaN(num)) {
      console.log(num + " is not a number!");
      return result;
  } else if (num < 0 || num > 999) {
      console.log("Number must be bigger than 0 and lower 1000");
      return result;
  } 

  result.hundreds = ((num % 1000) / 100).toFixed(0);
  result.tens = ((num % 100) / 10).toFixed(0);
  result.ones = num % 10;

  return result;
}
