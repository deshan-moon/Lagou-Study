let s = "MCMXCIV";
let romanToInt = function (s) {
  let num = 0
  let arrKey =['IV','IX','XL','XC','CD','CM']
  let arrVal =[4,9,40,90,400,900]
  
  arrKey.forEach((item,i) => {
    let index = s.indexOf(item)
    if(index !== -1){
      s = s.replace(item,'')
      num += arrVal[i]
    }
  })
  s.split('').forEach((item) => {
    switch (item) {
      case "I" : num += 1;break;
      case "V" : num += 5;break;
      case "X" : num += 10;break;
      case "L" : num += 50;break;
      case "C" : num += 100;break;
      case "D" : num += 500;break;
      case "M" : num += 1000;break;
    }
  })
  return num
};
console.log(romanToInt(s));