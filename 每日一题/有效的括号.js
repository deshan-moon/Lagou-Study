var s = "{[]}"

var isValid = function(s) {
  const n = s.length;
  if (n % 2 === 1) {
      return false;
  }
  const pairs = new Map([
      [')', '('],
      [']', '['],
      ['}', '{']
  ]);
  const stk = [];
  for (let i = 0; i < s.length; i++) {
      if (pairs.has(s[i])) {
        console.log("stk.length");
        console.log(stk.length);
        console.log("stk[stk.length - 1]");
        console.log(stk[stk.length - 1]);
        console.log(pairs.get(s[i]));
          if (!stk.length || stk[stk.length - 1] !== pairs.get(s[i])) {
              return false;
          }
          stk.pop();
          console.log("stk");
          console.log(stk);
      } 
      else {
          stk.push(s[i]);
      }
  }
  return !stk.length;
};
// var isValid = function (s) {
//   let s1 = ['{','[','('];
//   let s2 = ['}',']',')'];
//   s = s.split('')
//   s.forEach((item) => {

//   })
//   let num = 0
//   if (s.includes('{') && s.includes('}') && (s.indexOf('{')-s.indexOf('}')) % 2 != 0 && s.indexOf('{') < s.indexOf('}')) {
//     num++
//   }
//   if (s.includes('(') && s.includes(')') && (s.indexOf('(')-s.indexOf(')')) % 2 != 0 && s.indexOf('(') < s.indexOf(')')) {
//     num++
//   }
//   if (s.includes('[') && s.includes(']') && (s.indexOf('[')-s.indexOf(']')) % 2 != 0 && s.indexOf('[') < s.indexOf(']')) {
//     num++
//   }
//   if(num == s.length / 2){
//     return true
//   }else{
//     return false
//   }
// };
console.log(isValid(s));