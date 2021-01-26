### 不同场景下的this

- 全局函数中的this指向：你或许会说函数中的this指向window（node.js中指向globalThis），只能说一般情况下它指向window，严谨的说，它可以指向anything；

```javascript
function foo() {
    console.log(this)
    // this => anything
}
foo() //=> globalThis / window 一般调用时指向 
const obj = { foo: foo }
obj.foo() //=> obj 作为函数方法调用指向obj

foo.call(123) // => 123  使用call改变时指向

总结：所以全局函数中的this可以指向anything
```

- 对象方法中的this：你心里想着谁调用this指向谁，那是一般情况，举例如下

```javascript
const obj1 = {
    foo: function () {
        console.log(this)
    }
}
obj1.foo() //=> obj1  obj1直接调用指向

const fn = obj1.foo
fn()  // => globalThis   将方法赋值于fn，this即改变

总结：this 指向取决于当前这个 function 最终怎样被执行
```

- 思考题：下列代码中的2个 this 指向

```javascript
const obj2 = {
    foo: function () {
        console.log(this)
        function bar() {
            console.log(this)
        }
        bar()
    }
}

obj2.foo()




答案：
第一个this，属于foo函数，指向它的调用者obj2
第二个this，属于bar函数，bar函数正常调用，this指向 globalThis
```



### 关于this总结：

1. 沿着作用域向上找最近的一个 function（不是箭头函数），看这个 function 最终是***\*怎样执行\****的；

2. this 的指向取决于所属 function 的调用方式，而不是定义；

3. function 调用一般分为以下几种情况：

   - 作为函数调用，即：`foo()`，可以理解为 window.foo()

     = >   指向全局对象（globalThis），注意严格模式问题，严格模式下是 undefined

   - 作为方法调用，即：`foo.bar()` / `foo.bar.baz()` / `foo['bar']()` / `foo[0]()`

     = >   指向最终调用这个方法的对象

   - 作为构造函数调用，即：`new Foo()`

     = >   指向一个新对象 `Foo {}`

   - 特殊调用，即：`foo.call()` / `foo.apply()` / `foo.bind()`

     = >   参数指定成员

   - 如果找不到所属的 function，this 就指向全局对象

4. 严格模式下原本应该指向全局的 `this` 都会指向 `undefined`



### 改变this指向的方法：call()   apply()   bind()都是用来重定义 this 这个对象的

```javascript
const objX = {
    name:'Kobe Bryant'
}
// 1、基本使用
obj.foo.call(objX)
obj.foo.apply(objX)　　 
obj.foo.bind(objX)()

// 以上打印内容为：His name is Kobe Bryant
// 3个方法均可改变this指向，但是 bind 返回的是一个新的函数，你必须调用它才会被执行。

// 2、参数对比
const obj = {
    name: 'Jack Michelson',
    foo: function (hobby,merit) {
        console.log(`His name is ${this.name},he likes ${hobby},he is very ${merit}.`);
    }
}

const objX = {
    name: 'Kobe Bryant'
}

obj.foo.call(objX,'basketball','cool')
obj.foo.apply(objX,['basketball','cool'])
obj.foo.bind(objX,'basketball','cool')()

// 以上打印内容均为：His name is Kobe Bryant,he likes basketball,he is very cool.
// call 、bind 、 apply 这三个函数的第一个参数都是 this 的指向对象，差别在之后的参数：
// call 的参数直接放进去，第二第三第 n 个参数全都用逗号分隔，直接放到后面 obj.foo.call(objCall,'basketball',...)。
// apply 的所有参数都必须放在一个数组里面传进去 obj.foo.apply(objCall,['basketball',...])；apply只接受两个参数，一个指向对象，一个参数数组
// bind 除了返回是函数以外，它的参数和 call 一样。
```



