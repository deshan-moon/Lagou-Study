// // 生成器函数回顾
// function * foo() {
//   console.log('start')
//   try{
//     const res = yield 'foo'
//     console.log(res)
//   }catch(e){
//     console.log(e)
//   }  
// }

// const generator = foo()
// const result = generator.next()
// console.log(result);
// // generator.next('aaa')
// generator.throw(new Error('Generator Error'))

// Generator 配合 Promise 的异步方案
function ajax(url) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.responseType = 'json'
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response)
      } else {
        reject(new Error(xhr.statusText))
      }
    }
    xhr.send()
  })
}

function * main() {
  try {
    const urls = yield ajax('/api/urls.json')
    console.log(urls)

    const users = yield ajax('/api/users.json')
    console.log(users)

    const posts = yield ajax('/api/posts.json')
    console.log(posts) 
  } catch (e) {
    console.log(e);
  }
}
function co(generator) {
  const g = generator()
  function handleResult(result) {
    if (result.done) return;
    result.value.then(data => {
      handleResult(g.next(data))
    }, error => {
      g.throw(error)
    })
  }
  handleResult(g.next())
}
co(main)