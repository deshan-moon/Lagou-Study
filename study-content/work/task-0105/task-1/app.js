const { flowRight } = require('lodash');
const fp = require('lodash/fp')
const {Maybe,Container} = require('./support')
let maybe = Maybe.of([5,6,1])
let exl = (x) => {
  //你需要实现的函数
  let f = fp.map(x => x + 2)
  console.log(f(x));
}
let p = maybe.map(exl)
console.log(p);
// let x = [5,6,1]