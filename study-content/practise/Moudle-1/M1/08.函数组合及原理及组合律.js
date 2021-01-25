// 函数组合
// function compose(f,g){
//  return function(value){
//    return f(g(value))
//  }
// }
// function reverse(array){
//   return array.reverse()
// }
// function first(array){
//   return array[0]
// }
// let last = compose(first,reverse)
// console.log(last([1,2,3,4]));

// const _ = require('lodash')
// const reverse = array => array.reverse()
// const first = array => array[0]
// const toUpper = str => str.toUpperCase()
// const f = _.flowRight(toUpper, first, reverse)


// 模拟flowright原理
// function compose(...args) {
//   return function (value) {
//     return args.reverse().reduce(function(acc,fn){
//       return fn(acc)
//     },value)
//   }
// }
// 原理箭头函数
// let compose = (...args) => (value) => args.reverse().reduce((acc,fn) => fn(acc),value);
// const f = compose(toUpper, first, reverse)
// console.log(f(['one', 'two', 'there']));

// 结合律
const _ = require('lodash')
// const f = _.flowRight(_.toUpper, _.first, _.reverse)
// const f = _.flowRight(_.flowRight(_.toUpper, _.first), _.reverse)
const f = _.flowRight(_.toUpper,_.flowRight(_.first, _.reverse))
console.log(f(['one', 'two', 'there']));
