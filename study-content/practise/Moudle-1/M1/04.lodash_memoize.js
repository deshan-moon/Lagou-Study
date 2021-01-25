const _ = require('lodash')

function getArea(r){
  console.log('执行getArea')
  return Math.PI * r * r
}

// let getAreaWithMemory = _.memoize(getArea)
// console.log(getAreaWithMemory(4))
// console.log(getAreaWithMemory(4))
// console.log(getAreaWithMemory(4))

function memoize(f){
  let cache = {}
  return function(){
    console.log(arguments)
    let key = JSON.stringify(arguments)
    console.log(cache);
    cache[key] = cache[key] || f.apply(this,arguments)
    return cache[key]
  }
  
}
let getAreaWithMemory = memoize(getArea)
console.log(getAreaWithMemory(5))
console.log(getAreaWithMemory(6))

