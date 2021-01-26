 Object 对象的新增方法：

ES5 比较两个值是否相等，只有两个运算符：相等运算符（`==`）和严格相等运算符（`===`）。它们都有缺点，前者会自动转换数据类型，后者的`NaN`不等于自身，以及`+0`等于`-0`。JavaScript 缺乏一种运算，在所有环境中，只要两个值是一样的，它们就应该相等。

ES6 提出“Same-value equality”（同值相等）算法，用来解决这个问题。`Object.is`就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。

```javascript
Object.is('foo', 'foo')	// true
Object.is({}, {})	// false
Object.is(+0, -0) 	// false
Object.is(NaN, NaN) // true
```

不同之处只有两个：一是`+0`不等于`-0`，二是`NaN`等于自身

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