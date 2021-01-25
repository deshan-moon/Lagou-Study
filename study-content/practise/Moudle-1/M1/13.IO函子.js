// IO函子包含非纯函数的处理
const fp = require('lodash/fp')
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
}
console.log(process.execPath)
let p = IO.of(process).map( p => p.execPath)
console.log(p)
console.log(p._value())
