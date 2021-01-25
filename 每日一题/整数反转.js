var reverse = function (x) {
  let number = Math.abs(x).toString().split('').reverse().join('')
  if (x >= 0) {
    return +number <= Math.pow(2,31)? number : 0
  } else {
    return -number >= -Math.pow(2,31) ? -number : 0
  };
}
