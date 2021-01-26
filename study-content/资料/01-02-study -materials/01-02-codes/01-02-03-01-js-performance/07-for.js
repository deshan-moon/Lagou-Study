
var arrList = []
arrList[10000] = 'icoder'

for (var i = 0; i < arrList.length; i++) {
  console.log(arrList[i])
}
// 用下述方法代替上面的，减少js运算过程
for (var i = arrList.length; i; i--) {
  console.log(arrList[i])
}