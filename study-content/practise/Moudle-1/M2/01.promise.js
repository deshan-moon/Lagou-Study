// Promise 基本示例
// console.log('begin');
// const promise = new Promise(function(resolve,reject) {
//   // resolve(200)
//   reject(new Error('promise rejected'))
// })
// promise.then(function(value){
//   console.log('resolve',value);
// },function(error){
//   console.log('reject',error);
// })
// console.log("end");

// promise应用
function ajax(url){
  return new Promise(function(resolve,reject){
    var xhr = new XMLHttpRequest()
    console.log(xhr);
    xhr.open('get',url)
    xhr.responseType = 'json'
    xhr.onload = function(){
      if(this.status === 200){
        resolve(this.response)
      }else{
        reject(new Error(this.statusText))
      }
    }
    xhr.send()
  })
}
ajax('/api/posts.json').then(function(res){
  console.log(res);
},function(error){
  console.log(error)
})