function ajax(url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest()
    // console.log(xhr);
    xhr.open('get', url)
    xhr.responseType = 'json'
    xhr.onload = function () {
      if (this.status === 200) {
        resolve(this.response)
      } else {
        reject(new Error(this.statusText))
      }
    }
    xhr.send()
  })
}

// 两者形式相同：传入值
Promise.resolve('foo')
  .then(function (resolve) {
    console.log(resolve)
  })
new Promise(function (resolve, reject) {
  resolve('foo')
})
// 传入另一个promise对象
let promise = ajax('/api/users.json')
let promise2 = Promise.resolve(promise)
console.log(promise === promise2)
// 传入对象
Promise.resolve({
  then: function (onFulfilled, onRejected) {
    onFulfilled('too')
  }
})
  .then(function (value) {
    console.log(value)
  })

// 静态方法reject
Promise.reject('nothing')
  .catch(function (error) {
    console.log(error)
  })

// 并行执行
Promise.all([
  ajax('/api/users.json'),
  ajax('/api/urls.json')
])
.then(function(resolve) {
  console.log(resolve);
})
.catch(function(error){
  console.log(error)
})

ajax('/api/urls.json')
  .then(function(resolve) {
    const urls = Object.values(resolve)
    console.log(urls)
    const tasks = urls.map(url => ajax(url))
    console.log(tasks);
    return Promise.all(tasks)
  })
  .then(function (resolve) {
    console.log(resolve)
  })
const url = ajax('/api/urls.json')
const timeout = new Promise((reaolve,reject) => {
  setTimeout(() => {
    reject(new Error('timeout'))
  },500)
})
Promise.race([
  url,
  timeout
])
.then(function(resolve) {
  console.log(resolve);
})
.catch(function(error){
  console.log(error)
})

