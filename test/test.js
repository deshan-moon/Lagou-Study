//使用方式一
var n = Symbol("uname");
var obj = {
 456:"tom"
};
// obj[n] = "tom";
//以symbol作为属性不能使用点运算符添加属性，用点来添加属性是添加常规字符串属性
//obj.n = "tom";
console.log(obj);//{Symbol(uname): "tom"}
//使用方式二
var n = Symbol([1,2,3]);
var obj = {
    [n]:"tom"  //字面量添加symbol属性，必须要用[]
};
console.log(obj);//{ [Symbol(1,2,3)]: 'tom' }