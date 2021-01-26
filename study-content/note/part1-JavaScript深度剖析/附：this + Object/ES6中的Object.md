# Object 对象的新增方法：

- [Object.is()](https://wangdoc.com/es6/object-methods.html#objectis)

- Object.assign()
- [Object.getOwnPropertyDescriptors()](https://wangdoc.com/es6/object-methods.html#objectgetownpropertydescriptors)
- `__proto__`属性，Object.setPrototypeOf()，Object.getPrototypeOf()
  - [`__proto__`属性](https://wangdoc.com/es6/object-methods.html#__proto__属性)
  - [Object.setPrototypeOf()](https://wangdoc.com/es6/object-methods.html#objectsetprototypeof)
  - [Object.getPrototypeOf()](https://wangdoc.com/es6/object-methods.html#objectgetprototypeof)
- Object.keys()，Object.values()，Object.entries()
  - [Object.keys()](https://wangdoc.com/es6/object-methods.html#objectkeys)
  - [Object.values()](https://wangdoc.com/es6/object-methods.html#objectvalues)
  - [Object.entries()](https://wangdoc.com/es6/object-methods.html#objectentries)
- [Object.fromEntries()](https://wangdoc.com/es6/object-methods.html#objectfromentries)

https://wangdoc.com/es6/object-methods.html

https://blog.csdn.net/qq_42833001/article/details/83302149 

### 1. Object.is()

ES5 比较两个值是否相等，只有两个运算符：相等运算符（`==`）和严格相等运算符（`===`）。它们都有缺点，前者会自动转换数据类型，后者的`NaN`不等于自身，以及`+0`等于`-0`。JavaScript 缺乏一种运算，在所有环境中，只要两个值是一样的，它们就应该相等。

ES6 提出“Same-value equality”（同值相等）算法，用来解决这个问题。`Object.is`就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。

```javascript
Object.is('foo', 'foo')	// true
Object.is({}, {})	// false

//不同之处只有两个：一是+0不等于-0，二是NaN等于自身。
+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) 	// false
Object.is(NaN, NaN) // true
```

### 2. Object.assign()

- #### 基本用法：方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）

```javascript
const target = { a: 1, b: 1 };

const source1 = { b: 2, c: 2 };
const source2 = { c: 3 };

//1. Object.assign()方法的第一个参数是目标对象，后面的参数都是源对象
Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
//注意：如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。

//2. 如果只有一个参数，Object.assign()会直接返回该参数。
const obj = {a: 1};
Object.assign(obj) === obj // true

//3. 如果该参数不是对象，则会先转成对象，然后返回。
typeof Object.assign(2) // "object"

//4. 如果非对象参数出现在源对象的位置（即非首参数），那么处理规则有所不同。首先，这些参数都会转成对象，如果无法转成对象，就会跳过。这意味着，如果undefined和null不在首参数，就不会报错。
let obj = {a: 1};
Object.assign(obj, undefined) === obj // true
Object.assign(obj, null) === obj // true

//5. 其他类型的值（即数值、字符串和布尔值）不在首参数，也不会报错。但是，除了字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果。
const v1 = 'abc';
const v2 = true;
const v3 = 10;

const obj = Object.assign({}, v1, v2, v3);
console.log(obj); // { "0": "a", "1": "b", "2": "c" }
//上面代码中，v1、v2、v3分别是字符串、布尔值和数值，结果只有字符串合入目标对象（以字符数组的形式），数值和布尔值都会被忽略。这是因为只有字符串的包装对象，会产生可枚举属性。

Object(true) // {[[PrimitiveValue]]: true}
Object(10)  //  {[[PrimitiveValue]]: 10}
Object('abc') // {0: "a", 1: "b", 2: "c", length: 3, [[PrimitiveValue]]: "abc"}
//上面代码中，布尔值、数值、字符串分别转成对应的包装对象，可以看到它们的原始值都在包装对象的内部属性[[PrimitiveValue]]上面，这个属性是不会被Object.assign()拷贝的。只有字符串的包装对象，会产生可枚举的实义属性，那些属性则会被拷贝。

//6. Object.assign()拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（enumerable: false）。
Object.assign({b: 'c'},
  Object.defineProperty({}, 'invisible', {
    enumerable: false,
    value: 'hello'
  })
)
// { b: 'c' }
//上面代码中，Object.assign()要拷贝的对象只有一个不可枚举属性invisible，这个属性并没有被拷贝进去。

//7. 属性名为 Symbol 值的属性，也会被Object.assign()拷贝。
Object.assign({ a: 'b' }, { [Symbol('c')]: 'd' })
// { a: 'b', Symbol(c): 'd' }
```

- #### 注意点：

  - **浅拷贝**：`Object.assign()`方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。

  ```javascript
  const obj1 = {a: {b: 1}}; 
  const obj2 = Object.assign({}, obj1);
  
  obj1.a.b = 2; 
  obj2.a.b // 2 
  //上面代码中，源对象obj1的a属性的值是一个对象，Object.assign()拷贝得到的是这个对象的引用。这个对象的任何变化，都会反映到目标对象上面。
  ```

  - **同名属性的替换**：对于这种嵌套的对象，一旦遇到同名属性，`Object.assign()`的处理方法是替换，而不是添加。

  ```javascript
  const target = { a: { b: 'c', d: 'e' } }
  const source = { a: { b: 'hello' } }
  Object.assign(target, source)
  // { a: { b: 'hello' } }
  //上面代码中，target对象的a属性被source对象的a属性整个替换掉了，而不会得到{ a: { b: 'hello', d: 'e' } }的结果。这通常不是开发者想要的，需要特别小心。
  //注：一些函数库提供Object.assign()的定制版本（比如 Lodash 的_.defaultsDeep()方法），可以得到深拷贝的合并。
  ```

  - **数组的处理**：`Object.assign()`可以用来处理数组，但是会把数组视为对象。

  ```javascript
  Object.assign([1, 2, 3], [4, 5])
  // [4, 5, 3]
  //上面代码中，Object.assign()把数组视为属性名为 0、1、2 的对象，因此源数组的 0 号属性4覆盖了目标数组的 0 号属性1。
  ```

  - **取值函数的处理**：`Object.assign()`只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制。

  ```javascript
  const source = {
    get foo() { return 1 }
  };
  const target = {};
  
  Object.assign(target, source)
  // { foo: 1 }
  //上面代码中，source对象的foo属性是一个取值函数，Object.assign()不会复制这个取值函数，只会拿到值以后，将这个值复制过去。
  ```

- #### 常见用途：

  - **为对象添加属性**

  ```javascript
  class Point {
    constructor(x, y) {
      Object.assign(this, {x, y});
    }
  }
  //上面方法通过Object.assign()方法，将x属性和y属性添加到Point类的对象实例。
  ```

  - **为对象添加方法**

  ```javascript
  Object.assign(SomeClass.prototype, {
    someMethod(arg1, arg2) {
      ···
    },
    anotherMethod() {
      ···
    }
  });
  
  // 等同于下面的写法
  SomeClass.prototype.someMethod = function (arg1, arg2) {
    ···
  };
  SomeClass.prototype.anotherMethod = function () {
    ···
  };
  //上面代码使用了对象属性的简洁表示法，直接将两个函数放在大括号中，再使用assign()方法添加到SomeClass.prototype之中。
  ```

  - **克隆对象**

  ```javascript
  function clone(origin) {
    return Object.assign({}, origin);
  }
  //上面代码将原始对象拷贝到一个空对象，就得到了原始对象的克隆。
  //不过，采用这种方法克隆，只能克隆原始对象自身的值，不能克隆它继承的值。如果想要保持继承链，可以采用下面的代码。
  
  function clone(origin) {
    let originProto = Object.getPrototypeOf(origin);
    return Object.assign(Object.create(originProto), origin);
  }
  ```

  - **合并多个对象**

  ```javascript
  const merge = (target, ...sources) => Object.assign(target, ...sources);
  //如果希望合并后返回一个新对象，可以改写上面函数，对一个空对象合并。
  const merge = (...sources) => Object.assign({}, ...sources);
  ```

  - **为属性指定默认值**

  ```javascript
  const DEFAULTS = {
    logLevel: 0,
    outputFormat: 'html'
  };
  
  function processContent(options) {
    options = Object.assign({}, DEFAULTS, options);
    console.log(options);
    // ...
  }
  //上面代码中，DEFAULTS对象是默认值，options对象是用户提供的参数。Object.assign()方法将DEFAULTS和options合并成一个新对象，如果两者有同名属性，则options的属性值会覆盖DEFAULTS的属性值。
  
  //注意，由于存在浅拷贝的问题，DEFAULTS对象和options对象的所有属性的值，最好都是简单类型，不要指向另一个对象。否则，DEFAULTS对象的该属性很可能不起作用。
  const DEFAULTS = {
    url: {
      host: 'example.com',
      port: 7070
    },
  };
  
  processContent({ url: {port: 8000} })
  // {
  //   url: {port: 8000}
  // }
  
  //上面代码的原意是将url.port改成 8000，url.host不变。实际结果却是options.url覆盖掉DEFAULTS.url，所以url.host就不存在了。
  ```

### 3. Object.getOwnPropertyDescriptors()

ES5 的`Object.getOwnPropertyDescriptor()`方法会返回某个对象属性的描述对象（descriptor）。ES2017 引入了`Object.getOwnPropertyDescriptors()`方法，返回指定对象所有自身属性（非继承属性）的描述对象。

```javascript
const obj = {
  foo: 123,
  get bar() { return 'abc' }
};

Object.getOwnPropertyDescriptors(obj)
// { foo:
//    { value: 123,
//      writable: true,
//      enumerable: true,
//      configurable: true },
//   bar:
//    { get: [Function: get bar],
//      set: undefined,
//      enumerable: true,
//      configurable: true } }
```















