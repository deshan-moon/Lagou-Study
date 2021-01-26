# ECMAScript 新特性

### 前言：

ECMAScript是JavaScript的语言本身，通常看作JavaScript的标准化规范，但其实JavaScript是ECMAScript的扩展语言，ECMAScript只提供了最基本的语法，下图分别为浏览器中的JavaScript与Node.js中的JavaScript组成：

<img src="C:\Users\HTUSER\AppData\Roaming\Typora\typora-user-images\image-20210111140040219.png" alt="image-20210111140040219" style="zoom: 80%;" />

<img src="C:\Users\HTUSER\AppData\Roaming\Typora\typora-user-images\image-20210111140102154.png" alt="image-20210111140102154" style="zoom: 80%;" />

所以，JavaScript的语言本身指的就是ECMAScript。 ECMAScript从2015年开始实现每年一个版本的更新，并以年份命名，而ES2015也就是我们俗称的ES6，在经历了五年的停滞后，在ES2015的版本中增加了许多的新特性，而之后的版本都是比较小变化的版本，因此我们俗称的ES6当中通常不仅包含ES2015的内容，通常也包含之后版本迭代的内容，统称为ES6。下图为ECMAScript的版本迭代：

![image-20210111140952993](C:\Users\HTUSER\AppData\Roaming\Typora\typora-user-images\image-20210111140952993.png)



因为ES6内容比较多，以下只是对重要的内容进行简单介绍，有需要的小伙伴可以参考最下方官方链接。

### 1.let与块级作用域：

ES2015之前只有全局作用域与函数作用域，而在ES2015中增加了块级作用域。而let声明的变量只可以在所在的作用域内访问：

- let有自己作用域，而var的作用域为全局

  ```javascript
  if (true) {
    let foo = 'zce'
    console.log(foo)
  }
  console.log(foo)  //输出undefined，let 声明的成员只会在所声明的块中生效 
  ```

- let声明的变量不会进行变量提升，必须先声明后才可使用

  ```javascript
  console.log(foo) //zce
  var foo = 'zce'
  
  console.log(foo) //报错  修复了变量声明提升现象
  let foo = 'zce'
  ```

### 2.const声明恒量：

- 恒量声明过后不允许重新赋值
- 恒量要求声明同时赋值
- 恒量只是要求内层指向不允许被修改，对于数据成员的修改是没有问题的

### 3.数组与对象的解构：

运用解构的方式，方便于我们对数组及对象内的成员进行获取并操作，简化代码，以下为具体示例

数组的解构：

```javascript
定义一个数组：
const arr = [100, 200, 300]

方式一：原先方式
const foo = arr[0]
const bar = arr[1]
const baz = arr[2]
console.log(foo, bar, baz)//输出为：100  200  300

方式二：解构方式获取
const [foo, bar, baz] = arr
console.log(foo, bar, baz)//输出为：100  200  300

方式三：获取指定位置成员
const [, , baz] = arr
console.log(baz)//输出为：300

方式四：展开运算符获取剩余全部成员，需放置最后
const [foo, ...rest] = arr
console.log(rest)//输出为：200  300

方式五：提取未定义成员
const [foo, bar, baz, more] = arr
console.log(more)//输出为：undefined

方式六：给提取成员设置默认值
const [foo, bar, baz = 123, more = 'default value'] = arr
console.log(bar, more)//输出为：200 default value
```

对象的解构：解构console对象

```javascript
const { log } = console
log('foo')//输出为：foo
log('bar')//输出为：bar
```

附：展开运算符...的函数参数运用：

```javascript
function foo (...args) {
  console.log(args)
}
foo(1, 2, 3, 4) //[ 1, 2, 3, 4 ]
```

### 3.模板字符串：

- 字符串使用反引号包裹``
- 字符串允许换行
- 可以通过 ${} 插入表达式，表达式的执行结果将会输出到对应位置（比拼接符 + 更简洁更清晰）

```javascript
const name = 'tom'
const msg = `hey, ${name} --- ${1 + 2} ---- ${Math.random()}`
console.log(msg) //输出为：hey, tom --- 3 ---- 0.4402420599967165
```

### 4.字符串的扩展方法：

```javascript
const message = 'Error: foo is not defined.'

console.log(message.startsWith('Error'))//字符串开始位置
console.log(message.endsWith('.'))//字符串结束位置
console.log(message.includes('foo'))//字符串内部位置
//以上输出均为true
console.log(message.includes('false'))//输出为：false
```

5.箭头函数：

- 语法：

  ```javascript
  function inc (number) {
    return number + 1
  }
  
  // 最简方式
  const inc = n => n + 1
  
  // 完整参数列表，函数体多条语句，返回值仍需 return
  const inc = (n, m) => {
    console.log('inc invoked')
    return n + 1
  }
  ```

- 箭头函数与 this：箭头函数不会改变 this 指向，箭头函数中的this指向它的执行上下文环境中的this，也就是它的上层作用域的this指向谁，箭头函数中的this就指向谁。

  ```javascript
  const person = {
    name: 'tom',
    sayHi: function(){
      console.log(this.name)//Tom
    },
    sayHiAsync: function () {
      console.log(this.name);//Tom
      setTimeout(() => {
        console.log(this.name)//Tom
      }, 100)
    }
  }
  person.sayHi()
  person.sayHiAsync()
  ```

  

### 5.对象字面量增强写法：

- 属性名与变量名相同，可以省略：及之后的内容
- 方法可以省略   : function，this指向调用对象
- 通过 [] 让表达式的结果作为属性名

```javascript
const bar = '345'

const obj = {
  foo: 123,
  // bar: bar
  // 属性名与变量名相同，可以省略 : bar
  bar,
  // method1: function () {
  //   console.log('method')
  // }
  // 方法可以省略 : function
  method () {
    console.log('method')
    // 这种方法就是普通的函数，同样影响 this 指向。
    console.log(this)
  },
  // Math.random(): 123 // 不允许
  // 通过 [] 让表达式的结果作为属性名
  [Math.random()]: 123,
  [bar]: 123
}
```

输出结果：

```javascript
{
  foo: 123,
  bar: '345',
  method1: [Function: method],
  '0.22030889320758518': 123
}
method
{
  foo: 123,
  bar: '345',
  method1: [Function: method],
  '0.22030889320758518': 123
}
```

### 6.对象的扩展方法：

- Object.assign  将多个源对象中的属性复制到一个目标对象中，依次从前往后覆盖：

  ```javascript
  const source1 = {
    a: 123,
    b: 123
  }
  
  const source2 = {
    b: 789,
    d: 789
  }
  
  const target = {
    a: 456,
    c: 456
  }
  //source1 现覆盖 target ，source2再覆盖
  const result = Object.assign(target, source1, source2)
  
  console.log(target)//{ a: 123, c: 456, b: 789, d: 789 }
  console.log(result === target)//true
  ```

- Object.is  判断两个值是否相等，相当于===的判断，但同时支持NaN===NaN的成立

  ```javascript
  console.log(
    // 0 == false              // => true
    // 0 === false             // => false
    // +0 === -0               // => true
    // NaN === NaN             // => false
    // Object.is(+0, -0)       // => false
    // Object.is(NaN, NaN)     // => true
  )
  ```

- Proxy  代理对象：

  ```javascript
  const person = {
    name: 'Tom',
    age: 20
  }
  
  const personProxy = new Proxy(person, {
    // 监视属性读取
    get (target, property) {
      console.log(target, property)
    },
    // 监视属性设置
    set (target, property, value) {
      target[property] = value
      console.log(target, property, value)
    }
  })
  
  personProxy.age = 100
  personProxy.gender = true
  
  console.log(personProxy.name)
  
  ```

### 7.class关键词：

- 类的具体实现

  ```javascript
  //构造函数
  function Person (name) {
    this.name = name
  }
  //原型实现方法
  Person.prototype.say = function () {
    console.log(`hi, my name is ${this.name}`)
  }
  
  //class声明类型：等同于上面的操作
  class Person {
    //构造函数
    constructor (name) {
      this.name = name
    }
  
    //实例对象
    say () {
      console.log(`hi, my name is ${this.name}`)
    }
     static create (name) {
      return new Person(name)
    } 
  }
  
  const p = new Person('tom')
  //调用静态方法
  const tom = Person.create('tom')
  p.say()
  
  ```

  

- 类的继承

  ```javascript
  //被继承的我们通常称为父类
  class Person {
    constructor (name) {
      this.name = name
    }
  
    say () {
      console.log(`hi, my name is ${this.name}`)
    }
  }
  //继承父类的我们通常称为子类
  class Student extends Person {
    constructor (name, number) {
      super(name) // 父类构造函数
      this.number = number
    }
  
    hello () {
      super.say() // 调用父类成员
      console.log(`my school number is ${this.number}`)
    }
  }
  
  const s = new Student('jack', '100')
  s.hello()//输出内容：hi, my name is jack     my school number is 100
  //调用子类的方法，因为子类调用了父类成员，所以父类成员say方法也得到了实现
  ```

### 8.Set与Map数据结构:

- Set数据结构与数组非常类似，可以看做是一个集合，集合中的值是唯一的，不允许重复

  ```javascript
  const s = new Set()
  s.add(1).add(2).add(3).add(4).add(2)
  
  //Set数据结构的值是唯一的，所以会将重复的值删除
  console.log(s) //Set(4) { 1, 2, 3, 4 }
  
  //Set数据结构是可遍历的
  s.forEach(i => console.log(i))//1 2 3 4 
  //Set数据结构获取长度的方法
  console.log(s.size)// 4
  //Set数据结构判断是否含有某个值
  console.log(s.has(100))//  false
  //Set数据结构删除某个值
  console.log(s.delete(3))//true
  console.log(s)//Set(3) { 1, 2, 4 }
  //将所有值清除
  s.clear()
  console.log(s)//Set(0) {}
  
  // 应用场景：数组去重
  const arr = [1, 2, 1, 3, 4, 1]
  const result = [...new Set(arr)]
  
  console.log(result)//[ 1, 2, 3, 4 ]
  ```

- Map 数据结构与对象非常类似，但是对象中的健只能是字符串，而Map支持任意类型的健

  ```javascript
  const m = new Map()
  const tom = { name: 'tom' }
  
  m.set(tom, 90) 
  console.log(m) //  Map(1) { { name: 'tom' } => 90 }
  console.log(m.get(tom)) //  90
  
  //与set一样同样有以下方法
  // m.has()
  // m.delete()
  // m.clear()
  m.forEach((value, key) => {
    console.log(value, key)
  })
  
  // 附：Map还有一个版本为，弱引用版本 WeakMap
  // 差异就是 Map 中会对所使用到的数据产生引用
  // 即便这个数据在外面被消耗，但是由于 Map 引用了这个数据，所以依然不会回收
  // 而 WeakMap 的特点就是不会产生引用
  // 一旦数据销毁，就可以被回收，所以不会产生内存泄漏问题
  ```

### 9.Symbol一种全新的原始数据类型：

- Symbol代表独一无二的值，两个 Symbol 永远不会相等，可以使用Symbol定义对象的健，避免不同模块中健的重复

  ```javascript
  // 使用 Symbol 为对象添加用不重复的键
  const obj = {}
  obj[Symbol()] = '123'
  obj[Symbol()] = '456'
  console.log(obj) //{ [Symbol()]: '123', [Symbol()]: '456' }
  
  // 也可以在计算属性名中使用
  const obj = {
    [Symbol()]: 123
  }
  console.log(obj) //  { [Symbol()]: 123 }
  ```

- 创建对象内部私有成员，由于外部不能创建一摸一样的Symbol，所以外部是访问不到的

  ```
  onst name = Symbol()
  const person = {
    [name]: 'zce',
    say () {
      console.log(this[name])
    }
  }
  // 只对外暴露 person
  ```

- 利用Symbol设置对象的自定义标签

  ```javascript
  const obj = {
    [Symbol.toStringTag]: 'XObject'
  }
  console.log(obj.toString()) //  [object XObject]
  ```

- 获取Symbol定义的对象的健获取的唯一方式：Object.getOwnPropertySymbols(obj)

  ```javascript
  const obj = {
    [Symbol('foo')]: 'symbol value',
    foo: 'normal value'
  }
  // console.log(obj);
  // for (var key in obj) {
  //   console.log(key)
  // }
  // console.log(Object.keys(obj))
  // console.log(JSON.stringify(obj))
  // 以上方式均无法获取
  console.log(Object.getOwnPropertySymbols(obj)) //[Symbol(foo) ]
  ```

### 10.for...of 循环，可以遍历任何一种数据类型：

- for...of 循环可以替代 数组对象的 forEach 方法，forEach 无法跳出循环，必须使用 some 或者 every 方法，而for...of 可以使用break随时终止循环；同样可以遍历Set与Map数据结构；

  ```javascript
  const arr = [100, 200, 300, 400]
  // 基础语法
  for (const item of arr) {
    console.log(item)
    if (item > 100) {
      break
    }
  }
  ```

### 11.iterable可迭代接口

- 实现iterable接口是for...of的前提

- 在数据结构的__proto__原型对象下，会有一个Symbol(Symbol.iterator)方法，该方法返回一个数组对象中有一个next方法，next方法返回一个对象{value：’xxx‘，done：false}，value为我们当前便利的对象的值，done表示是否可继续，不断调用next（）方法，即可实现遍历

- ![image-20210111175005098](C:\Users\HTUSER\AppData\Roaming\Typora\typora-user-images\image-20210111175005098.png)

- ![image-20210111175036528](C:\Users\HTUSER\AppData\Roaming\Typora\typora-user-images\image-20210111175036528.png)

  ```javascript
  //代码实现:
  const set = new Set(['foo', 'bar', 'baz'])
  
  const iterator = set[Symbol.iterator]()
  
  console.log(iterator.next())
  console.log(iterator.next())
  console.log(iterator.next())
  console.log(iterator.next())
  console.log(iterator.next())
  //输出内容
  // { value: 'foo', done: false }
  // { value: 'bar', done: false }
  // { value: 'baz', done: false }
  // { value: undefined, done: true }
  // { value: undefined, done: true }
  ```

### 12.Generator生成器函数：避免异步编程中回调嵌套过深的问题，提供更好的异步编程解决方案

- 基本应用：生成器函数会自动帮我们返回一个生成器对象，调用函数的next方法才会让这个函数体开始执行，一旦遇到yield关键字就会暂停下来，并且yiled的值会作为next的value返回，继续调用next则会从暂停位置继续执行，直到完全结束，done的值变为true，称之为惰性执行

  ```javascript
  unction * foo () {
    console.log('1111')
    yield 100
    console.log('2222')
    yield 200
    console.log('3333')
    yield 300
  }
  
  const generator = foo()
  
  console.log(generator.next()) // 第一次调用，函数体开始执行，遇到第一个 yield 暂停
  //1111
  //{ value: 100, done: false }
  console.log(generator.next()) // 第二次调用，从暂停位置继续，直到遇到下一个 yield 再次暂停
  //2222
  //{ value: 200, done: false }
  console.log(generator.next()) // 。。。
  console.log(generator.next()) // 第四次调用，已经没有需要执行的内容了，所以直接得到 undefined
  //{ value: undefined, done: true }
  ```

### 13.Promise一种更优的异步编程解决方案：解决了传统异步编程中回调函数嵌套过深的问题，内容较多可查看关于Promise的具体内容。



** 注：本文全手打书写，无复制粘贴，如果有错误或异议的地方，欢迎小伙伴们留言指出，感谢阅读！**



# 祝愿各位程序猿小伙伴，前程似锦，一路向北！



本文参考：拉钩教育

供读者参考链接：

网页：http://www.ecma-international.org/ecma-262/6.0/

PDF：http://www.ecma-international.org/ecma-262/6.0/ECMA-262.pdf







