# Part1-2 作业

( 请在当前文件直接作答 )

## 简答题

### 1. 请说出下列最终执行结果，并解释为什么?

```javascript
var a = [];
for(var i = 0; i < 10; i++) {
  a[i] = function() {
    console.log(i)
  }
}
a[6]()


答案：a[6]()的结果即为10
a = [function(){console.log(i)}*10]
a[6]()调用时，执行的函数为function(){console.log(i)}，而此时的i用的var全局变量定义，已经在for的情况下赋值为10，所以无论执行数组a中的哪一个下标对应的值都为10
```

　　

### 2. 请说书此案列最终执行结果，并解释为什么?

```javascript
var tmp = 123;
if (true) {
  console.log(tmp);
  let tmp;
}

答案：
执行报错，Cannot access 'tmp' before initialization；
let声明的变量不可以在声明前使用，该作用域内有tmp则不会去全局变量中查找
```



### 3. 结合ES6语法，用最简单的方式找出数组中的最小值

```javascript
var arr = [12, 34, 32, 89, 4]

答案：Math.min(...arr)
```



### 4. 请详细说明var、let、const三种声明变量的方式之间的具体差别

　答案：var ：全局变量，在代码中的任何作用域可使用，会进行变量提升，可以在声明前访问；

​				let：作用域变量，在作用域内部可访问，外部作用域不可访问，且不可以重复定义同一变量名，不可以在声明前访问；

​				const：定义常量，作用域与let相同，必须在声明时初始化，一旦定义不可更改，对于引用数据类型仅可改变值，不可以在声明前访问。



### 5. 请说出下列代码最终输出结果，并解释为什么？

```javascript
var a = 10;
var obj = {
  a: 20,
  fn() {
    setTimeout(() => {
      console.log(this.a)
    })
  }
}
obj.fn()

答案：输出结果为20，箭头函数内的this，指向上层作用域的this，setTimeout的上层作用域为fn，fn的this指向调用者obj，obj的a为20。
```

　

　

### 6. 简述Symbol类型的用途

答案：表示独一无二的值，最大的用法是用来定义对象的唯一属性名。所以 Symbol 作为对象的属性名，可以保证属性不重名。

es5中，Object的key在定义时会统一转换为字符串，也就意味着key的唯一形式即为字符串。而在Symbol类型中可以接收Object、Array等引用类型的值作为对象属性的key。

例：

```javascript
var n = Symbol([1,2,3]);

var obj = {

	[n]:"tom" //字面量添加symbol属性，必须要用[]

};

console.log(obj);//{ [Symbol(1,2,3)]: 'tom' }
```

　

### 7. 说说什么是浅拷贝，什么是深拷贝？

　答案：浅拷贝：只拷贝内容部分，对于引用类型并没有将内存地址部分拷贝，当修改其中任意一个会影响另一个，因为它们指向同一个内存地址。

深拷贝：完全拷贝，从内存地址到内容全部拷贝，修改其中一个不会影响另一个。

　

### 8. 请简述TypeScript与JavaScript之间的关系？

　答案：TypeScript相当于JavaScript的扩展语言，实际上TS本身就是JS，因为在TS内部完全支持JS语法，而TS提供了很多JS没有的约束功能，使JS语言更贴向强类型语言，代码更规范，更便于维护，但TS并不被浏览器所识别，所以TS最终还是会编译成JS代码供浏览器解析。

　

### 9. 请谈谈你所认为的typescript优缺点

　答案：优点：代码严格约束，避免编程过程中的不必要错误。

​				缺点：规范很多，需编写时一一定义；且不被浏览器解析，最终仍需编译成JS代码。

　

### 10. 描述引用计数的工作原理和优缺点

答案：

　	工作原理：设置引用数，判断当前引用数是否为0；引用计数器，当引用关系改变时修改引用数字，引用数字为0时立即回收；

​		优点：发现垃圾立即回收，最大限度减少程序暂停；

​		缺点：无法回收循环引用的对象；时间开销大。

　

### 11. 描述标记整理算法的工作流程

　答案：

​			标记阶段：遍历所有对象，标记活动对象；

​			整理阶段：遍历所有对象对标记对象进行整理，移动标记对象依次排列到统一位置；

​			清除阶段：清除没有标记的对，回收相应空间交给空闲链表维护；

　

### 12.描述V8中新生代存储区垃圾回收的流程

　答案：内存分配：新生代内存区分为两个等大的内存空间，分别为使用空间From，空闲空间To；

​				标记整理：活动对象存储于From空间，对From空间的对象进行标记整理；

​				复制算法：将活动对象拷贝至To空闲空间，From 与 To交换空间完成垃圾回收

　

### 13. 描述增量标记算法在何时使用及工作原理

　答案：工作原理：将回收机制拆分进行工作。

​				使用：回收老生代对象时使用，数据多，空间大，

　