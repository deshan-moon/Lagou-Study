const fs = require('fs')
const {task} = require('folktale/concurrency/task')
const {split,find} = require('lodash/fp')
const fp = require('lodash/fp')

function readFile (filename) {
  return task(resolver => {
    fs.readFile(filename,"utf-8",(err,data) => {
      if(err) resolver.reject(err)
      resolver.resolve(data)
    })
  })
}
// readFile('package.json')
//   .map(split('\n'))
//   .map(find( x => x.includes('version')))
//   .run()
//   .listen({
//     onRejected:err => {
//       console.log(err);
//     },
//     onResolved:value => {
//       console.log(value)
//     }
//   })

// 模拟cat方法  及 IO Monad
class IO {
  static of (value){
    return new IO(function(){
      return value
    })
  }
  constructor(fn){
    this._value = fn
  }
  map(fn){
    return new IO(fp.flowRight(fn,this._value))
  }
  join(){
    return this._value()
  }
  flatMap(fn){
    return this.map(fn).join()
  }
}
let readfile = function(filename){
  return new IO (function(){
    return fs.readFileSync(filename,'utf-8')
  })
}
let print = function(x){
  return new IO (function(){
    console.log(x)
    return x
  })
}
// IO 函子调用 
// let cat = fp.flowRight(print,readfile)
// let r = cat('package.json')._value()._value()
// console.log(r);

// monad函子调用
let r = readfile('package.json')
  .map(fp.toUpper)
  .flatMap(print)
  .join()
console.log(r)