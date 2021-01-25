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

async function main() {
  try {
    const urls = await ajax('/api/urls.json')
    console.log(urls)

    const users = await ajax('/api/users.json')
    console.log(users)

    const posts = await ajax('/api/posts.json')
    console.log(posts) 
  } catch (e) {
    console.log(e);
  }
}
const promise = main()
promise.then(() => {
  console.log('all completed');
})