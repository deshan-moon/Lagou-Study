const { resolve } = require('../../../资料/01-01-study-materials/01-01-study -materials/01-01-codes/01-01-03-01-my-promise/myPromise')
const MyPromise = require('./06.promise原理')
// promise的基本实现
const p = new MyPromise((resolve, reject) => {
  // throw new  Error('executor error');
  // setTimeout(() => {
  //   resolve('成功...')
  // }, 2000)
  resolve('成功')
  // reject('失败')
})
function other() {
  return new MyPromise((resolve, reject) => {
    resolve('other')
  })
}
// p.then(resolve => {
//   console.log(resolve)
//   return other();
// })
// p.then(resolve => {
//   console.log(resolve)
//   return 200
//   // throw new  Error('then error');
// }, reject => {
//   console.log(reject)
//   return 100
// }).then(resolve => {
//   console.log(resolve)
// }, reject => {
//   console.log(reject)
// })

// p.then().then().then(resolve => console.log(resolve))

function p1 () {
  return new MyPromise(function (resolve, reject) {
    setTimeout(function () {
      // console.log(123);
      resolve('p1')
    }, 2000)
  })
}
function p2 () {
  return new MyPromise(function (resolve, reject) {
    // console.log(140);
    // reject('失败')
    resolve('成功');  
  })
}
// MyPromise.all(['a','b',p1(),p2(),"c"]).then(result => console.log(result))
// MyPromise.resolve(p1()).then(result => console.log(result))
// p1 ().finally(() => {
//   console.log('finally')
//   return p1();
// }).then(resolve => {
//     console.log(resolve)
//   }, reject => {
//     console.log(reject)
//   })

  p2 ().then(resolve => {
    console.log(resolve)
  }).catch(reason => {
    console.log(reason)
  })
