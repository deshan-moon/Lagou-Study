// 字符串的match方法
// 判断字符串是否有空格并返回：''.match(/\s+/g)
// 判断字符串是否有数字并返回：''.match(/\d+/g)
const _ = require('lodash')
// function match (reg,str){
//   return str.match(reg)
// }
// 赋值式，下面为简化式
// const match1 = _.curry(match)
// console.log(match1(/\d+/g,'hello 88world hi123'))
const match = _.curry((reg,str) => str.match(reg));
let matchSpace = match(/\s+/g);
let matchNumber = match(/\d+/g);
// console.log(matchSpace('hello 88world hi123'));
// console.log(matchNumber('hello 88world hi123'));
const filter = _.curry((fn,array) => array.filter(fn))
const findSpace = filter(matchSpace)
console.log(findSpace(['hello world!','hi']))
// 总结：
// 1、定义match函数，可传入两个参数，字符串与正则，并用柯里化函数封装
// 2、matchSpace定义正则，参数可直接传字符串
// 3、filter定义过滤函数，并将不符合条件的过滤掉，参数为定义正则后的函数与数组
// 4、findSpace定义过滤函数，参数为数组
