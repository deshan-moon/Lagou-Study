let digits = [6, 1, 4, 5, 3, 9, 0, 1, 9, 5, 1, 8, 6, 7, 0, 5, 5, 4, 3]

var plusOne = function (digits) {
  for (let a = digits.length - 1; a >= 0; a--) {
    if (digits[a] < 9) {
      digits[a] += 1;
      return digits;
    }
    else if (digits[a] == 9 && a > 0) {
      digits[a] = 0;
    }
    else if (digits[a] == 9 && a == 0) {
      digits.length += 1;
      digits.fill(0);
      digits[0] = 1;
      return digits;
    }

  }
};

console.log(plusOne(digits));