const {compose, curry} = require('folktale/core/lambda')
const {toUpper, first} = require('lodash/fp')


// folktale中的curry需要传递两个参数，一个是函数的参数的个数，一个是函数
let f = curry(2,(x,y) => {
  return x + y
})
console.log(f(1,2))
console.log(f(1)(2));

let t = compose(toUpper,first)
console.log(t(["one","two"]));