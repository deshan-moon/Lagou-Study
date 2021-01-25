// map
const map = (array,fn) => {
  let result = []
  for(let value of array){
    result.push(fn(value))
  }
  return result
}
// let arr = [1,2,3,4]
// arr = map(arr, v => v*v)
// console.log(arr);

// every
const every = (array,fn) => {
  for(let value of array){
    if(!fn(value)){
      return false;
    }
  }
  return true;
}
// let arr = [1,2,3,4]
// arr = every(arr, v => v < 2)
// console.log(arr);

// some
const some = (array,fn) => {
  for(let value of array){
    if(fn(value)){
      return true;
    }
  }
  return false
}

let arr = [9,8,7,6,5,4]
arr = some(arr, v => v > 6)
console.log(arr);
