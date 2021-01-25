// 链式调用
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
ajax('/api/users.json')
  .then(function (resolve) {
    console.log(resolve)
    return 'foo'
  })
  .then(function (resolve) {
    console.log(resolve)
    return ajax('/api/urls.json')
  })
  .then(function (resolve) {
    console.log(resolve)
  })
  .catch(function (error) {
    console.log('onRejected', error)
  })