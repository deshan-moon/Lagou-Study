// 函数是一等公民
// 函数可以存储在变量中：
// 把函数赋值给变量
let fn = function(){
  console.log('hello0')
}
// 函数的方法赋值给另一个方法 
const BlogController = {
  index(posts){
    return Views.index(posts)
  }
};
// 等同于
const BlogController = {
  index:Views.index
};

// 高阶函数:函数可以作为参数
function forEach(array,fn){
  for(let value of array){
    fn(value);
  }
}
let arr = [1,2,3,5,8]
forEach(arr,item => {
  console.log(item)
})
function filter(array,fn){
  let result = [];
  for(let i = 0;i < array.length; i++){
    if(fn(array[i])){
      result.push(array[i]);
    } 
  }
  return result
}
// let arr = [1,2,3,7,8]
let arrNew = filter(arr,item => {
  return item > 5;
})
console.log(arrNew);
// 高阶函数:函数可以作为返回值
function makeFn(){
  let msg = "hello world!"
  return function(){
    console.log(msg);
  }
}
let fn1 = makeFn()
fn1()
makeFn()()

// 案例：只执行一次的函数
function once(fn){
  let done = false;
  return function(){
    if(!done){
      done = true;
      fn.apply(this,arguments)
    }  
  }
}
let pay = once(function(money){
  console.log('支付了' + money + '元');
})
pay(1888)
pay(1888)
pay(1888)