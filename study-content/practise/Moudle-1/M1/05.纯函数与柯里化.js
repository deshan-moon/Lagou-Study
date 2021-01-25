// 非纯函数
let mini = 18
function checkAge(age) {
  return age >= mini
}
// 改变1
function checkAge(age) {
  let mini = 18
  return age >= mini
}
// 改变2
function checkAge(age, mini) {
  return age >= mini
}
// 柯里化改变
function checkAge(mini) {
  return (age) =>  age >= mini;
}
// es6
let checkAge = mini => (age => age >= mini)
