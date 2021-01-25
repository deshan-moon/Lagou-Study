class Left {
  static of(value){
    return new Left(value)
  }
  constructor(value){
    this._value = value
  }
  map(fn){
    return this
  }
}

class Right {
  static of(value){
    return new Right(value)
  }
  constructor(value){
    this._value = value
  }
  map(fn){
    return Right.of(fn(this._value))
  }
}
// let f = Right.of('name').map(x => x.toUpperCase())
// console.log(f);
function parseJSON(value){
  try {
    return Right.of(JSON.parse(value))
  }catch(e) {
    return Left.of({error: e.message})
  }
}
let t = parseJSON('{"name":"cds"}').map(x => x.name.toUpperCase())
console.log(t);
