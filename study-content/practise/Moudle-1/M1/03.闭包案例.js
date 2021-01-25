// 求函数幂的调用
function makePower(power){
  return function(number) {
    return Math.pow(number,power)
  }
}
let pow2 = makePower(2)
let pow3 = makePower(3)
console.log(pow2(2))
console.log(pow3(3));

// 求员工工资
function makeSalary(salary) {
  return function(performance) {
    return salary + performance
  }
}
let sal2 = makeSalary(20000)
let sal3 = makeSalary(30000)
console.log(sal2(2000))
console.log(sal3(3000));