// 原代码
setTimeout(function(){
  var a = 'hello'
  setTimeout(function(){
    var b = 'lagou'
    setTimeout(function(){
      var c = 'I 💗 u'
      console.log(a + b + c);
    }, 10);
  },10)
},10)
// 改进代码
let promise = new Promise((resolve,reject) =>{
  let a = 'hello'
  resolve(a)
})
promise.then(resolve => {
  let b = 'lagou'
  return resolve + b;
}).then(resolve => {
  var c = 'I 💗 u'
  return resolve + c;
}).then(resolve => {
  console.log(resolve);
})